// // // export function getTradeIdeasPrompt(ticker: string): string {
// // //   return `You are TradeGPT, an advanced trading assistant. Provide multiple trade ideas for ${ticker} using real options data if available.

// // // Format:
// // // Trade Idea 1: Long Call
// // // [Stock Symbol: ${ticker}]
// // // Signal: Bullish
// // // Option Strategy: Long Call
// // // Strike Price: US$XXX
// // // Expiry Date: DD-MMM-YYYY
// // // Current Price: US$XXX
// // // Buy/Sell: Buy
// // // Call/Put: Call
// // // Ask: US$X.XX
// // // Stop loss: US$X.XX
// // // Take profit: US$X.XX
// // // Probability of Profit: XX.X%
// // // Max Loss: US$XXX
// // // Max Gain: US$∞
// // // Break-even price: US$XXX
// // // Rationale: ...

// // // Do not use $XXX placeholders. Use real numbers. End with a helpful disclaimer.`;
// // // }

// // // export function getPriceChartPrompt(ticker: string): string {
// // //   return `You are TradeGPT. Provide a full price chart breakdown for ${ticker}, including:

// // // - Price Chart Overview
// // // - Valuation
// // // - Growth
// // // - Profitability
// // // - Momentum
// // // - Earnings Revisions
// // // - Competitors
// // // - Buy/Sell Reasons

// // // Be professional. Avoid templates or $XXX placeholders. Use real data.`;
// // // }

// // // export const getFundamentalAnalysisPrompt = (ticker: string) => `
// // // Provide a comprehensive analysis of the stock ${ticker}. Include details such as:
// // // - Business model and core operations
// // // - Revenue and earnings trends
// // // - Profit margins, ROE, ROA, and debt levels
// // // - Valuation multiples (PE, PS, PB)
// // // - Industry positioning and competitive edge
// // // - Management and insider activity
// // // - Risks and catalysts

// // // Present your analysis in a structured, concise manner for a long-term investor perspective.
// // // `;

// // // export function getRecentNewsPrompt(ticker: string): string {
// // //   return `You are TradeGPT. Show recent news articles for ${ticker}. For each include:

// // // - Title
// // // - Date
// // // - Source
// // // - Summary
// // // - Sentiment: Positive, Neutral, Negative

// // // End with overall sentiment summary and ask if user wants more info.`;
// // // }

// // // async function fetchForexRate(pair: string): Promise<string> {
// // //   const [from, to] = pair.split("/");
// // //   const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

// // //   const res = await fetch(
// // //     `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`
// // //   );
// // //   const data = await res.json();
// // //   const fx = data["Realtime Currency Exchange Rate"];

// // //   if (fx) {
// // //     return `
// // // Forex Rate (${from}/${to})
// // // Exchange Rate: ${fx["5. Exchange Rate"]}
// // // Bid: ${fx["8. Bid Price"]}
// // // Ask: ${fx["9. Ask Price"]}
// // // Last Refreshed: ${fx["6. Last Refreshed"]}
// // // Source: Alpha Vantage
// // // `;
// // //   }

// // //   return `No live forex data found for ${pair}`;
// // // }

// // // export { fetchForexRate, streamChatResponse };

// // // // ✅ Integration Example (used in the parent component that renders <TickerDetailPanel />)

// // // import { streamChatResponse } from "../services/chatApi";
// // // import {
// // //   getFundamentalAnalysisPrompt,
// // //   getPriceChartPrompt,
// // //   getRecentNewsPrompt,
// // //   getTradeIdeasPrompt,
// // // } from "../services/promptHelpers";

// // // export const universalSystemPrompt = `
// // // You are TradeGPT — a professional but friendly trading assistant and market analyst.

// // // You can handle a wide range of user queries, including:

// // // - General conversation (e.g. greetings, asking for help)
// // // - Stock or crypto analysis (fundamentals, technicals, options)
// // // - Trading strategy suggestions
// // // - Explaining financial concepts in simple terms
// // // - Responding with context based on recent market trends

