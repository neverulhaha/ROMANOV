import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Package, Check, LogOut, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AccountPage({ user, onUpdateUser, onLogout, orders = [] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Санкт-Петербург',
    postalCode: user?.postalCode || '',
    country: user?.country || 'Россия',
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const fromCheckout = location.state?.fromCheckout;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || 'Санкт-Петербург',
        postalCode: user.postalCode || '',
        country: user.country || 'Россия',
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#E2C17C]/15 flex items-center justify-center mx-auto text-[#E2C17C]">
          <User className="w-8 h-8" />
        </div>
        <h1 className="strip__title1 text-3xl md:text-4xl">ЛИЧНЫЙ КАБИНЕТ КЛУБА</h1>
        <p className="text-slate-600 text-sm md:text-base font-light max-w-md mx-auto">
          Войдите в ваш аккаунт Клуба «Династия», чтобы настроить адрес доставки и просматривать историю заказов.
        </p>
        <button
          onClick={() => navigate('/')}
          className="read-more cursor-pointer"
        >
          ВЕРНУТЬСЯ НА ГЛАВНУЮ →
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Пожалуйста, укажите ваше имя.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Пожалуйста, укажите ваш контактный телефон.');
      return;
    }
    if (!formData.address.trim()) {
      setError('Пожалуйста, укажите адрес доставки.');
      return;
    }

    setError('');
    onUpdateUser(formData);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
      if (fromCheckout) {
        navigate('/cart');
      }
    }, 1500);
  };

  return (
    <div className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden min-h-screen">
      <section className="py-16 px-6 text-center bg-np-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Клуб «Династия»</span>
          <h1 className="strip__title1 leading-tight text-4xl md:text-5xl font-semibold">
            Личный Кабинет Гостя
          </h1>
          <p className="text-slate-600 text-sm font-light">
            Управляйте данными вашей доставки и премиальными привилегиями.
          </p>
        </div>
      </section>

      <section className="py-20 bg-custom-1">
        <div className="max-w-7xl mx-auto px-6">
          {fromCheckout && (
            <div className="mb-10 p-5 bg-[#E2C17C]/15 border border-[#E2C17C]/40 text-[#0D1F18] rounded-2xl flex items-center gap-3 animate-fade-in shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#E2C17C] shrink-0" />
              <div className="text-xs">
                <span className="font-bold block uppercase tracking-wider text-[#0D1F18]">Заполните данные доставки</span>
                <span>Для завершения оформления заказа укажите телефон и адрес доставки ниже.</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Address Configuration Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#0D1F18]">Данные Доставки</h2>
                  <p className="text-xs text-slate-500 font-light">Информация используется для доставки заказов</p>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Выйти
                </button>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {saved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Данные успешно сохранены!{fromCheckout ? ' Перенаправление в корзину...' : ''}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">ФИО Получателя</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Александр Романов"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#E2C17C]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">Телефон</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#E2C17C]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@romanov1792.ru"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#E2C17C]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">Адрес Курьерской Доставки</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Улица, дом, корпус, квартира / офис"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#E2C17C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">Город</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E2C17C]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">Индекс</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="190000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E2C17C]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">Страна</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E2C17C]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="read-more pt-2 cursor-pointer"
                >
                  СОХРАНИТЬ ДАННЫЕ →
                </button>
              </form>
            </div>

            {/* Order History */}
            <div className="lg:col-span-5 bg-[#0D1F18] text-white p-8 md:p-10 rounded-3xl shadow-2xl space-y-6 border border-white/10">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2C17C] font-bold">История</span>
                <h2 className="font-serif text-2xl font-semibold text-white">Ваши Заказы</h2>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-4 text-slate-300">
                  <Package className="w-12 h-12 text-[#E2C17C] mx-auto opacity-70" />
                  <p className="text-sm font-light">История заказов пока пуста.</p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="read-more read-more--white text-xs cursor-pointer"
                  >
                    ОТКРЫТЬ БУТИК ДЕЛИКАТЕСОВ →
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {orders.map((ord, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3 text-xs">
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="font-bold text-[#E2C17C]">{ord.orderId}</span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">
                          Подтвержден
                        </span>
                      </div>
                      <div className="space-y-1 text-slate-300 font-light border-t border-b border-white/5 py-2">
                        {ord.items?.map((it) => (
                          <div key={it.id} className="flex justify-between">
                            <span>{it.name} x{it.quantity}</span>
                            <span>{(it.price * it.quantity).toLocaleString()} ₽</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-serif font-bold text-white pt-1">
                        <span>Итого:</span>
                        <span className="text-[#E2C17C]">{ord.total?.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
