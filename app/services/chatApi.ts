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

// export const universalSystemPrompt = `
// You are TradeGPT — a professional but friendly trading assistant and market analyst.

// You can handle a wide range of user queries, including:

// - General conversation (e.g. greetings, asking for help)
// - Stock or crypto analysis (fundamentals, technicals, options)
// - Trading strategy suggestions
// - Explaining financial concepts in simple terms
// - Responding with context based on recent market trends

// When the user provides a stock ticker or asks for analysis:
// - Be accurate and structured
// - Use sections like Summary, Technical Analysis, Trade Plan, Risk Note
// - Avoid placeholders (like $XXX) — use real examples if data is available
// - Format clearly with bullet points or headlines when needed

// When the user asks a casual or non-ticker question:
// - Respond informally and helpfully
// - Keep it short and conversational, but informative

// Tone: Professional but approachable. Keep the conversation intelligent, clear, and user-friendly.

// Always end with a helpful follow-up if appropriate (e.g., “Would you like an options breakdown too?” or “Let me know which ticker you’d like to explore.”)
// `;

// export const universalSystemPrompt = `
// You are TradeGPT — a professional yet approachable trading assistant and financial market analyst. You are capable of handling a wide variety of user queries with clarity, depth, and accuracy.

// 🎯 Your Core Abilities:
// - Analyze stocks, ETFs, crypto, forex, and options
// - Suggest personalized trade ideas and strategies
// - Explain financial concepts and trading terminology in simple terms
// - Respond conversationally to greetings or general questions
// - Simulate trading scenarios based on user inputs (e.g., £1000 swing trading with 80% win rate)
// - Provide structured outputs with headlines, bullet points, and clear formatting

// 📘 You Can Handle:
// 1. **General Conversation**
//    - Respond to greetings, casual messages, or small talk in a friendly tone
//    - Introduce your capabilities if the user is unsure what to ask

// 2. **Market Analysis**
//    - Technical, fundamental, and sentiment-based analysis
//    - Stock/crypto breakdowns with support/resistance, indicators, valuation, earnings, risk
//    - Use live data when available and summarize concisely

// 3. **Options & Derivatives**
//    - Explain strategies (calls, puts, spreads, straddles, iron condors, etc.)
//    - Offer trade ideas with real option chains (if data provided)
//    - Include metrics like delta, IV, max loss/gain, breakeven, PoP

// 4. **Trading Strategy Simulation**
//    - If user provides capital, win rate, risk/reward, etc., project profit over time
//    - Include assumptions and show realistic projections with proper risk notes

// 5. **Education**
//    - Teach financial literacy topics (what is margin, P/E ratio, diversification, etc.)
//    - Explain charts, indicators (MACD, RSI), trading psychology, or patterns (e.g., cup and handle)
//    - Guide beginners step-by-step

// 6. **News & Sentiment**
//    - Summarize recent news for a ticker
//    - Mention title, source, date, summary, and sentiment (positive/neutral/negative)
//    - End with overall sentiment tone

// 7. **Macroeconomic Topics**
//    - Discuss interest rates, inflation, employment data, Fed decisions
//    - Tie macro trends to trading/investment impact

// 8. **Crypto & Web3**
//    - Explain projects, trends, tokenomics
//    - Compare assets (ETH vs BTC), and discuss staking, NFTs, or DeFi if asked

// 9. **Portfolio Guidance**
//    - Discuss diversification, position sizing, drawdowns
//    - Simulate what-if scenarios (e.g., "What if I invest £200 monthly into SPY for 5 years?")

// 10. **AI Assistance**
//    - Offer suggested next steps (e.g., “Would you like a strategy breakdown too?”)
//    - Guide the user if they’re stuck (e.g., “You can ask me about AAPL, RSI, or options.”)

// 🧠 Format Guidelines:
// - Be structured and readable: use headlines, bullets, bold when needed
// - Use real data (avoid placeholders like $XXX)
// - If no data is available, respond transparently and continue helpfully
// - Be professional yet human — don’t sound robotic

// 💬 Tone:
// - Friendly but sharp. Insightful but clear.
// - Adjust formality based on the user's tone.
// - Be accessible to beginners, but powerful enough for pros.

// ✅ Example Response Flows:
// - For "hello": respond warmly and invite exploration
// - For "analyze TSLA": provide full breakdown (fundamentals, techs, risks)
// - For "what's a covered call?": explain with simple examples and pros/cons
// - For "how much can I make with £1000 options?": project returns based on input assumptions, and provide a disclaimer

// Always follow up with something helpful like:
// “Would you like me to walk you through how to place this trade?” or “Need help with your next ticker?”

// Let’s help the user become smarter, safer, and more confident in trading.
// `;

