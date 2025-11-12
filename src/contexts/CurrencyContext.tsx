import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  currency: 'USD' | 'PKR';
  setCurrency: (currency: 'USD' | 'PKR') => void;
  convertPrice: (pkrPrice: number) => string;
  convertPerWordPrice: () => string;
  convertPriceRange: (range: string) => string;
  USD_TO_PKR: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const USD_TO_PKR = 280; // 1 USD = 280 PKR

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<'USD' | 'PKR'>(() => {
    const saved = localStorage.getItem('currency');
    return (saved as 'USD' | 'PKR') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertPrice = (pkrPrice: number): string => {
    if (currency === 'PKR') {
      return `PKR ${Math.round(pkrPrice).toLocaleString()}`;
    }
    const usdPrice = Math.round(pkrPrice / USD_TO_PKR);
    return `$${usdPrice}`;
  };

  const convertPerWordPrice = (): string => {
    if (currency === 'PKR') {
      return 'PKR 4/word';
    }
    return '$0.014/word';
  };

  const convertPriceRange = (range: string): string => {
    if (!range) return '';
    
    // Extract USD prices from range like "$15-30/page" or "$200"
    const matches = range.match(/\$(\d+)(?:-(\d+))?(.+)?/);
    if (!matches) return range;
    
    const [, minUsd, maxUsd, suffix = ''] = matches;
    
    if (currency === 'PKR') {
      const minPkr = Math.round(parseInt(minUsd) * USD_TO_PKR);
      if (maxUsd) {
        const maxPkr = Math.round(parseInt(maxUsd) * USD_TO_PKR);
        return `PKR ${minPkr.toLocaleString()}-${maxPkr.toLocaleString()}${suffix}`;
      }
      return `PKR ${minPkr.toLocaleString()}${suffix}`;
    }
    
    return range; // Return original USD format
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, convertPerWordPrice, convertPriceRange, USD_TO_PKR }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
