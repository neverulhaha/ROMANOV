import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function ChocolatierPage({ onAddToCart }) {
  const mainRef = useRef(null);

  const drinks = [
    { name: 'Полугар №1 «Ржаной»', price: '950 ₽ / 50мл', desc: 'Классический хлебный дистиллят трехкратной перегонки.' },
    { name: 'Настойка «Северная Морошка»', price: '750 ₽ / 50мл', desc: 'Выдержанная настойка на дикой ямальской морошке и алтайском меду.' },
    { name: 'Настойка «Таежный Кедр»', price: '750 ₽ / 50мл', desc: 'Настой на сибирских кедровых орехах и дубовой стружке.' },
    { name: 'Настойка «Клюква & Можжевельник»', price: '700 ₽ / 50мл', desc: 'Освежающая настойка с джиновыми нотками можжевеловых ягод.' },
    { name: 'Полугар «Солодовый Выдержанный»', price: '1 250 ₽ / 50мл', desc: 'Выдержан 3 года в дубовых бочках из-под бордо.' },
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

      // 2. Side Reveals
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

      // 3. Staggered Drinks Cascade
      const staggerContainers = gsap.utils.toArray('.js-stagger-group');
      staggerContainers.forEach((container) => {
        const cards = container.querySelectorAll('.js-stagger-item');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
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

  return (
    <div ref={mainRef} className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden min-h-screen">
      {/* Header */}
      <section className="py-20 px-6 text-center bg-np-white flex items-center justify-center min-h-[35vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Барная Карта</span>
          <h1 className="strip__title1 js-scrub-text leading-tight text-4xl md:text-6xl font-semibold">
            Имперский Водочный Бар & Дистилляты
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light max-w-2xl mx-auto">
            Коллекция старинных русских полугаров, наливок и настоек на дикоросах.
          </p>
        </div>
      </section>

      {/* Russian Oven Video Banner Section */}
      <section className="relative h-[60vh] min-h-[450px] w-full overflow-hidden flex items-center justify-center bg-[#0D1F18]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/oven.mp4" type="video/mp4" />
          <SmartImage
            src="/media/contents/home-storia_1.jpg"
            alt="Русская Печь и Настойки"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="relative z-10 text-center text-white px-6 max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Традиции Выдержки</span>
          <h2 className="strip__title1 strip__title1--white text-3xl md:text-5xl">ИСКУССТВО ДИСТИЛЛЯЦИИ</h2>
          <p className="text-slate-200 text-sm font-light leading-relaxed">
            Выдержка полугаров в дубовых бочках на фоне полыхающей русской печи.
          </p>
        </div>
      </section>

      {/* Visual Showcase Strip (Asset 16) */}
      <section className="py-16 bg-custom-2 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 js-slide-left">
            <span className="text-xs uppercase tracking-widest text-[#E2C17C] font-bold">Эксклюзивный Сервиз</span>
            <h2 className="strip__title1 text-2xl md:text-3xl">ПЕРЛАМУТР & ШОКОЛАД</h2>
            <p className="text-slate-700 text-xs font-light leading-relaxed">
              Авторские конфеты ручной работы из сибирского кедра и сусального золота в сочетании с настойками на дикой ягоде.
            </p>
          </div>
          <div className="h-72 overflow-hidden rounded-2xl shadow-xl js-slide-right">
            <SmartImage src="/media/contents/bar-infusions.jpg" alt="Коллекция Авторских Настоек" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Bar Menu Grid */}
      <section className="py-24 bg-custom-1 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Коллекция</span>
            <h2 className="strip__title1 text-3xl md:text-4xl">НАСТОЙКИ И ПОЛУГАРЫ</h2>
          </div>

          <div className="space-y-4 js-stagger-group">
            {drinks.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 js-stagger-item hover:shadow-lg transition-all"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-[#0D1F18]">{item.name}</h3>
                  <p className="text-xs text-slate-600 font-light">{item.desc}</p>
                </div>
                <span className="font-serif font-bold text-base text-[#E2C17C] shrink-0">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link to="/reservation" className="read-more">
              ЗАБРОНИРОВАТЬ СТОЛ В БАРЕ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
