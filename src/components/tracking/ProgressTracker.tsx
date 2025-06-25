
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  CreditCard, 
  Send, 
  Calendar,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedSection } from '@/components/ui/animated-section';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'attention-needed';
  icon: React.ReactNode;
  estimatedTime: string;
  completedAt?: string;
  nextAction?: string;
}

const mockSteps: ProgressStep[] = [
  {
    id: '1',
    title: 'Application Submitted',
    description: 'Your visa application has been received and is being reviewed',
    status: 'completed',
    icon: <Send className="h-5 w-5" />,
    estimatedTime: '1 day',
    completedAt: '2024-06-20 10:30 AM',
  },
  {
    id: '2',
    title: 'Document Verification',
    description: 'Our team is verifying all submitted documents',
    status: 'completed',
    icon: <FileText className="h-5 w-5" />,
    estimatedTime: '2-3 days',
    completedAt: '2024-06-22 2:15 PM',
  },
  {
    id: '3',
    title: 'Payment Processing',
    description: 'Processing your payment and preparing submission',
    status: 'in-progress',
    icon: <CreditCard className="h-5 w-5" />,
    estimatedTime: '1-2 days',
    nextAction: 'Payment confirmation pending',
  },
  {
    id: '4',
    title: 'Embassy Submission',
    description: 'Submitting your application to the embassy/consulate',
    status: 'pending',
    icon: <Calendar className="h-5 w-5" />,
    estimatedTime: '1 day',
  },
  {
    id: '5',
    title: 'Embassy Processing',
    description: 'Embassy is processing your visa application',
    status: 'pending',
    icon: <Clock className="h-5 w-5" />,
    estimatedTime: '10-15 days',
  },
  {
    id: '6',
    title: 'Visa Ready',
    description: 'Your visa is ready for collection or delivery',
    status: 'pending',
    icon: <CheckCircle className="h-5 w-5" />,
    estimatedTime: '1-2 days',
  },
];

export const ProgressTracker = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [progress, setProgress] = useState(40);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 2;
        return Math.min(newProgress, 85);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'attention-needed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-600 animate-pulse" />;
      case 'pending': return <Clock className="h-5 w-5 text-gray-400" />;
      case 'attention-needed': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <AnimatedSection className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Track Your Application</h2>
          <p className="text-xl text-gray-600">
            Real-time updates on your visa application progress
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Overview</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-gray-600 mb-2">Application ID</div>
                  <div className="font-mono text-sm bg-gray-100 p-2 rounded">VIS-2024-001234</div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-gray-600 mb-2">Estimated Completion</div>
                  <div className="font-semibold">July 15, 2024</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-4">
              <div className="flex items-center mb-2">
                <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">Need Help?</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Our team is here to assist you throughout the process
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Chat with Support
              </button>
            </GlassCard>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Timeline</h3>
              
              <div className="space-y-6">
                {mockSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-100' :
                        step.status === 'in-progress' ? 'bg-blue-100' :
                        step.status === 'attention-needed' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        {getStatusIcon(step.status)}
                      </div>
                      {index < mockSteps.length - 1 && (
                        <div className={`w-0.5 h-16 mt-2 ${
                          step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                          {step.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Est. time: {step.estimatedTime}</span>
                        {step.completedAt && (
                          <span>Completed: {step.completedAt}</span>
                        )}
                      </div>
                      
                      {step.nextAction && (
                        <div className="mt-2 text-sm text-blue-600 font-medium">
                          Next: {step.nextAction}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProgressTracker;
