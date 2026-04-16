import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [visible, setVisible] = useState(false);

  /* On route or hash change: scroll to anchor section if hash present, else top */
  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      // Wait for the page to render the target section
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 90;
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        } else if (attempts < 20) {
          setTimeout(() => tryScroll(attempts + 1), 50);
        }
      };
      tryScroll();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  /* Show/hide floating button */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`scroll-to-top ${visible ? 'scroll-to-top-visible' : ''}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}
