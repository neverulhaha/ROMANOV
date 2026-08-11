import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-[#0D1F18] text-white flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-5">
            {/* Animated Royal Gold Ring */}
            <div className="w-16 h-16 relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-14 h-14 border-2 border-white/10 border-t-[#E2C17C] border-r-[#C5A059] rounded-full shadow-[0_0_15px_rgba(226,193,124,0.3)]"
              />
              <span className="font-serif text-[#E2C17C] text-xs font-bold absolute">1792</span>
            </div>

            {/* Brand Title */}
            <div className="text-center space-y-1">
              <h2 className="font-serif text-2xl font-bold tracking-[0.25em] text-white uppercase">
                РОМАНОВЪ
              </h2>
              <span className="text-[9px] uppercase tracking-[0.35em] font-semibold text-[#E2C17C] block">
                САНКТ-ПЕТЕРБУРГ
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
