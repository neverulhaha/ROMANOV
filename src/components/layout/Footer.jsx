import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '../../config/siteData';

export default function Footer() {
  const handleLinkClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer className="bg-[#0D1F18] text-white pt-20 pb-12 border-t border-[#E2C17C]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" onClick={handleLinkClick} className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-widest text-white uppercase block">РОМАНОВЪ</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#E2C17C] font-semibold block">С 1792 года</span>
          </Link>
          <p className="text-slate-300 text-xs font-light leading-relaxed">
            Высокая русская кухня в историческом центре Санкт-Петербурга. Наследие царских пиров с 1792 года.
          </p>
        </div>

        {/* Quick Links with Smooth Hover Slide & Lenis Scroll Reset */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-semibold tracking-wider text-[#E2C17C] uppercase">
            Разделы
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300 font-light">
            {siteConfig.navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className="hover:text-[#E2C17C] hover:translate-x-2 transition-all duration-300 inline-block cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-semibold tracking-wider text-[#E2C17C] uppercase">
            Контакты
          </h3>
          <ul className="space-y-3 text-xs text-slate-300 font-light">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#E2C17C] shrink-0 mt-0.5" />
              <span>{siteConfig.brand.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#E2C17C] shrink-0" />
              <a href={`tel:${siteConfig.brand.phone}`} className="hover:text-[#E2C17C] transition-colors">
                {siteConfig.brand.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#E2C17C] shrink-0" />
              <a href={`mailto:${siteConfig.brand.email}`} className="hover:text-[#E2C17C] transition-colors">
                {siteConfig.brand.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-semibold tracking-wider text-[#E2C17C] uppercase">
            Клуб «Династия»
          </h3>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            Подпишитесь на закрытые приглашения на дегустации и гастрономические вечера.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Спасибо за подписку!"); }} className="space-y-2">
            <input
              type="email"
              placeholder="Ваш email"
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C]"
            />
            <button
              type="submit"
              className="w-full bg-[#E2C17C] text-[#0D1F18] font-bold text-xs py-2.5 rounded-xl uppercase tracking-widest hover:bg-white transition-colors"
            >
              ПОДПИСАТЬСЯ
            </button>
          </form>
        </div>
      </div>

      {/* Elegant Minimalist Fine-Dining Awards Recognition Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-light text-slate-400">
        <p className="text-slate-400 text-[11px] tracking-wider">© 1792–2026 Ресторан «РОМАНОВЪ». Все права защищены.</p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-serif uppercase tracking-[0.25em] text-[#E2C17C]">
          <span className="hover:text-white transition-colors cursor-default">WHERETOEAT 2025</span>
          <span className="text-[#C5A059]/50 text-[8px]">◆</span>
          <span className="hover:text-white transition-colors cursor-default">MICHELIN SELECTION</span>
          <span className="text-[#C5A059]/50 text-[8px]">◆</span>
          <span className="hover:text-white transition-colors cursor-default">100 ЛУЧШИХ РЕСТОРАНОВ</span>
        </div>
      </div>
    </footer>
  );
}
