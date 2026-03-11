import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import './ServiceCard.css';

export default function ServiceCard({ title, description, icon, expanded, onMouseEnter, onMouseLeave }) {
  const IconComponent = Icons[icon];

  return (
    <motion.div
      className={`service-card ${expanded ? 'expanded' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="service-card-content">
        {IconComponent && (
          <motion.div
            className="service-icon"
            animate={{ scale: expanded ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent size={40} />
          </motion.div>
        )}
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>
      </div>
    </motion.div>
  );
}
