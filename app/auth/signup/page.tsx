// app/auth/signup/page.tsx - Fixed version
"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard or main app
      router.push("/dashboard");
    }, 1000);
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
    // Implement social signup logic
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-16">
        <div className="w-10 h-10 flex items-center justify-center">
          <img 
            src="/transparent-logo.png" 
            alt="TradeGPT Logo" 
            className="w-10 h-10"
          />
        </div>
        <span className="text-2xl font-bold text-white">TradeGPT</span>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Create your account</h1>
        
        <form onSubmit={handleContinue} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {isLoading ? "Creating account..." : "Continue"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Log in here
          </button>
        </p>

        {/* Continue with Google */}
        <div className="mt-8">
          <button
            onClick={() => handleSocialSignup("Google")}
            className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">G</span>
            </div>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}