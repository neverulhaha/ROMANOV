import React, { useState } from 'react';
import { X, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Пожалуйста, укажите адрес электронной почты.');
      return;
    }
    if (!password.trim()) {
      setError('Пожалуйста, введите ваш пароль.');
      return;
    }
    setError('');
    if (onLoginSuccess) {
      onLoginSuccess({
        email: email,
        name: email.split('@')[0].toUpperCase(),
      });
    }
  };

  const handleClose = () => {
    setError('');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07110D]/85 backdrop-blur-xl animate-fade-in">
      {/* Golden Border Gradient Outer Container */}
      <div className="w-full max-w-md rounded-3xl p-[1px] bg-gradient-to-b from-[#E2C17C]/70 via-white/15 to-[#E2C17C]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Inner Card Content */}
        <div className="bg-[#0D1F18] text-white rounded-[23px] p-8 md:p-10 space-y-6 relative">
          
          {/* Decorative Subtle Radial Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#E2C17C]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-[#E2C17C] hover:rotate-90 transition-all duration-300 p-1 cursor-pointer"
            aria-label="Закрыть окно"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Brand Header */}
          <div className="text-center space-y-2 pt-2">
            <span className="font-serif text-3xl font-bold tracking-[0.2em] text-white uppercase block">
              РОМАНОВЪ
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#E2C17C]" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#E2C17C] font-bold">
                Клуб «Династия» • С 1792 года
              </span>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#E2C17C]" />
            </div>
          </div>

          {/* Custom Error Tooltip Banner */}
          {error && (
            <div className="p-3 bg-[#E2C17C]/15 border border-[#E2C17C]/40 text-[#E2C17C] rounded-xl text-xs font-medium flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#E2C17C]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">
                Электронная Почта
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#E2C17C] absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="alex@romanov1792.ru"
                  className="w-full bg-[#081510] border border-white/15 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E2C17C] focus:ring-1 focus:ring-[#E2C17C]/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#E2C17C]">
                  Пароль
                </label>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setError('Функция сброса пароля отправлена на ваш почтовый ящик.'); }}
                  className="text-[10px] text-slate-400 hover:text-[#E2C17C] transition-colors"
                >
                  Забыли пароль?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#E2C17C] absolute left-4 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full bg-[#081510] border border-white/15 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E2C17C] focus:ring-1 focus:ring-[#E2C17C]/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E2C17C] via-[#C5A059] to-[#E2C17C] text-[#0D1F18] font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-[#E2C17C]/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer mt-2"
            >
              ВОЙТИ В КЛУБ «ДИНАСТИЯ»
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center border-t border-white/10">
            <p className="text-[11px] text-slate-400 font-light">
              Ещё не состоите в клубе?{' '}
              <button
                onClick={() => {
                  if (onLoginSuccess) {
                    onLoginSuccess({
                      email: 'guest@romanov1792.ru',
                      name: 'ИМПЕРАТОРСКИЙ ГОСТЬ',
                    });
                  }
                }}
                className="text-[#E2C17C] font-semibold hover:underline cursor-pointer"
              >
                Вступить в Клуб «Династия»
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
