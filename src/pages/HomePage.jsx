import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteData';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage({ onAddToCart }) {
  const mainRef = useRef(null);
  const horizontalRef = useRef(null);
  const heroVideoRef = useRef(null);

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

      // 3. Full-bleed Edge-to-Edge Expansion
      const clipContainers = gsap.utils.toArray('.js-scroll-n-clip');
      clipContainers.forEach((container) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 1,
          },
        });
        tl.fromTo(
          container,
          { clipPath: 'inset(12% 16% 12% 16% round 1.5rem)', scale: 0.88 },
          { clipPath: 'inset(0% 0% 0% 0% round 0rem)', scale: 1.0, ease: 'none', duration: 1 }
        ).to(
          container,
          { clipPath: 'inset(12% 16% 12% 16% round 1.5rem)', scale: 0.88, ease: 'none', duration: 1 },
          '+=0.6'
        );
      });

      // 4. Horizontal Full-Screen Snap Slider
      if (horizontalRef.current) {
        const slides = gsap.utils.toArray('.js-full-slide');
        gsap.to(slides, {
          xPercent: -100 * (slides.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (slides.length - 1),
            end: () => `+=${horizontalRef.current.offsetWidth * (slides.length - 1)}`,
          },
        });
      }

      // 5. Staggered Product Cards Cascade
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

  return (
    <div ref={mainRef} className="space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden">
      {/* 1. Full-Screen Video Hero Section with GPU Sharpen & Enhanced Rendering */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] contrast-[1.08] saturate-[1.08] transform-gpu transition-all duration-700"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl space-y-6">
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-[#E2C17C]">
            Высокая Русская Кухня • С 1792 года
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-wider uppercase text-white drop-shadow-2xl">
            РОМАНОВЪ
          </h1>
          <p className="text-sm md:text-lg font-light tracking-widest uppercase text-slate-200 max-w-2xl mx-auto">
            Санкт-Петербург • Невский проспект, 24
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center gap-2 text-white/80 animate-pulse w-full max-w-xs px-4 text-center pointer-events-none">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] font-light whitespace-nowrap">
            ПРОКРУТИТЕ ДЛЯ ЗНАКОМСТВА
          </span>
          <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center p-1 shrink-0">
            <div className="w-1 h-2 bg-[#E2C17C] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Intro Scrubbed Title Section */}
      <section className="py-28 px-6 text-center bg-np-white flex items-center justify-center min-h-[45vh]">
        <div className="max-w-6xl mx-auto">
          <h2 className="strip__title1 js-scrub-text leading-[1.35] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-balance">
            В самом сердце культурной столицы.<br className="hidden md:block" />
            Вековые традиции царской кухни, возведенные в ранг<br className="hidden md:block" />
            высокого гастрономического искусства.
          </h2>
        </div>
      </section>

      {/* 3. Strip 1: 3-Column Asymmetric - ODA SEVERNYM DIKOROSAM */}
      <section className="bg-custom-1 py-28 border-y border-slate-200/60 space-y-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Col 1: Heading & Text */}
          <div className="space-y-6 js-slide-left">
            <h2 className="strip__title1">ОДА СЕВЕРНЫМ ДИКОРОСАМ И ИКРЕ</h2>
            <p className="text-sm font-light text-slate-700 leading-relaxed">
              Каждое блюдо в ресторане «РОМАНОВЪ» — это поэзия русской природы. Мы соединяем черную осетровую икру, якутского муксуна и северную морошку с авангардными кулинарными техниками.
            </p>
            <Link to="/bistrot" className="read-more">
              ИССЛЕДОВАТЬ ГАСТРОНОМИЮ →
            </Link>
          </div>

          {/* Col 2: Vertical Portrait Photo */}
          <div className="h-[65vh] overflow-hidden rounded-2xl shadow-xl border border-slate-200">
            <SmartImage
              src="/media/contents/home-storia_2.jpg"
              alt="Осетровая икра и гастрономия"
              className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.05]"
            />
          </div>

          {/* Col 3: Secondary Text */}
          <div className="space-y-6 lg:self-end js-slide-right">
            <h3 className="font-serif text-xl font-semibold text-[#0D1F18]">ИМПЕРСКАЯ ТРАПЕЗА</h3>
            <p className="text-sm font-light text-slate-700 leading-relaxed">
              Рецепты XVIII века, воссозданные по архивным записям Двора Его Императорского Величества с бережным сохранением локальных продуктов.
            </p>
            <Link to="/patisserie" className="read-more">
              ДЕГУСТАЦИОННЫЙ СЕТ →
            </Link>
          </div>
        </div>

        {/* 100% Full-bleed Expand & Shrink Clip Banner */}
        <div className="w-full h-[80vh] min-h-[600px] overflow-hidden js-scroll-n-clip shadow-2xl relative">
          <SmartImage
            src="/media/contents/3.png"
            alt="Парадный имперский зал ресторана РОМАНОВЪ 1792"
            className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.08] brightness-[1.02] transform-gpu"
          />
        </div>
      </section>

      {/* 4. Strip 2: 3-Column Asymmetric - ISKUSSTVO RUSSKOY PECHI */}
      <section className="bg-custom-2 py-28 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6 js-slide-left">
            <h2 className="strip__title1">ИСКУССТВО РУССКОЙ ПЕЧИ</h2>
            <p className="text-sm font-light text-slate-700 leading-relaxed">
              Томление при низкой температуре на березовых дровах раскрывает богатейшую текстуру мяса дикого оленя и волжской стерляди.
            </p>
            <Link to="/chocolatier" className="read-more">
              ВОДОЧНЫЙ БАР И ПОЛУГАРЫ →
            </Link>
          </div>

          {/* Central Vertical Russian Oven Video / Photo Container */}
          <div className="h-[65vh] overflow-hidden rounded-2xl shadow-xl border border-slate-200 relative bg-[#0D1F18]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.08] transform-gpu"
            >
              <source src="/videos/oven.mp4" type="video/mp4" />
              <img
                src="/media/contents/home-storia_1.jpg"
                alt="Русская традиционная печь и настойки"
                className="w-full h-full object-cover"
              />
            </video>
          </div>

          <div className="space-y-6 lg:self-end js-slide-right">
            <h3 className="font-serif text-xl font-semibold text-[#0D1F18]">АВТОРСКИЕ ДИСТИЛЛЯТЫ</h3>
            <p className="text-sm font-light text-slate-700 leading-relaxed">
              Выдержанные полугары и настойки на морошке, бруснике и кедровых орехах из частной коллекции ресторана.
            </p>
            <Link to="/chocolatier" className="read-more">
              КОЛЛЕКЦИЯ НАСТОЕК →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Horizontal Full-Screen Snap Slider (4 Slides) */}
      <section ref={horizontalRef} className="h-screen w-full relative overflow-hidden bg-[#0D1F18]">
        <div className="flex h-full w-[400vw]">
          {/* Slide 1 */}
          <div className="js-full-slide w-screen h-screen flex-shrink-0 relative flex items-center justify-center p-8 md:p-16 text-white">
            <SmartImage
              src="/media/contents/4.png"
              alt="Имперский Зал"
              className="absolute inset-0 w-full h-full object-cover opacity-30 filter contrast-[1.08]"
            />
            <div className="relative z-10 max-w-3xl text-center space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">01 / ИМПЕРСКИЙ ЗАЛ</span>
              <h2 className="strip__title1 strip__title1--white text-4xl md:text-6xl">ГЛАВНАЯ ГОСТИНАЯ</h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Хрустальные люстры, фарфор Императорского завода и вечернее звучание живой арфы в окружении интерьеров XVIII века.
              </p>
              <Link to="/reservation" className="read-more read-more--white">
                ЗАБРОНИРОВАТЬ СТОЛ →
              </Link>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="js-full-slide w-screen h-screen flex-shrink-0 relative flex items-center justify-center p-8 md:p-16 text-white">
            <SmartImage
              src="/media/contents/5.png"
              alt="Икорный и Водочный Бар"
              className="absolute inset-0 w-full h-full object-cover opacity-30 filter contrast-[1.08]"
            />
            <div className="relative z-10 max-w-3xl text-center space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">02 / ИКОРНАЯ ГОСТИНАЯ</span>
              <h2 className="strip__title1 strip__title1--white text-4xl md:text-6xl">ИКОРНЫЙ И ВОДОЧНЫЙ БАР</h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Дегустация 4 видов черной осетровой и белужьей икра в сочетании с выдержанными полугарами.
              </p>
              <Link to="/caviar-bar" className="read-more read-more--white">
                ИКОРНОЕ МЕНЮ →
              </Link>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="js-full-slide w-screen h-screen flex-shrink-0 relative flex items-center justify-center p-8 md:p-16 text-white">
            <SmartImage
              src="/media/contents/6.jpg"
              alt="Гастрономический Театр"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-30 filter contrast-[1.08]"
            />
            <div className="relative z-10 max-w-3xl text-center space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">03 / ГАСТРОНОМИЧЕСКИЙ ТЕАТР</span>
              <h2 className="strip__title1 strip__title1--white text-4xl md:text-6xl">АВТОРСКИЙ СЕТ ОТ ШЕФА</h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                8 перемен блюд, раскрывающих богатую историю гастрономии Российской Империи от Балтики до Тихого океана.
              </p>
              <Link to="/patisserie" className="read-more read-more--white">
                УЗНАТЬ О СЕТЕ →
              </Link>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="js-full-slide w-screen h-screen flex-shrink-0 relative flex items-center justify-center p-8 md:p-16 text-white">
            <SmartImage
              src="/media/contents/7.jpg"
              alt="История и Наследие"
              className="absolute inset-0 w-full h-full object-cover opacity-30 filter contrast-[1.08]"
            />
            <div className="relative z-10 max-w-3xl text-center space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">04 / НАСЛЕДИЕ И ТРАДИЦИИ</span>
              <h2 className="strip__title1 strip__title1--white text-4xl md:text-6xl">ПОСТАВЩИК ДВОРА 1792</h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Более двух веков высочайшего качества и преданности традициям русской кулинарной школы.
              </p>
              <Link to="/casa-gilli" className="read-more read-more--white">
                ЧИТАТЬ ЛЕГЕНДУ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Strip 3: Gourmet Gift Boutique Showcase */}
      <section className="bg-custom-1 py-28 border-t border-slate-200 space-y-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Гастрономический Бутик</span>
            <h2 className="strip__title1 text-3xl md:text-5xl">ИЗ САНКТ-ПЕТЕРБУРГА С ЛЮБОВЬЮ</h2>
            <p className="text-slate-600 text-sm font-light">
              Подарочные сеты осетровой икры, авторские настойки и кедровое пралине в фирменной упаковке с доставкой.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 js-stagger-group">
            {siteConfig.products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 js-stagger-item"
              >
                <div className="space-y-4">
                  <div className="h-64 overflow-hidden rounded-xl bg-slate-50">
                    <SmartImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter contrast-[1.05]"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#E2C17C] font-bold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-[#0D1F18]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                  <span className="font-serif text-lg font-bold text-[#0D1F18]">
                    {product.price.toLocaleString()} ₽
                  </span>
                  <button
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className="read-more cursor-pointer"
                  >
                    В КОРЗИНУ →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link to="/shop" className="read-more">
              ПЕРЕЙТИ В БУТИК ДЕЛИКАТЕСОВ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
