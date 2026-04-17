import { createContext, useContext, useEffect, useState, useMemo } from 'react';

import contentEn from '../data/content.json';
import contentFr from '../data/content-fr.json';
import testimonialsEn from '../data/testimonials.json';
import testimonialsFr from '../data/testimonials-fr.json';
import newsEn from '../data/news.json';
import newsFr from '../data/news-fr.json';
import { uiStrings } from '../data/ui-strings';
import { fetchLiveContent, applyOverrides } from '../lib/sanity';

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
  // Sanity overrides — null until the first fetch resolves. Rendering the
  // page with the baked JSON first avoids a loading flash; the Sanity values
  // swap in once the fetch completes (usually <300ms from the CDN).
  const [overrides, setOverrides] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchLiveContent().then((data) => {
      if (!cancelled && data) setOverrides(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const changeLang = (lang) => {
    setLanguage(lang);
    localStorage.setItem('jprunier-lang', lang);
  };

  const value = useMemo(() => ({
    language,
    setLanguage: changeLang,
    overrides,
  }), [language, overrides]);

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
  const { language, overrides } = useLanguage();
  return useMemo(() => {
    const baseContent = language === 'fr' ? contentFr : contentEn;
    const content = applyOverrides(baseContent, overrides, language);
    return {
      content,
      testimonials: language === 'fr' ? testimonialsFr : testimonialsEn,
      news: language === 'fr' ? newsFr : newsEn,
    };
  }, [language, overrides]);
}

export function useT() {
  const { language } = useLanguage();
  return (key) => uiStrings[language]?.[key] || uiStrings.en[key] || key;
}
