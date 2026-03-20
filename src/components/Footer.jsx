import { Link, useLocation } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import { useContent, useT } from '../context/LanguageContext';
import './Footer.css';

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
          {/* Cities row */}
          <div className="footer-cities">
            <Link to="/contact" className="footer-city">SUTTON</Link>
            <span className="footer-city-sep">|</span>
            <Link to="/contact" className="footer-city">MONTREAL</Link>
            <span className="footer-city-sep">|</span>
            <Link to="/contact" className="footer-city">PARIS</Link>
          </div>

          {/* Bottom row: social+copyright left, logo right */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <div className="footer-social">
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href={company.social.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href={`mailto:${company.social.email}`} className="social-icon" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
              <p className="footer-copy">
                &copy; {new Date().getFullYear()} {company.name}. {t('footer.rights')}
              </p>
            </div>
            <div className="footer-bottom-right">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-text">JPrunier</span>
                <span className="footer-logo-subtitle">AI-AV</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
