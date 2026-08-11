import React from 'react';
import { motion } from 'framer-motion';

export default function SplitTitle({ text, className = '', tag = 'h2' }) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const Tag = tag;

  return (
    <Tag className={`overflow-hidden font-serif ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="inline-flex flex-wrap gap-x-3 gap-y-1"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
