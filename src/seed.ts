// @ts-nocheck
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'

// Media upload helper — uploads a file from public/ to the Media collection, with caching
const mediaCache = new Map<string, string>() // path → media doc ID

async function uploadMedia(
  payload: any,
  filePath: string,
  alt: string,
  category: string,
  altFr?: string,
): Promise<string> {
  // Return cached ID if already uploaded
  if (mediaCache.has(filePath)) return mediaCache.get(filePath)!

  const fullPath = path.resolve(process.cwd(), 'public', filePath.replace(/^\//, ''))
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${fullPath}, skipping upload`)
    return ''
  }

  const stat = fs.statSync(fullPath)
  const ext = path.extname(fullPath).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
  }
  const mimetype = mimeMap[ext] || 'application/octet-stream'

  const doc = await payload.create({
    collection: 'media',
    locale: 'en',
    data: { alt, category },
    file: {
      data: fs.readFileSync(fullPath),
      mimetype,
      name: path.basename(fullPath),
      size: stat.size,
    },
  })

  // Set FR alt text if provided
  if (altFr) {
    await payload.update({
      collection: 'media',
      id: doc.id,
      locale: 'fr',
      data: { alt: altFr },
    })
  }

  mediaCache.set(filePath, doc.id)
  console.log(`  📷 Uploaded: ${path.basename(fullPath)} → ${doc.id}`)
  return doc.id
}

// Content data (EN)
const contentEn = {
  company: { name: "JPrunier Inc.", tagline: "AV - AI Technology Gateway", description: "Leading provider of intelligent audio-visual and AI integration solutions for enterprise environments", founded: 2020 },
  offices: [
    { city: "Montreal", country: "Canada", address: "1055 Rue Lucien-L'Allier, QC H3G 0E7", phone: "+1 438 823-2048", email: "info@jprunier.com" },
    { city: "Paris", country: "France", address: "10 Rue de Penthièvre, 75008", phone: "+1 438 823-2048", email: "info@jprunier.com" },
  ],
  social: { linkedin: "https://www.linkedin.com/company/jprunier-inc/", github: "https://github.com/jprunier", email: "info@jprunier.com" },
  hero: {
    home: { title: "AI – AV Integration and software solution", subtitle: "Crestron certified programming, intelligent AV networking and AI-driven solutions - from design to deployment, across North America and Europe." },
    about: { title: "About JPrunier", subtitle: "Shaping the future of intelligent environments" },
    services: { title: "Our Services", subtitle: "Comprehensive solutions for modern enterprises" },
    contact: { title: "Get In Touch", subtitle: "We're ready to help with your next project" },
    news: { title: "Latest Updates", subtitle: "Stay informed about our latest projects and insights" },
  },
  home: {
    servicesIntro: "We deliver world-class integration services combining artificial intelligence with sophisticated audio-visual systems.",
    gateway: { title: "Your technical gateway", subtitle: "Specialized ressources on demand, software developpement and integration." },
    techPartners: [
      { name: "Microsoft", logo: "/images/microsoft-bw.png" },
      { name: "Crestron", logo: "/images/crestron-bw.png" },
      { name: "OpenAI", logo: "/images/openai-bw.png" },
      { name: "Dante", logo: "/images/dante-bw.png" },
      { name: "QSC", logo: "/images/qsys-logo.png" },
    ],
    connectingItems: [
      { title: "Connecting spaces", description: "We design and deploy solutions that connect rooms, buildings, and campuses through intelligent AV networking.", icon: "grid" },
      { title: "Link database", description: "Data is a big part of AV integrated to AI. We help managing data between your AV / Control plateforms.", icon: "link" },
      { title: "Chat AI", description: "Controling your AV spaces, modify your room config file from your Chat are some advantages to integrate AV and AI.", icon: "chat" },
    ],
    expertiseItems: [
      { title: "Experience", description: "Over a decade of successful AV integration projects across North America and Europe." },
      { title: "Expertise", description: "Deep technical knowledge in Crestron, Dante, Q-SYS and modern collaboration platforms." },
      { title: "Formation", description: "Continuously trained and certified team keeping pace with evolving technologies." },
    ],
    discoverCta: { title: "Discover how our expertise can shape your next project", subtitle: "Let's connect to discuss your vision. Whether you're designing or integrating a conference room, smart building, optimizing your networked AV systems, or exploring AI integration - JPrunier bridges technologies together.", button: "Contact us" },
    achievements: { title: "Achievements", subtitle: "Ask us for references related to your activity." },
    ctaSection: { title: "Ready to Transform Your Environment?", subtitle: "Let's discuss how JPrunier can enhance your space with intelligent AV solutions.", button: "Schedule a Consultation" },
  },
  about: {
    intro: "Founded in 2020, JPrunier Inc. is a technology gateway in the audiovisual, IT, and artificial intelligence domains. We provide our clients with recognized expertise in software development, system control, interface design, multiplatform integration, configuration, and administration of complex audiovisual solutions.",
    mission: "To deliver innovative, reliable, and intelligent audio-visual solutions that enhance human experiences and drive business success.",
    vision: "A world where technology seamlessly adapts to human needs, creating spaces that inspire, collaborate, and innovate.",
    values: [
      { title: "Excellence", description: "We pursue the highest standards in everything we do" },
      { title: "Innovation", description: "We embrace emerging technologies to solve complex challenges" },
      { title: "Partnership", description: "We build lasting relationships with clients and partners" },
      { title: "Reliability", description: "We deliver on our commitments with proven expertise" },
    ],
  },
}

// Content data (FR)
const contentFr = {
  company: { name: "JPrunier Inc.", tagline: "Excellence en intégration IA-AV", description: "Fournisseur de premier plan de solutions intelligentes d'intégration audiovisuelle et d'intelligence artificielle pour les environnements d'entreprise" },
  offices: [
    { city: "Montréal", country: "Canada" },
    { city: "Paris", country: "France" },
  ],
  hero: {
    home: { title: "IA – AV Intégration et solutions logicielles", subtitle: "Programmation certifiée Crestron, réseautage AV intelligent et solutions propulsées par l'IA - de la conception au déploiement, en Amérique du Nord et en Europe." },
    about: { title: "À propos de JPrunier", subtitle: "Façonner l'avenir des environnements intelligents" },
    services: { title: "Nos services", subtitle: "Des solutions complètes pour les entreprises modernes" },
    contact: { title: "Contactez-nous", subtitle: "Nous sommes prêts à vous accompagner dans votre prochain projet" },
    news: { title: "Dernières nouvelles", subtitle: "Restez informé de nos derniers projets et perspectives" },
  },
  home: {
    servicesIntro: "Nous offrons des services d'intégration de classe mondiale combinant l'intelligence artificielle à des systèmes audiovisuels sophistiqués.",
    gateway: { title: "Votre passerelle technique", subtitle: "Ressources spécialisées sur demande, développement logiciel et intégration." },
    connectingItems: [
      { title: "Connexion des espaces", description: "Nous concevons et déployons des solutions qui connectent salles, bâtiments et campus grâce à un réseau AV intelligent." },
      { title: "Base de données liée", description: "Les données sont un élément clé de l'AV intégré à l'IA. Nous vous aidons à gérer les données entre vos plateformes AV et de contrôle." },
      { title: "Chat IA", description: "Contrôler vos espaces AV, modifier la configuration de vos salles depuis votre chat sont quelques avantages de l'intégration AV et IA." },
    ],
    expertiseItems: [
      { title: "Expérience", description: "Plus d'une décennie de projets d'intégration AV réussis en Amérique du Nord et en Europe." },
      { title: "Expertise", description: "Connaissance technique approfondie de Crestron, Dante, Q-SYS et des plateformes de collaboration modernes." },
      { title: "Formation", description: "Équipe continuellement formée et certifiée, au rythme des technologies en évolution." },
    ],
    discoverCta: { title: "Découvrez comment notre expertise peut façonner votre prochain projet", subtitle: "Connectons-nous pour discuter de votre vision. Que vous conceviez ou intégriez une salle de conférence, un bâtiment intelligent, que vous optimisiez vos systèmes AV en réseau ou exploriez l'intégration IA - JPrunier relie les technologies ensemble.", button: "Contactez-nous" },
    achievements: { title: "Réalisations", subtitle: "Demandez-nous des références liées à votre secteur d'activité." },
    ctaSection: { title: "Prêt à transformer votre environnement ?", subtitle: "Discutons de la façon dont JPrunier peut enrichir votre espace avec des solutions AV intelligentes.", button: "Planifier une consultation" },
  },
  about: {
    intro: "Fondée en 2020, JPrunier Inc. est une passerelle technologique dans les domaines audiovisuel, informatique et intelligence artificielle. Elle met à disposition de ses clients une expertise reconnue en développement logiciel, contrôle de systèmes, conception d'interfaces, intégration multiplateforme, configuration et administration de solutions audiovisuelles complexes.",
    mission: "Offrir des solutions audiovisuelles innovantes, fiables et intelligentes qui améliorent l'expérience humaine et favorisent le succès des entreprises.",
    vision: "Un monde où la technologie s'adapte naturellement aux besoins humains, créant des espaces qui inspirent, collaborent et innovent.",
    values: [
      { title: "Excellence", description: "Nous visons les plus hauts standards dans tout ce que nous faisons" },
      { title: "Innovation", description: "Nous adoptons les technologies émergentes pour résoudre des défis complexes" },
      { title: "Partenariat", description: "Nous bâtissons des relations durables avec nos clients et partenaires" },
      { title: "Fiabilité", description: "Nous tenons nos engagements grâce à une expertise éprouvée" },
    ],
  },
}

// Shared enriched data
const sharedCertifications = {
  en: { title: "Certifications", subtitle: "Industry-recognized certifications ensuring quality and expertise", badges: [
    { src: "/images/certifications/crestron-cmpg.webp", name: "Crestron Master Platinum Gold", issuer: "Crestron" },
    { src: "/images/certifications/qsys-control_201.webp", name: "Q-SYS Control 201", issuer: "QSC" },
    { src: "/images/certifications/qsys-level_2.webp", name: "Q-SYS Level 2", issuer: "QSC" },
    { src: "/images/certifications/qsys-reflect_enterprise_manager.webp", name: "Q-SYS Reflect Enterprise Manager", issuer: "QSC" },
  ]},
  fr: { title: "Certifications", subtitle: "Certifications reconnues par l'industrie garantissant qualité et expertise" },
}

const sharedWarranty = {
  en: { title: "Quality Guarantee", items: [
    "1-year warranty on all programming deliverables",
    "Technical validation and version traceability",
    "Post-deployment supervision and support",
    "Complete documentation",
    "15–30% of resource time dedicated to continuing education",
    "Manufacturer-independent recommendations",
  ]},
  fr: { title: "Garantie qualité", items: [
    "Garantie d'un an sur tous les livrables de programmation",
    "Validation technique et traçabilité des versions",
    "Supervision et support post-déploiement",
    "Documentation complète",
    "15 à 30 % du temps des ressources dédié à la formation continue",
    "Recommandations indépendantes des manufacturiers",
  ]},
}

const sharedBrochure = {
  en: { title: "Download CSP Brochure", description: "Get the complete JPrunier corporate services brochure.", fileUrl: "/docs/JPrunierInc_EN.V4.pdf", buttonText: "Download Brochure" },
  fr: { title: "Télécharger la brochure CSP", description: "Obtenez la brochure complète des services corporatifs de JPrunier.", fileUrl: "/docs/JPrunierInc_FR.V4.pdf", buttonText: "Télécharger la brochure" },
}

const programmingReferences = {
  en: { title: "References", subtitle: "Trusted by leading organizations across North America and Europe", clients: [
    { name: "Port of Montreal", logo: "/images/clients/port-de-montreal.webp", period: "2012–2025", url: "https://www.port-montreal.com" },
    { name: "Casino de Montréal", logo: "/images/clients/casino-mtl.webp", period: "2015–2020", url: "https://casinos.lotoquebec.com/fr/montreal" },
    { name: "CHU Sainte-Justine", logo: "/images/clients/chu-sainte-justine.webp", period: "2018–2025", url: "https://www.chusj.org" },
    { name: "Banque de France", logo: "/images/clients/banque-de-france.webp", period: "2025", url: "https://www.banque-france.fr" },
    { name: "Air France", logo: "/images/clients/air-france.webp", url: "https://www.airfrance.com" },
    { name: "Bell", logo: "/images/clients/bell.webp", url: "https://www.bell.ca" },
    { name: "WSP", logo: "/images/clients/wsp.webp", url: "https://www.wsp.com" },
    { name: "Pratt & Whitney", logo: "/images/clients/pratt.webp", url: "https://www.prattwhitney.com" },
    { name: "Solotech", logo: "/images/clients/solotech.webp", url: "https://www.solotech.com" },
    { name: "Fondaction", logo: "/images/clients/fondaction.webp", url: "https://www.fondaction.com" },
    { name: "Cain Lamarré", logo: "/images/clients/cain-lamarre.webp", url: "https://www.cainlamarre.ca" },
    { name: "ICAO", logo: "/images/clients/icao.webp", url: "https://www.icao.int" },
  ]},
  fr: { title: "Références", subtitle: "La confiance des grandes organisations en Amérique du Nord et en Europe", clients: [
    { name: "Port de Montréal" }, { name: "Casino de Montréal" }, { name: "CHU Sainte-Justine" },
    { name: "Banque de France" }, { name: "Air France" }, { name: "Bell" },
    { name: "WSP" }, { name: "Pratt & Whitney" }, { name: "Solotech" },
    { name: "Fondaction" }, { name: "Cain Lamarré" }, { name: "OACI" },
  ]},
}

const consultingReferences = {
  en: { title: "References", subtitle: "Trusted by leading organizations across North America and Europe", clients: [
    { name: "Port of Montreal", logo: "/images/clients/port-de-montreal.webp", period: "2012–2025", url: "https://www.port-montreal.com" },
    { name: "Casino de Montréal", logo: "/images/clients/casino-mtl.webp", period: "2015–2020", url: "https://casinos.lotoquebec.com/fr/montreal" },
    { name: "CHU Sainte-Justine", logo: "/images/clients/chu-sainte-justine.webp", period: "2018–2025", url: "https://www.chusj.org" },
    { name: "Banque de France", logo: "/images/clients/banque-de-france.webp", period: "2025", url: "https://www.banque-france.fr" },
    { name: "Air France", logo: "/images/clients/air-france.webp", url: "https://www.airfrance.com" },
    { name: "WSP", logo: "/images/clients/wsp.webp", url: "https://www.wsp.com" },
    { name: "Solotech", logo: "/images/clients/solotech.webp", url: "https://www.solotech.com" },
    { name: "ICAO", logo: "/images/clients/icao.webp", url: "https://www.icao.int" },
  ]},
  fr: { title: "Références", subtitle: "La confiance des grandes organisations en Amérique du Nord et en Europe" },
}

const adminReferences = {
  en: { title: "References", subtitle: "Trusted by leading organizations across North America and Europe", clients: [
    { name: "Port of Montreal", logo: "/images/clients/port-de-montreal.webp", period: "2012–2025", url: "https://www.port-montreal.com" },
    { name: "Casino de Montréal", logo: "/images/clients/casino-mtl.webp", period: "2015–2020", url: "https://casinos.lotoquebec.com/fr/montreal" },
    { name: "CHU Sainte-Justine", logo: "/images/clients/chu-sainte-justine.webp", period: "2018–2025", url: "https://www.chusj.org" },
    { name: "Banque de France", logo: "/images/clients/banque-de-france.webp", period: "2025", url: "https://www.banque-france.fr" },
    { name: "WSP", logo: "/images/clients/wsp.webp", url: "https://www.wsp.com" },
    { name: "Solotech", logo: "/images/clients/solotech.webp", url: "https://www.solotech.com" },
  ]},
  fr: { title: "Références", subtitle: "La confiance des grandes organisations en Amérique du Nord et en Europe" },
}

const integrationReferences = {
  en: { title: "References", subtitle: "Trusted by leading organizations across North America and Europe", clients: [
    { name: "Port of Montreal", logo: "/images/clients/port-de-montreal.webp", period: "2012–2025", url: "https://www.port-montreal.com" },
    { name: "Casino de Montréal", logo: "/images/clients/casino-mtl.webp", period: "2015–2020", url: "https://casinos.lotoquebec.com/fr/montreal" },
    { name: "CHU Sainte-Justine", logo: "/images/clients/chu-sainte-justine.webp", period: "2018–2025", url: "https://www.chusj.org" },
    { name: "Banque de France", logo: "/images/clients/banque-de-france.webp", period: "2025", url: "https://www.banque-france.fr" },
    { name: "Bell", logo: "/images/clients/bell.webp", url: "https://www.bell.ca" },
    { name: "WSP", logo: "/images/clients/wsp.webp", url: "https://www.wsp.com" },
    { name: "Pratt & Whitney", logo: "/images/clients/pratt.webp", url: "https://www.prattwhitney.com" },
    { name: "Solotech", logo: "/images/clients/solotech.webp", url: "https://www.solotech.com" },
  ]},
  fr: { title: "Références", subtitle: "La confiance des grandes organisations en Amérique du Nord et en Europe" },
}

const interfacesGalleryData = {
  en: { title: "Interface Examples", subtitle: "Custom touch panel interfaces designed and programmed by JPrunier", items: [
    { src: "/images/interfaces/mcd-byom.webp", alt: "BYOM Meeting Room Panel", caption: "Bring Your Own Meeting" },
    { src: "/images/interfaces/mcd-presentation.webp", alt: "Presentation Mode Panel", caption: "Presentation Mode" },
    { src: "/images/interfaces/mcd-vc.webp", alt: "Video Conference Panel", caption: "Video Conference" },
    { src: "/images/interfaces/vc-odc.webp", alt: "ODC Video Conference", caption: "Open Digital Collaboration" },
    { src: "/images/interfaces/screen-01.webp", alt: "Control Interface Detail", caption: "Interface Detail" },
    { src: "/images/interfaces/screen-02.webp", alt: "Control Interface Detail", caption: "Interface Detail" },
    { src: "/images/interfaces/screen-03.webp", alt: "Control Interface Detail", caption: "Interface Detail" },
    { src: "/images/interfaces/screen-04.webp", alt: "Control Interface Detail", caption: "Interface Detail" },
    { src: "/images/interfaces/screen-05.webp", alt: "Control Interface Detail", caption: "Interface Detail" },
    { src: "/images/interfaces/screen-06.webp", alt: "Control Interface Detail", caption: "Interface Detail" },
  ]},
  fr: { title: "Exemples d'interfaces", subtitle: "Interfaces tactiles personnalisées conçues et programmées par JPrunier", items: [
    { alt: "Panneau salle BYOM", caption: "Bring Your Own Meeting" },
    { alt: "Panneau mode présentation", caption: "Mode présentation" },
    { alt: "Panneau vidéoconférence", caption: "Vidéoconférence" },
    { alt: "Vidéoconférence ODC", caption: "Collaboration numérique ouverte" },
    { alt: "Détail interface de contrôle", caption: "Détail interface" },
    { alt: "Détail interface de contrôle", caption: "Détail interface" },
    { alt: "Détail interface de contrôle", caption: "Détail interface" },
    { alt: "Détail interface de contrôle", caption: "Détail interface" },
    { alt: "Détail interface de contrôle", caption: "Détail interface" },
    { alt: "Détail interface de contrôle", caption: "Détail interface" },
  ]},
}

// Services EN
const servicesEn = [
  {
    slug: "programming", title: "Programming", description: "Modern languages for AI and AV industries, JPrunier act as CSP with Crestron Certified programmer – Master Platinium certification.", icon: "Code", pageTitle: "AV & AI Programming", longDescription: "JPrunier develops custom firmware, control system applications, and AI-driven software for the audiovisual industry. As a Crestron Service Provider (CSP) with Master Platinum certification, we deliver robust solutions spanning from room control interfaces to cloud-connected AV management platforms.", bulletsLeft: ["Crestron Service Provider (CSP)", "Core Expertise", "Audio DSP, Dante, Video over IP"], bulletsRight: ["Microsoft Azure: devOps, Database, application", "User Interface", "Module, driver, plugin for AI – AV industries"], features: [{ title: "Crestron Control Programming", description: "SIMPL+, SIMPL#, and C# programming for 3-Series and 4-Series processors, touch panels, and NVX endpoints." }, { title: "Custom User Interfaces", description: "Design and development of intuitive touch panel interfaces, web-based dashboards, and mobile control apps." }, { title: "AI Integration Modules", description: "Development of plugins and drivers connecting AV systems to AI platforms like OpenAI, Azure Cognitive Services, and custom ML models." }, { title: "Cloud & DevOps", description: "Azure-based deployment pipelines, database management, and cloud-hosted AV monitoring applications." }], technologies: ["Crestron SIMPL+", "C#", "Python", "Azure", "OpenAI", "Dante", "Q-SYS", "React", "Node.js"], details: "We develop custom firmware and applications for Crestron, AMX, and other control systems.",
    audiovisualSection: { title: "Audiovisual Expertise", description: "JPrunier operates across B2B, B2C, and B2G sectors in Canada, Europe and the Middle East. Our programming expertise spans every layer of the audiovisual ecosystem, within architectures built on AV, IT, and AI technologies.", domains: ["Control Systems", "Video Distribution", "Audio Systems", "Lighting Control", "Environmental Management"] },
    extendedProgramming: { title: "Complete Programming Services", items: ["Development and maintenance of Crestron applications", "DSP programming (Q-SYS, Biamp, and others)", "Q-SYS control, Lua scripting, and plug-in development", "Python modules for Crestron and Q-SYS", "Multi-system standardization and normalization", "Cross-technology development (Crestron, Q-SYS, .NET, Linux, Python, Web, Cloud, Azure, REST APIs)", "Custom audiovisual application development", "User interface programming, including responsive interfaces", "NDI control interface development"], languages: "SIMPL, SIMPL+, SIMPL#, .NET, OpenAI, CHTML5, Python, Q-SYS Lua scripting, Q-SYS plugin, Dante, AWS, Azure" },
    aiBridgeSection: { title: "AI – IT Bridge", tagline: "Connected architectures designed for performance, scalability, and excellence in user experience.", description: "JPrunier bridges artificial intelligence and audiovisual technology. Our expertise in software development, AV-IT networking, protocol integration and multi-brand system standardization enables us to deliver solutions where AV hardware and AI software work as one.", capabilities: ["Custom AV-AI application design and development", "Technical analysis and architectural validation", "Monitoring and diagnostics of existing systems", "Multi-brand system standardization"] },
    interfacesGallery: interfacesGalleryData.en,
    certificationsSection: sharedCertifications.en,
    referencesSection: programmingReferences.en,
    warrantySection: sharedWarranty.en,
    brochureDownload: sharedBrochure.en,
  },
  {
    slug: "consulting", title: "Consulting", description: "Our consulting services are designed to support engineering firms, technology architects, audiovisual consultants, and system integrators.", icon: "Lightbulb", pageTitle: "AV-IT-AI Consulting", longDescription: "JPrunier's consulting practice bridges the gap between audiovisual engineering, IT infrastructure, and artificial intelligence.", features: [{ title: "Technology Assessment", description: "Comprehensive evaluation of existing AV and IT infrastructure with recommendations for modernization." }, { title: "System Design & Architecture", description: "Detailed technical designs for conference rooms, auditoriums, command centers, and smart building environments." }, { title: "Vendor Selection Support", description: "Impartial guidance on technology selection, helping you choose the right platforms." }, { title: "Project Management", description: "End-to-end project oversight ensuring timelines, budgets, and quality standards are met." }], technologies: ["Crestron", "QSC", "Biamp", "Dante", "Microsoft Teams", "Zoom", "Cisco Webex"], details: "Our consultants work with you to understand your needs and design solutions that maximize ROI.",
    aiBridgeSection: { title: "AI – IT Bridge", tagline: "Connected architectures designed for performance, scalability, and excellence in user experience.", description: "Our consulting practice bridges audiovisual engineering, IT infrastructure, and artificial intelligence. We support engineering firms, technology architects, and integrators in designing future-ready ecosystems.", capabilities: ["Custom application design and development (AV-IT-AI)", "Technical analysis and architectural validation", "Monitoring and diagnostics of existing systems", "Best-practice guidance for integration and supervision", "Project oversight and installation supervision"] },
    certificationsSection: sharedCertifications.en,
    referencesSection: consultingReferences.en,
    warrantySection: sharedWarranty.en,
    brochureDownload: sharedBrochure.en,
  },
  {
    slug: "administration", title: "Administration", description: "Our administration services ensure the reliability, supervision and performance of audiovisual, computing and network systems.", icon: "Settings", pageTitle: "System Administration", longDescription: "Keeping AV and IT systems running at peak performance requires constant vigilance and expertise.", features: [{ title: "Remote Monitoring & Support", description: "24/7 monitoring of AV systems with proactive alerts and rapid remote troubleshooting." }, { title: "Firmware & Software Updates", description: "Scheduled maintenance cycles for control processors, DSPs, network switches." }, { title: "Network Administration", description: "VLAN configuration, QoS optimization, and security management for AV-over-IP networks." }, { title: "Performance Reporting", description: "Regular reports on system health, usage analytics, and capacity planning recommendations." }], technologies: ["Crestron XiO Cloud", "QSC Reflect", "Dante Director", "SNMP", "Syslog", "Azure Monitor"], details: "We provide ongoing system administration, monitoring, and maintenance.",
    aiBridgeSection: { title: "AI – IT Bridge", tagline: "Connected architectures designed for performance, scalability, and excellence in user experience.", description: "Our administration services ensure system stability across AV-IT-AI environments. We manage AV-IT networking including multicast architectures, Dante audio, Crestron XiO Cloud, Crestron Fusion, and Microsoft Azure environments.", capabilities: ["AV-IT networking with multicast architectures", "Dante audio configuration, optimization and monitoring", "XiO Cloud and Crestron Fusion integration and development", "Microsoft Azure environment management and supervision"] },
    certificationsSection: sharedCertifications.en,
    referencesSection: adminReferences.en,
    warrantySection: sharedWarranty.en,
    brochureDownload: sharedBrochure.en,
  },
  {
    slug: "integration", title: "Integration", description: "JPrunier Inc. provides software implementation and configuration for all audiovisual, AI and IT equipment.", icon: "Zap", pageTitle: "AV-AI Integration", longDescription: "JPrunier delivers turnkey integration services that bring together audiovisual hardware, control systems, networking, and AI capabilities.", features: [{ title: "Hardware Deployment", description: "Professional installation and configuration of displays, projectors, cameras, microphones, speakers." }, { title: "AV-over-IP Networks", description: "Design and deployment of Dante, AES67, and NVX video-over-IP networks." }, { title: "Collaboration Room Setup", description: "Complete deployment of Microsoft Teams Rooms, Zoom Rooms, and Cisco Webex devices." }, { title: "Commissioning & Training", description: "Rigorous testing, documentation, and end-user training." }], technologies: ["Crestron NVX", "Dante", "AES67", "HDBaseT", "Microsoft Teams", "Zoom", "Cisco", "Shure"], details: "From design through deployment, we handle the complete integration process.",
    aiBridgeSection: { title: "AI – IT Bridge", tagline: "Connected architectures designed for performance, scalability, and excellence in user experience.", description: "JPrunier delivers integration services that bring together AV hardware, control systems, networking, and AI capabilities. We provide software deployment and configuration for all audiovisual and IT equipment, including unified communications platforms.", capabilities: ["Professional software installation and configuration", "AV-over-IP network deployment (Dante, AES67, NVX)", "Collaboration platform integration (Teams, Zoom, Webex)", "Commissioning, testing, and end-user training"] },
    interfacesGallery: interfacesGalleryData.en,
    certificationsSection: sharedCertifications.en,
    referencesSection: integrationReferences.en,
    warrantySection: sharedWarranty.en,
    brochureDownload: sharedBrochure.en,
  },
]

// Services FR
const servicesFr = [
  {
    slug: "programming", title: "Programmation", description: "Langages modernes pour les industries IA et AV, JPrunier agit en tant que CSP avec la certification Crestron Certified Programmer – Master Platinium.", pageTitle: "Programmation AV & IA", longDescription: "JPrunier développe des micrologiciels personnalisés, des applications de systèmes de contrôle et des logiciels propulsés par l'IA pour l'industrie audiovisuelle.", bulletsLeft: ["Fournisseur de services Crestron (CSP)", "Expertise de base", "Audio DSP, Dante, Vidéo sur IP"], bulletsRight: ["Microsoft Azure : devOps, base de données, application", "Interface utilisateur", "Module, pilote, plugin pour les industries IA – AV"], features: [{ title: "Programmation Crestron", description: "Programmation SIMPL+, SIMPL# et C# pour processeurs 3-Series et 4-Series." }, { title: "Interfaces utilisateur personnalisées", description: "Conception et développement d'interfaces tactiles intuitives, tableaux de bord web et applications de contrôle mobile." }, { title: "Modules d'intégration IA", description: "Développement de plugins et pilotes connectant les systèmes AV aux plateformes IA." }, { title: "Cloud & DevOps", description: "Pipelines de déploiement Azure, gestion de bases de données et applications de surveillance AV." }], details: "Nous développons des micrologiciels et des applications personnalisés pour Crestron, AMX et d'autres systèmes de contrôle.",
    audiovisualSection: { title: "Expertise audiovisuelle", description: "JPrunier opère auprès des secteurs B2B, B2C et B2G au Canada, en Europe et au Moyen-Orient. Notre expertise en programmation couvre chaque couche de l'écosystème audiovisuel, au sein d'architectures reposant sur les technologies AV, TI et IA.", domains: ["Systèmes de contrôle", "Distribution vidéo", "Systèmes audio", "Contrôle d'éclairage", "Gestion environnementale"] },
    extendedProgramming: { title: "Services de programmation complets", items: ["Développement et maintenance d'applications Crestron", "Programmation DSP audio Q-SYS, Biamp, et autres", "Q-SYS contrôle, Lua scripting, plugin", "Python module pour Crestron et Q-SYS", "Standardisation et normalisation multi-systèmes", "Développement intertechnologique (Crestron, Q-SYS, .NET, Linux, Python, Web, Cloud, Azure, API REST)", "Développement application personnalisée pour l'audiovisuel", "Programmation interface utilisateur, interface responsive", "Développement interface de contrôle NDI"], languages: "SIMPL, SIMPL+, SIMPL#, .NET, OpenAI, CHTML5, Python, Q-SYS Lua scripting, Q-SYS plugin, Dante, AWS, Azure" },
    aiBridgeSection: { title: "Passerelle IA – TI", tagline: "Des architectures connectées conçues pour la performance, l'évolutivité et l'excellence de l'expérience utilisateur.", description: "JPrunier fait le pont entre l'intelligence artificielle et l'audiovisuel. Notre expertise en développement logiciel, réseaux AV-TI, intégration de protocoles et standardisation multi-constructeurs nous permet de livrer des solutions où le matériel AV et les logiciels IA fonctionnent comme un tout.", capabilities: ["Conception et développement d'applications AV-IA sur mesure", "Analyse technique et validation d'architectures", "Surveillance et diagnostic de systèmes existants", "Standardisation de systèmes multi-constructeurs"] },
    interfacesGallery: interfacesGalleryData.fr,
    certificationsSection: sharedCertifications.fr,
    referencesSection: programmingReferences.fr,
    warrantySection: sharedWarranty.fr,
    brochureDownload: sharedBrochure.fr,
  },
  {
    slug: "consulting", title: "Conseil", description: "Nos services de conseil sont conçus pour accompagner les firmes d'ingénierie, les architectes technologiques et les intégrateurs.", pageTitle: "Conseil AV-TI-IA", longDescription: "La pratique de conseil de JPrunier fait le pont entre l'ingénierie audiovisuelle, l'infrastructure TI et l'intelligence artificielle.", features: [{ title: "Évaluation technologique", description: "Évaluation complète de l'infrastructure AV et TI existante avec recommandations." }, { title: "Conception et architecture", description: "Conceptions techniques détaillées pour salles de conférence, auditoriums et centres de commandement." }, { title: "Sélection de fournisseurs", description: "Accompagnement impartial dans le choix des technologies." }, { title: "Gestion de projet", description: "Supervision de bout en bout garantissant le respect des échéanciers et budgets." }], details: "Nos consultants travaillent avec vous pour comprendre vos besoins et concevoir des solutions.",
    aiBridgeSection: { title: "Passerelle IA – TI", tagline: "Des architectures connectées conçues pour la performance, l'évolutivité et l'excellence de l'expérience utilisateur.", description: "Notre pratique de consultation fait le pont entre l'ingénierie audiovisuelle, l'infrastructure TI et l'intelligence artificielle. Nous accompagnons les firmes d'ingénierie, les architectes technologiques et les intégrateurs dans la conception d'écosystèmes prêts pour l'avenir.", capabilities: ["Conception applicative et développement sur mesure (AV-TI-IA)", "Analyse technique et validation d'architectures", "Surveillance et diagnostic de systèmes existants", "Conseil technologique sur les meilleures pratiques d'intégration", "Encadrement de projets et supervision d'installation"] },
    certificationsSection: sharedCertifications.fr,
    referencesSection: consultingReferences.fr,
    warrantySection: sharedWarranty.fr,
    brochureDownload: sharedBrochure.fr,
  },
  {
    slug: "administration", title: "Administration", description: "Nos services d'administration assurent la fiabilité, la supervision et la performance des systèmes audiovisuels.", pageTitle: "Administration système", longDescription: "Maintenir les systèmes AV et TI à leur performance optimale exige une vigilance et une expertise constantes.", features: [{ title: "Surveillance et support à distance", description: "Surveillance 24/7 des systèmes AV avec alertes proactives." }, { title: "Mises à jour logicielles", description: "Cycles de maintenance planifiés pour processeurs de contrôle, DSP, commutateurs réseau." }, { title: "Administration réseau", description: "Configuration VLAN, optimisation QoS et gestion de la sécurité." }, { title: "Rapports de performance", description: "Rapports réguliers sur la santé des systèmes et analytiques d'utilisation." }], details: "Nous offrons une administration système continue, une surveillance et une maintenance.",
    aiBridgeSection: { title: "Passerelle IA – TI", tagline: "Des architectures connectées conçues pour la performance, l'évolutivité et l'excellence de l'expérience utilisateur.", description: "Nos services d'administration assurent la stabilité des systèmes dans les environnements AV-TI-IA. Nous gérons les réseaux AV-TI incluant les architectures multicast, l'audio Dante, Crestron XiO Cloud, Crestron Fusion et les environnements Microsoft Azure.", capabilities: ["Réseaux AV-TI avec architectures multicast", "Configuration, optimisation et surveillance audio Dante", "Intégration et développement XiO Cloud et Crestron Fusion", "Gestion et supervision des environnements Microsoft Azure"] },
    certificationsSection: sharedCertifications.fr,
    referencesSection: adminReferences.fr,
    warrantySection: sharedWarranty.fr,
    brochureDownload: sharedBrochure.fr,
  },
  {
    slug: "integration", title: "Intégration", description: "JPrunier Inc. fournit l'implémentation et la configuration logicielle pour tous les équipements audiovisuels, IA et informatiques.", pageTitle: "Intégration AV-IA", longDescription: "JPrunier livre des services d'intégration clé en main qui rassemblent matériel audiovisuel, systèmes de contrôle, réseautage et capacités IA.", features: [{ title: "Déploiement matériel", description: "Installation et configuration professionnelles d'écrans, projecteurs, caméras." }, { title: "Réseaux AV-sur-IP", description: "Conception et déploiement de réseaux Dante, AES67 et vidéo-sur-IP NVX." }, { title: "Salles de collaboration", description: "Déploiement complet de Microsoft Teams Rooms, Zoom Rooms et appareils Cisco Webex." }, { title: "Mise en service et formation", description: "Tests rigoureux, documentation et formation des utilisateurs." }], details: "De la conception au déploiement, nous gérons l'ensemble du processus d'intégration.",
    aiBridgeSection: { title: "Passerelle IA – TI", tagline: "Des architectures connectées conçues pour la performance, l'évolutivité et l'excellence de l'expérience utilisateur.", description: "JPrunier livre des services d'intégration qui rassemblent matériel AV, systèmes de contrôle, réseautage et capacités IA. Nous fournissons le déploiement et la configuration logicielle pour tous les équipements audiovisuels et informatiques, incluant les plateformes de communications unifiées.", capabilities: ["Installation et configuration logicielle professionnelle", "Déploiement de réseaux AV-sur-IP (Dante, AES67, NVX)", "Intégration de plateformes de collaboration (Teams, Zoom, Webex)", "Mise en service, tests et formation des utilisateurs"] },
    interfacesGallery: interfacesGalleryData.fr,
    certificationsSection: sharedCertifications.fr,
    referencesSection: integrationReferences.fr,
    warrantySection: sharedWarranty.fr,
    brochureDownload: sharedBrochure.fr,
  },
]

// Testimonials
const testimonialsEn = [
  { author: "Marie Dupont", title: "IT Director", company: "Banque Nationale", text: "JPrunier transformed our boardroom experience. Their expertise in Crestron integration is unmatched, and the support has been exceptional.", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
  { author: "David Chen", title: "Facilities Manager", company: "Tech Innovation Hub", text: "The AI-powered automation they implemented has saved us countless hours. Their team is professional, responsive, and truly understands our needs.", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { author: "Sophie Martin", title: "Campus Director", company: "École Polytechnique", text: "JPrunier's consulting services helped us design a scalable AV infrastructure for our campus. Their foresight has proven invaluable.", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
]
const testimonialsFr = [
  { title: "Directrice TI", text: "JPrunier a transformé l'expérience de notre salle de conseil. Leur expertise en intégration Crestron est inégalée, et le soutien a été exceptionnel." },
  { title: "Gestionnaire des installations", text: "L'automatisation alimentée par l'IA qu'ils ont mise en place nous a fait gagner un temps considérable. Leur équipe est professionnelle, réactive et comprend véritablement nos besoins." },
  { title: "Directrice de campus", text: "Les services de conseil de JPrunier nous ont aidés à concevoir une infrastructure AV évolutive pour notre campus. Leur vision s'est avérée inestimable." },
]

// News
const newsEn = [
  { title: "ISE 2026", excerpt: "A busy start to the week at ISE 2026. Strategic exchanges with our Canadian and European clients.", date: "2026-02-04", image: "images/bg-ia-av-spheres.jpg", linkedinUrl: "https://www.linkedin.com/company/jprunier-inc" },
  { title: "See you in Barcelona!", excerpt: "JPrunier Inc. will be present at ISE 2026 in Barcelona, from February 3 to 6.", date: "2026-01-26", image: "images/bg-bubbles.png", linkedinUrl: "https://www.linkedin.com/company/jprunier-inc" },
  { title: "JPrunier Inc. — Your AV-IT-AI technology gateway", excerpt: "Software development, integration solutions. Canada - Europe - Middle East.", date: "2025-10-28", image: "images/bg-neural-network.png", linkedinUrl: "https://www.linkedin.com/company/jprunier-inc" },
  { title: "Beautiful integration by Naoli and Alive Technology", excerpt: "A stunning integration project showcasing the best of AV and AI working together.", date: "2025-10-19", image: "images/bg-ai-generated.png", linkedinUrl: "https://www.linkedin.com/company/jprunier-inc" },
]
const newsFr = [
  { title: "ISE 2026", excerpt: "Début de semaine bien rempli à ISE 2026. Échanges stratégiques avec nos clients canadiens et européens." },
  { title: "Rendez-vous à Barcelone !", excerpt: "JPrunier Inc. sera présent à l'ISE 2026 à Barcelone, du 03 au 06 février prochain." },
  { title: "JPrunier Inc. — Votre passerelle technologique AV-TI-AI", excerpt: "Développement de solutions logicielles. Canada - Europe - Moyen-Orient." },
  { title: "Très belle intégration signée Naoli et Alive Technology", excerpt: "Un projet d'intégration impressionnant démontrant le meilleur de l'AV et de l'IA ensemble." },
]

// Sectors
const sectorsEn = ["Commercial", "Enterprise", "Development", "Healthcare", "Government", "Education"]
const sectorsFr = ["Commercial", "Entreprise", "Développement", "Santé", "Gouvernement", "Éducation"]

// Services page content
const servicesPageEn = {
  intro: "From programming and consulting to system administration and integration, we provide comprehensive solutions tailored to your specific needs.",
  crestron: { title: "Crestron Control System Specialist", description: "We are certified Crestron specialists with deep expertise in Crestron-based control systems.", capabilities: ["Crestron DM-MD Systems (Video Matrix Switching)", "Crestron DMPS (Digital Media Presentation Systems)", "Crestron DigitalMedia Fiber Technology", "Crestron AirMedia Wireless Presentation", "Crestron Control System Programming (SIMPL+)", "Crestron Airmedia & DXLink Certification", "Room Booking Integration", "Voice Control Integration"] },
  expertise: { title: "Core Expertise", categories: [{ name: "Control Systems", items: ["Crestron DM-MD", "Crestron DMPS", "AMX NetLinx", "QSC Q-SYS"] }, { name: "Audio Solutions", items: ["Dante Networking", "AES67 Audio", "Wireless Microphone Systems", "Professional Mixing"] }, { name: "Video Technology", items: ["4K/8K Distribution", "DigitalMedia Fiber", "DXLink", "HDBaseT"] }, { name: "Collaboration Platforms", items: ["Zoom Rooms", "Microsoft Teams Rooms", "Cisco Webex", "Google Meet"] }] },
}
const servicesPageFr = {
  intro: "De la programmation et du conseil à l'administration système et à l'intégration, nous offrons des solutions complètes adaptées à vos besoins spécifiques.",
  crestron: { title: "Spécialiste des systèmes de contrôle Crestron", description: "Nous sommes des spécialistes certifiés Crestron avec une expertise approfondie des systèmes de contrôle Crestron.", capabilities: ["Systèmes Crestron DM-MD (Commutation vidéo matricielle)", "Crestron DMPS (Systèmes de présentation média numérique)", "Technologie fibre optique Crestron DigitalMedia", "Présentation sans fil Crestron AirMedia", "Programmation de systèmes de contrôle Crestron (SIMPL+)", "Certification Crestron AirMedia & DXLink", "Intégration de réservation de salles", "Intégration de contrôle vocal"] },
  expertise: { title: "Expertise de base", categories: [{ name: "Systèmes de contrôle", items: ["Crestron DM-MD", "Crestron DMPS", "AMX NetLinx", "QSC Q-SYS"] }, { name: "Solutions audio", items: ["Réseau Dante", "Audio AES67", "Systèmes de microphones sans fil", "Mixage professionnel"] }, { name: "Technologie vidéo", items: ["Distribution 4K/8K", "Fibre DigitalMedia", "DXLink", "HDBaseT"] }, { name: "Plateformes de collaboration", items: ["Zoom Rooms", "Microsoft Teams Rooms", "Cisco Webex", "Google Meet"] }] },
}

// UI Strings
const uiStringsData: { key: string; en: string; fr: string }[] = [
  { key: "nav.about", en: "About", fr: "À propos" },
  { key: "nav.services", en: "Services", fr: "Services" },
  { key: "nav.contact", en: "Contact", fr: "Contact" },
  { key: "nav.news", en: "News", fr: "Nouvelles" },
  { key: "home.technologies", en: "Technologies", fr: "Technologies" },
  { key: "home.technologies_suffix", en: " we integrate", fr: " que nous intégrons" },
  { key: "home.global_services", en: "Global Services", fr: "Services globaux" },
  { key: "home.ai_av", en: "AI & AV", fr: "IA & AV" },
  { key: "home.here_we_are", en: "Here we are.", fr: "Nous y sommes." },
  { key: "home.expertise_title", en: "Expertise you can trust", fr: "Une expertise de confiance" },
  { key: "home.questions", en: "Do you have any questions?", fr: "Vous avez des questions ?" },
  { key: "home.email_us", en: "Email us", fr: "Écrivez-nous" },
  { key: "home.sectors_title", en: "Active across all sectors", fr: "Actifs dans tous les secteurs" },
  { key: "about.who_we_are", en: "Who We Are", fr: "Qui sommes-nous" },
  { key: "about.our_mission", en: "Our Mission", fr: "Notre mission" },
  { key: "about.our_vision", en: "Our Vision", fr: "Notre vision" },
  { key: "about.core_values", en: "Our Core Values", fr: "Nos valeurs fondamentales" },
  { key: "about.values_subtitle", en: "Guiding principles that define who we are", fr: "Les principes qui nous définissent" },
  { key: "about.testimonials_title", en: "What Our Clients Say", fr: "Ce que disent nos clients" },
  { key: "about.testimonials_subtitle", en: "Trusted by leading organizations", fr: "La confiance des grandes organisations" },
  { key: "contact.send_message", en: "Send us a Message", fr: "Envoyez-nous un message" },
  { key: "contact.name", en: "Name", fr: "Nom" },
  { key: "contact.name_placeholder", en: "Your name", fr: "Votre nom" },
  { key: "contact.email", en: "Email", fr: "Courriel" },
  { key: "contact.email_placeholder", en: "your@email.com", fr: "votre@courriel.com" },
  { key: "contact.phone", en: "Phone", fr: "Téléphone" },
  { key: "contact.phone_placeholder", en: "+1 (514) 555-0000", fr: "+1 (514) 555-0000" },
  { key: "contact.company", en: "Company", fr: "Entreprise" },
  { key: "contact.company_placeholder", en: "Your company", fr: "Votre entreprise" },
  { key: "contact.message", en: "Message", fr: "Message" },
  { key: "contact.message_placeholder", en: "Tell us about your project", fr: "Parlez-nous de votre projet" },
  { key: "contact.submit", en: "Send Message", fr: "Envoyer" },
  { key: "contact.montreal_office", en: "Montreal Office", fr: "Bureau de Montréal" },
  { key: "contact.paris_office", en: "Paris Office", fr: "Bureau de Paris" },
  { key: "contact.address", en: "Address", fr: "Adresse" },
  { key: "contact.locations", en: "Our Locations", fr: "Nos emplacements" },
  { key: "contact.map_coming", en: "Interactive maps coming soon", fr: "Cartes interactives à venir" },
  { key: "contact.success", en: "Thank you for your message! We will be in touch soon.", fr: "Merci pour votre message ! Nous vous contacterons bientôt." },
  { key: "news.stay_updated", en: "Stay Updated", fr: "Restez informé" },
  { key: "news.read_more", en: "Read More →", fr: "Lire la suite →" },
  { key: "news.read_on_linkedin", en: "Read on LinkedIn", fr: "Lire sur LinkedIn" },
  { key: "news.follow_us", en: "Follow us on LinkedIn", fr: "Suivez-nous sur LinkedIn" },
  { key: "news.follow_text", en: "Stay connected with our latest projects, events, and industry insights.", fr: "Restez connectés avec nos derniers projets, événements et perspectives de l'industrie." },
  { key: "news.follow_linkedin", en: "Follow JPrunier", fr: "Suivre JPrunier" },
  { key: "news.by", en: "By", fr: "Par" },
  { key: "services.back", en: "Back to Services", fr: "Retour aux services" },
  { key: "services.what_we_offer", en: "What we offer", fr: "Ce que nous offrons" },
  { key: "services.key_capabilities", en: "Key Capabilities", fr: "Capacités clés" },
  { key: "services.technologies", en: "Technologies", fr: "Technologies" },
  { key: "services.need_help", en: "Need this service?", fr: "Besoin de ce service ?" },
  { key: "services.cta_text", en: "Contact us to discuss your project and discover how we can help.", fr: "Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider." },
  { key: "services.other_services", en: "Explore our other services", fr: "Explorez nos autres services" },
  { key: "services.learn_more", en: "Learn more", fr: "En savoir plus" },
  { key: "services.audiovisual", en: "Audiovisual Expertise", fr: "Expertise audiovisuelle" },
  { key: "services.ai_bridge", en: "AI – IT Bridge", fr: "Passerelle IA – TI" },
  { key: "services.interfaces", en: "Interface Examples", fr: "Exemples d'interfaces" },
  { key: "services.certifications", en: "Certifications", fr: "Certifications" },
  { key: "services.references", en: "References", fr: "Références" },
  { key: "services.download_brochure", en: "Download Brochure", fr: "Télécharger la brochure" },
  { key: "services.quality_guarantee", en: "Quality Guarantee", fr: "Garantie qualité" },
  { key: "services.our_domains", en: "Our domains", fr: "Nos domaines" },
  { key: "services.extended_services", en: "Complete Services", fr: "Services complets" },
  { key: "footer.rights", en: "All rights reserved.", fr: "Tous droits réservés." },
]

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding JPrunier data...')

  // Create admin user if none exists
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    console.log('→ Creating admin user...')
    await payload.create({
      collection: 'users',
      data: { email: 'admin@jprunier.com', password: 'JPrunier2026' },
    })
    console.log('  Admin user created: admin@jprunier.com')
  } else {
    console.log('→ Admin user already exists, skipping...')
  }

  // Clear existing collection data
  console.log('→ Clearing existing collections...')
  for (const col of ['services', 'testimonials', 'news-articles', 'sectors'] as const) {
    const existing = await payload.find({ collection: col, limit: 100 })
    for (const doc of existing.docs) {
      await payload.delete({ collection: col, id: doc.id })
    }
  }

  // 1. Site Settings
  console.log('→ Site Settings (EN)...')
  const settingsResult = await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      companyName: contentEn.company.name,
      tagline: contentEn.company.tagline,
      description: contentEn.company.description,
      founded: contentEn.company.founded,
      offices: contentEn.offices,
      social: contentEn.social,
    },
  })
  const settingsOfficeIds = ((settingsResult as any).offices || []).map((o: any) => o.id)
  console.log('→ Site Settings (FR)...')
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'fr',
    data: {
      companyName: contentFr.company.name,
      tagline: contentFr.company.tagline,
      description: contentFr.company.description,
      offices: contentFr.offices.map((o: any, i: number) => ({ id: settingsOfficeIds[i], ...contentEn.offices[i], ...o })),
    },
  })

  // 2. Home Page
  console.log('→ Home Page (EN)...')
  const homeResult = await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      hero: contentEn.hero.home,
      servicesIntro: contentEn.home.servicesIntro,
      gateway: contentEn.home.gateway,
      techPartners: contentEn.home.techPartners,
      connectingItems: contentEn.home.connectingItems,
      expertiseItems: contentEn.home.expertiseItems,
      discoverCta: contentEn.home.discoverCta,
      achievements: contentEn.home.achievements,
      ctaSection: contentEn.home.ctaSection,
    },
  })
  const homeConnIds = ((homeResult as any).connectingItems || []).map((i: any) => i.id)
  const homeExpIds = ((homeResult as any).expertiseItems || []).map((i: any) => i.id)
  const homeTpIds = ((homeResult as any).techPartners || []).map((i: any) => i.id)
  console.log('→ Home Page (FR)...')
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'fr',
    data: {
      hero: contentFr.hero.home,
      servicesIntro: contentFr.home.servicesIntro,
      gateway: contentFr.home.gateway,
      techPartners: (contentFr.home.techPartners || contentEn.home.techPartners).map((t: any, i: number) => ({ id: homeTpIds[i], ...t })),
      connectingItems: contentFr.home.connectingItems.map((c: any, i: number) => ({ id: homeConnIds[i], ...c })),
      expertiseItems: contentFr.home.expertiseItems.map((e: any, i: number) => ({ id: homeExpIds[i], ...e })),
      discoverCta: contentFr.home.discoverCta,
      achievements: contentFr.home.achievements,
      ctaSection: contentFr.home.ctaSection,
    },
  })

  // 3. About Page
  console.log('→ About Page (EN)...')
  const aboutResult = await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: { hero: contentEn.hero.about, intro: contentEn.about.intro, mission: contentEn.about.mission, vision: contentEn.about.vision, values: contentEn.about.values },
  })
  const aboutValIds = ((aboutResult as any).values || []).map((v: any) => v.id)
  console.log('→ About Page (FR)...')
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'fr',
    data: {
      hero: contentFr.hero.about,
      intro: contentFr.about.intro,
      mission: contentFr.about.mission,
      vision: contentFr.about.vision,
      values: contentFr.about.values.map((v: any, i: number) => ({ id: aboutValIds[i], ...v })),
    },
  })

  // 4. Services Page
  console.log('→ Services Page (EN)...')
  const svcPageResult = await payload.updateGlobal({
    slug: 'services-page',
    locale: 'en',
    data: {
      hero: contentEn.hero.services,
      intro: servicesPageEn.intro,
      crestronSection: { title: servicesPageEn.crestron.title, description: servicesPageEn.crestron.description, capabilities: servicesPageEn.crestron.capabilities.map((c: string) => ({ text: c })) },
      expertise: { title: servicesPageEn.expertise.title, categories: servicesPageEn.expertise.categories.map((c: any) => ({ name: c.name, items: c.items.map((i: string) => ({ text: i })) })) },
    },
  })
  const capIds = ((svcPageResult as any).crestronSection?.capabilities || []).map((c: any) => c.id)
  const catData = ((svcPageResult as any).expertise?.categories || [])
  console.log('→ Services Page (FR)...')
  await payload.updateGlobal({
    slug: 'services-page',
    locale: 'fr',
    data: {
      hero: contentFr.hero.services,
      intro: servicesPageFr.intro,
      crestronSection: {
        title: servicesPageFr.crestron.title,
        description: servicesPageFr.crestron.description,
        capabilities: servicesPageFr.crestron.capabilities.map((c: string, i: number) => ({ id: capIds[i], text: c })),
      },
      expertise: {
        title: servicesPageFr.expertise.title,
        categories: servicesPageFr.expertise.categories.map((c: any, i: number) => ({
          id: catData[i]?.id,
          name: c.name,
          items: c.items.map((item: string, j: number) => ({ id: catData[i]?.items?.[j]?.id, text: item })),
        })),
      },
    },
  })

  // 5. Contact Page
  console.log('→ Contact Page...')
  await payload.updateGlobal({ slug: 'contact-page', locale: 'en', data: { hero: contentEn.hero.contact } })
  await payload.updateGlobal({ slug: 'contact-page', locale: 'fr', data: { hero: contentFr.hero.contact } })

  // 6. News Page
  console.log('→ News Page...')
  await payload.updateGlobal({ slug: 'news-page', locale: 'en', data: { hero: contentEn.hero.news } })
  await payload.updateGlobal({ slug: 'news-page', locale: 'fr', data: { hero: contentFr.hero.news } })

  // 7. UI Strings
  console.log('→ UI Strings (EN)...')
  const uiResult = await payload.updateGlobal({
    slug: 'ui-strings',
    locale: 'en',
    data: { strings: uiStringsData.map(s => ({ key: s.key, value: s.en })) },
  })
  console.log('→ UI Strings (FR)...')
  const uiStringsWithIds = (uiResult as any).strings || []
  await payload.updateGlobal({
    slug: 'ui-strings',
    locale: 'fr',
    data: {
      strings: uiStringsWithIds.map((item: any, i: number) => ({
        id: item.id,
        key: item.key,
        value: uiStringsData[i].fr,
      })),
    },
  })

  // 8. Upload media files so admin panel shows thumbnails
  console.log('→ Uploading media files...')

  // Upload all interface screenshots
  for (const item of interfacesGalleryData.en.items) {
    await uploadMedia(payload, item.src, item.alt, 'interface', interfacesGalleryData.fr.items.find((f: any) => true)?.alt)
  }

  // Upload certification badges
  const certBadges = [
    { src: '/images/certifications/crestron-cmpg.webp', alt: 'Crestron Master Programmer Gold', altFr: 'Programmeur Maître Crestron Or' },
    { src: '/images/certifications/qsys-control_201.webp', alt: 'Q-SYS Control 201', altFr: 'Contrôle Q-SYS 201' },
    { src: '/images/certifications/qsys-level_2.webp', alt: 'Q-SYS Level 2', altFr: 'Q-SYS Niveau 2' },
    { src: '/images/certifications/qsys-reflect_enterprise_manager.webp', alt: 'Q-SYS Reflect Enterprise Manager', altFr: 'Q-SYS Reflect Enterprise Manager' },
  ]
  for (const badge of certBadges) {
    await uploadMedia(payload, badge.src, badge.alt, 'certification', badge.altFr)
  }

  // Upload client logos
  const clientLogoPaths = [
    'port-de-montreal', 'casino-mtl', 'chu-sainte-justine', 'banque-de-france',
    'air-france', 'bell', 'wsp', 'pratt', 'solotech', 'fondaction', 'cain-lamarre', 'icao',
    'national-bank', 'intact', 'cn', 'rbc', 'rio-tinto',
  ]
  for (const name of clientLogoPaths) {
    await uploadMedia(payload, `/images/clients/${name}.webp`, name, 'client')
  }

  // Upload brochures
  await uploadMedia(payload, '/docs/JPrunierInc_EN.V4.pdf', 'JPrunier Brochure EN', 'brochure', 'Brochure JPrunier EN')
  await uploadMedia(payload, '/docs/JPrunierInc_FR.V4.pdf', 'JPrunier Brochure FR', 'brochure', 'Brochure JPrunier FR')

  // Upload backgrounds
  await uploadMedia(payload, '/images/bg-ai-generated.png', 'AI Generated Background', 'background')
  await uploadMedia(payload, '/images/bg-bubbles.png', 'Bubbles Background', 'background')
  await uploadMedia(payload, '/images/bg-variante.png', 'Variant Background', 'background')

  console.log('→ Media uploads complete')

  // 9. Services collection
  console.log('→ Services...')
  for (let i = 0; i < servicesEn.length; i++) {
    const en = servicesEn[i] as any
    const fr = servicesFr[i] as any

    // Build interfaces gallery items with static paths
    let galleryItems: any[] | undefined
    if (en.interfacesGallery?.items) {
      galleryItems = en.interfacesGallery.items.map((item: any) => ({
        image: item.src,
        caption: item.caption,
      }))
    }

    // Build certification badges with static paths
    let badgeItems: any[] | undefined
    if (en.certificationsSection?.badges) {
      badgeItems = en.certificationsSection.badges.map((badge: any) => ({
        image: badge.src,
        name: badge.name,
        issuer: badge.issuer,
      }))
    }

    // Build client references with static paths
    let clientItems: any[] | undefined
    if (en.referencesSection?.clients) {
      clientItems = en.referencesSection.clients.map((client: any) => ({
        name: client.name,
        logo: client.logo,
        period: client.period,
      }))
    }

    const doc = await payload.create({
      collection: 'services',
      locale: 'en',
      data: {
        slug: en.slug,
        title: en.title,
        description: en.description,
        icon: en.icon as any,
        pageTitle: en.pageTitle,
        longDescription: en.longDescription,
        bulletsLeft: en.bulletsLeft?.map((t: string) => ({ text: t })) || [],
        bulletsRight: en.bulletsRight?.map((t: string) => ({ text: t })) || [],
        features: en.features,
        technologies: en.technologies.map((t: string) => ({ name: t })),
        details: en.details,
        heroImage: '/images/bg-ai-generated.png',
        sortOrder: i,
        // Enriched sections
        ...(en.audiovisualSection ? { audiovisualSection: { title: en.audiovisualSection.title, description: en.audiovisualSection.description, domains: en.audiovisualSection.domains.map((d: string) => ({ name: d })) } } : {}),
        ...(en.extendedProgramming ? { extendedProgramming: { title: en.extendedProgramming.title, items: en.extendedProgramming.items.map((t: string) => ({ text: t })), languages: en.extendedProgramming.languages } } : {}),
        ...(en.aiBridgeSection ? { aiBridgeSection: { title: en.aiBridgeSection.title, tagline: en.aiBridgeSection.tagline, description: en.aiBridgeSection.description, capabilities: en.aiBridgeSection.capabilities.map((t: string) => ({ text: t })) } } : {}),
        ...(galleryItems ? { interfacesGallery: { title: en.interfacesGallery.title, subtitle: en.interfacesGallery.subtitle, items: galleryItems } } : {}),
        ...(badgeItems ? { certificationsSection: { title: en.certificationsSection.title, subtitle: en.certificationsSection.subtitle, badges: badgeItems } } : {}),
        ...(clientItems ? { referencesSection: { title: en.referencesSection.title, subtitle: en.referencesSection.subtitle, clients: clientItems } } : {}),
        ...(en.warrantySection ? { warrantySection: { title: en.warrantySection.title, items: en.warrantySection.items.map((t: string) => ({ text: t })) } } : {}),
        ...(en.brochureDownload ? { brochureDownload: { title: en.brochureDownload.title, description: en.brochureDownload.description, buttonText: en.brochureDownload.buttonText, file: en.brochureDownload.fileUrl } } : {}),
      },
    })
    // Capture array item IDs from EN create to preserve localized linkage
    const d = doc as any
    const enBulletsLeft = d.bulletsLeft || []
    const enBulletsRight = d.bulletsRight || []
    const enFeatures = d.features || []

    // Build FR update data
    const frData: any = {
      title: fr.title,
      description: fr.description,
      pageTitle: fr.pageTitle,
      longDescription: fr.longDescription,
      bulletsLeft: fr.bulletsLeft?.map((t: string, j: number) => ({ id: enBulletsLeft[j]?.id, text: t })),
      bulletsRight: fr.bulletsRight?.map((t: string, j: number) => ({ id: enBulletsRight[j]?.id, text: t })),
      features: fr.features?.map((f: any, j: number) => ({ id: enFeatures[j]?.id, title: f.title, description: f.description })),
      details: fr.details,
    }

    // Enriched sections FR
    if (fr.audiovisualSection) {
      const enDomains = d.audiovisualSection?.domains || []
      frData.audiovisualSection = { title: fr.audiovisualSection.title, description: fr.audiovisualSection.description, domains: fr.audiovisualSection.domains.map((name: string, j: number) => ({ id: enDomains[j]?.id, name })) }
    }
    if (fr.extendedProgramming) {
      const enItems = d.extendedProgramming?.items || []
      frData.extendedProgramming = { title: fr.extendedProgramming.title, items: fr.extendedProgramming.items.map((text: string, j: number) => ({ id: enItems[j]?.id, text })), languages: fr.extendedProgramming.languages }
    }
    if (fr.aiBridgeSection) {
      const enCaps = d.aiBridgeSection?.capabilities || []
      frData.aiBridgeSection = { title: fr.aiBridgeSection.title, tagline: fr.aiBridgeSection.tagline, description: fr.aiBridgeSection.description, capabilities: fr.aiBridgeSection.capabilities.map((text: string, j: number) => ({ id: enCaps[j]?.id, text })) }
    }
    if (fr.interfacesGallery && en.interfacesGallery?.items) {
      const enGallery = d.interfacesGallery?.items || []
      frData.interfacesGallery = { title: fr.interfacesGallery.title, subtitle: fr.interfacesGallery.subtitle, items: fr.interfacesGallery.items.map((item: any, j: number) => ({ id: enGallery[j]?.id, image: en.interfacesGallery.items[j]?.src || enGallery[j]?.image, caption: item.caption })) }
    }
    if (fr.certificationsSection) {
      frData.certificationsSection = { title: fr.certificationsSection.title, subtitle: fr.certificationsSection.subtitle }
    }
    if (fr.referencesSection && en.referencesSection?.clients) {
      const enClients = d.referencesSection?.clients || []
      frData.referencesSection = { title: fr.referencesSection.title, subtitle: fr.referencesSection.subtitle, clients: fr.referencesSection.clients?.map((c: any, j: number) => ({ id: enClients[j]?.id, name: c.name, logo: en.referencesSection.clients[j]?.logo || enClients[j]?.logo, period: en.referencesSection.clients[j]?.period })) }
    }
    if (fr.warrantySection) {
      const enWarrantyItems = d.warrantySection?.items || []
      frData.warrantySection = { title: fr.warrantySection.title, items: fr.warrantySection.items.map((text: string, j: number) => ({ id: enWarrantyItems[j]?.id, text })) }
    }
    if (fr.brochureDownload) {
      frData.brochureDownload = { title: fr.brochureDownload.title, description: fr.brochureDownload.description, buttonText: fr.brochureDownload.buttonText, file: fr.brochureDownload.fileUrl }
    }

    await payload.update({
      collection: 'services',
      id: doc.id,
      locale: 'fr',
      data: frData,
    })
  }

  // 9. Testimonials
  console.log('→ Testimonials...')
  for (let i = 0; i < testimonialsEn.length; i++) {
    const en = testimonialsEn[i]
    const fr = testimonialsFr[i]
    const doc = await payload.create({
      collection: 'testimonials',
      locale: 'en',
      data: { author: en.author, title: en.title, company: en.company, text: en.text },
    })
    await payload.update({
      collection: 'testimonials',
      id: doc.id,
      locale: 'fr',
      data: { title: fr.title, text: fr.text },
    })
  }

  // 10. News Articles
  console.log('→ News Articles...')
  for (let i = 0; i < newsEn.length; i++) {
    const en = newsEn[i]
    const fr = newsFr[i]
    // Use static image path from /images/ folder
    const imageMap: Record<string, string> = {
      'images/bg-ia-av-spheres.jpg': '/images/bg-ia-av-spheres.jpg',
      'images/bg-bubbles.png': '/images/bg-bubbles.png',
      'images/bg-neural-network.png': '/images/bg-neural-network.png',
      'images/bg-ai-generated.png': '/images/bg-ai-generated.png',
    }
    const staticImage = en.image ? (imageMap[en.image] || `/images/${en.image.replace('images/', '')}`) : ''
    const doc = await payload.create({
      collection: 'news-articles',
      locale: 'en',
      data: {
        title: en.title,
        excerpt: en.excerpt,
        date: en.date,
        image: staticImage,
        linkedinUrl: en.linkedinUrl,
      },
    })
    await payload.update({
      collection: 'news-articles',
      id: doc.id,
      locale: 'fr',
      data: { title: fr.title, excerpt: fr.excerpt },
    })
  }

  // 11. Sectors
  console.log('→ Sectors...')
  for (let i = 0; i < sectorsEn.length; i++) {
    const doc = await payload.create({
      collection: 'sectors',
      locale: 'en',
      data: { name: sectorsEn[i], sortOrder: i },
    })
    await payload.update({
      collection: 'sectors',
      id: doc.id,
      locale: 'fr',
      data: { name: sectorsFr[i] },
    })
  }

  console.log('✅ Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
