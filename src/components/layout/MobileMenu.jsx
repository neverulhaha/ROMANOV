import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ShoppingBag } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose, currentLang, onLangChange, cartCount = 0 }) {
  const menuCol1 = [
    { name: 'О РЕСТОРАНЕ', path: '/' },
    { name: 'ОСНОВНОЕ МЕНЮ', path: '/bistrot' },
    { name: 'ДЕГУСТАЦИЯ', path: '/patisserie' },
    { name: 'ИКОРНЫЙ БАР', path: '/caviar-bar' },
  ];

  const menuCol2 = [
    { name: 'ВОДОЧНЫЙ БАР', path: '/chocolatier' },
    { name: 'ДЕЛИКАТЕСЫ', path: '/shop' },
    { name: 'БРОНИРОВАНИЕ', path: '/reservation' },
    { name: 'КОНТАКТЫ', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 w-screen h-screen bg-[#0D1F18] text-white flex flex-col justify-between p-6 md:p-12 overflow-y-auto"
        >
          {/* Top Header Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-7xl mx-auto w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 text-white hover:text-[#E2C17C] hover:rotate-90 transition-all duration-300 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-8 h-8 font-light" />
              </button>

              <Link
                to="/shop"
                onClick={onClose}
                className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold border border-white text-white hover:bg-white hover:text-[#0D1F18] transition-all"
              >
                Деликатесы
              </Link>
            </div>

            <Link to="/" onClick={onClose} className="flex flex-col items-center">
              <span className="font-serif text-2xl font-bold tracking-widest text-white uppercase">РОМАНОВЪ</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#E2C17C]">С 1792 года</span>
            </Link>

            <div className="flex items-center gap-5 text-white">
              <span className="text-xs uppercase tracking-widest font-semibold text-white">
                RU
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-white hover:text-[#E2C17C] transition-colors"
                aria-label="User login"
              >
                <User className="w-5 h-5" />
              </button>
              <Link
                to="/cart"
                onClick={onClose}
                className="relative p-1.5 text-[#E2C17C] transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E2C17C] text-[#0D1F18] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>

          {/* Main 2-Column Menu Grid */}
          <div className="max-w-6xl mx-auto w-full my-auto py-12">
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 md:gap-x-16 lg:gap-x-28 text-center md:text-left">
              <div className="flex flex-col gap-6 md:gap-8">
                {menuCol1.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.25 + idx * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.05em] uppercase text-white hover:text-[#E2C17C] hover:translate-x-2 transition-all duration-300 inline-block whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-6 md:gap-8">
                {menuCol2.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.35 + idx * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.05em] uppercase text-white hover:text-[#E2C17C] hover:translate-x-2 transition-all duration-300 inline-block whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </div>

          {/* Bottom Footer Information Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-slate-300"
          >
            <span>Санкт-Петербург, Невский проспект, 24 | +7 (812) 312-77-88</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
