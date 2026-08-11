import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ subtitle, title, description, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-12`}
    >
      {subtitle && (
        <span className="text-[#dac773] text-xs font-semibold uppercase tracking-[0.25em] block mb-2">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-serif font-semibold tracking-tight mb-4 ${light ? 'text-white' : 'text-[#142342]'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-sm md:text-base font-light leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`h-0.5 w-16 bg-[#dac773] mt-5 ${center ? 'mx-auto' : ''}`}
      />
    </motion.div>
  );
}
