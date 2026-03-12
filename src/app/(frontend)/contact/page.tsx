import { getGlobal } from '../../../lib/payload'
import ContactClient from './ContactClient'

export default async function ContactPage() {
  const [contactPage, siteSettings] = await Promise.all([
    getGlobal('contact-page'),
    getGlobal('site-settings'),
  ])

  return (
    <ContactClient
      pageEn={contactPage.en}
      pageFr={contactPage.fr}
      settingsEn={siteSettings.en}
      settingsFr={siteSettings.fr}
    />
  )
}