// // // When the user provides a stock ticker or asks for analysis:
// // // - Be accurate and structured
// // // - Use sections like Summary, Technical Analysis, Trade Plan, Risk Note
// // // - Avoid placeholders (like $XXX) — use real examples if data is available
// // // - Format clearly with bullet points or headlines when needed

// // // When the user asks a casual or non-ticker question:
// // // - Respond informally and helpfully
// // // - Keep it short and conversational, but informative

// // // Tone: Professional but approachable. Keep the conversation intelligent, clear, and user-friendly.

// // // Always end with a helpful follow-up if appropriate (e.g., “Would you like an options breakdown too?” or “Let me know which ticker you’d like to explore.”)
// // // `;

// // // export async function handleChatAction(action: string, ticker: string) {
// // //   let userPrompt = "";
// // //   let alphaData = "";

// // //   switch (action) {
// // //     case "Price Chart":
// // //       userPrompt = getPriceChartPrompt(ticker);
// // //       break;
// // //     case "Recent News":
// // //       userPrompt = getRecentNewsPrompt(ticker);
// // //       break;
// // //     case "Trade Ideas":
// // //       userPrompt = getTradeIdeasPrompt(ticker);
// // //       break;
// // //     case "Analysis":
// // //       userPrompt = getFundamentalAnalysisPrompt(ticker);
// // //       break;
// // //     default:
// // //       // userPrompt = `Give me information on ${ticker}`;
// // //       userPrompt = universalSystemPrompt;
// // //   }

// // //   // 🔥 Fetch Alpha Vantage live data
// // //   alphaData = await fetchAlphaVantageData(ticker); // already made in chatApi.ts

// // //   // ✅ Clean system prompt without Alpha Vantage
// // //   //   const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
// // //   // Be structured and insightful. Focus on ${ticker}.`;
// // //   // const systemPrompt = universalSystemPrompt;

// // //   //   // 🧠 Combine it into system prompt
// // //   const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
// // //   Use the following real-time data for your analysis of ${ticker}:

// // //   --- BEGIN LIVE DATA ---
// // //   ${alphaData}
// // //   --- END LIVE DATA ---

// // //   // Be structured and insightful.`;

// // //   // ✅ Send it to DeepSeek API with real data
// // //   streamChatResponse(userPrompt, ticker, systemPrompt);
// // // }

// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------
// // // ----------=---------------------------------------------------------------------------------------------------------------

// // export function getTradeIdeasPrompt(ticker: string): string {
// //   return `You are TradeGPT, an advanced trading assistant. Provide multiple trade ideas for ${ticker} using real options data if available.

// // Format:
// // Trade Idea 1: Long Call
// // [Stock Symbol: ${ticker}]
// // Signal: Bullish
// // Option Strategy: Long Call
// // Strike Price: US$XXX
// // Expiry Date: DD-MMM-YYYY
// // Current Price: US$XXX
// // Buy/Sell: Buy
// // Call/Put: Call
// // Ask: US$X.XX
// // Stop loss: US$X.XX
// // Take profit: US$X.XX
// // Probability of Profit: XX.X%
// // Max Loss: US$XXX
// // Max Gain: US$∞
// // Break-even price: US$XXX
// // Rationale: ...

// // Do not use $XXX placeholders. Use real numbers. End with a helpful disclaimer.`;
// // }

// // export function getPriceChartPrompt(ticker: string): string {
// //   return `You are TradeGPT. Provide a full price chart breakdown for ${ticker}, including:

// // - Price Chart Overview
// // - Valuation
// // - Growth
// // - Profitability
// // - Momentum
// // - Earnings Revisions
// // - Competitors
// // - Buy/Sell Reasons

// // Be professional. Avoid templates or $XXX placeholders. Use real data.`;
// // }

// // export const getFundamentalAnalysisPrompt = (ticker: string) => `
// // Provide a comprehensive analysis of the stock ${ticker}. Include details such as:
// // - Business model and core operations
// // - Revenue and earnings trends
// // - Profit margins, ROE, ROA, and debt levels
// // - Valuation multiples (PE, PS, PB)
// // - Industry positioning and competitive edge
// // - Management and insider activity
// // - Risks and catalysts

// // Present your analysis in a structured, concise manner for a long-term investor perspective.
// // `;

