import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';
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
          <div className="footer-inner">
            <div className="footer-social">
              <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
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
        </div>
      </footer>
    </>
  );
}
