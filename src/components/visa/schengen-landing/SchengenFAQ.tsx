
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const faqData = [
  {
    id: 'processing-time',
    question: 'How long does processing take?',
    answer: 'Standard processing takes 10-15 business days. We offer expedited services for urgent travel that can reduce this to 5-7 days. Our priority appointment booking also helps speed up the overall timeline.'
  },
  {
    id: 'expedite-visa',
    question: 'Can I expedite my visa?',
    answer: 'Yes! We offer expedited processing for urgent travel needs. Our premium service includes priority appointment booking and expedited document review, typically processing within 5-7 business days.'
  },
  {
    id: 'missing-documents',
    question: 'What if I\'m missing documents?',
    answer: 'Our AI document checker identifies missing documents immediately. We provide a comprehensive checklist and can help you obtain missing documents like travel insurance, bank statements, or invitation letters.'
  },
  {
    id: 'children-appointment',
    question: 'Do children need their own appointment?',
    answer: 'Yes, children need their own appointment and visa application. However, we can often schedule family appointments together. Special requirements apply for minors, including additional consent forms.'
  },
  {
    id: 'data-security',
    question: 'Is my data safe?',
    answer: 'Absolutely. We use bank-level encryption and are fully GDPR compliant. Your documents are stored securely and only accessed by authorized personnel. We never share your information with third parties.'
  }
];

const SchengenFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>('processing-time');

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            Get quick answers to common visa questions
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <Collapsible 
                open={openFAQ === faq.id} 
                onOpenChange={() => toggleFAQ(faq.id)}
              >
                <CollapsibleTrigger className="w-full p-6 text-left hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                      openFAQ === faq.id ? 'rotate-180' : ''
                    }`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="pt-4 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 p-8 bg-blue-50 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our visa experts are here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('tel:+1-877-622-7278', '_self')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Call +1 (877) 622-7278
            </button>
            <button
              onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchengenFAQ;
