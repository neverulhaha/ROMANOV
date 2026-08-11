import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ClipSlideImage({ src, alt, className = '', height = 'h-[480px]', cursorText = 'EXPLORE' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const clipProgress = useTransform(scrollYProgress, [0.1, 0.45], ['inset(12% 10% 12% 10% round 1rem)', 'inset(0% 0% 0% 0% round 0rem)']);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.6], [1.25, 1.0]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${height} ${className}`}
      data-cursor="image"
      data-cursor-text={cursorText}
    >
      <motion.div
        style={{ clipPath: clipProgress }}
        className="w-full h-full relative overflow-hidden"
      >
        <motion.img
          style={{ scale: imageScale }}
          src={src}
          alt={alt || ''}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
