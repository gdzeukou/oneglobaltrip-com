
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VisaPricingPage = () => {
  const { visaType } = useParams<{ visaType: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main pricing page
    navigate('/pricing', { replace: true });
  }, [navigate]);

  return null;
};

export default VisaPricingPage;
