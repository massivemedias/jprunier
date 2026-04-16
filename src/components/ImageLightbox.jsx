import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageLightbox.css';

const base = import.meta.env.BASE_URL;

export default function ImageLightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  imageSrc,
  imageAlt,
  onClose,
  onPrev,
  onNext,
}) {
  // Resolve current image (supports both single src/alt mode and array+index mode)
  const useArray = images.length > 0;
  const item = useArray ? images[currentIndex] : null;
  const src = useArray ? item?.src : imageSrc;
  const alt = useArray ? (item?.alt || item?.caption || '') : imageAlt;
  const caption = useArray ? item?.caption : null;
  const total = useArray ? images.length : 0;
  const canNav = useArray && total > 1;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (canNav && e.key === 'ArrowLeft') onPrev?.();
      else if (canNav && e.key === 'ArrowRight') onNext?.();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext, canNav]);

  if (!src) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="lightbox-close" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>

          {canNav && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <motion.div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            key={src}
          >
            <img
              src={`${base}${src.replace(/^\//, '')}`}
              alt={alt}
              className="lightbox-image"
            />
            {(caption || canNav) && (
              <div className="lightbox-info">
                {caption && <span className="lightbox-caption">{caption}</span>}
                {canNav && (
                  <span className="lightbox-counter">
                    {currentIndex + 1} / {total}
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {canNav && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