// // export function getRecentNewsPrompt(ticker: string): string {
// //   return `You are TradeGPT. Show recent news articles for ${ticker}. For each include:

// // - Title
// // - Date
// // - Source
// // - Summary
// // - Sentiment: Positive, Neutral, Negative

// // End with overall sentiment summary and ask if user wants more info.`;
// // }

// // async function fetchForexRate(pair: string): Promise<string> {
// //   const [from, to] = pair.split("/");
// //   const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

// //   const res = await fetch(
// //     `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${from}&to_symbol=${to}&interval=1min&apikey=${apiKey}`
// //   );
// //   const data = await res.json();

// //   const timeSeries = data["Time Series FX (1min)"];
// //   const latestTimestamp = Object.keys(timeSeries || {})[0];

// //   if (latestTimestamp) {
// //     const rate = timeSeries[latestTimestamp];
// //     return `
// // Forex Rate (${from}/${to})
// // Last Refreshed: ${latestTimestamp}
// // Open: ${rate["1. open"]}
// // High: ${rate["2. high"]}
// // Low: ${rate["3. low"]}
// // Close: ${rate["4. close"]}
// // Source: Alpha Vantage
// //     `;
// //   }

// //   return `No live forex data found for ${pair}`;
// // }

// // export { fetchForexRate, streamChatResponse };

// // // ✅ Integration Example (used in the parent component that renders <TickerDetailPanel />)

// // import { streamChatResponse } from "../services/chatApi";
// // import {
// //   getFundamentalAnalysisPrompt,
// //   getPriceChartPrompt,
// //   getRecentNewsPrompt,
// //   getTradeIdeasPrompt,
// // } from "../services/promptHelpers";

// // export const universalSystemPrompt = `
// // You are TradeGPT — a professional but friendly trading assistant and market analyst.

// // You can handle a wide range of user queries, including:

// // - General conversation (e.g. greetings, asking for help)
// // - Stock or crypto analysis (fundamentals, technicals, options)
// // - Trading strategy suggestions
// // - Explaining financial concepts in simple terms
// // - Responding with context based on recent market trends

// // When the user provides a stock ticker or asks for analysis:
// // - Be accurate and structured
// // - Use sections like Summary, Technical Analysis, Trade Plan, Risk Note
// // - Avoid placeholders (like $XXX) — use real examples if data is available
// // - Format clearly with bullet points or headlines when needed

// // When the user asks a casual or non-ticker question:
// // - Respond informally and helpfully
// // - Keep it short and conversational, but informative

// // Tone: Professional but approachable. Keep the conversation intelligent, clear, and user-friendly.

// // Always end with a helpful follow-up if appropriate (e.g., “Would you like an options breakdown too?” or “Let me know which ticker you’d like to explore.”)
// // `;

// // export async function handleChatAction(action: string, symbolOrPair: string) {
// //   let userPrompt = "";
// //   let alphaData = "";
// //   let systemPrompt = "";

// //   // Step 1: Handle structured actions
// //   switch (action) {
// //     case "Price Chart":
// //       userPrompt = getPriceChartPrompt(symbolOrPair);
// //       break;
// //     case "Recent News":
// //       userPrompt = getRecentNewsPrompt(symbolOrPair);
// //       break;
// //     case "Trade Ideas":
// //       userPrompt = getTradeIdeasPrompt(symbolOrPair);
// //       break;
// //     case "Analysis":
// //       userPrompt = getFundamentalAnalysisPrompt(symbolOrPair);
// //       break;
// //     default:
// //       userPrompt = symbolOrPair; // Assume it's a free-text message
// //   }

// //   // Step 2: Decide if it's a ticker or forex pair
// //   const isForexPair = symbolOrPair.includes("/") && symbolOrPair.length === 7;

// //   if (isForexPair) {
// //     alphaData = await fetchForexRate(symbolOrPair); // USD/EUR etc.
// //   } else if (
// //     ["Price Chart", "Recent News", "Trade Ideas", "Analysis"].includes(action)
// //   ) {
// //     alphaData = await fetchAlphaVantageData(symbolOrPair); // stock
// //   }

