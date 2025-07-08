"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true); // default checked
  const [isLoading, setIsLoading] = useState(false);

  // const handleContinue = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email.trim() || !name.trim() || !password.trim() || !phone.trim() || !agreed) return;
    
  //   setIsLoading(true);
  //   // TODO: Replace with real API call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     router.push("/");
  //   }, 1000);
  // };

  const handleContinue = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email.trim() || !name.trim() || !password.trim() || !phone.trim() || !agreed) return;

  setIsLoading(true);

  try {
    const response = await fetch(
      "https://tradegptv2backend-production.up.railway.app/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Signup failed:", data);
      alert(data?.email?.[0] || "Signup failed. Try again.");
      return;
    }

    // Success - redirect or auto-login
    alert("Account created successfully!");
    router.push("/auth/login");
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-16">
        <img src="/transparent-logo.png" alt="TradeGPT Logo" className="w-10 h-10" />
        <span className="text-2xl font-bold text-white">TradeGPT</span>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Create your account</h1>
        
        <form onSubmit={handleContinue} className="space-y-6">
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg"
            required
          />

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg"
            required
          />

          {/* Phone Number */}
          <div className="flex">
            <span className="bg-gray-800 text-white px-4 py-3 border border-gray-700 rounded-l-lg">
              🇺🇸 +1
            </span>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-gray-800 border border-l-0 border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-r-lg"
              required
            />
          </div>

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg"
            required
          />

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1"
            />
            <label className="text-gray-400 text-sm">
              By creating an account, I agree to{" "}
              <span className="text-white font-semibold">TradeGPT's</span>{" "}
              <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>,{" "}
              <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>, and{" "}
              <a href="#" className="text-blue-400 hover:underline">Legal Disclaimer</a>.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !agreed}
            className="w-full bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg"
          >
            {isLoading ? "Signing up..." : "Sign up"}
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

        {/* Google Signup */}
        <div className="mt-8">
          <button
            onClick={() => handleSocialSignup("Google")}
            className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-3"
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
