import React from 'react'
import { getLayoutData } from '../../lib/payload'
import FrontendShell from './FrontendShell'
import '../../styles/global.css'
import '../../styles/light-theme.css'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jprunier.vercel.app'

export const metadata = {
  title: {
    default: 'JPrunier - AI & AV Integration',
    template: '%s | JPrunier',
  },
  description: 'JPrunier Inc. — Crestron certified AV programming, intelligent AI-driven solutions. Montréal & Paris.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    alternateLocale: 'en_CA',
    siteName: 'JPrunier Inc.',
    title: 'JPrunier — AI & AV Integration',
    description: 'Crestron certified programming, intelligent AV networking and AI-driven solutions — from design to deployment, across North America and Europe.',
    url: siteUrl,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JPrunier — AI & AV Integration',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPrunier — AI & AV Integration',
    description: 'Crestron certified programming, intelligent AV networking and AI-driven solutions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const layoutData = await getLayoutData()

  return (
    <html lang="en">
      <body>
        <FrontendShell layoutData={layoutData}>{children}</FrontendShell>
      </body>
    </html>
  )
}
