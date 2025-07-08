"use client"
import { BarChart3, Check, Edit3, ExternalLink, GraduationCap, Lightbulb, MoreHorizontal, Search, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import chatData from "../../mock/chat.json";
import axios from "axios";

import TradingTrainingModal from "./TradingTrainingModal";
import UserProfileCard from "./UserProfileCard";

interface SidebarLeftProps {
  currentSession: string | null
  onSessionSelect: (sessionId: string) => void
  onPromptSelect: (prompt: string) => void
  onClose?: () => void
  onIntroNavigation?: () => void // Add this prop
}

export default function SidebarLeft({
  currentSession, 
  onSessionSelect, 
  onPromptSelect, 
  onClose,
  onIntroNavigation // Add this prop
}: SidebarLeftProps) {
  const router = useRouter(); 
  const [searchQuery, setSearchQuery] = useState("")
  const [showTrainingModal, setShowTrainingModal] = useState(false)
  const [hoveredSession, setHoveredSession] = useState<string | null>(null)
  const [showOptions, setShowOptions] = useState<string | null>(null)
  const [editingSession, setEditingSession] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [sessions, setSessions] = useState<any[]>([]);

const baseUrl = "https://tradegptv2backend-production.up.railway.app";
const fetchSessions = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/sessions/`, {
      withCredentials: true,
    });
    setSessions(res.data);
  } catch (error) {
    console.error("Failed to fetch sessions", error);
  }
};
useEffect(() => {
  fetchSessions();
}, []);


const previous7Days = sessions.filter((session) => {
  const sessionDate = new Date(session.timestamp)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - sessionDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
})

const previous30Days = sessions.filter((session) => {
  const sessionDate = new Date(session.timestamp)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - sessionDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 7 && diffDays <= 30
})

  // const previous7Days = chatData.sessions.filter((session) => {
  //   const sessionDate = new Date(session.timestamp)
  //   const now = new Date()
  //   const diffTime = Math.abs(now.getTime() - sessionDate.getTime())
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  //   return diffDays <= 7
  // })

  // const previous30Days = chatData.sessions.filter((session) => {
  //   const sessionDate = new Date(session.timestamp)
  //   const now = new Date()
  //   const diffTime = Math.abs(now.getTime() - sessionDate.getTime())
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  //   return diffDays > 7 && diffDays <= 30
  // })

  const handleSessionSelect = (sessionId: string) => {
    onSessionSelect(sessionId)
    onClose?.() // Close sidebar on mobile
  }

  const handleShowRecommendedPrompts = () => {
    // Trigger modal to show in chat area
    const event = new CustomEvent("showRecommendedPrompts")
    window.dispatchEvent(event)
    onClose?.() // Close sidebar on mobile
  }

  const handleIntroClick = () => {
    router.push("/intro"); 
    onClose?.(); 
  };

  const handleTrainingClick = () => {
    // ⬇ Send a global event to ChatArea to open modal
    window.dispatchEvent(new CustomEvent("showTrainingModal"));
  };

  // New function to handle new chat creation
  // const handleNewChatClick = () => {
  //   console.log("New chat icon clicked!");
  //   handleSessionSelect("new");
  // };
  const handleNewChatClick = async () => {
  try {
    const res = await axios.post(`${baseUrl}/api/sessions/`, {}, {
      withCredentials: true,
    });
    const newSession = res.data;
    setSessions([newSession, ...sessions]);
    onSessionSelect(newSession.id);
  } catch (error) {
    console.error("Failed to create new chat", error);
  }
};


  // Handle delete session
  // const handleDeleteSession = (sessionId: string) => {
  //   const sessionIndex = chatData.sessions.findIndex(s => s.id === sessionId)
  //   if (sessionIndex !== -1) {
  //     chatData.sessions.splice(sessionIndex, 1)
  //     // If we're deleting the current session, switch to new chat
  //     if (currentSession === sessionId) {
  //       onSessionSelect("new")
  //     }
  //   }
  //   setShowOptions(null)
  // }


  const handleDeleteSession = async (sessionId: string) => {
  try {
    await axios.delete(`${baseUrl}/api/sessions/${sessionId}/`, {
      withCredentials: true,
    });
    setSessions(sessions.filter(s => s.id !== sessionId));
    if (currentSession === sessionId) {
      onSessionSelect("new");
    }
  } catch (err) {
    console.error("Delete failed", err);
  }
};


  // Handle rename session
  const handleRenameSession = (sessionId: string) => {

    const session = sessions.find(s => s.id === sessionId)

    if (session) {
      setEditingSession(sessionId)
      setEditTitle(session.title)
      setShowOptions(null)
    }
  }

  // Save renamed session
  // const handleSaveRename = (sessionId: string) => {
  //   const sessionIndex = chatData.sessions.findIndex(s => s.id === sessionId)
  //   if (sessionIndex !== -1 && editTitle.trim()) {
  //     chatData.sessions[sessionIndex].title = editTitle.trim()
  //   }
  //   setEditingSession(null)
  //   setEditTitle("")
  // }
const handleSaveRename = async (sessionId: string) => {
  try {
    const res = await axios.patch(`${baseUrl}/api/sessions/${sessionId}/`, {
      title: editTitle.trim(),
    }, {
      withCredentials: true,
    });
    setSessions(sessions.map(s => (s.id === sessionId ? res.data : s)));
    setEditingSession(null);
    setEditTitle("");
  } catch (err) {
    console.error("Rename failed", err);
  }
};

  // Cancel rename
  const handleCancelRename = () => {
    setEditingSession(null)
    setEditTitle("")
  }

  const handleStartTraining = (trainingType: string) => {
    // Convert training selection to chat prompts
    const trainingPrompts = {
      basics: "I want to learn trading basics. Can you teach me fundamental trading concepts and market analysis?",
      technical: "Teach me technical analysis including chart patterns, indicators, and trading signals.",
      options: "I want to learn advanced options trading strategies and risk management techniques.",
      ai: "Show me how to interpret and act on AI-generated trading signals."
    };

    const prompt = trainingPrompts[trainingType as keyof typeof trainingPrompts] || 
                   "I want to start learning about trading. Can you help me get started?";
    
    onPromptSelect(prompt);
    onClose?.(); // Close sidebar on mobile
  };

  // Render individual session item
  const renderSessionItem = (session: any, isRecent: boolean = true) => (
    <div
      key={session.id}
      className={`relative group p-2 rounded-lg cursor-pointer transition-colors ${
        currentSession === session.id 
          ? "bg-[#2a2a2a]" 
          : isRecent ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-800"
      }`}
      onMouseEnter={() => setHoveredSession(session.id)}
      onMouseLeave={() => setHoveredSession(null)}
    >
      {editingSession === session.id ? (
        // Editing mode
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSaveRename(session.id)
              if (e.key === 'Escape') handleCancelRename()
            }}
            className="flex-1 bg-[#272727] text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            autoFocus
          />
          <button
            onClick={() => handleSaveRename(session.id)}
            className="p-1 text-green-400 hover:text-green-300"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancelRename}
            className="p-1 text-gray-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        // Normal mode
        <>
          <div
            onClick={() => handleSessionSelect(session.id)}
            className="flex-1"
          >
            <div className="text-sm truncate pr-8">{session.title}</div>
            <div className="text-xs text-gray-400">{new Date(session.timestamp).toLocaleDateString()}</div>
          </div>
          
          {/* Options button - appears on hover */}
          {(hoveredSession === session.id || showOptions === session.id) && (
            <div className="absolute right-2 top-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowOptions(showOptions === session.id ? null : session.id)
                }}
                className="p-1 bg-[#3a3a3a] rounded transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
              
              {/* Dropdown menu */}
              {showOptions === session.id && (
                <div className="absolute right-0 top-6 bg-[#2a2a2a] border border-gray-600 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRenameSession(session.id)
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a] transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    Rename
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteSession(session.id)
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-[#3a3a3a] transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )

  return (
    <>
      <div className="flex flex-col h-full bg-[#1e1e1e]">
        {/* Mobile Close Button */}
        {onClose && (
          <div className="lg:hidden p-4 border-b border-gray-700 flex justify-end">
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-12 flex items-center justify-center">
              <img 
               src="/transparent-logo.png" 
                alt="TradeGPT Logo" 
                className="w-12 h-12"
              />
            </div>
            <span className="text-xl font-bold">TradeGPT</span>
            <button
              onClick={handleNewChatClick}
              className="ml-auto p-1 hover:bg-[#2a2a2a] rounded transition-colors cursor-pointer"
              title="Start New Chat"
            >
              <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#272727] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2e2e2e] cursor-pointer">
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
          <div
            onClick={handleShowRecommendedPrompts}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2e2e2e] cursor-pointer"
          >
            <Lightbulb className="w-5 h-5" />
            <span>Recommended Prompts</span>
          </div>
          <div 
            onClick={handleIntroClick}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2e2e2e] cursor-pointer transition-colors"
          >
            <GraduationCap className="w-5 h-5" /> {/* 🎓 Intro icon */}
            <span>Intro to TradeGpt</span>
          </div>
        </div>

        {/* Previous Chats Label */}
        <div className="px-4 pt-2 pb-1">
          <h2 className="text-md font-semibold text-gray-300">Previous Chats</h2>
        </div>

        {/* Chat Sessions */}
        <div 
          className="flex-1 overflow-y-auto px-4"
          onClick={() => setShowOptions(null)} // Close options when clicking outside
        >
          {/* Previous 7 Days */}
          {previous7Days.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Previous 7 Days</h3>
              <div className="space-y-1">
                {previous7Days.map((session) => renderSessionItem(session, true))}
              </div>
            </div>
          )}

          {/* Previous 30 Days */}
          {previous30Days.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Previous 30 Days</h3>
              <div className="space-y-1">
                {previous30Days.map((session) => renderSessionItem(session, false))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2">Boost your trading profits</h4>
            <p className="text-sm text-blue-100 mb-3">with our FREE training</p>
            <button 
              onClick={handleTrainingClick}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <UserProfileCard />
        </div>
      </div>

      {/* Training Modal */}
      <TradingTrainingModal
        isOpen={showTrainingModal}
        onClose={() => setShowTrainingModal(false)}
        onStartTraining={handleStartTraining}
      />
    </>
  )
}