// //   // Step 3: Build system prompt
// //   if (alphaData) {
// //     systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
// // Use the following real-time data for your analysis of ${symbolOrPair}:

// // --- BEGIN LIVE DATA ---
// // ${alphaData}
// // --- END LIVE DATA ---

// // Be structured and insightful.`;
// //   } else {
// //     systemPrompt = universalSystemPrompt;
// //   }

// //   // Step 4: Stream chat
// //   streamChatResponse(userPrompt, symbolOrPair, systemPrompt);
// // }

// // async function fetchAlphaVantageData(ticker: string): Promise<string> {
// //   const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

// //   const quoteRes = await fetch(
// //     `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`
// //   );
// //   const overviewRes = await fetch(
// //     `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`
// //   );

// //   const quoteJson = await quoteRes.json();
// //   const overviewJson = await overviewRes.json();

// //   const quote = quoteJson["Global Quote"];
// //   const ov = overviewJson;

// //   return `
// // Latest Stock Quote for ${ticker}:
// // Price: $${quote["05. price"]}
// // Change: ${quote["10. change percent"]}
// // Open: $${quote["02. open"]}
// // High: $${quote["03. high"]}
// // Low: $${quote["04. low"]}
// // Volume: ${quote["06. volume"]}
// // Previous Close: $${quote["08. previous close"]}

// // Company Overview:
// // Name: ${ov.Name}
// // Sector: ${ov.Sector}
// // Market Cap: $${ov.MarketCapitalization}
// // PE Ratio: ${ov.PERatio}
// // EPS: ${ov.EPS}
// // ROE: ${ov.ReturnOnEquityTTM}%
// // Debt/Equity: ${ov.DebtEquityRatio}
// // Dividend Yield: ${ov.DividendYield}
// // Beta: ${ov.Beta}
// // `;
// // }

// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================
// // ========================================================================================================================

// export function getTradeIdeasPrompt(ticker: string): string {
//   return `You are TradeGPT, an advanced trading assistant. Provide multiple trade ideas for ${ticker} using real options data if available.

// Format:
// Trade Idea 1: Long Call
// [Stock Symbol: ${ticker}]
// Signal: Bullish
// Option Strategy: Long Call
// Strike Price: US$XXX
// Expiry Date: DD-MMM-YYYY
// Current Price: US$XXX
// Buy/Sell: Buy
// Call/Put: Call
// Ask: US$X.XX
// Stop loss: US$X.XX
// Take profit: US$X.XX
// Probability of Profit: XX.X%
// Max Loss: US$XXX
// Max Gain: US$∞
// Break-even price: US$XXX
// Rationale: ...

// Do not use $XXX placeholders. Use real numbers. End with a helpful disclaimer.`;
// }

// export function getPriceChartPrompt(ticker: string): string {
//   return `You are TradeGPT. Provide a full price chart breakdown for ${ticker}, including:

// - Price Chart Overview
// - Valuation
// - Growth
// - Profitability
// - Momentum
// - Earnings Revisions
// - Competitors
// - Buy/Sell Reasons

// Be professional. Avoid templates or $XXX placeholders. Use real data.`;
// }

// export const getFundamentalAnalysisPrompt = (ticker: string) => `
// Provide a comprehensive analysis of the stock ${ticker}. Include details such as:
// - Business model and core operations
// - Revenue and earnings trends
// - Profit margins, ROE, ROA, and debt levels
// - Valuation multiples (PE, PS, PB)
// - Industry positioning and competitive edge
// - Management and insider activity
// - Risks and catalysts

// Present your analysis in a structured, concise manner for a long-term investor perspective.
// `;

// export function getRecentNewsPrompt(ticker: string): string {
//   return `You are TradeGPT. Show recent news articles for ${ticker}. For each include:

// - Title
// - Date
// - Source
// - Summary
// - Sentiment: Positive, Neutral, Negative

// End with overall sentiment summary and ask if user wants more info.`;
// }

// async function fetchForexRate(pair: string): Promise<string> {
//   const [from, to] = pair.split("/");
//   const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

//   const res = await fetch(
//     `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${from}&to_symbol=${to}&interval=1min&apikey=${apiKey}`
//   );
//   const data = await res.json();

