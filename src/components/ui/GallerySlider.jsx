import React from 'react';
import { motion } from 'framer-motion';

export default function GallerySlider({ images = [] }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-6 cursor-grab active:cursor-grabbing" data-cursor="drag" data-cursor-text="DRAG">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -(images.length * 320) }}
        className="flex gap-6 px-6 w-max"
      >
        {images.map((imgSrc, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="w-72 sm:w-96 h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg shrink-0 border border-slate-100 relative group"
            data-cursor="view"
            data-cursor-text="VIEW"
          >
            <img
              src={imgSrc}
              alt={`Gallery item ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#142342]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-[#dac773] text-xs font-semibold uppercase tracking-widest">
                Caffè Gilli — Image {idx + 1}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
