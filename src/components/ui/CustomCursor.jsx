import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState({ isHovered: false, text: '', variant: 'default' });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor-text') || '';
        const variant = target.getAttribute('data-cursor') || 'hover';
        setCursorState({ isHovered: true, text, variant });
      } else if (e.target.closest('a, button, input, select')) {
        setCursorState({ isHovered: true, text: '', variant: 'link' });
      } else {
        setCursorState({ isHovered: false, text: '', variant: 'default' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center rounded-full transition-colors duration-300"
      animate={{
        x: mousePosition.x - (cursorState.text ? 36 : cursorState.isHovered ? 24 : 12),
        y: mousePosition.y - (cursorState.text ? 36 : cursorState.isHovered ? 24 : 12),
        width: cursorState.text ? 72 : cursorState.isHovered ? 48 : 24,
        height: cursorState.text ? 72 : cursorState.isHovered ? 48 : 24,
        backgroundColor: cursorState.text ? 'rgba(218, 199, 115, 0.95)' : cursorState.isHovered ? 'rgba(218, 199, 115, 0.2)' : 'rgba(218, 199, 115, 0.8)',
        borderColor: '#dac773',
        borderWidth: cursorState.isHovered ? 1.5 : 0,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 350,
        mass: 0.5,
      }}
    >
      {cursorState.text && (
        <span className="text-[10px] font-bold tracking-widest text-[#142342] uppercase text-center select-none px-1">
          {cursorState.text}
        </span>
      )}
    </motion.div>
  );
}
