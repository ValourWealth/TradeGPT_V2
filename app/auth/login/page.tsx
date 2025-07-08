// // app/auth/login/page.tsx - Fixed version
// "use client"
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleContinue = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.trim() || !password.trim()) return;
    
//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       // Redirect to dashboard or main app
//       router.push("/dashboard");
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
//       {/* Logo */}
//       <div className="flex items-center gap-2 mb-16">
//         <div className="w-10 h-10 flex items-center justify-center">
//           <img 
//             src="/transparent-logo.png" 
//             alt="TradeGPT Logo" 
//             className="w-10 h-10"
//           />
//         </div>
//         <span className="text-2xl font-bold text-white">TradeGPT</span>
//       </div>

//       {/* Login Form */}
//       <div className="w-full max-w-md">
//         <h1 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h1>
        
//         <form onSubmit={handleContinue} className="space-y-6">
//           <div>
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>
          
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>
          
//           <button
//             type="submit"
//             disabled={isLoading || !email.trim() || !password.trim()}
//             className="w-full bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
//           >
//             {isLoading ? "Loading..." : "Continue"}
//           </button>
//         </form>

//         {/* Sign Up Link */}
//         <p className="text-center text-gray-400 mt-6">
//           Don't have an account?{" "}
//           <button
//             onClick={() => router.push("/auth/signup")}
//             className="text-blue-400 hover:text-blue-300 font-medium"
//           >
//             Sign up now!
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("https://tradegptv2backend-production.up.railway.app/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data?.detail || "Invalid email or password")
        return
      }

      // Save token to localStorage (or use cookies)
      localStorage.setItem("access", data.access)
      localStorage.setItem("refresh", data.refresh)

      router.push("/dashboard") // or wherever your main app is
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Login to TradeGPT</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/auth/signup")}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  )
}
