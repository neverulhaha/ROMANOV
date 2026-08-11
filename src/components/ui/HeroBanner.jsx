import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './Button';

export default function HeroBanner({ title, subtitle, description, image, ctaPrimary, ctaSecondary, onPrimaryClick, onSecondaryClick }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#142342] text-white py-28">
      {/* Background Image with Parallax & Scale */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142342] via-[#142342]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#142342]/70 via-transparent to-[#142342]/70" />
      </motion.div>

      {/* Content Container */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block text-[#dac773] text-xs md:text-sm uppercase tracking-[0.35em] font-semibold mb-4 drop-shadow-sm"
        >
          {subtitle}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15] drop-shadow-md"
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow"
          >
            {description}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {ctaPrimary && (
            <Button variant="gold" size="lg" to="/shop" onClick={onPrimaryClick}>
              {ctaPrimary}
            </Button>
          )}
          {ctaSecondary && (
            <Button variant="outlinedGold" size="lg" to="/casa-gilli" onClick={onSecondaryClick}>
              {ctaSecondary}
            </Button>
          )}
        </motion.div>
      </motion.div>

      {/* Decorative Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-widest text-[#dac773]/80">Scroll</span>
        <div className="w-5 h-8 border-2 border-[#dac773]/40 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-[#dac773] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
