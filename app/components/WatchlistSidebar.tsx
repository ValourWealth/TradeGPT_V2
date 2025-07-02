// "use client"

// import { useState, useEffect } from "react"
// import { Search, TrendingUp, Plus, Loader2, X } from "lucide-react"
// import { getPopularStocks, searchStocks, type StockData } from "../services/stockApi"

// interface WatchlistSidebarProps {
//   selectedTicker: string | null
//   onTickerSelect: (ticker: string) => void
//   onClose?: () => void
// }

// export default function WatchlistSidebar({ selectedTicker, onTickerSelect, onClose }: WatchlistSidebarProps) {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [stocks, setStocks] = useState<StockData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [searching, setSearching] = useState(false)

//   useEffect(() => {
//     loadPopularStocks()
//   }, [])

//   useEffect(() => {
//     const delayedSearch = setTimeout(() => {
//       if (searchQuery.trim()) {
//         handleSearch()
//       } else {
//         loadPopularStocks()
//       }
//     }, 500)

//     return () => clearTimeout(delayedSearch)
//   }, [searchQuery])

//   const loadPopularStocks = async () => {
//     setLoading(true)
//     try {
//       const popularStocks = await getPopularStocks()
//       setStocks(popularStocks)
//     } catch (error) {
//       console.error("Error loading popular stocks:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return

//     setSearching(true)
//     try {
//       const searchResults = await searchStocks(searchQuery)
//       setStocks(searchResults)
//     } catch (error) {
//       console.error("Error searching stocks:", error)
//     } finally {
//       setSearching(false)
//     }
//   }

//   const handleTickerSelect = (ticker: string) => {
//     onTickerSelect(ticker)
//     // Don't close sidebar automatically on desktop, only on mobile via parent component
//   }

//   const renderSparkline = (price: number, change: number) => {
//     const points = []
//     const basePrice = price - change
//     for (let i = 0; i < 5; i++) {
//       const variation = (Math.random() - 0.5) * (Math.abs(change) * 2)
//       points.push(basePrice + variation + (change * i) / 4)
//     }

//     const max = Math.max(...points)
//     const min = Math.min(...points)
//     const range = max - min || 1

//     const pathPoints = points
//       .map((value, index) => {
//         const x = (index / (points.length - 1)) * 60
//         const y = 20 - ((value - min) / range) * 20
//         return `${x},${y}`
//       })
//       .join(" ")

//     return (
//       <svg width="60" height="20" className="text-current">
//         <polyline fill="none" stroke="currentColor" strokeWidth="1" points={pathPoints} />
//       </svg>
//     )
//   }

//   return (
//     <div className="flex flex-col h-full bg-[#1e1e1e]">
//       {/* Mobile Close Button */}
//       {onClose && (
//         <div className="lg:hidden p-4 border-b border-gray-700 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">Watchlist</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       )}

//       {/* Header */}
//       <div className="p-4 border-b border-gray-700">
//         <div className="hidden lg:flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Watchlist</h2>
//           <TrendingUp className="w-5 h-5 text-gray-400" />
//         </div>

//         {/* Search Bar */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search stocks (e.g., META, AAPL)..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-[#272727] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
//           />
//           {searching && (
//             <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
//           )}
//         </div>
//       </div>

//       {/* Stock List */}
//       <div className="flex-1 overflow-y-auto">
//         {loading ? (
//           <div className="p-4 text-center text-gray-400">
//             <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin" />
//             <p className="text-sm">Loading stocks...</p>
//           </div>
//         ) : stocks.length === 0 ? (
//           <div className="p-4 text-center text-gray-400">
//             <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
//               <Plus className="w-6 h-6" />
//             </div>
//             <p className="text-sm">No stocks found</p>
//           </div>
//         ) : (
//           <div className="p-4 space-y-3">
//             {stocks.map((stock) => (
//               <div
//                 key={stock.symbol}
//                 onClick={() => handleTickerSelect(stock.symbol)}
//                 className={`p-3 bg-[#272727] rounded-lg cursor-pointer transition-colors ${
//                   selectedTicker === stock.symbol ? "ring-2 ring-blue-500" : ""
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="min-w-0 flex-1">
//                     <div className="font-semibold">{stock.symbol}</div>
//                     <div className="text-xs text-gray-400 truncate">{stock.name}</div>
//                   </div>
//                   <div className="text-right ml-2">
//                     <div className="font-semibold">${stock.price.toFixed(2)}</div>
//                     <div
//                       className={`text-xs flex items-center gap-1 justify-end ${
//                         stock.change >= 0 ? "text-green-400" : "text-red-400"
//                       }`}
//                     >
//                       <span>
//                         {stock.change >= 0 ? "+" : ""}
//                         {stock.changePercent.toFixed(2)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className={stock.change >= 0 ? "text-green-400" : "text-red-400"}>
//                     {renderSparkline(stock.price, stock.change)}
//                   </div>
//                   <div
//                     className={`px-2 py-1 rounded text-xs font-medium ${
//                       stock.change >= 0 ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"
//                     }`}
//                   >
//                     {stock.change >= 0 ? "+" : ""}
//                     {stock.change.toFixed(2)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import { ChevronLeft, ChevronRight, Loader2, Plus, Search, TrendingUp, X } from "lucide-react"
import { useEffect, useState } from "react"

// Mock data for demo
const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 207.82, change: 2.65, changePercent: 1.29 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 492.05, change: -5.36, changePercent: -1.08 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 175.84, change: -0.39, changePercent: -0.22 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 220.46, change: 1.07, changePercent: 0.49 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 300.71, change: -16.95, changePercent: -5.34 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 719.22, change: -18.87, changePercent: -2.56 }
]

interface WatchlistSidebarProps {
  selectedTicker: string | null
  onTickerSelect: (ticker: string) => void
  onClose?: () => void
  onToggle?: (isOpen: boolean) => void
}

export default function WatchlistSidebar({ selectedTicker, onTickerSelect, onClose, onToggle }: WatchlistSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [stocks, setStocks] = useState(mockStocks)
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    loadPopularStocks()
  }, [])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch()
      } else {
        loadPopularStocks()
      }
    }, 500)

    return () => clearTimeout(delayedSearch)
  }, [searchQuery])

  const loadPopularStocks = async () => {
    setLoading(true)
    try {
      setStocks(mockStocks)
    } catch (error) {
      console.error("Error loading popular stocks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setSearching(true)
    try {
      const filtered = mockStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setStocks(filtered)
    } catch (error) {
      console.error("Error searching stocks:", error)
    } finally {
      setSearching(false)
    }
  }

  const handleTickerSelect = (ticker: string) => {
    onTickerSelect(ticker)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    onToggle?.(!isOpen)
  }

  const renderSparkline = (price: number, change: number) => {
    const points = []
    const basePrice = price - change
    for (let i = 0; i < 5; i++) {
      const variation = (Math.random() - 0.5) * (Math.abs(change) * 2)
      points.push(basePrice + variation + (change * i) / 4)
    }

    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min || 1

    const pathPoints = points
      .map((value, index) => {
        const x = (index / (points.length - 1)) * 60
        const y = 20 - ((value - min) / range) * 20
        return `${x},${y}`
      })
      .join(" ")

    return (
      <svg width="60" height="20" className="text-current">
        <polyline fill="none" stroke="currentColor" strokeWidth="1" points={pathPoints} />
      </svg>
    )
  }

  return (
    <div className={`flex flex-col h-full bg-[#1e1e1e] transition-all duration-300 overflow-hidden ${isOpen ? 'min-w-80' : 'w-12 min-w-12'}`}>
      {/* Mobile Close Button */}
      {onClose && isOpen && (
        <div className="lg:hidden p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Watchlist</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header - Always visible with toggle button */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-4">
          {isOpen && <h2 className="text-lg font-semibold whitespace-nowrap">Watchlist</h2>}
          <div className="flex items-center gap-2 ml-auto">
            {isOpen && <TrendingUp className="w-5 h-5 text-gray-400" />}
            {/* Toggle Button - Always visible */}
            <button
              onClick={handleToggle}
              className="p-1 hover:bg-gray-800 rounded transition-colors group relative flex-shrink-0"
              title={isOpen ? "Close Watchlist" : "Open Watchlist"}
            >
              {isOpen ? (
                <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
              )}
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {isOpen ? "Close Watchlist" : "Open Watchlist"}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          {isOpen && <h2 className="text-lg font-semibold">Watchlist</h2>}
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-gray-800 rounded transition-colors ml-auto"
            title={isOpen ? "Close Watchlist" : "Open Watchlist"}
          >
            {isOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        {isOpen && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks (e.g., META, AAPL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#272727] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            {searching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
            )}
          </div>
        )}
      </div>

      {/* Stock List */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {loading ? (
            <div className="p-4 text-center text-gray-400">
              <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin" />
              <p className="text-sm">Loading stocks...</p>
            </div>
          ) : stocks.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-sm">No stocks found</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => handleTickerSelect(stock.symbol)}
                  className={`p-3 bg-[#272727] rounded-lg cursor-pointer transition-colors ${
                    selectedTicker === stock.symbol ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">{stock.symbol}</div>
                      <div className="text-xs text-gray-400 truncate">{stock.name}</div>
                    </div>
                    <div className="text-right ml-2 flex-shrink-0">
                      <div className="font-semibold">${stock.price.toFixed(2)}</div>
                      <div
                        className={`text-xs flex items-center gap-1 justify-end ${
                          stock.change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        <span>
                          {stock.change >= 0 ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`flex-shrink-0 ${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {renderSparkline(stock.price, stock.change)}
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0 ${
                        stock.change >= 0 ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NO CENTER ICON - Removed completely */}
    </div>
  )
}