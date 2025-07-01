"use client"

import { BarChart3, CheckCircle, Play, Target, TrendingUp, X, Zap } from 'lucide-react';
import React, { useState } from 'react';

interface TradingTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTraining: (trainingType: string) => void;
}

const TradingTrainingModal: React.FC<TradingTrainingModalProps> = ({
  isOpen,
  onClose,
  onStartTraining,
}) => {
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);

  if (!isOpen) return null;

  const trainingModules = [
    {
      id: 'basics',
      title: 'Trading Basics',
      description: 'Learn fundamental trading concepts and market analysis',
      duration: '15 min',
      level: 'Beginner',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'technical',
      title: 'Technical Analysis',
      description: 'Master chart patterns, indicators, and trading signals',
      duration: '25 min',
      level: 'Intermediate',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'options',
      title: 'Options Trading',
      description: 'Advanced options strategies and risk management',
      duration: '30 min',
      level: 'Advanced',
      icon: <Target className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'ai',
      title: 'AI Trading Signals',
      description: 'Learn to interpret and act on AI-generated signals',
      duration: '20 min',
      level: 'All Levels',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const handleStartTraining = (trainingId: string) => {
    onStartTraining(trainingId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-[#1e1e1e] p-6 border-b border-gray-700 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                🚀 FREE Trading Training
              </h2>
              <p className="text-gray-300">
                Choose your training path and boost your trading profits
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Benefits Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">What You'll Get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Real-time market insights',
                'AI-powered trading signals',
                'Risk management strategies',
                'Profitable trading techniques'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Training Modules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Choose Your Training:</h3>
            {trainingModules.map((module) => (
              <div
                key={module.id}
                className={`relative overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                  selectedTraining === module.id
                    ? 'border-blue-500 bg-gray-700'
                    : 'border-gray-600 bg-[#2a2a2a] hover:border-gray-500'
                }`}
                onClick={() => setSelectedTraining(module.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color}`}>
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{module.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{module.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="bg-gray-600 px-2 py-1 rounded text-gray-300">
                            {module.duration}
                          </span>
                          <span className="bg-blue-600 px-2 py-1 rounded text-white">
                            {module.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Play className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                {selectedTraining === module.id && (
                  <div className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => selectedTraining && handleStartTraining(selectedTraining)}
              disabled={!selectedTraining}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {selectedTraining ? 'Start Training' : 'Select a Training Module'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          {/* Testimonial */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                J
              </div>
              <div>
                <p className="text-green-100 text-sm italic">
                  "This training helped me increase my profits by 85% in just 2 weeks!"
                </p>
                <p className="text-green-300 text-xs mt-1">- Jennifer L., Pro Trader</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center mt-4">
            * Results may vary. Trading involves risk. This is for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradingTrainingModal;