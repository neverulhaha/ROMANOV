import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, ShoppingBag, User } from 'lucide-react';
import { siteConfig } from '../../config/siteData';
import MobileMenu from './MobileMenu';

export default function Navbar({ cartCount = 0, user, onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('RU');

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 120 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 40);
  });

  const isDarkHeader = isHomePage && !scrolled;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E2C17C] via-[#C5A059] to-[#E2C17C] z-50 origin-left shadow-[0_0_8px_#E2C17C]"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isDarkHeader
            ? 'bg-transparent py-6'
            : 'glass-effect shadow-md py-4 border-b border-slate-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 transition-colors flex items-center gap-2 ${
                isDarkHeader ? 'text-white hover:text-[#E2C17C]' : 'text-[#0D1F18] hover:text-[#C5A059]'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              to="/shop"
              className={`hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold border transition-all ${
                isDarkHeader
                  ? 'border-white text-white hover:bg-white hover:text-[#0D1F18]'
                  : 'border-[#0D1F18] text-[#0D1F18] hover:bg-[#0D1F18] hover:text-white'
              }`}
            >
              Деликатесы
            </Link>
          </div>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <span className={`font-serif text-2xl font-bold tracking-widest uppercase transition-colors ${
              isDarkHeader ? 'text-white' : 'text-[#0D1F18]'
            }`}>
              РОМАНОВЪ
            </span>
            <span className={`text-[8px] uppercase tracking-[0.25em] font-semibold ${
              isDarkHeader ? 'text-[#E2C17C]' : 'text-[#C5A059]'
            }`}>
              С 1792 года
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <span className={`text-xs uppercase tracking-widest font-semibold ${
              isDarkHeader ? 'text-white' : 'text-[#0D1F18]'
            }`}>
              RU
            </span>

            {user ? (
              <Link
                to="/account"
                className={`transition-colors p-1.5 flex items-center gap-1.5 ${
                  isDarkHeader ? 'text-white hover:text-[#E2C17C]' : 'text-[#0D1F18] hover:text-[#C5A059]'
                }`}
                title="Личный Кабинет"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">{user.name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <button
                onClick={onOpenLogin}
                className={`transition-colors p-1.5 cursor-pointer ${
                  isDarkHeader ? 'text-white hover:text-[#E2C17C]' : 'text-[#0D1F18] hover:text-[#C5A059]'
                }`}
                aria-label="User login"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            <Link
              to="/cart"
              className={`relative transition-colors p-1.5 ${
                isDarkHeader ? 'text-white hover:text-[#E2C17C]' : 'text-[#0D1F18] hover:text-[#C5A059]'
              }`}
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
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
      />
    </>
  );
}