//   const timeSeries = data["Time Series FX (1min)"];
//   const latestTimestamp = Object.keys(timeSeries || {})[0];

//   if (latestTimestamp) {
//     const rate = timeSeries[latestTimestamp];
//     return `
// Forex Rate (${from}/${to})
// Last Refreshed: ${latestTimestamp}
// Open: ${rate["1. open"]}
// High: ${rate["2. high"]}
// Low: ${rate["3. low"]}
// Close: ${rate["4. close"]}
// Source: Alpha Vantage
//     `;
//   }

//   return `No live forex data found for ${pair}`;
// }

// export { fetchForexRate, streamChatResponse };

// // ✅ Integration Example (used in the parent component that renders <TickerDetailPanel />)

// import { streamChatResponse } from "../services/chatApi";
// import {
//   getFundamentalAnalysisPrompt,
//   getPriceChartPrompt,
//   getRecentNewsPrompt,
//   getTradeIdeasPrompt,
// } from "../services/promptHelpers";

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

// export async function handleChatAction(action: string, symbolOrPair: string) {
//   let userPrompt = "";
//   let alphaData = "";
//   let systemPrompt = "";

//   const isForexPair = symbolOrPair.includes("/") && symbolOrPair.length === 7;

//   // ✅ STEP 1: Fetch real-time data first
//   try {
//     if (isForexPair) {
//        userPrompt = getForexTradeIdeasPrompt(symbolOrPair);
//        alphaData = await fetchForexRate(symbolOrPair);
// //       alphaData = await fetchForexRate(symbolOrPair);
// //     } else {
// //       alphaData = await fetchAlphaVantageData(symbolOrPair);
// //     }
// //   } catch (error) {
// //     console.error("AlphaVantage fetch error:", error);
// //   }

// //   // ✅ STEP 2: Build userPrompt
// //   if (isForexPair) {
// //     // 🟢 THIS IS WHERE YOU INSERT YOUR NEW LOGIC:
// //     userPrompt = `
// // You are TradeGPT, a professional forex strategist. Based on the latest FX data for ${symbolOrPair}, generate a structured forex pair breakdown.

// // Include:
// // - Summary (trend, policy differentials, risk sentiment)
// // - Technical Setup (current price, support/resistance, indicators)
// // - Trade Idea (direction, entry, stop loss, target, risk/reward)
// // - Risk Notes (what events/data can affect this setup)

// // Use real numbers from live data below. Do not include the raw data in the output. Present in a clean professional style.

// // Pair: ${symbolOrPair}
// //     `;
//   } else {
//     // 🟢 Stock-related actions
//     switch (action) {
//       case "Price Chart":
//         userPrompt = getPriceChartPrompt(symbolOrPair);
//         break;
//       case "Recent News":
//         userPrompt = getRecentNewsPrompt(symbolOrPair);
//         break;
//       case "Trade Ideas":
//         userPrompt = getTradeIdeasPrompt(symbolOrPair);
//         break;
//       case "Analysis":
//         userPrompt = getFundamentalAnalysisPrompt(symbolOrPair);
//         break;
//       default:
//         userPrompt = symbolOrPair; // Free text
//     }
//   }

//   // ✅ STEP 3: System Prompt
//   if (alphaData) {
//     systemPrompt = `
// You are TradeGPT, a professional market analyst and trading assistant.

// Use the following real-time data for your analysis of ${symbolOrPair}:

// --- BEGIN LIVE DATA ---
// ${alphaData}
// --- END LIVE DATA ---

// Summarize this data intelligently, and respond in the usual TradeGPT format with structured sections and real numbers. Do not mention the raw data dump — interpret it naturally.
// `;
//   } else {
//     systemPrompt = universalSystemPrompt;
//   }

//   // ✅ STEP 4: Stream response
//   streamChatResponse(userPrompt, symbolOrPair, systemPrompt);
// }

// async function fetchAlphaVantageData(ticker: string): Promise<string> {
//   const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

//   const quoteRes = await fetch(
//     `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`
//   );
//   const overviewRes = await fetch(
//     `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`
//   );

//   const quoteJson = await quoteRes.json();
//   const overviewJson = await overviewRes.json();

