import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react';
import SmartImage from '../components/ui/SmartImage';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const mainRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Пожалуйста, укажите ваше имя.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Пожалуйста, укажите контактный email.');
      return;
    }
    if (!formData.subject.trim()) {
      setError('Пожалуйста, укажите тему обращения или количество гостей.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Пожалуйста, напишите ваше пожелание или дату бронирования.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div ref={mainRef} className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden">
      {/* 1. Page Intro Header */}
      <section className="py-20 px-6 text-center bg-np-white flex items-center justify-center min-h-[35vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Невский проспект, 24 • Санкт-Петербург</span>
          <h1 className="strip__title1 js-scrub-text leading-tight text-4xl md:text-6xl font-semibold">
            Бронирование & Консьерж
          </h1>
        </div>
      </section>

      {/* 2. Strip 1: Info */}
      <section className="bg-custom-2 py-24 border-y border-slate-200/60 space-y-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="strip__title1">КОНТАКТЫ РЕСТОРАНА</h2>
            <div className="space-y-4 text-sm font-light text-slate-700">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E2C17C] shrink-0 mt-0.5" />
                <span><strong>Невский проспект, 24</strong> — 191186, Санкт-Петербург</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E2C17C] shrink-0" />
                <a href="mailto:concierge@romanov1792.ru" className="hover:text-[#E2C17C] transition-colors">concierge@romanov1792.ru</a>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E2C17C] shrink-0" />
                <a href="tel:+78123127788" className="hover:text-[#E2C17C] transition-colors">+7 (812) 312-77-88</a>
              </p>
              <p className="flex items-center gap-3 pt-2">
                <Clock className="w-5 h-5 text-[#E2C17C] shrink-0" />
                <span>Ежедневно: 12:00 – 00:00</span>
              </p>
            </div>
          </div>

          <div className="h-[60vh] overflow-hidden rounded-2xl shadow-xl">
            <SmartImage src="/media/contents/location-nevsky-24.jpg" alt="Локация РОМАНОВЪ" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6 lg:self-end">
            <h3 className="font-serif text-xl font-semibold text-[#0D1F18]">БАНКЕТЫ И ВИП-ЗАЛЫ</h3>
            <p className="text-sm font-light text-slate-700 leading-relaxed">
              Аренда парадных залов и персональное составление дегустационного меню для торжественных мероприятий.
            </p>
            <a href="mailto:concierge@romanov1792.ru" className="read-more">
              УЗНАТЬ О БАНКЕТАХ →
            </a>
          </div>
        </div>

        <div className="w-full h-[75vh] min-h-[500px] overflow-hidden js-scroll-n-clip shadow-2xl relative">
          <SmartImage
            src="/media/contents/3.png"
            alt="Атмосфера ресторана РОМАНОВЪ"
            className="w-full h-full object-cover filter contrast-[1.08] saturate-[1.08] brightness-[1.02] transform-gpu"
          />
        </div>
      </section>

      {/* 3. Strip 2: Reservation Form */}
      <section className="bg-custom-3 py-28 text-white space-y-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Заявка на Бронирование</span>
            <h2 className="strip__title1 strip__title1--white text-3xl md:text-5xl">
              ЗАБРОНИРОВАТЬ СТОЛ
            </h2>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
              Укажите желаемую дату, время и количество гостей. Наш банкетный консьерж свяжется с вами для подтверждения.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl space-y-6">
            {error && (
              <div className="p-3.5 bg-[#E2C17C]/15 border border-[#E2C17C]/40 text-[#E2C17C] rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#E2C17C]" />
                <span>{error}</span>
              </div>
            )}

            {submitted ? (
              <div className="p-8 bg-[#E2C17C]/10 border border-[#E2C17C]/30 text-white rounded-2xl text-center space-y-3">
                <h3 className="font-serif text-2xl font-bold text-[#E2C17C]">СПАСИБО</h3>
                <p className="text-sm font-light text-slate-200">
                  Ваша заявка принята. Консьерж свяжется с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Ваше Имя</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setError(''); }}
                      placeholder="Александр"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Email / Телефон</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setError(''); }}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Дата и количество гостей</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => { setFormData({ ...formData, subject: e.target.value }); setError(''); }}
                    placeholder="Например: 25 октября, 4 персоны, 19:00"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Пожелания</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setError(''); }}
                    placeholder="Пожелания по столу, аллергии, особый повод..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="read-more read-more--white cursor-pointer pt-2"
                >
                  ОТПРАВИТЬ ЗАЯВКУ →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
