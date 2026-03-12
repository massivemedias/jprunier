import React from 'react'
import { getLayoutData } from '../../lib/payload'
import FrontendShell from './FrontendShell'
import '../../styles/global.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'JPrunier - AI & AV Integration',
  description: 'JPrunier inc. - AI-AV Integration and software solutions',
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
