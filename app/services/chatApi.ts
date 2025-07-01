// // const DEEPSEEK_API_KEY = "sk-fd092005f2f446d78dade7662a13c896"

// // export async function* streamChatResponse(prompt: string, ticker?: string) {
// //   try {
// //     const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant. Provide detailed, actionable trading insights and analysis. Always structure your responses with clear sections like Summary, Technical Analysis, Entry/Exit levels when relevant. Be professional but conversational. ${ticker ? `Focus on ${ticker} stock analysis.` : ""}`

// //     const response = await fetch("https://api.deepseek.com/chat/completions", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
// //       },
// //       body: JSON.stringify({
// //         model: "deepseek-chat",
// //         messages: [
// //           { role: "system", content: systemPrompt },
// //           { role: "user", content: prompt },
// //         ],
// //         stream: true,
// //         temperature: 0.7,
// //         max_tokens: 2000,
// //       }),
// //     })

// //     if (!response.ok) {
// //       throw new Error(`HTTP error! status: ${response.status}`)
// //     }

// //     const reader = response.body?.getReader()
// //     if (!reader) {
// //       throw new Error("No reader available")
// //     }

// //     const decoder = new TextDecoder()
// //     let buffer = ""

// //     while (true) {
// //       const { done, value } = await reader.read()
// //       if (done) break

// //       buffer += decoder.decode(value, { stream: true })
// //       const lines = buffer.split("\n")
// //       buffer = lines.pop() || ""

// //       for (const line of lines) {
// //         if (line.startsWith("data: ")) {
// //           const data = line.slice(6)
// //           if (data === "[DONE]") {
// //             return
// //           }

// //           try {
// //             const parsed = JSON.parse(data)
// //             const content = parsed.choices?.[0]?.delta?.content
// //             if (content) {
// //               yield content
// //             }
// //           } catch (e) {
// //             // Skip invalid JSON
// //           }
// //         }
// //       }
// //     }
// //   } catch (error) {
// //     console.error("Error streaming chat response:", error)
// //     yield "I apologize, but I'm having trouble connecting to provide a response right now. Please try again."
// //   }
// // }


// // =======================================================================
// const DEEPSEEK_API_KEY = "sk-fd092005f2f446d78dade7662a13c896";
// const ALPHA_VANTAGE_API_KEY = "04RGF1U9PAJ49VYI";

// async function fetchAlphaVantageData(ticker: string): Promise<string> {
//   try {
//     const [overviewRes, newsRes, priceRes] = await Promise.all([
//       fetch(
//         `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
//       ),
//       fetch(
//         `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
//       ),
//       fetch(
//         `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
//       ),
//     ]);

//     const overview = await overviewRes.json();
//     const news = await newsRes.json();
//     const timeSeries = await priceRes.json();

//     const latestNews =
//       news.feed
//         ?.slice(0, 3)
//         .map((n) => `- ${n.title} (${n.source})`)
//         .join("\n") || "No news found.";

//     const lastClose = Object.values(
//       timeSeries["Time Series (Daily)"] || {}
//     )[0] as Record<string, string> | undefined;

//     return `
// Ticker Overview:
// Name: ${overview.Name || ticker}
// Sector: ${overview.Sector || "N/A"}
// Market Cap: ${overview.MarketCapitalization || "N/A"}
// PE Ratio: ${overview.PERatio || "N/A"}
// Dividend Yield: ${overview.DividendYield || "N/A"}

// Latest Close: $${lastClose?.["4. close"] ?? "N/A"}
// Volume: ${lastClose?.["6. volume"] ?? "N/A"}

// Recent News:
// ${latestNews}
// `;
//   } catch (err) {
//     console.error("Alpha Vantage fetch error:", err);
//     return "Alpha Vantage data unavailable.";
//   }
// }

