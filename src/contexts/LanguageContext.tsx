import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/translations';

type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  t: (key: keyof typeof translations.en) => string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    // Update document direction based on language
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr';
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};