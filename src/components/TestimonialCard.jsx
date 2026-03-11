import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './TestimonialCard.css';

export default function TestimonialCard({ author, title, company, text, avatar }) {
  return (
    <motion.div
      className="testimonial-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="var(--accent-violet)" />
        ))}
      </div>
      <p className="testimonial-text">"{text}"</p>
      <div className="testimonial-author">
        <img src={avatar} alt={author} className="testimonial-avatar" />
        <div>
          <p className="testimonial-name">{author}</p>
          <p className="testimonial-role">{title} at {company}</p>
        </div>
      </div>
    </motion.div>
  );
}
