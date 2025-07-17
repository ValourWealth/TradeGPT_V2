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
//     `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`
//   );
//   const data = await res.json();
//   const fx = data["Realtime Currency Exchange Rate"];

//   if (fx) {
//     return `
// Forex Rate (${from}/${to})
// Exchange Rate: ${fx["5. Exchange Rate"]}
// Bid: ${fx["8. Bid Price"]}
// Ask: ${fx["9. Ask Price"]}
// Last Refreshed: ${fx["6. Last Refreshed"]}
// Source: Alpha Vantage
// `;
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

// export async function handleChatAction(action: string, ticker: string) {
//   let userPrompt = "";
//   let alphaData = "";

//   switch (action) {
//     case "Price Chart":
//       userPrompt = getPriceChartPrompt(ticker);
//       break;
//     case "Recent News":
//       userPrompt = getRecentNewsPrompt(ticker);
//       break;
//     case "Trade Ideas":
//       userPrompt = getTradeIdeasPrompt(ticker);
//       break;
//     case "Analysis":
//       userPrompt = getFundamentalAnalysisPrompt(ticker);
//       break;
//     default:
//       // userPrompt = `Give me information on ${ticker}`;
//       userPrompt = universalSystemPrompt;
//   }

//   // 🔥 Fetch Alpha Vantage live data
//   alphaData = await fetchAlphaVantageData(ticker); // already made in chatApi.ts

//   // ✅ Clean system prompt without Alpha Vantage
//   //   const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
//   // Be structured and insightful. Focus on ${ticker}.`;
//   // const systemPrompt = universalSystemPrompt;

//   //   // 🧠 Combine it into system prompt
//   const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
//   Use the following real-time data for your analysis of ${ticker}:

//   --- BEGIN LIVE DATA ---
//   ${alphaData}
//   --- END LIVE DATA ---

//   // Be structured and insightful.`;

//   // ✅ Send it to DeepSeek API with real data
//   streamChatResponse(userPrompt, ticker, systemPrompt);
// }

// ----------

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

// ✅ Integration Example (used in the parent component that renders <TickerDetailPanel />)

import { streamChatResponse } from "../services/chatApi";
import {
  getFundamentalAnalysisPrompt,
  getPriceChartPrompt,
  getRecentNewsPrompt,
  getTradeIdeasPrompt,
} from "../services/promptHelpers";

export const universalSystemPrompt = `
You are TradeGPT — a professional but friendly trading assistant and market analyst.

You can handle a wide range of user queries, including:

- General conversation (e.g. greetings, asking for help)
- Stock or crypto analysis (fundamentals, technicals, options)
- Trading strategy suggestions
- Explaining financial concepts in simple terms
- Responding with context based on recent market trends

When the user provides a stock ticker or asks for analysis:
- Be accurate and structured
- Use sections like Summary, Technical Analysis, Trade Plan, Risk Note
- Avoid placeholders (like $XXX) — use real examples if data is available
- Format clearly with bullet points or headlines when needed

When the user asks a casual or non-ticker question:
- Respond informally and helpfully
- Keep it short and conversational, but informative

Tone: Professional but approachable. Keep the conversation intelligent, clear, and user-friendly.

Always end with a helpful follow-up if appropriate (e.g., “Would you like an options breakdown too?” or “Let me know which ticker you’d like to explore.”)
`;

// export async function handleChatAction(action: string, symbolOrPair: string) {
//   let userPrompt = "";
//   let alphaData = "";
//   let systemPrompt = "";

//   // Step 1: Handle structured actions
//   switch (action) {
//     case "Price Chart":
//       userPrompt = getPriceChartPrompt(symbolOrPair);
//       break;
//     case "Recent News":
//       userPrompt = getRecentNewsPrompt(symbolOrPair);
//       break;
//     case "Trade Ideas":
//       userPrompt = getTradeIdeasPrompt(symbolOrPair);
//       break;
//     case "Analysis":
//       userPrompt = getFundamentalAnalysisPrompt(symbolOrPair);
//       break;
//     default:
//       userPrompt = symbolOrPair; // Assume it's a free-text message
//   }

//   // Step 2: Decide if it's a ticker or forex pair
//   const isForexPair = symbolOrPair.includes("/") && symbolOrPair.length === 7;

//   if (isForexPair) {
//     alphaData = await fetchForexRate(symbolOrPair); // USD/EUR etc.
//   } else if (
//     ["Price Chart", "Recent News", "Trade Ideas", "Analysis"].includes(action)
//   ) {
//     alphaData = await fetchAlphaVantageData(symbolOrPair); // stock
//   }

//   // Step 3: Build system prompt
//   if (alphaData) {
//     systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
// Use the following real-time data for your analysis of ${symbolOrPair}:

// --- BEGIN LIVE DATA ---
// ${alphaData}
// --- END LIVE DATA ---

// Be structured and insightful.`;
//   } else {
//     systemPrompt = universalSystemPrompt;
//   }

//   // Step 4: Stream chat
//   streamChatResponse(userPrompt, symbolOrPair, systemPrompt);
// }

export async function handleChatAction(action: string, symbolOrPair: string) {
  let userPrompt = "";
  let alphaData = "";
  let systemPrompt = "";

  const isForexPair = symbolOrPair.includes("/") && symbolOrPair.length === 7;

  // ✅ STEP 1: Fetch real-time data first
  try {
    if (isForexPair) {
      alphaData = await fetchForexRate(symbolOrPair);
    } else {
      alphaData = await fetchAlphaVantageData(symbolOrPair);
    }
  } catch (error) {
    console.error("AlphaVantage fetch error:", error);
  }

  // ✅ STEP 2: Build userPrompt
  if (isForexPair) {
    // 🟢 THIS IS WHERE YOU INSERT YOUR NEW LOGIC:
    userPrompt = `
You are TradeGPT, a professional forex strategist. Based on the latest FX data for ${symbolOrPair}, generate a structured forex pair breakdown.

Include:
- Summary (trend, policy differentials, risk sentiment)
- Technical Setup (current price, support/resistance, indicators)
- Trade Idea (direction, entry, stop loss, target, risk/reward)
- Risk Notes (what events/data can affect this setup)

Use real numbers from live data below. Do not include the raw data in the output. Present in a clean professional style.

Pair: ${symbolOrPair}
    `;
  } else {
    // 🟢 Stock-related actions
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
        userPrompt = symbolOrPair; // Free text
    }
  }

  // ✅ STEP 3: System Prompt
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

  // ✅ STEP 4: Stream response
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
