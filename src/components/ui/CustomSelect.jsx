import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomSelect({ value, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#081510] border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white flex items-center justify-between focus:outline-none focus:border-[#E2C17C] transition-colors cursor-pointer hover:border-[#E2C17C]/60"
      >
        <span className="font-serif tracking-wider">{value}</span>
        <ChevronDown className={`w-4 h-4 text-[#E2C17C] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Luxury Brand Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0D1F18] border border-[#E2C17C]/40 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl max-h-60 overflow-y-auto space-y-1"
          >
            {options.map((opt) => {
              const optVal = typeof opt === 'object' ? opt.value : opt;
              const optLabel = typeof opt === 'object' ? opt.label : opt;
              const isSelected = value === optVal;

              return (
                <button
                  key={optVal}
                  type="button"
                  onClick={() => handleSelect(optVal)}
                  className={`w-full px-4 py-2.5 rounded-xl text-left text-xs font-serif flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E2C17C]/20 text-[#E2C17C] font-bold border border-[#E2C17C]/30'
                      : 'text-slate-200 hover:bg-[#E2C17C] hover:text-[#0D1F18]'
                  }`}
                >
                  <span>{optLabel}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#E2C17C]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