//   const quote = quoteJson["Global Quote"];
//   const ov = overviewJson;

//   return `
// Latest Stock Quote for ${ticker}:
// Price: $${quote["05. price"]}
// Change: ${quote["10. change percent"]}
// Open: $${quote["02. open"]}
// High: $${quote["03. high"]}
// Low: $${quote["04. low"]}
// Volume: ${quote["06. volume"]}
// Previous Close: $${quote["08. previous close"]}

// Company Overview:
// Name: ${ov.Name}
// Sector: ${ov.Sector}
// Market Cap: $${ov.MarketCapitalization}
// PE Ratio: ${ov.PERatio}
// EPS: ${ov.EPS}
// ROE: ${ov.ReturnOnEquityTTM}%
// Debt/Equity: ${ov.DebtEquityRatio}
// Dividend Yield: ${ov.DividendYield}
// Beta: ${ov.Beta}
// `;
// }

// export function getForexTradeIdeasPrompt(pair: string): string {
//   const normalizedPair = pair
//     .toUpperCase()
//     .replace(/\s/g, "")
//     .replace("USDEURO", "USD/EUR")
//     .replace("USD/EURO", "USD/EUR")
//     .replace("EUROUSD", "EUR/USD")
//     .replace("US DOLLAR", "USD")
//     .replace("EURO", "EUR");

//   return `
// You are TradeGPT, a professional forex strategist.

// Using the latest forex data for ${normalizedPair}, generate a clean, professional forex trade idea breakdown in the following format:

// 📊 Forex Trade Ideas – ${normalizedPair}
// As of: [today's date] | Live Rate: (auto from API)

// 🔹 Summary
// - Trend: (brief trend description)
// - Policy Divergence: (central bank divergence details)
// - Macro Drivers: (CPI, PMI, geopolitical headlines)

// 📉 Technical Setup
// - Current Rate (${normalizedPair})
// - Resistance: (key technical level)
// - Support: (key technical level)
// - Indicators: RSI, MACD, 200-MA, etc.

// 💡 Trade Ideas
// 📌 Setup #1: Directional Play
// - Entry:
// - Target:
// - Stop Loss:
// - Rationale:

// 📌 Setup #2: Options Strategy (if liquid)
// - Strategy:
// - Strike:
// - Expiry:
// - Risk:
// - Edge:

// ⚠️ Risk Notes
// - US/Europe Data risk
// - Central bank surprises
// - Geo headlines

// ✅ End by asking: “Would you like trade ideas for another pair like GBP/USD or USD/JPY next?”

// Do not reference raw API text. Infer insights and present cleanly.`;
// }
// }

export function getTradeIdeasPrompt(ticker: string): string {
  return `You are TradeGPT, an advanced trading assistant. Provide multiple trade ideas for ${ticker} using real options data if available.

Format:
Trade Idea 1: Long Call
[Stock Symbol: ${ticker}]
Signal: Bullish
Option Strategy: Long Call
Strike Price: US$XXX
Expiry Date: DD-MMM-YYYY
Current Price: US$XXX
Buy/Sell: Buy
Call/Put: Call
Ask: US$X.XX
Stop loss: US$X.XX
Take profit: US$X.XX
Probability of Profit: XX.X%
Max Loss: US$XXX
Max Gain: US$∞
Break-even price: US$XXX
Rationale: ...

Do not use $XXX placeholders. Use real numbers. End with a helpful disclaimer.`;
}

export function getPriceChartPrompt(ticker: string): string {
  return `You are TradeGPT. Provide a full price chart breakdown for ${ticker}, including:

- Price Chart Overview
- Valuation
- Growth
- Profitability
- Momentum
- Earnings Revisions
- Competitors
- Buy/Sell Reasons

Be professional. Avoid templates or $XXX placeholders. Use real data.`;
}

export const getFundamentalAnalysisPrompt = (ticker: string) => `
Provide a comprehensive analysis of the stock ${ticker}. Include details such as:
- Business model and core operations
- Revenue and earnings trends
- Profit margins, ROE, ROA, and debt levels
- Valuation multiples (PE, PS, PB)
- Industry positioning and competitive edge
- Management and insider activity
- Risks and catalysts

Present your analysis in a structured, concise manner for a long-term investor perspective.
`;

