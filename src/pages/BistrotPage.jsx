import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function BistrotPage() {
  const mainRef = useRef(null);

  const menuItems = [
    {
      category: 'Холодные Закуски & Икра',
      items: [
        { name: 'Белужья икра «Забойная» на золотых оладьях', price: '14 500 ₽', desc: 'Зернистая икра с точеным сливочным маслом и домашними блинчиками.' },
        { name: 'Тартар из якутского муксуна', price: '1 450 ₽', desc: 'С эмульсией из северной морошки и паренным садовым яблоком.' },
        { name: 'Паштет из печени глухаря', price: '1 280 ₽', desc: 'С брусничным конфитюром, кедровым пралине и горячим бриошем.' },
      ],
    },
    {
      category: 'Супы & Похлебки',
      items: [
        { name: 'Суточный борщ с топленой щекой теленка', price: '1 150 ₽', desc: 'Насыщенный борщ из русской печи с бородинскими пампушками и смальцем.' },
        { name: 'Царская ушица из трех видов волжской рыбы', price: '1 680 ₽', desc: 'С раковыми шейками, стерлядью и настоем на березовом углике.' },
      ],
    },
    {
      category: 'Горячие Блюда',
      items: [
        { name: 'Филе сибирского оленя', price: '2 850 ₽', desc: 'С крем-соусом из можжевельника, жареными лисичками и печеным пастернаком.' },
        { name: 'Стерляжий бок из русской печи', price: '3 400 ₽', desc: 'Запеченный бок стерляди под соусом из белых таежных грибов.' },
        { name: 'Пожарская котлета с черным трюфелем', price: '1 650 ₽', desc: 'С точеным картофельным пюре и воздушной корочкой из сдобных сухариков.' },
      ],
    },
    {
      category: 'Десерты & Сласти',
      items: [
        { name: 'Торт «Анна Павлова» с северной клюквой', price: '950 ₽', desc: 'Хрустящее безе с легким кремом и соусом из дикой клюквы.' },
        { name: 'Паренный медовик на алтайском меду', price: '890 ₽', desc: 'С сорбетом из домашнего сбитня и облепиховым гелем.' },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbed Text Entrance
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

      // 2. Slide Left for Category Headers
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

      // 3. Staggered Dish Cards Cascade
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
    <div ref={mainRef} className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden">
      {/* 1. Header */}
      <section className="py-20 px-6 text-center bg-np-white flex items-center justify-center min-h-[35vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Главный Зал & Икорная Гостиная</span>
          <h1 className="strip__title1 js-scrub-text leading-tight text-4xl md:text-6xl font-semibold">
            Гастрономическое Меню
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Шедевры высокой русской кухни, приготовленные из редких локальных дикоросов, якутской рыбы и таежной дичи.
          </p>
        </div>
      </section>

      {/* 2. Visual Showcase Strip (Assets 11, 12, 13) */}
      <section className="py-16 bg-custom-2 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 js-slide-left">
            <div className="h-72 overflow-hidden rounded-2xl shadow-xl">
              <SmartImage src="/media/contents/dish-sterlet.jpg" alt="Запеченная Стерлядь" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#0D1F18]">Запеченная Стерлядь & Золото</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">Медальон из стерляди с шафрановым велуте и сусальным золотом.</p>
          </div>
          <div className="space-y-4 js-scrub-text">
            <div className="h-72 overflow-hidden rounded-2xl shadow-xl">
              <SmartImage src="/media/contents/dish-duck.jpg" alt="Томленая Утка" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#0D1F18]">Утка из Печи & Морошка</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">Фирменная топленая утиная грудка в брусничном соусе.</p>
          </div>
          <div className="space-y-4 js-slide-right">
            <div className="h-72 overflow-hidden rounded-2xl shadow-xl">
              <SmartImage src="/media/contents/dish-stroganina.jpg" alt="Строганина из Муксуна" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#0D1F18]">Строганина из Якутского Муксуна</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">Ледяные стружки северной рыбы на речном льду с клюквой.</p>
          </div>
        </div>
      </section>

      {/* 3. Menu Catalog Sections with Stagger & Slide Animations */}
      <section className="py-20 bg-custom-1 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {menuItems.map((sec, idx) => (
            <div key={idx} className="space-y-8 js-stagger-group">
              <div className="border-b border-[#E2C17C]/40 pb-3 flex items-center justify-between js-slide-left">
                <h2 className="font-serif text-2xl font-semibold text-[#0D1F18] uppercase tracking-wider">
                  {sec.category}
                </h2>
                <span className="text-xs uppercase tracking-widest text-[#E2C17C] font-bold">РОМАНОВЪ</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sec.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 space-y-2 hover:shadow-xl hover:border-[#E2C17C]/50 transition-all duration-300 js-stagger-item"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-serif text-lg font-semibold text-[#0D1F18]">{item.name}</h3>
                      <span className="font-serif text-base font-bold text-[#E2C17C] shrink-0">{item.price}</span>
                    </div>
                    <p className="text-xs font-light text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
