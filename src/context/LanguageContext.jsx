import { createContext, useContext, useState, useMemo } from 'react';

import contentEn from '../data/content.json';
import contentFr from '../data/content-fr.json';
import testimonialsEn from '../data/testimonials.json';
import testimonialsFr from '../data/testimonials-fr.json';
import newsEn from '../data/news.json';
import newsFr from '../data/news-fr.json';
import { uiStrings } from '../data/ui-strings';

const LanguageContext = createContext();

/* Detect language: explicit choice (localStorage) > browser language > 'en' */
function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('jprunier-lang');
  if (stored === 'en' || stored === 'fr') return stored;

  const candidates = [
    ...(navigator.languages || []),
    navigator.language,
    navigator.userLanguage,
  ].filter(Boolean);

  for (const lang of candidates) {
    if (lang.toLowerCase().startsWith('fr')) return 'fr';
    if (lang.toLowerCase().startsWith('en')) return 'en';
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectInitialLanguage);

  const changeLang = (lang) => {
    setLanguage(lang);
    localStorage.setItem('jprunier-lang', lang);
  };

  const value = useMemo(() => ({
    language,
    setLanguage: changeLang,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useContent() {
  const { language } = useLanguage();
  return useMemo(() => ({
    content: language === 'fr' ? contentFr : contentEn,
    testimonials: language === 'fr' ? testimonialsFr : testimonialsEn,
    news: language === 'fr' ? newsFr : newsEn,
  }), [language]);
}

export function useT() {
  const { language } = useLanguage();
  return (key) => uiStrings[language]?.[key] || uiStrings.en[key] || key;
}
