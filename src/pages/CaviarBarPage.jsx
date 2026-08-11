import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function CaviarBarPage({ onAddToCart }) {
  const mainRef = useRef(null);
  const [addedId, setAddedId] = useState(null);

  const caviarFlights = [
    {
      id: 101,
      name: 'Дегустационный Сет «Императорский»',
      category: 'Икорный Флайт',
      price: 16500,
      image: '/media/contents/product-caviar-beluga.jpg',
      desc: '50г Белужьей зернистой икры + 50мл Полугара №1 «Ржаной» + Золотые гречневые оладьи с точеным сливочным маслом.',
    },
    {
      id: 102,
      name: 'Дегустационный Сет «Северная Династия»',
      category: 'Икорный Флайт',
      price: 11800,
      image: '/media/contents/bar-infusions.jpg',
      desc: '50г Осетровой икры «Забойной» + 50мл Настойки на ямальской морошке + Хрустящие тосты из выдержанного бриоша.',
    },
    {
      id: 103,
      name: 'Сет-Трио «Царская Трилогия»',
      category: 'Полная Дегустация',
      price: 19000,
      image: '/media/contents/tasting-set-8-courses.jpg',
      desc: 'Сет из 3 видов икры (Белуга, Осетр, Стерлядь по 30г) + Сет из 3 выдержанных дистиллятов с перламутровыми ложечками.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbed Text Scale & Fade (Enter & Exit)
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

      // 2. Horizontal Side Reveals (Fast Early Entrance: 85% -> 45%)
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

      // 3. Staggered Tasting Cards Cascade Up
      const staggerContainers = gsap.utils.toArray('.js-stagger-group');
      staggerContainers.forEach((container) => {
        const cards = container.querySelectorAll('.js-stagger-item');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 70, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  return (
    <div ref={mainRef} className="pt-24 space-y-0 text-white bg-[#0D1F18] overflow-x-hidden min-h-screen">
      {/* 1. Dark Luxury Hero Header */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-[#0D1F18] via-[#091510] to-[#0D1F18] flex items-center justify-center min-h-[40vh] relative border-b border-[#E2C17C]/20">
        <div className="max-w-4xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2C17C]/10 border border-[#E2C17C]/30 text-[#E2C17C] text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" /> Эксклюзивная Гостиная
          </div>
          <h1 className="font-serif leading-tight text-4xl md:text-6xl font-bold uppercase tracking-wider text-white js-scrub-text">
            Икорный Бар «РОМАНОВЪ»
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Погружение в культуру русской черной икры. Перламутровые ложечки, охлаждение при 0°C и авторские паринги с легендарными полугарами.
          </p>
        </div>
      </section>

      {/* 2. Caviar Tasting Flights Grid with Stagger Cascade */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Икорные Сеты & Паринги</span>
          <h2 className="strip__title1 strip__title1--white text-3xl md:text-5xl js-scrub-text">АВТОРСКИЕ ФЛАЙТЫ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 js-stagger-group">
          {caviarFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#E2C17C]/60 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(226,193,124,0.15)] group js-stagger-item"
            >
              <div className="space-y-5">
                <div className="h-64 overflow-hidden rounded-2xl relative border border-white/10">
                  <SmartImage
                    src={flight.image}
                    alt={flight.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0D1F18]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#E2C17C]/40 text-[10px] text-[#E2C17C] font-bold uppercase tracking-wider">
                    {flight.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-semibold text-white">{flight.name}</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{flight.desc}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Стоимость Сэта</span>
                  <span className="font-serif text-xl font-bold text-[#E2C17C]">
                    {flight.price.toLocaleString()} ₽
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(flight)}
                  className="read-more read-more--white cursor-pointer"
                >
                  {addedId === flight.id ? (
                    <span className="text-[#E2C17C] font-bold flex items-center gap-1">
                      ЗАКАЗАНО <Check className="w-4 h-4" />
                    </span>
                  ) : (
                    'ЗАКАЗАТЬ СЕТ →'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Rituals & Etiquette Section with Side Reveal Animations */}
      <section className="py-24 bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-3 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#E2C17C]/40 transition-all duration-300 js-slide-left">
            <h4 className="font-serif text-xl font-semibold text-white">Перламутровый Ритуал</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Черная икра подается исключительно на перламутровых ложечках, чтобы полностью исключить окисление металлом.
            </p>
          </div>

          <div className="space-y-3 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#E2C17C]/40 transition-all duration-300 js-scrub-text">
            <h4 className="font-serif text-xl font-semibold text-white">Температура 0°C</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Баночка подается на хрустальном льду при температуре 0...-2°C, сохраняя безупречную упругость зерна.
            </p>
          </div>

          <div className="space-y-3 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-[#E2C17C]/40 transition-all duration-300 js-slide-right">
            <h4 className="font-serif text-xl font-semibold text-white">Бронирование Стола</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Забронируйте стол в Икорной Гостиной для персонального сопровождения икорным сомелье.
            </p>
            <div className="pt-2">
              <Link to="/contact" className="read-more read-more--white text-xs">
                ЗАБРОНИРОВАТЬ →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
