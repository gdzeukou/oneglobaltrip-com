
import { useState, useEffect } from 'react';

interface CurrencyRates {
  [key: string]: number;
}

interface CurrencyConverter {
  convert: (amount: number, from: string, to: string) => number;
  rates: CurrencyRates;
  isLoading: boolean;
  lastUpdated: Date | null;
}

export const useCurrencyConverter = (): CurrencyConverter => {
  const [rates, setRates] = useState<CurrencyRates>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Using a free currency API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        setRates(data.rates);
        setLastUpdated(new Date(data.date));
        setIsLoading(false);
      } catch (error) {
        console.log('Currency API failed, using default rates:', error);
        // Fallback rates
        setRates({
          USD: 1,
          EUR: 0.85,
          GBP: 0.73,
          CAD: 1.25,
          AUD: 1.35,
          NGN: 460,
          INR: 83,
          AED: 3.67,
        });
        setIsLoading(false);
        setLastUpdated(new Date());
      }
    };

    fetchRates();
    
    // Update rates every hour
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  const convert = (amount: number, from: string, to: string): number => {
    if (!rates[from] || !rates[to]) return amount;
    
    const usdAmount = amount / rates[from];
    return Math.round(usdAmount * rates[to] * 100) / 100;
  };

  return { convert, rates, isLoading, lastUpdated };
};

export default useCurrencyConverter;
