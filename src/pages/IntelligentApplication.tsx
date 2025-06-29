
import { useEffect } from 'react';
import IntelligentVisaForm from '@/components/visa/intelligent-form/IntelligentVisaForm';

const IntelligentApplication = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <IntelligentVisaForm />;
};

export default IntelligentApplication;
