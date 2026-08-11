import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function CartToast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-bounce-in max-w-sm w-full">
      <div className="bg-[#142342] text-white p-4 md:p-5 rounded-2xl shadow-2xl border border-[#dac773]/40 flex items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle Gold Accent Strip */}
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#dac773]" />

        <div className="flex items-center gap-3 pl-2">
          <div className="w-10 h-10 rounded-xl bg-[#dac773]/15 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#dac773]" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#dac773]">Added to Cart</span>
            <h4 className="font-serif text-sm font-semibold text-white line-clamp-1">{toast.name}</h4>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/cart"
            onClick={onClose}
            className="text-[11px] font-bold text-[#dac773] hover:text-white uppercase tracking-wider underline underline-offset-4"
          >
            VIEW CART →
          </Link>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
