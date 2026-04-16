import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage, useContent } from '../context/LanguageContext';

const SITE_URL = 'https://jprunier.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Per-page SEO meta tags + Open Graph + structured data
 * Reads route + language to produce localized titles & descriptions.
 */
export default function SEO() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const { content } = useContent();

  const url = `${SITE_URL}${pathname}`;
  const isFr = language === 'fr';

  // Page-specific titles + descriptions
  const meta = getMetaForRoute(pathname, content, isFr);

  return (
    <Helmet>
      {/* Primary */}
      <html lang={isFr ? 'fr' : 'en'} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />

      {/* Hreflang for FR/EN (same URL, language switch is client-side) */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="fr" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="JPrunier Inc." />
      <meta property="og:locale" content={isFr ? 'fr_CA' : 'en_CA'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* Structured data: Organization + LocalBusiness */}
      <script type="application/ld+json">{JSON.stringify(buildJsonLd(content, isFr))}</script>
    </Helmet>
  );
}

function getMetaForRoute(pathname, content, isFr) {
  const fallbackTitle = isFr
    ? 'JPrunier Inc. — Crestron Service Provider | Intégration AV & IA'
    : 'JPrunier Inc. — Crestron Service Provider | AV & AI Integration';
  const fallbackDesc = isFr
    ? 'Crestron Service Provider, réseautage AV intelligent et solutions propulsées par l\'IA - de la conception au déploiement, au Canada et en Europe.'
    : 'Crestron Service Provider, intelligent AV networking and AI-driven solutions - from design to deployment, across Canada and Europe.';

  if (pathname === '/' || pathname === '') {
    return { title: fallbackTitle, description: fallbackDesc };
  }
  if (pathname.startsWith('/services')) {
    return {
      title: isFr
        ? 'Services — Programmation, Consultation, Intégration | JPrunier'
        : 'Services — Programming, Consulting, Integration | JPrunier',
      description: isFr
        ? 'Programmation Crestron, consultation AV-TI-IA, administration de systèmes audiovisuels et intégration. Spécialiste CSP au Canada et en Europe.'
        : 'Crestron programming, AV-IT-AI consulting, audiovisual system administration and integration. CSP specialist across Canada and Europe.',
    };
  }
  if (pathname.startsWith('/news')) {
    return {
      title: isFr
        ? 'Nouvelles & Articles | JPrunier'
        : 'News & Articles | JPrunier',
      description: isFr
        ? 'Dernières nouvelles, projets et perspectives de JPrunier sur l\'intégration AV-IA, les événements et les déploiements.'
        : 'Latest news, projects and insights from JPrunier on AV-AI integration, events and deployments.',
    };
  }
  if (pathname.startsWith('/contact')) {
    return {
      title: isFr
        ? 'Contact — Bureaux Montréal & Paris | JPrunier'
        : 'Contact — Montreal & Paris Offices | JPrunier',
      description: isFr
        ? 'Contactez JPrunier à Montréal (1055 Rue Lucien-L\'Allier) ou à Paris (10 Rue de Penthièvre). Solutions AV intégrées et IA pour entreprises.'
        : 'Contact JPrunier in Montreal (1055 Rue Lucien-L\'Allier) or Paris (10 Rue de Penthièvre). Integrated AV and AI solutions for enterprises.',
    };
  }
  return { title: fallbackTitle, description: fallbackDesc };
}

function buildJsonLd(content, isFr) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JPrunier Inc.',
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description: isFr
      ? 'Crestron Service Provider — programmation, consultation et intégration AV-IA au Canada et en Europe.'
      : 'Crestron Service Provider — programming, consulting and AV-AI integration across Canada and Europe.',
    sameAs: [
      content?.company?.social?.linkedin,
    ].filter(Boolean),
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '1055 Rue Lucien-L\'Allier, Suite #1049',
        addressLocality: 'Montreal',
        addressRegion: 'QC',
        postalCode: 'H3G 0E7',
        addressCountry: 'CA',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '10 Rue de Penthièvre',
        addressLocality: 'Paris',
        postalCode: '75008',
        addressCountry: 'FR',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-514-447-3809',
        contactType: 'customer support',
        areaServed: ['CA', 'US'],
        availableLanguage: ['en', 'fr'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+33-1-89-48-06-62',
        contactType: 'customer support',
        areaServed: ['FR', 'EU'],
        availableLanguage: ['en', 'fr'],
      },
    ],
  };
  return org;
}
