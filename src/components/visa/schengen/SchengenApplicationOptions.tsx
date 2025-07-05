import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, FileText, Sparkles, CheckCircle, Clock, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SchengenApplicationOptionsProps {
  onSelectMaya: () => void;
  onSelectTraditional: () => void;
}

const SchengenApplicationOptions = ({ onSelectMaya, onSelectTraditional }: SchengenApplicationOptionsProps) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back! Choose your application experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've designed two powerful ways to help you complete your Schengen visa application. 
            Choose the approach that feels right for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Maya AI Option */}
          <Card className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-blue-500 text-white px-4 py-2 rounded-bl-lg text-sm font-semibold">
              <Sparkles className="h-4 w-4 inline mr-1" />
              AI Powered
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">Start Applying with Maya</CardTitle>
                  <p className="text-purple-600 font-medium">AI-Guided Conversational Experience</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Let Maya, our intelligent AI assistant, guide you through your application with natural conversation. 
                She'll ask the right questions, explain requirements, and ensure everything is completed perfectly.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Intelligent Question Flow</p>
                    <p className="text-sm text-gray-600">Maya adapts questions based on your responses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Real-time Validation</p>
                    <p className="text-sm text-gray-600">Instant feedback and error prevention</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Context-Aware Help</p>
                    <p className="text-sm text-gray-600">Smart assistance tailored to your situation</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-purple-800">Estimated Time: 15-20 minutes</span>
                </div>
                <p className="text-purple-700 text-sm">
                  Perfect for first-time applicants or those who prefer guided assistance
                </p>
              </div>

              <Button 
                onClick={onSelectMaya}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <Bot className="h-5 w-5 mr-2" />
                Start with Maya AI
              </Button>
            </CardContent>
          </Card>

          {/* Traditional Form Option */}
          <Card className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-green-500 text-white px-4 py-2 rounded-bl-lg text-sm font-semibold">
              <FileText className="h-4 w-4 inline mr-1" />
              Traditional
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">Complete Application Yourself</CardTitle>
                  <p className="text-blue-600 font-medium">Official Form-Based Experience</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Access our comprehensive digital version of the official Schengen application form. 
                All 37 fields organized clearly with smart features to streamline your experience.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Official Form Structure</p>
                    <p className="text-sm text-gray-600">Exactly matches consulate requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Smart Auto-Fill</p>
                    <p className="text-sm text-gray-600">Pre-populate based on your profile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Progress Saving</p>
                    <p className="text-sm text-gray-600">Continue where you left off anytime</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800">Estimated Time: 25-35 minutes</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Ideal for experienced travelers or those who prefer traditional forms
                </p>
              </div>

              <Button 
                onClick={onSelectTraditional}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <FileText className="h-5 w-5 mr-2" />
                Use Traditional Form
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Both options include expert review, document verification, and submission support
          </p>
        </div>
      </div>
    </section>
  );
};

export default SchengenApplicationOptions;