import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useContent, useT } from '../context/LanguageContext';
import './Footer.css';

const base = import.meta.env.BASE_URL;

const certifications = [
  { src: 'images/certifications/crestron-cmpg.webp', name: 'Crestron Masters Certified Programmer' },
  { src: 'images/certifications/qsys-level_2.webp', name: 'Q-SYS Level 2' },
  { src: 'images/certifications/qsys-control_201.webp', name: 'Q-SYS Control 201' },
  { src: 'images/certifications/qsys-reflect_enterprise_manager.webp', name: 'Q-SYS Reflect Enterprise Manager' },
];

export default function Footer() {
  const { content } = useContent();
  const t = useT();
  const { company } = content;
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {/* CTA section — only on non-home pages */}
      {!isHome && (
        <section className="footer-cta-section">
          <div className="container">
            <div className="footer-cta-content">
              <h2>{content.home.cta_section.title}</h2>
              <p>{content.home.cta_section.subtitle}</p>
              <Link to="/contact" className="btn btn-primary">
                {content.home.cta_section.button}
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          {/* Single row layout */}
          <div className="footer-row">
            {/* Brand */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-text">JPrunier</span>
                <span className="footer-logo-subtitle">AI-AV</span>
              </Link>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <div className="footer-office-row">
                <span className="footer-office-city">Montreal</span>
                <span className="footer-addr"><MapPin size={11} /> {company.offices.montreal.address}</span>
              </div>
              <span className="footer-sep">|</span>
              <div className="footer-office-row">
                <span className="footer-office-city">Paris</span>
                <span className="footer-addr"><MapPin size={11} /> {company.offices.paris.address}</span>
              </div>
              <span className="footer-sep">|</span>
              <a href={`tel:${company.offices.montreal.phone}`} className="footer-addr footer-link">
                <Phone size={11} /> {company.offices.montreal.phone}
              </a>
              <span className="footer-sep">|</span>
              <a href={`mailto:${company.social.email}`} className="footer-addr footer-link">
                <Mail size={11} /> {company.social.email}
              </a>
            </div>

            {/* Certifications */}
            <div className="footer-certs">
              {certifications.map((cert, i) => (
                <img key={i} src={`${base}${cert.src}`} alt={cert.name} className="footer-cert-badge" />
              ))}
            </div>

            {/* Social */}
            <div className="footer-social">
              <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon social-linkedin" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={company.social.github} target="_blank" rel="noopener noreferrer" className="social-icon social-github" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p className="footer-copy">&copy; 2026 {company.name} {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
