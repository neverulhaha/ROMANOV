import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { siteConfig } from '../config/siteData';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function ShopPage({ onAddToCart }) {
  const mainRef = useRef(null);
  const [addedId, setAddedId] = useState(null);

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
    <div ref={mainRef} className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden">
      {/* 1. Page Header */}
      <section className="py-20 px-6 text-center bg-np-white flex items-center justify-center min-h-[35vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Гастрономический Бутик</span>
          <h1 className="strip__title1 js-scrub-text leading-tight text-4xl md:text-6xl font-semibold">
            Авторские Деликатесы
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Заказывайте отборную черную икру, настоечные сеты, якутскую нельму и кедровое пралине с быстрой доставкой по всей России.
          </p>
        </div>
      </section>

      {/* 2. Product Catalog Grid */}
      <section className="py-20 bg-custom-1 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 js-stagger-group">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {siteConfig.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 js-stagger-item"
              >
                <div className="space-y-4">
                  <div className="h-72 overflow-hidden rounded-xl bg-slate-50">
                    <SmartImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#E2C17C] font-bold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#0D1F18]">
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
                    onClick={() => handleAdd(product)}
                    className="read-more cursor-pointer"
                  >
                    {addedId === product.id ? (
                      <span className="text-[#E2C17C] font-bold flex items-center gap-1">
                        ДОБАВЛЕНО <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      'В КОРЗИНУ →'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
