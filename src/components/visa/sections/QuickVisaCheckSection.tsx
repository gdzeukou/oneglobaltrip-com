
import QuickVisaWizard from '@/components/visa/QuickVisaWizard';

const QuickVisaCheckSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Visa Check</h2>
        <QuickVisaWizard />
      </div>
    </section>
  );
};

export default QuickVisaCheckSection;
