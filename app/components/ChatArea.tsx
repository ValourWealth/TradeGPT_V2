"use client"

import { Loader2, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import chatData from "../../mock/chat.json"
import { fetchAlphaVantageData, streamChatResponse } from "../services/chatApi"
import { universalSystemPrompt } from "../services/promptHelpers"
import ChatMessage from "./ChatMessage"
import PromptSuggestions from "./PromptSuggestions"
import RecommendedPromptsModal from "./RecommendedPromptsModal"
import TradingTrainingModal from "./TradingTrainingModal"; // make sure it's imported


interface ChatAreaProps {
  currentSession: string | null
  pendingAction?: { action: string; ticker: string } | null
  onActionProcessed?: () => void
  onSessionUpdate?: (sessionId: string, messages: any[]) => void
}

export default function ChatArea({ currentSession, pendingAction, onActionProcessed, onSessionUpdate }: ChatAreaProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const [currentStreamingId, setCurrentStreamingId] = useState<string | null>(null)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [showRecommendedPrompts, setShowRecommendedPrompts] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [showTrainingModal, setShowTrainingModal] = useState(false);

  const STOCK_TICKERS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "QQQ", "SPY", "NFLX", "BA", "XOM"
];

function extractTickers(text: string): string[] {
  const words = text.toUpperCase().match(/\b[A-Z]{2,5}\b/g) || [];
  return words.filter((w) => STOCK_TICKERS.includes(w));
}


  // useEffect(() => {
  //   if (currentSession === "new" || currentSession === null) {
  //     // Clear messages for new chat
  //     setMessages([])
  //     setActiveSessionId(null)
  //   } else if (currentSession && currentSession !== activeSessionId) {
  //     // Load different session if it's actually different
  //     const session = chatData.sessions.find((s) => s.id === currentSession)
  //     if (session) {
  //       setMessages(session.messages)
  //       setActiveSessionId(currentSession)
  //     }
  //   }
  // }, [currentSession])

  useEffect(() => {
  const fetchSessionMessages = async () => {
    if (currentSession && currentSession !== "new") {
      try {
        const res = await fetch(`https://tradegptv2backend-production.up.railway.app/api/sessions/${currentSession}/messages/`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

        const data = await res.json();

        // DEBUG LOG: check for any Promises
        for (const msg of data) {
          if (msg.content instanceof Promise) {
            console.error("❌ Message content is a Promise!", msg);
          }
        }

        setMessages(data);
        setActiveSessionId(currentSession);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    } else {
      setMessages([]);
      setActiveSessionId(null);
    }
  };

  fetchSessionMessages();
}, [currentSession]);



  useEffect(() => {
    if (pendingAction) {
      const actionMessage = `Show me ${pendingAction.action.toLowerCase()} for ${pendingAction.ticker}`
      handleSendMessage(actionMessage, pendingAction.ticker)
      onActionProcessed?.()
    }
  }, [pendingAction])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingMessage])

  // Listen for recommended prompts modal trigger
  useEffect(() => {
    const handleShowRecommendedPrompts = () => {
      setShowRecommendedPrompts(true)
    }

    window.addEventListener("showRecommendedPrompts", handleShowRecommendedPrompts)
    
    return () => {
      window.removeEventListener("showRecommendedPrompts", handleShowRecommendedPrompts)
    }
  }, [])

  useEffect(() => {
  const handleShowTrainingModal = () => {
    setShowTrainingModal(true);
  };

  window.addEventListener("showTrainingModal", handleShowTrainingModal);

  return () => {
    window.removeEventListener("showTrainingModal", handleShowTrainingModal);
  };
}, []);


  // Save messages to existing session when they change
  useEffect(() => {
    if (messages.length > 0 && activeSessionId) {
      const sessionIndex = chatData.sessions.findIndex(s => s.id === activeSessionId)
      if (sessionIndex !== -1) {
        chatData.sessions[sessionIndex].messages = messages
      }
    }
  }, [messages, activeSessionId])

  

//   const handleSendMessage = async (content: string, ticker?: string) => {
//   if (!content.trim()) return;

//   // Cancel ongoing stream if any
//   if (abortControllerRef.current) {
//     abortControllerRef.current.abort();
//   }

//   const detectedTickers = extractTickers(content);
// let alphaData = "";

// if (detectedTickers.length > 0) {
//   const results = await Promise.all(
//     detectedTickers.map(async (symbol) => {
//       const result = await fetchAlphaVantageData(symbol);
//       return `--- ${symbol} ---\n${result}`;
//     })
//   );
//   alphaData = results.join("\n\n");
// }

// const systemPrompt = `
// ${universalSystemPrompt}

// ${detectedTickers.length > 0 ? `
// --- BEGIN LIVE DATA ---
// ${alphaData}
// --- END LIVE DATA ---
// ` : ""}
// `;

// //   // Detect tickers from message
// //   const detectedTickers = extractTickers(content);
// //   let alphaData = "";

// //   if (detectedTickers.length > 0) {
// //     const results = await Promise.all(
// //       detectedTickers.map(async (symbol) => {
// //         const result = await fetchAlphaVantageData(symbol);
// //         return `--- ${symbol} ---\n${result}`;
// //       })
// //     );
// //     alphaData = results.join("\n\n");
// //   }

// //   const systemPrompt = `
// // You are TradeGPT, a professional market analyst.
// // Use the following real-time stock data to respond insightfully.

// // --- BEGIN REAL-TIME DATA ---
// // ${alphaData}
// // --- END DATA ---
// // `;

//   // Create user message
//   // const userMessage = {
//   //   id: `msg-${Date.now()}`,
//   //   type: "user",
//   //   content,
//   //   timestamp: new Date().toISOString(),
//   // };
//   if (!activeSessionId || currentSession === "new") {
//   const newSessionId = `session-${Date.now()}`
//   const sessionTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "")

//   const newSession = {
//     id: newSessionId,
//     title: sessionTitle,
//     timestamp: new Date().toISOString(),
//     messages: [],
//   }

//   chatData.sessions.unshift(newSession)
//   setActiveSessionId(newSessionId)
//   onSessionUpdate?.(newSessionId, [])
// }


// const userMessage = {
//   id: `msg-${Date.now()}`,
//   type: "user",
//   content,
//   timestamp: new Date().toISOString(),
// };


//   setMessages((prev) => [...prev, userMessage]);
//   setInputValue("");
//   setIsTyping(true);
//   setStreamingMessage("");

//   const aiMessageId = `msg-${Date.now()}-ai`;
//   setCurrentStreamingId(aiMessageId);
//   const aiMessage = {
//     id: aiMessageId,
//     type: "ai",
//     content: "",
//     timestamp: new Date().toISOString(),
//     completed: false,
//     hasNews: detectedTickers.length > 0,
//     isStreaming: true,
//   };
//   setMessages((prev) => [...prev, aiMessage]);

//   try {
//     abortControllerRef.current = new AbortController();
//     let fullResponse = "";

//     for await (const chunk of streamChatResponse(content, detectedTickers[0], systemPrompt)){

//     // for await (const chunk of streamChatResponse(systemPrompt, detectedTickers[0])) {
//       if (abortControllerRef.current?.signal.aborted) break;

//       fullResponse += chunk;
//       setStreamingMessage(fullResponse);
//       setMessages((prev) =>
//         prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg))
//       );
//     }

//     setMessages((prev) =>
//       prev.map((msg) =>
//         msg.id === aiMessageId
//           ? {
//               ...msg,
//               content: fullResponse,
//               completed: true,
//               isStreaming: false,
//               analysis: generateAnalysisFromResponse(fullResponse, content),
//             }
//           : msg
//       )
//     );
//   } catch (err) {
//     setMessages((prev) =>
//       prev.map((msg) =>
//         msg.id === aiMessageId
//           ? {
//               ...msg,
//               content: "Sorry, I couldn't complete that request right now.",
//               completed: true,
//               isStreaming: false,
//             }
//           : msg
//       )
//     );
//   } finally {
//     setIsTyping(false);
//     setStreamingMessage("");
//     setCurrentStreamingId(null);
//     abortControllerRef.current = null;
//   }
// };

const handleSendMessage = async (content: string, ticker?: string) => {
  if (!content.trim()) return;

  // Cancel ongoing stream if any
  if (abortControllerRef.current) {
    abortControllerRef.current.abort();
  }

  const detectedTickers = extractTickers(content);
  let alphaData = "";

  if (detectedTickers.length > 0) {
    const results = await Promise.all(
      detectedTickers.map(async (symbol) => {
        const result = await fetchAlphaVantageData(symbol);
        return `--- ${symbol} ---\n${result}`;
      })
    );
    alphaData = results.join("\n\n");
  }

  const systemPrompt = `
${universalSystemPrompt}
${detectedTickers.length > 0 ? `
--- BEGIN LIVE DATA ---
${alphaData}
--- END LIVE DATA ---
` : ""}
  `;

  // // Create new session if needed
  // if (!activeSessionId || currentSession === "new") {
  //   try {
  //     const sessionTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "");
  //     const res = await fetch('https://tradegptv2backend-production.up.railway.app/api/sessions/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json',
  //          Authorization: `Bearer ${localStorage.getItem("access")}`,
  //        },
        
  //       body: JSON.stringify({ title: sessionTitle }),
  //     });
  //     const data = await res.json();
  //     const newSessionId = data.id;
  //     setActiveSessionId(newSessionId);
  //     onSessionUpdate?.(newSessionId, []);
  //   } catch (err) {
  //     console.error("Session creation failed", err);
  //     return;
  //   }
  // }

  let sessionId = activeSessionId;

  
if (!sessionId || currentSession === "new") {
  try {
    const sessionTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "");
    const res = await fetch('https://tradegptv2backend-production.up.railway.app/api/sessions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ title: sessionTitle }),
    });
    const data = await res.json();
    sessionId = data.id;
    // setActiveSessionId(sessionId);
    // onSessionUpdate?.(sessionId, []);
    if (sessionId) {
  setActiveSessionId(sessionId);
  onSessionUpdate?.(sessionId, []);
}

  } catch (err) {
    console.error("Session creation failed", err);
    return;
  }
}

  const userMessage = {
    id: `msg-${Date.now()}`,
    type: "user",
    content,
    timestamp: new Date().toISOString(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);
  setStreamingMessage("");

if (sessionId) {
  await fetch(`https://tradegptv2backend-production.up.railway.app/api/sessions/${sessionId}/messages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({
      sender: "user",
      content: content,
    }),
  });
}


  // ✅ Save user message to backend
  // if (activeSessionId) {
  //   try {
  //     await fetch(`https://tradegptv2backend-production.up.railway.app/api/sessions/${activeSessionId}/messages/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" ,
  //          Authorization: `Bearer ${localStorage.getItem("access")}`,
  //       },
  //       body: JSON.stringify({
  //         role: "user",
  //    content: content, // ✅ MUST BE `message`
  // })
  //     });
  //   } catch (err) {
  //     console.error("Failed to save user message:", err);
  //   }
  // }

  const aiMessageId = `msg-${Date.now()}-ai`;
  setCurrentStreamingId(aiMessageId);
  const aiMessage = {
    id: aiMessageId,
    type: "ai",
    content: "",
    timestamp: new Date().toISOString(),
    completed: false,
    hasNews: detectedTickers.length > 0,
    isStreaming: true,
  };
  setMessages((prev) => [...prev, aiMessage]);

  try {
    abortControllerRef.current = new AbortController();
    let fullResponse = "";

    for await (const chunk of streamChatResponse(content, detectedTickers[0], systemPrompt)) {
      if (abortControllerRef.current?.signal.aborted) break;

      fullResponse += chunk;
      setStreamingMessage(fullResponse);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg))
      );
    }

    // ✅ Save final AI response to backend
    if (sessionId) {
      try {
        await fetch(`https://tradegptv2backend-production.up.railway.app/api/sessions/${sessionId}/messages/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" ,
             Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({
            sender: "assistant",
            content: fullResponse,
          }),
        });
      } catch (err) {
        console.error("Failed to save AI message:", err);
      }
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId
          ? {
              ...msg,
              content: fullResponse,
              completed: true,
              isStreaming: false,
              analysis: generateAnalysisFromResponse(fullResponse, content),
            }
          : msg
      )
    );
  } catch (err) {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId
          ? {
              ...msg,
              content: "Sorry, I couldn't complete that request right now.",
              completed: true,
              isStreaming: false,
            }
          : msg
      )
    );
  } finally {
    setIsTyping(false);
    setStreamingMessage("");
    setCurrentStreamingId(null);
    abortControllerRef.current = null;
  }
};



  const containsStockSymbol = (text: string) => {
    const stockSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "QQQ", "SPY"]
    return stockSymbols.some((symbol) => text.toUpperCase().includes(symbol))
  }

  const generateAnalysisFromResponse = (response: string, prompt: string) => {
    const ticker = prompt.match(/\b(AAPL|MSFT|GOOGL|AMZN|TSLA|META|NVDA|QQQ|SPY|[A-Z]{2,5})\b/i)?.[0] || "Market"

    return {
      summary: `Analysis for ${ticker} based on current market conditions`,
      // technicalAnalysis: "Comprehensive analysis provided above",
      // entryLevel: "See detailed analysis",
      // exitLevel: "Refer to analysis above",
      // stopLoss: "Risk management included",
    }
  }

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const handleRecommendedPromptSelect = (prompt: string) => {
    // Close modal and send message
    setShowRecommendedPrompts(false)
    handleSendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-700">
        {messages.length === 0 ? (
          <div className="text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-20  rounded-full flex items-center justify-center mx-auto mb-4">
               <img 
                src="/transparent-logo.png"
                  alt="TradeGPT Logo" 
                  className="w-20 h-15"
                />
            </div>
            <h1 className="text-xl lg:text-2xl font-semibold mb-2">How can I help you today?</h1>
            <p className="text-gray-400 text-sm mb-6">
              Message TradeGPT for free - Get real-time market insights and analysis
            </p>
            <div className="hidden lg:block">
              <PromptSuggestions onPromptClick={handlePromptClick} />
            </div>
          </div>
        ) : null}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && !currentStreamingId && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-gray-400">Analyzing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 lg:p-6 border-t border-gray-700">
        <div className="bg-gray-800 rounded-lg border border-gray-600 focus-within:border-blue-500">
          <div className="flex items-center p-3 lg:p-4 bg-[#2e2e2e]">
            <input
              type="text"
              placeholder="Message TradeGPT for free..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isTyping && handleSendMessage(inputValue)}
              disabled={isTyping}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 disabled:opacity-50 text-sm lg:text-base"
            />
            <div className="flex items-center gap-2 ml-2 lg:ml-4">

              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg"
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Prompts Modal - Centered in chat area */}
      <RecommendedPromptsModal
        isOpen={showRecommendedPrompts}
        onClose={() => setShowRecommendedPrompts(false)}
        onPromptSelect={handleRecommendedPromptSelect}
      />

      <TradingTrainingModal
  isOpen={showTrainingModal}
  onClose={() => setShowTrainingModal(false)}
  onStartTraining={(trainingType) => {
    const trainingPrompts = {
      basics: "I want to learn trading basics. Can you teach me fundamental trading concepts and market analysis?",
      technical: "Teach me technical analysis including chart patterns, indicators, and trading signals.",
      options: "I want to learn advanced options trading strategies and risk management techniques.",
      ai: "Show me how to interpret and act on AI-generated trading signals."
    };

    const prompt = trainingPrompts[trainingType as keyof typeof trainingPrompts] || 
     "I want to start learning about trading. Can you help me get started?";
    setShowTrainingModal(false);
    handleSendMessage(prompt);
  }}
/>
    </div>
  )
}