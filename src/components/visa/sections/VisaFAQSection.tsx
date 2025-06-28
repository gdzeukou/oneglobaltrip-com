
import FAQSection from '@/components/common/FAQSection';

const VisaFAQSection = () => {
  const faqData = [
    {
      question: "How long does visa processing take?",
      answer: "Processing times vary by destination: Schengen visas take 10-15 days, UK visas 15-20 days, and e-visas like UAE and India can be processed in 3-5 days. We provide expedited services for urgent travel."
    },
    {
      question: "What's included in your visa service?",
      answer: "Our service includes document review, application completion, appointment booking, embassy liaison, status tracking, and 24/7 support. We also provide travel insurance and other required documents."
    },
    {
      question: "Do you guarantee visa approval?",
      answer: "While we cannot guarantee approval (only embassies make that decision), we have a 99% success rate. If your visa is rejected due to our error, we'll reapply for free."
    },
    {
      question: "Can you help with urgent applications?",
      answer: "Yes! We offer expedited services for urgent travel. Depending on the destination, we can often get visas processed in 3-7 days with our premium rush service."
    }
  ];

  return (
    <FAQSection 
      title="Visa Questions? We've Got Answers"
      subtitle="Everything you need to know about our visa services"
      faqs={faqData}
    />
  );
};

export default VisaFAQSection;