export function getRecentNewsPrompt(ticker: string): string {
  return `You are TradeGPT. Show recent news articles for ${ticker}. For each include:

- Title
- Date
- Source
- Summary
- Sentiment: Positive, Neutral, Negative

End with overall sentiment summary and ask if user wants more info.`;
}

async function fetchForexRate(pair: string): Promise<string> {
  const [from, to] = pair.split("/");
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

  const res = await fetch(
    `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${from}&to_symbol=${to}&interval=1min&apikey=${apiKey}`
  );
  const data = await res.json();

  const timeSeries = data["Time Series FX (1min)"];
  const latestTimestamp = Object.keys(timeSeries || {})[0];

  if (latestTimestamp) {
    const rate = timeSeries[latestTimestamp];
    return `
Forex Rate (${from}/${to})
Last Refreshed: ${latestTimestamp}
Open: ${rate["1. open"]}
High: ${rate["2. high"]}
Low: ${rate["3. low"]}
Close: ${rate["4. close"]}
Source: Alpha Vantage
    `;
  }

  return `No live forex data found for ${pair}`;
}

export { fetchForexRate, streamChatResponse };

import { streamChatResponse } from "../services/chatApi";
import {
  getForexTradeIdeasPrompt,
  getFundamentalAnalysisPrompt,
  getPriceChartPrompt,
  getRecentNewsPrompt,
  getTradeIdeasPrompt,
} from "../services/promptHelpers";

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

export const universalSystemPrompt = `
You are TradeGPT — a professional but friendly trading assistant and market analyst.

You can handle a wide range of user queries, including:

📌 FOREX & MARKET STRUCTURE PROMPTS:
• “Identify 3 forex pairs showing early signs of a reversal. Support it with data.”
• “Give me 5 forex pairs that broke above/below their previous daily high/low.”
• “Give me an intraday trade idea for EUR/USD or any other pair.”
• “Analyse XAU/USD on daily and 4H timeframes. Identify key support/resistance levels.”

📈 STOCK ANALYSIS PROMPTS:
• “Break down the price chart of AAPL/NVDA/TSLA” (respond with valuation, trend, growth, momentum, etc.)
• “Give me option trade ideas with weekly expirations for AMZN/NFLX/GOOGL” — include strike, expiry, break-even, risk/reward, PoP.
• “Give me a fundamental analysis of MSFT/GOOGL…” — include business model, margins, ROE, debt, industry position.
• “Show recent news for META or TSLA” — include title, summary, date, sentiment, and an overall view.

🌍 MACRO / SENTIMENT PROMPTS:
• “Any economic news today that could impact markets?”
• “What events are coming up that traders should watch?”
• “How are markets reacting to CPI/FOMC decisions this week?”

💬 BEHAVIOR RULES:
• Always use **real-time Alpha Vantage data** (price, volume, valuation, fundamentals, etc.)
• Use **structured formatting**:
   - Summary / Technical Setup / Trade Plan / Risk Note
   - Support, resistance, indicators (RSI, MACD, MA), sentiment
   - Don’t include placeholders like $XXX or “insert here”
• Never mention API or raw JSON — interpret it naturally
• For forex pairs, always show the live rate from FX API
• Always show breakout zones, S/R levels, and rationale

🧠 TONE:
Professional but friendly. Clear and confident. Make it digestible for all trader levels (from beginner to pro). Use bullet points and clean formatting.

💬 CLOSING:
Always end with:
“If you have any more questions or want deeper insights, feel free to ask — or contact a Valour Wealth analyst for personal guidance.”
`;