// export async function* streamChatResponse(
//   userPrompt: string,
//   ticker?: string,
//   systemPromptOverride?: string
// ) {
//   const systemPrompt =
//     systemPromptOverride ||
//     `You are TradeGPT. Provide stock analysis for ${ticker}.`;
//   try {
//     let alphaVantageInfo = "";
//     if (ticker) {
//       alphaVantageInfo = await fetchAlphaVantageData(ticker);
//     }

//     const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant. Provide detailed, actionable trading insights and analysis. Structure responses with sections like Summary, Technical Analysis, and Entry/Exit levels. Be professional but conversational.
// ${
//   ticker
//     ? `\nFocus on ${ticker}.\n\nHere is real-time data for context:\n${alphaVantageInfo}`
//     : ""
// }
// `;

//     const response = await fetch("https://api.deepseek.com/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "deepseek-chat",
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: prompt },
//         ],
//         stream: true,
//         temperature: 0.7,
//         max_tokens: 2000,
//       }),
//     });

//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//     const reader = response.body?.getReader();
//     if (!reader) throw new Error("No reader available");

//     const decoder = new TextDecoder();
//     let buffer = "";

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       buffer += decoder.decode(value, { stream: true });
//       const lines = buffer.split("\n");
//       buffer = lines.pop() || "";

//       for (const line of lines) {
//         if (line.startsWith("data: ")) {
//           const data = line.slice(6);
//           if (data === "[DONE]") return;

//           try {
//             const parsed = JSON.parse(data);
//             const content = parsed.choices?.[0]?.delta?.content;
//             if (content) yield content;
//           } catch (_) {
//             // Skip JSON parse errors
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error streaming chat response:", error);
//     yield "Unable to fetch response currently. Please try again.";
//   }
// }

// // =================================================================
const DEEPSEEK_API_KEY = "sk-fd092005f2f446d78dade7662a13c896";
const ALPHA_VANTAGE_API_KEY = "04RGF1U9PAJ49VYI";

async function fetchAlphaVantageData(ticker: string): Promise<string> {
  try {
    const [overviewRes, newsRes, priceRes] = await Promise.all([
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
      ),
      fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
      ),
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
      ),
    ]);

    const overview = await overviewRes.json();
    const news = await newsRes.json();
    const timeSeries = await priceRes.json();

    const latestNews =
      news.feed
        ?.slice(0, 3)
        .map((n) => `- ${n.title} (${n.source})`)
        .join("\n") || "No news found.";

    const lastClose = Object.values(
      timeSeries["Time Series (Daily)"] || {}
    )[0] as Record<string, string> | undefined;

    return `
Ticker Overview:
Name: ${overview.Name || ticker}
Sector: ${overview.Sector || "N/A"}
Market Cap: ${overview.MarketCapitalization || "N/A"}
PE Ratio: ${overview.PERatio || "N/A"}
Dividend Yield: ${overview.DividendYield || "N/A"}

Latest Close: $${lastClose?.["4. close"] ?? "N/A"}
Volume: ${lastClose?.["6. volume"] ?? "N/A"}

Recent News:
${latestNews}
`;
  } catch (err) {
    console.error("Alpha Vantage fetch error:", err);
    return "Alpha Vantage data unavailable.";
  }
}

export async function* streamChatResponse(
  userPrompt: string,
  ticker?: string,
  systemPromptOverride?: string
) {
  try {
    let alphaVantageInfo = "";
    if (ticker) {
      alphaVantageInfo = await fetchAlphaVantageData(ticker);
    }

    const systemPrompt =
      systemPromptOverride ||
      `You are TradeGPT, a professional market analyst and trading assistant. Provide detailed, actionable trading insights and analysis. Structure responses with sections like Summary, Technical Analysis, and Entry/Exit levels. Be professional but conversational.
${ticker ? `\nFocus on ${ticker}.\n\nHere is real-time data for context:\n${alphaVantageInfo}` : ""}
`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") return;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) yield content;
          } catch (_) {
            // Skip invalid JSON
          }
        }
      }
    }
  } catch (error) {
    console.error("Error streaming chat response:", error);
    yield "Unable to fetch response currently. Please try again.";
  }
}

export { fetchAlphaVantageData };
