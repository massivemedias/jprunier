/**
 * Post-build prerender for SEO.
 *
 * The site is a Vite + React SPA. Vercel's rewrite serves /index.html for every route,
 * which means social crawlers (Facebook, LinkedIn, Twitter, Messenger, WhatsApp) see the
 * homepage's <title>, <meta description>, canonical and OG tags for EVERY URL.
 *
 * This script runs after `vite build`. For each route below it writes
 * `dist/<route>/index.html` — a copy of `dist/index.html` with route-specific meta tags.
 * Vercel serves these static files directly before the SPA rewrite fires, so crawlers
 * get the correct metadata without needing to execute JavaScript.
 *
 * The JS bundle then hydrates as usual on top of the static HTML.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://jprunier.com';
const DIST = path.resolve(__dirname, '..', 'dist');

// Route-specific meta. Descriptions kept under 160 chars for optimal SERP display.
// Title-cased English used as default (the SPA re-renders in French client-side based on
// browser language preference; crawlers index both via hreflang anyway).
const ROUTES = [
  {
    path: '/services',
    title: 'Services — Programming, Consulting, Integration | JPrunier',
    description:
      'Crestron programming, AV-IT-AI consulting, audiovisual system administration and integration. CSP specialist across Canada and Europe.',
    ogTitle: 'JPrunier Services — Programming, Consulting, Integration',
  },
  {
    path: '/contact',
    title: "Contact — Montreal & Paris Offices | JPrunier",
    description:
      "Contact JPrunier in Montreal (1055 Rue Lucien-L'Allier) or Paris (10 Rue de Penthievre). Integrated AV and AI solutions for enterprises.",
    ogTitle: 'Contact JPrunier — Montreal & Paris',
  },
  {
    path: '/news',
    title: 'News & Articles | JPrunier',
    description:
      'Latest news, projects and insights from JPrunier on AV-AI integration, events and deployments.',
    ogTitle: 'JPrunier News & Articles',
  },
];

// JSON-LD Organization + LocalBusiness schema. Injected on every prerendered page.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JPrunier Inc.',
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  description:
    'Crestron Service Provider — programming, consulting and AV-AI integration across Canada and Europe.',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: "1055 Rue Lucien-L'Allier, Suite #1049",
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      postalCode: 'H3G 0E7',
      addressCountry: 'CA',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '10 Rue de Penthievre',
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

const escapeAttr = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function rewriteHeadFor(html, route) {
  const canonical = `${SITE_URL}${route.path}`;
  const title = escapeAttr(route.title);
  const desc = escapeAttr(route.description);
  const ogTitle = escapeAttr(route.ogTitle);

  return (
    html
      // Primary
      .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${desc}" />`,
      )
      .replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="canonical" href="${canonical}" />`,
      )
      // Hreflang — same URL for both languages (client-side switch)
      .replace(
        /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="alternate" hreflang="en" href="${canonical}" />`,
      )
      .replace(
        /<link\s+rel="alternate"\s+hreflang="fr"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="alternate" hreflang="fr" href="${canonical}" />`,
      )
      .replace(
        /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
      )
      // Open Graph
      .replace(
        /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:url" content="${canonical}" />`,
      )
      .replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:title" content="${ogTitle}" />`,
      )
      .replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:description" content="${desc}" />`,
      )
      // Twitter
      .replace(
        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:title" content="${ogTitle}" />`,
      )
      .replace(
        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:description" content="${desc}" />`,
      )
  );
}

function injectJsonLd(html) {
  if (html.includes('application/ld+json')) return html; // already present
  const tag = `<script type="application/ld+json">${JSON.stringify(JSON_LD)}</script>`;
  return html.replace('</head>', `${tag}\n  </head>`);
}

function run() {
  const indexPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  let baseHtml = fs.readFileSync(indexPath, 'utf8');

  // Inject JSON-LD into the homepage too
  const homepageWithLd = injectJsonLd(baseHtml);
  if (homepageWithLd !== baseHtml) {
    fs.writeFileSync(indexPath, homepageWithLd);
    baseHtml = homepageWithLd;
    console.log('  ✓ Injected JSON-LD into /');
  }

  for (const route of ROUTES) {
    const html = injectJsonLd(rewriteHeadFor(baseHtml, route));
    const outDir = path.join(DIST, route.path.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`  ✓ Prerendered ${route.path} (${route.title.length} char title)`);
  }

  console.log(`✅ Prerender complete: ${ROUTES.length} routes + JSON-LD on /`);
}

run();