export async function handleChatAction(action: string, symbolOrPair: string) {
  let userPrompt = "";
  let alphaData = "";
  let systemPrompt = "";

  const isForexPair = symbolOrPair.includes("/") && symbolOrPair.length === 7;

  try {
    if (isForexPair) {
      const rawData = await fetchForexRate(symbolOrPair);
      const match = rawData.match(/Close:\s*([\d.]+)/);
      const closeRate = match ? match[1] : "Unavailable";

      userPrompt = getForexTradeIdeasPrompt(symbolOrPair, closeRate);
      alphaData = rawData;
    } else {
      alphaData = await fetchAlphaVantageData(symbolOrPair);
    }
  } catch (error) {
    console.error("AlphaVantage fetch error:", error);
  }

  if (!isForexPair) {
    switch (action) {
      case "Price Chart":
        userPrompt = getPriceChartPrompt(symbolOrPair);
        break;
      case "Recent News":
        userPrompt = getRecentNewsPrompt(symbolOrPair);
        break;
      case "Trade Ideas":
        userPrompt = getTradeIdeasPrompt(symbolOrPair);
        break;
      case "Analysis":
        userPrompt = getFundamentalAnalysisPrompt(symbolOrPair);
        break;
      default:
        userPrompt = symbolOrPair;
    }
  }

  if (alphaData) {
    systemPrompt = `
You are TradeGPT, a professional market analyst and trading assistant.

Use the following real-time data for your analysis of ${symbolOrPair}:

--- BEGIN LIVE DATA ---
${alphaData}
--- END LIVE DATA ---

Summarize this data intelligently, and respond in the usual TradeGPT format with structured sections and real numbers. Do not mention the raw data dump — interpret it naturally.
`;
  } else {
    systemPrompt = universalSystemPrompt;
  }

  streamChatResponse(userPrompt, symbolOrPair, systemPrompt);
}

async function fetchAlphaVantageData(ticker: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

  const quoteRes = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`
  );
  const overviewRes = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`
  );

  const quoteJson = await quoteRes.json();
  const overviewJson = await overviewRes.json();

  const quote = quoteJson["Global Quote"];
  const ov = overviewJson;

  return `
Latest Stock Quote for ${ticker}:
Price: $${quote["05. price"]}
Change: ${quote["10. change percent"]}
Open: $${quote["02. open"]}
High: $${quote["03. high"]}
Low: $${quote["04. low"]}
Volume: ${quote["06. volume"]}
Previous Close: $${quote["08. previous close"]}

Company Overview:
Name: ${ov.Name}
Sector: ${ov.Sector}
Market Cap: $${ov.MarketCapitalization}
PE Ratio: ${ov.PERatio}
EPS: ${ov.EPS}
ROE: ${ov.ReturnOnEquityTTM}%
Debt/Equity: ${ov.DebtEquityRatio}
Dividend Yield: ${ov.DividendYield}
Beta: ${ov.Beta}
`;
}

export function getForexTradeIdeasPrompt(
  pair: string,
  liveRate: string
): string {
  const normalizedPair = pair
    .toUpperCase()
    .replace(/\s/g, "")
    .replace("USDEURO", "USD/EUR")
    .replace("USD/EURO", "USD/EUR")
    .replace("EUROUSD", "EUR/USD")
    .replace("US DOLLAR", "USD")
    .replace("EURO", "EUR");

  return `
You are TradeGPT, a professional forex strategist.

Using the latest forex data for ${normalizedPair}, generate a clean, professional forex trade idea breakdown in the following format:

📊 Forex Trade Ideas – ${normalizedPair}
// As of: [today's date] | Live Rate: (auto from API)
As of: ${new Date().toLocaleDateString()} | Live Rate: ${liveRate}


🔹 Summary
- Trend: (brief trend description)
- Policy Divergence: (central bank divergence details)
- Macro Drivers: (CPI, PMI, geopolitical headlines)

📉 Technical Setup
- Current Rate (${normalizedPair})
- Resistance: (key technical level)
- Support: (key technical level)
- Indicators: RSI, MACD, 200-MA, etc.

💡 Trade Ideas
📌 Setup #1: Directional Play
- Entry:
- Target:
- Stop Loss:
- Rationale:

📌 Setup #2: Options Strategy (if liquid)
- Strategy:
- Strike:
- Expiry:
- Risk:
- Edge:

⚠️ Risk Notes
- US/Europe Data risk
- Central bank surprises
- Geo headlines

✅ End by asking: “Would you like trade ideas for another pair like GBP/USD or USD/JPY next?”

Do not reference raw API text. Infer insights and present cleanly.`;
}
