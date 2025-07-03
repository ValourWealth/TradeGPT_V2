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

export async function handleChatAction(action: string, ticker: string) {
  let userPrompt = "";
  let alphaData = "";

  switch (action) {
    case "Price Chart":
      userPrompt = getPriceChartPrompt(ticker);
      break;
    case "Recent News":
      userPrompt = getRecentNewsPrompt(ticker);
      break;
    case "Trade Ideas":
      userPrompt = getTradeIdeasPrompt(ticker);
      break;
    case "Analysis":
      userPrompt = getFundamentalAnalysisPrompt(ticker);
      break;
    default:
      // userPrompt = `Give me information on ${ticker}`;
      userPrompt = universalSystemPrompt;
  }

  // 🔥 Fetch Alpha Vantage live data
  alphaData = await fetchAlphaVantageData(ticker); // already made in chatApi.ts

  // ✅ Clean system prompt without Alpha Vantage
  //   const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
  // Be structured and insightful. Focus on ${ticker}.`;
  // const systemPrompt = universalSystemPrompt;

  //   // 🧠 Combine it into system prompt
  const systemPrompt = `You are TradeGPT, a professional market analyst and trading assistant.
  Use the following real-time data for your analysis of ${ticker}:

  --- BEGIN LIVE DATA ---
  ${alphaData}
  --- END LIVE DATA ---

  // Be structured and insightful.`;

  // ✅ Send it to DeepSeek API with real data
  streamChatResponse(userPrompt, ticker, systemPrompt);
}
