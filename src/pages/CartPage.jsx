import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { siteConfig } from '../config/siteData';
import SmartImage from '../components/ui/SmartImage';

export default function CartPage({
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  user,
  onOpenLogin,
  onCompleteCheckout,
}) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 15000;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 950;
  const total = subtotal + shipping;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    if (!user) {
      if (onOpenLogin) onOpenLogin();
      return;
    }

    if (!user.address || !user.phone || !user.name) {
      navigate('/account', { state: { fromCheckout: true } });
      return;
    }

    if (onCompleteCheckout) {
      // SECURITY-HARDENING: В реальном проекте клиент не должен генерировать orderId 
      // и считать финальную стоимость. Мы передаем на бэкенд только список товаров и их количество.
      onCompleteCheckout({
        items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
      });
    }
  };

  return (
    <div className="pt-24 space-y-0 text-[#0D1F18] bg-[#FCFCFC] overflow-x-hidden min-h-screen">
      {/* 1. Page Header */}
      <section className="py-16 px-6 text-center bg-np-white flex items-center justify-center min-h-[30vh]">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E2C17C] font-bold hover:text-[#0D1F18] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Вернуться в Бутик
          </Link>
          <h1 className="strip__title1 leading-tight text-4xl md:text-5xl font-semibold">
            Ваша Корзина Деликатесов
          </h1>
        </div>
      </section>

      {/* 2. Cart Content Section */}
      <section className="bg-custom-2 py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          {cart.length === 0 ? (
            /* Empty Cart Luxury Presentation */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="w-16 h-16 rounded-full bg-[#E2C17C]/15 flex items-center justify-center mx-auto lg:mx-0">
                  <ShoppingBag className="w-8 h-8 text-[#E2C17C]" />
                </div>
                <h2 className="strip__title1 text-2xl md:text-3xl">КОРЗИНА ПУСТА</h2>
                <p className="text-slate-700 text-sm md:text-base font-light leading-relaxed">
                  Ваша корзина ждет отборную черную икру, авторские настойки на дикоросах и кедровое пралине.
                </p>
                <div>
                  <Link to="/shop" className="read-more">
                    ОТКРЫТЬ БУТИК ДЕЛИКАТЕСОВ →
                  </Link>
                </div>
              </div>

              <div className="h-[55vh] min-h-[400px] overflow-hidden rounded-3xl shadow-2xl relative border border-slate-200">
                <SmartImage
                  src="/media/contents/cart-empty-presentation.jpg"
                  alt="Имперские Деликатесы"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <h3 className="font-serif text-xl font-semibold text-[#0D1F18] uppercase tracking-wider border-b border-slate-200 pb-3">
                  Рекомендуемый Сет
                </h3>
                <div className="space-y-4">
                  {siteConfig.products.slice(0, 2).map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4 group cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => onAddToCart && onAddToCart(product)}
                    >
                      <SmartImage
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-serif text-sm font-semibold text-[#0D1F18] group-hover:text-[#E2C17C] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs font-bold text-[#0D1F18]">{product.price.toLocaleString()} ₽</p>
                      </div>
                      <span className="text-xs font-bold text-[#E2C17C] group-hover:translate-x-1 transition-transform">
                        + КУПИТЬ
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Active Cart Items Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-6">
                {/* Elegant Fine-Dining Complimentary Shipping Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    {subtotal >= freeShippingThreshold ? (
                      <span className="font-serif text-[#0D1F18] font-bold uppercase tracking-wider">
                        Привилегия бесплатной курьерской доставки активирована
                      </span>
                    ) : (
                      <span className="font-serif text-slate-700 uppercase tracking-wider">
                        Добавьте деликатесов на {(freeShippingThreshold - subtotal).toLocaleString()} ₽ для бесплатной доставки
                      </span>
                    )}
                    <span className="font-serif font-bold text-[#E2C17C]">{progressPercent.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 border border-slate-200/40">
                    <motion.div
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                      className="bg-gradient-to-r from-[#E2C17C] via-[#C5A059] to-[#E2C17C] h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Items Container with Motion Layout & Smooth Counter Animations */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col sm:flex-row items-center gap-6"
                      >
                        <SmartImage
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shrink-0 border border-slate-100"
                        />

                        <div className="flex-1 space-y-1 text-center sm:text-left">
                          <span className="text-[10px] uppercase tracking-widest text-[#E2C17C] font-bold">
                            {item.category}
                          </span>
                          <h3 className="font-serif text-lg font-semibold text-[#0D1F18]">{item.name}</h3>
                          <p className="text-sm font-bold text-[#0D1F18]">{item.price.toLocaleString()} ₽</p>
                        </div>

                        {/* Interactive Quantity Controls */}
                        <div className="flex items-center gap-3 bg-[#0D1F18] text-white px-4 py-2.5 rounded-full shadow-lg">
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
                            className="hover:text-[#E2C17C] transition-colors p-1 cursor-pointer"
                            aria-label="Уменьшить количество"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-6 text-center overflow-hidden h-5 flex items-center justify-center">
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.span
                                key={item.quantity}
                                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="text-xs font-bold inline-block"
                              >
                                {item.quantity}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                            className="hover:text-[#E2C17C] transition-colors p-1 cursor-pointer"
                            aria-label="Увеличить количество"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Smooth Line Item Total Price Counter */}
                        <div className="flex items-center gap-4">
                          <div className="min-w-[90px] text-right">
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.span
                                key={item.price * item.quantity}
                                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.85, y: 4 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="font-serif font-bold text-lg text-[#0D1F18] inline-block"
                              >
                                {(item.price * item.quantity).toLocaleString()} ₽
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <button
                            onClick={() => onRemoveItem && onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-2 cursor-pointer"
                            aria-label="Удалить товар"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-[#0D1F18] text-white rounded-3xl p-8 md:p-10 shadow-2xl space-y-6 border border-white/10 sticky top-28">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2C17C] font-bold">Оформление</span>
                  <h2 className="font-serif text-2xl font-semibold text-white">Итог Заказа</h2>
                </div>

                <div className="space-y-4 text-sm font-light text-slate-300">
                  <div className="flex justify-between items-center">
                    <span>Стоимость товаров</span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={subtotal}
                        initial={{ opacity: 0, scale: 0.9, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 4 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-white font-medium inline-block"
                      >
                        {subtotal.toLocaleString()} ₽
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Доставка курьером</span>
                    <span className="text-white font-medium">
                      {shipping === 0 ? <span className="text-[#E2C17C] font-bold uppercase tracking-wider text-xs">БЕСПЛАТНО</span> : `${shipping.toLocaleString()} ₽`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="font-serif text-lg font-bold text-[#E2C17C]">Итого к оплате</span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, scale: 0.85, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: 6 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="font-serif text-2xl font-bold text-white inline-block"
                    >
                      {total.toLocaleString()} ₽
                    </motion.span>
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-gradient-to-r from-[#E2C17C] via-[#C5A059] to-[#E2C17C] text-[#0D1F18] font-bold text-xs py-4 rounded-xl uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  ОФОРМИТЬ ЗАКАЗ
                </button>

                <p className="text-[11px] text-center text-slate-400 font-light">
                  Гарантия свежести • Экспресс-доставка в холодильных термоконтейнерах
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
