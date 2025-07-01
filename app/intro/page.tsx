"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, Bot, BarChart3, Target, Shield, Zap, Star, Check, ArrowRight, Play, User, Mail, Lock, ChevronDown } from 'lucide-react';

const TradeGPTLanding = () => {
  const router = useRouter();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'United States',
    acceptTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    // Handle registration logic here
    // After successful registration, redirect to main app
    // router.push('/');
  };

  const handleBackToApp = () => {
    router.push('/');
  };

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI algorithms analyze thousands of market trends, patterns and trading signals in real-time to provide intelligent trading insights in 10 mins."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Smart Stock Picks",
      description: "Get real-time smart stock recommendations based on your risk profile and market conditions to maximize profits."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Real-Time Market Data",
      description: "Get real-time market information from multiple exchanges and data providers through our industry leading platform."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Management",
      description: "Intelligent risk assessment tools help you manage portfolio risks and protect your investments."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Execution",
      description: "Ultra-fast order execution for real-time trading with millisecond-precision timing engines."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Trading Signals",
      description: "Receive precise entry and exit buy/sell signals based on advanced technical analysis patterns."
    }
  ];

  const learningPoints = [
    "Master profitable trading strategies that consistently generate profits",
    "Implement AI trading strategies that work",
    "Risk management strategies for maximizing returns",
    "How to interpret AI signals for better trades",
    "Advanced portfolio optimization tactics",
    "Real-time market analysis and prediction techniques"
  ];

  const testimonials = [
    { name: "Jennifer L.", rating: 5, text: "I went from not that happy and grateful. I am now more knowledgeable!", amount: "+$42,995" },
    { name: "Alex B.", rating: 5, text: "Simply the best software and signal I've traded. Amazing experience!", amount: "+$38,750" },
    { name: "Jennifer L.", rating: 5, text: "I went from not that happy and grateful. I am now more knowledgeable!", amount: "+$49,250" },
    { name: "David K.", rating: 5, text: "I know Stock favorited my page now!", amount: "+$52,350" },
    { name: "Robert P.", rating: 5, text: "Simply happy with the best program and and", amount: "+$45,890" },
    { name: "Ian L.", rating: 5, text: "Ian Said is about 78k for one of the best ideas", amount: "+$78,000" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">TradeGPT</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToApp}
              className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              ← Back to TradeGPT
            </button>
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gray-800 rounded-lg px-4 py-2 inline-flex items-center space-x-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Trading with 1000+ traders worldwide</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              UNLEASH THE<br />
              POWER OF<br />
              <span className="text-blue-500">TRADEGPT</span>
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Revolutionary AI-powered trading assistant that analyzes market trends, provides intelligent stock picks, and helps you maximize profits with precision and confidence.
            </p>
            
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors mb-8"
            >
              REGISTER NOW →
            </button>
            
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold">500k+</div>
                <div className="text-gray-400 text-sm">USERS TRADING</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98.9%</div>
                <div className="text-gray-400 text-sm">SUCCESS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2.5x</div>
                <div className="text-gray-400 text-sm">AVG RETURNS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-gray-400 text-sm">LIVE SUPPORT</div>
              </div>
            </div>
          </div>
          
          {/* Registration Form - Right Side */}
          <div className="flex justify-center">
            <div className="bg-white rounded-xl max-w-md w-full p-6 text-gray-900 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-green-600 mb-2">REGISTER NOW!</h2>
                <p className="text-sm text-gray-600">
                  CLAIM YOUR 37 EUROS ($40) NEW MEMBER BONUS!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Other</option>
                </select>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the Terms and Conditions and Privacy Policy. I confirm that I am at least 18 years old.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Smart Trading</h2>
            <p className="text-gray-300 text-lg">
              Discover the advanced capabilities that make TradeGPT the ultimate trading companion for users from every background.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="text-blue-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="px-6 py-16 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Here&apos;s a <span className="text-blue-600">Preview</span> of TradeGPT in Action!
            </h2>
            <p className="text-gray-600">
              Watch some videos to get to grips with our powerful TradeGPT which isn&apos;t like anything...
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Live Market Analysis</h3>
                <span className="text-green-400 text-sm">LIVE</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>AAPL</span>
                  <span className="text-green-400">+2.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>TSLA</span>
                  <span className="text-red-400">-1.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>NVDA</span>
                  <span className="text-green-400">+5.8%</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-800 rounded">
                <div className="text-sm text-gray-400 mb-2">AI Recommendation</div>
                <div className="text-green-400 font-semibold">Strong bullish momentum detected on NVDA. Entry point at $875 with target of $920.</div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button className="bg-green-600 px-6 py-2 rounded font-semibold flex-1">BUY</button>
                <button className="bg-red-600 px-6 py-2 rounded font-semibold flex-1">SELL</button>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">What You&apos;ll Learn:</h3>
              <div className="space-y-4">
                {learningPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">How TradeGPT Works</h2>
          <p className="text-gray-300 mb-12">Simple steps to start your AI-powered trading journey</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-600 mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Create Your Account</h3>
              <p className="text-gray-400">
                Sign up in minutes and get access to our advanced AI trading platform.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-600 mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Get AI Insights</h3>
              <p className="text-gray-400">
                Receive real-time market analysis, stock recommendations and trading signals.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-600 mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Execute Trades</h3>
              <p className="text-gray-400">
                Make informed decisions with our AI insights and watch your portfolio grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">This System Works!</h2>
          <p className="text-gray-600 mb-12">
            Look at what our members have about TradeGPT trading system.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-left">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="text-green-600 font-bold">{testimonial.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              COME AND LEARN HOW TO UNLEASH THE POWER OF TRADEGPT!
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Start your journey to financial success with our intelligent market insights and profitable decisions.
            </p>
            <button 
              onClick={handleBackToApp}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Try TradeGPT Now →
            </button>
          </div>
 
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 border-t border-gray-700 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">TradeGPT</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Risk Disclosure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 TradeGPT. All rights reserved.</p>
            <p className="mt-2 text-sm">Trading involves substantial risk and is not suitable for all investors. Past performance does not guarantee future results.</p>
          </div>
        </div>
      </footer> */}

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-gray-900">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-600 mb-2">REGISTER NOW!</h2>
              <p className="text-sm text-gray-600">
                CLAIM YOUR 37 EUROS ($40) NEW MEMBER BONUS!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>France</option>
                <option>Other</option>
              </select>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the Terms and Conditions and Privacy Policy. I confirm that I am at least 18 years old.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                GET STARTED
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeGPTLanding;