import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, AlertCircle } from 'lucide-react';
import CustomDatePicker from '../components/ui/CustomDatePicker';
import CustomSelect from '../components/ui/CustomSelect';

gsap.registerPlugin(ScrollTrigger);

export default function ReservationPage() {
  const mainRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2 персоны',
    date: '2026-08-10',
    time: '19:00',
    hall: 'Главный Имперский Зал',
    wishes: '',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const timeOptions = ['12:00', '14:00', '17:00', '19:00', '21:00'];
  const guestOptions = ['1-2 персоны', '3-4 персоны', '5-8 персон', 'ВИП-Зал (до 15 персон)'];
  const hallOptions = [
    'Главный Имперский Зал',
    'Икорная Гостиная',
    'Зал Русской Печи',
    'Приватный ВИП-Кабинет',
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
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Пожалуйста, укажите ваше имя.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Пожалуйста, укажите контактный телефон.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div ref={mainRef} className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden min-h-screen">
      {/* 1. Hero Header */}
      <section className="py-20 px-6 text-center bg-np-white flex items-center justify-center min-h-[35vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Сервис Бронирования</span>
          <h1 className="strip__title1 js-scrub-text leading-tight text-4xl md:text-6xl font-semibold">
            Бронирование Столов
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Забронируйте столик в Парадном зале или приватный ВИП-кабинет для атмосферного вечера в ресторане «РОМАНОВЪ».
          </p>
        </div>
      </section>

      {/* 2. Interactive Reservation Section */}
      <section className="bg-custom-3 py-24 text-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Info Column with Clean Minimalist Serif Typography (No Icons, No Cards) */}
          <div className="lg:col-span-5 space-y-8 js-slide-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Правила и Залы</span>
            <h2 className="strip__title1 strip__title1--white text-3xl md:text-5xl">
              ПРАВИЛА БРОНИРОВАНИЯ
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Мы рекомендуем бронировать столы за 2-3 дня до планируемого визита. Для гостей Главного зала доступен вечерний аккомпанемент живой арфы с 19:00.
            </p>

            {/* Clean Minimalist Fine-Dining Info Section */}
            <div className="space-y-6 pt-6 border-t border-white/10 text-xs font-light text-slate-300">
              <div className="space-y-1">
                <h4 className="font-serif text-sm font-semibold text-[#E2C17C] uppercase tracking-wider">
                  Дресс-код & Этикет
                </h4>
                <p className="text-slate-300 leading-relaxed font-light">
                  Smart Casual / Evening Attire
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-sm font-semibold text-[#E2C17C] uppercase tracking-wider">
                  Икорный Сомелье
                </h4>
                <p className="text-slate-300 leading-relaxed font-light">
                  Персональное сопровождение при бронировании стола в Икорной Гостиной
                </p>
              </div>
            </div>
          </div>

          {/* Right Reservation Form Column */}
          <div className="lg:col-span-7 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl js-slide-right space-y-6">
            {error && (
              <div className="p-3.5 bg-[#E2C17C]/15 border border-[#E2C17C]/40 text-[#E2C17C] rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#E2C17C]" />
                <span>{error}</span>
              </div>
            )}

            {submitted ? (
              <div className="p-10 bg-[#E2C17C]/10 border border-[#E2C17C]/30 text-white rounded-2xl text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E2C17C]/20 flex items-center justify-center mx-auto text-[#E2C17C]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#E2C17C]">СТОЛ УСПЕШНО ЗАБРОНИРОВАН</h3>
                <p className="text-sm font-light text-slate-200 leading-relaxed">
                  Благодарим вас, <strong>{formData.name}</strong>. Мы ждем вас <strong>{formData.date} в {formData.time}</strong> ({formData.guests}, {formData.hall}).
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-3 bg-[#E2C17C] text-[#0D1F18] font-bold text-xs rounded-xl uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  ЗАБРОНИРОВАТЬ ЕЩЕ СТОЛ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Имя и Фамилия</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setError(''); }}
                      placeholder="Александр Романов"
                      className="w-full bg-[#081510] border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Телефон</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setError(''); }}
                      placeholder="+7 (999) 123-45-67"
                      className="w-full bg-[#081510] border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Custom Brand Luxury Date Picker */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Дата</label>
                    <CustomDatePicker
                      selectedDate={formData.date}
                      onChange={(newDate) => setFormData({ ...formData, date: newDate })}
                    />
                  </div>

                  {/* Custom Brand Luxury Time Select */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Время</label>
                    <CustomSelect
                      value={formData.time}
                      options={timeOptions}
                      onChange={(newTime) => setFormData({ ...formData, time: newTime })}
                    />
                  </div>

                  {/* Custom Brand Luxury Guests Select */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Гости</label>
                    <CustomSelect
                      value={formData.guests}
                      options={guestOptions}
                      onChange={(newGuests) => setFormData({ ...formData, guests: newGuests })}
                    />
                  </div>
                </div>

                {/* Custom Brand Luxury Hall Select */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Предпочтение по Залу</label>
                  <CustomSelect
                    value={formData.hall}
                    options={hallOptions}
                    onChange={(newHall) => setFormData({ ...formData, hall: newHall })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-widest text-[#E2C17C]">Особые Пожелания</label>
                  <textarea
                    rows={3}
                    value={formData.wishes}
                    onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                    placeholder="Аллергии, романтический повод, живые цветы..."
                    className="w-full bg-[#081510] border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#E2C17C] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="read-more read-more--white cursor-pointer pt-2"
                >
                  ПОДТВЕРДИТЬ БРОНИРОВАНИЕ →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
