import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function CasaGilliPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrubTexts = gsap.utils.toArray('.js-scrub-text');
      scrubTexts.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });
        tl.fromTo(
          el,
          { opacity: 0, y: 80, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 1 }
        ).to(
          el,
          { opacity: 0, y: -70, scale: 0.94, ease: 'none', duration: 1 },
          '+=0.8'
        );
      });

      const slideLefts = gsap.utils.toArray('.js-slide-left');
      slideLefts.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.5,
          },
        });
        tl.fromTo(el, { opacity: 0, x: -90 }, { opacity: 1, x: 0, ease: 'power2.out', duration: 1 });
      });

      const slideRights = gsap.utils.toArray('.js-slide-right');
      slideRights.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.5,
          },
        });
        tl.fromTo(el, { opacity: 0, x: 90 }, { opacity: 1, x: 0, ease: 'power2.out', duration: 1 });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden min-h-screen">
      {/* Header */}
      <section className="py-20 px-6 text-center bg-np-white flex items-center justify-center min-h-[35vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Наследие & Традиции</span>
          <h1 className="strip__title1 js-scrub-text leading-tight text-4xl md:text-6xl font-semibold">
            История Дома «РОМАНОВЪ»
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light max-w-2xl mx-auto">
            Основанный в 1792 году в Санкт-Петербурге, наш ресторан бережно хранит секреты царских пиров.
          </p>
        </div>
      </section>

      {/* History Story Strip */}
      <section className="py-20 bg-custom-2 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 js-slide-left">
              <h2 className="strip__title1 text-2xl md:text-3xl">ПОСТАВЩИКИ ДВОРА 1792</h2>
              <p className="text-slate-700 text-sm font-light leading-relaxed">
                В XVIII веке дом «РОМАНОВЪ» поставлял черную икру, дичь и квасы к императорскому двору. Сегодня мы сохраняем историческую преемственность, возводя русскую кухню на вершину мировой гастрономии.
              </p>
            </div>
            <div className="h-80 overflow-hidden rounded-2xl shadow-xl js-slide-right">
              <SmartImage src="/media/contents/home-storia_1.jpg" alt="История РОМАНОВЪ" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-center pt-6">
            <Link to="/contact" className="read-more">
              ЗАБРОНИРОВАТЬ СТОЛ В ИСТОРИЧЕСКОМ ЗАЛЕ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
