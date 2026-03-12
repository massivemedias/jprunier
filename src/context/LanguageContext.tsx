'use client'

import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

type ContentContextType = {
  en: Record<string, any>
  fr: Record<string, any>
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
})

const ContentContext = createContext<ContentContextType>({ en: {}, fr: {} })

export function LanguageProvider({
  children,
  dataEn,
  dataFr,
}: {
  children: ReactNode
  dataEn: Record<string, any>
  dataFr: Record<string, any>
}) {
  const [language, setLanguageState] = useState('en')

  // Read saved language after hydration to avoid mismatch
  useEffect(() => {
    const saved = localStorage.getItem('jprunier-lang')
    if (saved && saved !== 'en') setLanguageState(saved)
  }, [])

  const changeLang = (lang: string) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('jprunier-lang', lang)
    }
  }

  const langValue = useMemo(
    () => ({ language, setLanguage: changeLang }),
    [language],
  )

  const contentValue = useMemo(() => ({ en: dataEn, fr: dataFr }), [dataEn, dataFr])

  return (
    <LanguageContext.Provider value={langValue}>
      <ContentContext.Provider value={contentValue}>{children}</ContentContext.Provider>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useContent() {
  const { language } = useLanguage()
  const data = useContext(ContentContext)
  return language === 'fr' ? data.fr : data.en
}

export function useLocalizedData<T>(en: T, fr: T): T {
  const { language } = useLanguage()
  return language === 'fr' ? fr : en
}

export function useT() {
  const { language } = useLanguage()
  const data = useContext(ContentContext)
  const stringsEn = data.en?.uiStrings || {}
  const stringsFr = data.fr?.uiStrings || {}
  return (key: string) => {
    const strings = language === 'fr' ? stringsFr : stringsEn
    return strings[key] || stringsEn[key] || key
  }
}