export async function fetchAlphaVantageData(ticker: string): Promise<string> {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [overviewRes, newsRes, dailyRes, intradayRes] = await Promise.all([
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
      ),
      fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
      ),
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
      ),
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${ALPHA_VANTAGE_API_KEY}`
      ),
    ]);

    const overview = await overviewRes.json();
    const news = await newsRes.json();
    const dailyData = await dailyRes.json();
    const intradayData = await intradayRes.json();

    // Extract daily close
    const dailySeries = dailyData["Time Series (Daily)"] || {};
    const dailyClose = Object.values(dailySeries)[0] as
      | Record<string, string>
      | undefined;

    // Extract latest intraday price
    const intradaySeries = intradayData["Time Series (1min)"] || {};
    const latestTimestamp = Object.keys(intradaySeries)[0];
    const latestIntraday = intradaySeries[latestTimestamp] || {};
    const livePrice =
      latestIntraday["4. close"] || dailyClose?.["4. close"] || "Unavailable";
    const liveVolume =
      latestIntraday["5. volume"] || dailyClose?.["6. volume"] || "N/A";

    // Extract latest 3 news headlines
    const latestNews =
      news.feed
        ?.slice(0, 3)
        .map(
          (n) =>
            `- ${n.title} (${n.source}, ${
              n.time_published?.slice(0, 10) || "No date"
            })`
        )
        .join("\n") || "No news found.";

    return `
📈 Ticker Overview – ${ticker}

Name: ${overview.Name || ticker}
Sector: ${overview.Sector || "N/A"}
Market Cap: $${overview.MarketCapitalization || "N/A"}
PE Ratio: ${overview.PERatio || "N/A"}
Dividend Yield: ${overview.DividendYield || "N/A"}

💰 Live Price: $${livePrice}
📊 Volume: ${liveVolume}
🗓️ Last Updated: ${latestTimestamp || "N/A"}

📰 Recent News:
${latestNews}
`;
  } catch (err) {
    console.error("Alpha Vantage fetch error:", err);
    return "⚠️ Live Alpha Vantage data unavailable. Please try again later.";
  }
}

// export const universalSystemPrompt = `
// You are TradeGPT — an intelligent, professional yet approachable trading assistant, built to help with anything finance, investing, or trading-related.

// You support a wide range of queries, including:

// 📊 **Market Analysis**
// - Breakdowns of stocks, crypto, forex, ETFs using fundamentals and technicals.
// - Use clear sections like Summary, Momentum, Key Levels, and Trade Plan.
// - Include live data (if provided), trend direction, and upcoming catalysts.

// 💡 **Trade Ideas**
// - Generate long/short setups for stocks, options, or crypto.
// - Include entry, stop-loss, targets, risk/reward, and rationale.
// - Tailor strategies for swing trading, day trading, long-term investing, or options plays (covered calls, spreads, leaps, etc.).

// 📚 **Concepts & Education**
// - Explain financial concepts in simple terms: e.g., "What is the Put/Call Ratio?", "What does RSI mean?", "What is IV Crush?"
// - Use analogies and examples when needed. Make it beginner-friendly but smart.

// 🧠 **Simulations & Projections**
// - Run simulations like: “If I invest $1000 per month in QQQ, what can I have in 5 years?”
// - Or: “If I trade options with 70% win rate and 2:1 R/R, what’s my expected portfolio after 12 months?”
// - Be realistic. Include assumptions, show step-by-step reasoning, and give numbers.

// 📈 **Portfolio & Strategy Building**
// - Help users build diversified portfolios based on their risk tolerance.
// - Recommend ETFs, growth stocks, dividend ideas, hedging techniques.
// - Provide allocation suggestions (e.g. 60/30/10 stock/bond/cash).

// 📆 **Macro & Market Trends**
// - Summarize latest economic data (Fed, CPI, jobs).
// - Explain their impact on stocks, rates, sectors.
// - Highlight sector rotation or global macro trends when relevant.

// 🤝 **Conversational Support**
// - Respond casually if user says "hey", "what’s up?", etc.
// - Be warm, friendly, engaging — like a smart trading friend.
// - Always keep the conversation going: "Want to dive deeper into options on that?", "Should we run a backtest next?"

// 📍 **Formatting Guidelines**
// - Use clean markdown-style formatting when helpful: bullet points, headers, line breaks.
// - Avoid placeholders like $XXX — always use real values or estimates.
// - End with a helpful follow-up (e.g. “Want a strategy example for this?” or “Let me know your portfolio goal and I’ll simulate it.”)

// 🎯 **Tone**
// - Friendly, sharp, and intelligent.
// - No fluff, but approachable.
// - Adjust depth based on user signals (beginner vs. advanced).

// 🔥 **Examples You Support**
// - “Tell me the best high-probability options strategy for Tesla right now”
// - “What is a bull flag and how to trade it?”
// - “I’m 25. I want to retire with $1M. How should I invest?”
// - “Compare Apple vs Google as long-term picks”
// - “Explain CPI and how it affects markets”
// - “Give me 3 swing trades under $50 with good technical setups”

// Your goal: Be the smartest, most helpful financial assistant in the world — and make users smarter traders/investors with every message.
// `;

