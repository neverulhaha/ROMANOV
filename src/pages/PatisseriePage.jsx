import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function PatisseriePage({ onAddToCart }) {
  const mainRef = useRef(null);

  const setCourses = [
    { step: '01', name: 'Приветствие от шефа', desc: 'Еловая тарталетка с осетровой икрой и сметанным муссом' },
    { step: '02', name: 'Холодная подача', desc: 'Тартар из якутского муксуна с эмульсией из северной морошки' },
    { step: '03', name: 'Похлебка', desc: 'Царская уха из трех видов рыбы с раковыми шейками и нагнетанием печного дыма' },
    { step: '04', name: 'Рыбный перерыв', desc: 'Стерляжий бок из русской печи с соусом из белых грибов' },
    { step: '05', name: 'Освежение', desc: 'Сорбет из сибирского сбитня и дикой брусники' },
    { step: '06', name: 'Главная подача', desc: 'Филе сибирского оленя с крем-соусом из можжевельника и лисичками' },
    { step: '07', name: 'Преддесерт', desc: 'Мусс из лесного вереска и меда' },
    { step: '08', name: 'Финал', desc: 'Торт «Анна Павлова» с клюквенным конфитюром и кедровым пралине в золоте' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbed Text Scale & Fade
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

      // 2. Staggered Course Cascade
      const staggerContainers = gsap.utils.toArray('.js-stagger-group');
      staggerContainers.forEach((container) => {
        const cards = container.querySelectorAll('.js-stagger-item');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 3. Side Reveals
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
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden min-h-screen">
      {/* Header */}
      <section className="py-20 px-6 text-center bg-np-white flex items-center justify-center min-h-[35vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Гастрономический Театр</span>
          <h1 className="strip__title1 js-scrub-text leading-tight text-4xl md:text-6xl font-semibold">
            Дегустационный Сет «Царская Трапеза»
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light max-w-2xl mx-auto">
            8 перемен блюд от бренд-шефа с эксклюзивным сопровождением вин и авторских дистиллятов.
          </p>
        </div>
      </section>

      {/* Visual Showcase Strip (Assets 14 & 15) */}
      <section className="py-16 bg-custom-1 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4 js-slide-left">
            <div className="h-80 overflow-hidden rounded-2xl shadow-xl">
              <SmartImage src="/media/contents/tasting-set-8-courses.jpg" alt="Авторский Дегустационный Сет" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#0D1F18]">8-Переменный Дегустационный Сет</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">Полная презентация шедевров императорской гастрономии.</p>
          </div>
          <div className="space-y-4 js-scrub-text">
            <div className="h-80 overflow-hidden rounded-2xl shadow-xl">
              <SmartImage src="/media/contents/dessert-birch-sap.jpg" alt="Десерт Березовый Сок & Кедр" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#0D1F18]">Десерт «Березовый Сок & Кедр»</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">Авангардная сфера из мусса на березовом соку в золотой глазури.</p>
          </div>
        </div>
      </section>

      {/* Set Details */}
      <section className="py-20 bg-custom-2 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="bg-[#0D1F18] text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 space-y-8 js-slide-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E2C17C] font-bold">8 Перемен Блюд</span>
                <h2 className="font-serif text-2xl font-semibold text-white">Стоимость Сета</h2>
              </div>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-[#E2C17C]">16 500 ₽</span>
                <span className="block text-[11px] text-slate-400 font-light">на одну персону</span>
              </div>
            </div>

            <div className="space-y-6 js-stagger-group">
              {setCourses.map((course, idx) => (
                <div key={idx} className="flex items-start gap-6 border-b border-white/5 pb-4 js-stagger-item hover:pl-2 transition-all duration-300">
                  <span className="font-serif text-xl font-bold text-[#E2C17C] shrink-0">{course.step}</span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white">{course.name}</h3>
                    <p className="text-xs font-light text-slate-300">{course.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link to="/contact" className="read-more read-more--white">
                ЗАБРОНИРОВАТЬ ДЕГУСТАЦИЮ →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
