
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';

const ContactSection: React.FC = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: 'hello@oneglobaltrip.com',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      iconColor: 'text-emerald-600',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Office',
      value: 'Dallas, Texas',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Hours',
      value: 'Mon-Fri: 9AM-6PM CST',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Enhanced contact info */}
      <Card className="relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <span>Get in Touch</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-6">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group/item flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className={`p-3 bg-gradient-to-r ${info.bgColor} rounded-xl border border-current/10 group-hover/item:scale-110 transition-transform duration-300`}>
                <div className={info.iconColor}>
                  {info.icon}
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover/item:text-gray-800 transition-colors duration-300">
                  {info.title}
                </p>
                <p className="text-gray-600 group-hover/item:text-gray-700 transition-colors duration-300">
                  {info.value}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
        
        {/* Hover shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
      </Card>

      {/* Enhanced contact form */}
      <Card className="relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span>Quick Message</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <form className="space-y-6">
            <div className="group/field relative">
              <Label htmlFor="contact-name" className="text-base font-semibold text-gray-800 mb-3 block">Name</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <User className="h-5 w-5 text-blue-500 group-focus-within/field:text-blue-600 transition-colors duration-300" />
                </div>
                <Input 
                  id="contact-name" 
                  className="pl-12 h-12 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-2 border-blue-200/50 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover/field:border-blue-300"
                  placeholder="Your full name"
                />
              </div>
            </div>
            
            <div className="group/field relative">
              <Label htmlFor="contact-email" className="text-base font-semibold text-gray-800 mb-3 block">Email</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Mail className="h-5 w-5 text-emerald-500 group-focus-within/field:text-emerald-600 transition-colors duration-300" />
                </div>
                <Input 
                  id="contact-email" 
                  type="email" 
                  className="pl-12 h-12 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-2 border-emerald-200/50 rounded-xl focus:border-emerald-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover/field:border-emerald-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="group/field relative">
              <Label htmlFor="contact-subject" className="text-base font-semibold text-gray-800 mb-3 block">Subject</Label>
              <div className="relative">
                <div className="absolute left-4 top-4 z-10">
                  <MessageSquare className="h-5 w-5 text-purple-500 group-focus-within/field:text-purple-600 transition-colors duration-300" />
                </div>
                <Input 
                  id="contact-subject" 
                  className="pl-12 h-12 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-2 border-purple-200/50 rounded-xl focus:border-purple-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover/field:border-purple-300"
                  placeholder="What can we help you with?"
                />
              </div>
            </div>
            
            <div className="group/field relative">
              <Label htmlFor="contact-message" className="text-base font-semibold text-gray-800 mb-3 block">Message</Label>
              <div className="relative">
                <div className="absolute left-4 top-4 z-10">
                  <Send className="h-5 w-5 text-amber-500 group-focus-within/field:text-amber-600 transition-colors duration-300" />
                </div>
                <Textarea 
                  id="contact-message" 
                  rows={4} 
                  className="pl-12 pt-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-2 border-amber-200/50 rounded-xl focus:border-amber-500 focus:ring-0 focus:bg-white transition-all duration-300 text-gray-800 font-medium hover:shadow-lg group-hover/field:border-amber-300 resize-none"
                  placeholder="Tell us about your travel plans or questions..."
                />
              </div>
            </div>
            
            <Button className="w-full h-14 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3">
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </Button>
          </form>
        </CardContent>
        
        {/* Hover shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
      </Card>
    </div>
  );
};

export default ContactSection;