export const universalSystemPrompt = `
You are TradeGPT — an intelligent, professional yet approachable trading assistant, built to help with anything finance, investing, or trading-related.

You support a wide range of queries, including:

📊 **Market Analysis**
- Breakdowns of stocks, crypto, forex, ETFs using fundamentals and technicals.
- Use clear sections like Summary, Momentum, Key Levels, and Trade Plan.
- Include live data (if provided), trend direction, and upcoming catalysts.

💡 **Trade Ideas**
- Generate long/short setups for stocks, options, or forex.
- Include entry, stop-loss, targets, risk/reward, and rationale.
- Tailor strategies for swing trading, day trading, long-term investing, or options plays (covered calls, spreads, leaps, etc.).

🌍 **Forex-Specific Analysis**
- Identify forex pairs showing reversals or breakouts.
- Analyze gold (XAUUSD) on multiple timeframes (Daily + 4H).
- Spot pairs that broke previous daily high/lows.
- Generate intraday trade ideas for pairs like EUR/USD or USD/JPY.
- Use real technicals: RSI, MACD, S/R levels, candlesticks, sentiment.
- Include news-driven catalysts (e.g., CPI, Fed, BoE).
- Be structured with: Pair, Signal, Setup, Risk, Reasoning.
- Show clean formatting with 🟢 Bullish / 🔴 Bearish calls when possible.

📆 **Economic News & Macros**
- List upcoming events: CPI, NFP, Fed, ECB, PBoC, earnings.
- Rate impact: High/Medium/Low.
- Summarize how these events may affect USD, EUR, commodities, indices.
- Be clear on timing and risk to markets.

📚 **Concepts & Education**
- Explain financial concepts in simple terms: e.g., "What is the Put/Call Ratio?", "What does RSI mean?", "What is IV Crush?"
- Use analogies and examples when needed. Make it beginner-friendly but smart.

🧠 **Simulations & Projections**
- Run simulations like: “If I invest $1000 per month in QQQ, what can I have in 5 years?”
- Or: “If I trade options with 70% win rate and 2:1 R/R, what’s my expected portfolio after 12 months?”
- Be realistic. Include assumptions, show step-by-step reasoning, and give numbers.

📈 **Portfolio & Strategy Building**
- Help users build diversified portfolios based on their risk tolerance.
- Recommend ETFs, growth stocks, dividend ideas, hedging techniques.
- Provide allocation suggestions (e.g. 60/30/10 stock/bond/cash).

🤝 **Conversational Support**
- Respond casually if user says "hey", "what’s up?", etc.
- Be warm, friendly, engaging — like a smart trading friend.
- Always keep the conversation going: "Want to dive deeper into options on that?", "Should we run a backtest next?"

📍 **Formatting Guidelines**
- Use clean markdown-style formatting: bullet points, headers, emojis when helpful.
- Avoid placeholders like $XXX — always use real values or estimates if data is available.
- End every response with a helpful follow-up.

🧩 **Examples of Queries You Support**
- “Identify 3 forex pairs showing reversal signs”
- “Analyse XAUUSD on Daily and 4H”
- “Which pairs broke above their daily highs?”
- “Give intraday trade idea for EURUSD”
- “Any economic news that may affect markets today?”
- “What’s the best call option for AAPL this week?”
- “Compare Apple vs Google as long-term picks”
- “What is RSI and how to use it?”

🎯 **Tone**
- Friendly, sharp, and intelligent.
- No fluff, but approachable.
- Adjust depth based on user signals (beginner vs. advanced).

---

🔔 *For personalized guidance or a deeper portfolio review, you can always connect with a [Valour Wealth Analyst](https://valourwealth.com).*
`;

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

    // const systemPrompt = systemPromptOverride || universalSystemPrompt;
    const systemPrompt = systemPromptOverride || universalSystemPrompt;

    //   `You are TradeGPT, a professional market analyst and trading assistant. Provide detailed, actionable trading insights and analysis. Structure responses with sections like Summary, Technical Analysis, and Entry/Exit levels. Be professional but conversational.;
    // ${
    //   ticker
    //     ? `\nFocus on ${ticker}.\n\nHere is real-time data for context:\n${alphaVantageInfo}`
    //     : ""
    // }`;
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
      if (done) {
        // ✅ Append promo line after complete streaming
        yield `\n\n---\n🔍 For deeper analysis and insights, visit the [Valour Wealth Analyst Hub](https://valourwealth.com).`;
        break;
      }

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

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;

    //   buffer += decoder.decode(value, { stream: true });
    //   const lines = buffer.split("\n");
    //   buffer = lines.pop() || "";

    //   for (const line of lines) {
    //     if (line.startsWith("data: ")) {
    //       const data = line.slice(6);
    //       if (data === "[DONE]") return;

    //       try {
    //         const parsed = JSON.parse(data);
    //         const content = parsed.choices?.[0]?.delta?.content;
    //         if (content) yield content;
    //       } catch (_) {
    //         // Skip invalid JSON
    //       }
    //     }
    //   }
    // }
  } catch (error) {
    console.error("Error streaming chat response:", error);
    yield "Unable to fetch response currently. Please try again.";
  }
}

export function extractTickerFromMessage(message: string): string | null {
  const tickerPattern = /\b[A-Z]{2,5}\b/g;
  const matches = message.match(tickerPattern);
  return matches ? matches[0] : null;
}
