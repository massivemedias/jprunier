'use client'

import type { ReactNode } from 'react'
import { LanguageProvider } from '../../context/LanguageContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'

type LayoutData = {
  uiStrings: { en: Record<string, string>; fr: Record<string, string> }
  servicesEn: { slug: string; title: string }[]
  servicesFr: { slug: string; title: string }[]
  footerEn: any
  footerFr: any
}

export default function FrontendShell({
  children,
  layoutData,
}: {
  children: ReactNode
  layoutData: LayoutData
}) {
  return (
    <LanguageProvider
      dataEn={{ uiStrings: layoutData.uiStrings.en }}
      dataFr={{ uiStrings: layoutData.uiStrings.fr }}
    >
      <div className="app">
        <Header servicesEn={layoutData.servicesEn} servicesFr={layoutData.servicesFr} />
        <ScrollToTop />
        <main className="main-content">{children}</main>
        <Footer dataEn={layoutData.footerEn} dataFr={layoutData.footerFr} />
      </div>
    </LanguageProvider>
  )
}
