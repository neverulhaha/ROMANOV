import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Truck, X } from 'lucide-react';

export default function OrderSuccessModal({ isOpen, onClose, orderDetails, user }) {
  if (!isOpen || !orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c1426]/80 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl p-[1px] bg-gradient-to-b from-[#dac773]/70 via-white/20 to-[#dac773]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="bg-[#142342] text-white rounded-[23px] p-8 md:p-10 space-y-6 relative">
          
          {/* Subtle Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#dac773]/15 blur-3xl pointer-events-none rounded-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon & Celebration Title */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#dac773]/20 border border-[#dac773]/40 flex items-center justify-center mx-auto text-[#dac773] shadow-lg animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#dac773] font-bold">
              Order Confirmed
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white">
              Grazie per il tuo ordine!
            </h2>
            <p className="text-slate-300 text-xs font-light max-w-sm mx-auto leading-relaxed">
              Your order <strong className="text-[#dac773]">{orderDetails.orderId}</strong> has been received and is being prepared with artisanal care in Florence.
            </p>
          </div>

          {/* Shipping & Summary Details */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3 text-xs font-light">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#dac773] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Delivery Address:</span>
                <span className="text-slate-300">
                  {user?.name} — {user?.address}, {user?.city} ({user?.postalCode}), {user?.country || 'Italy'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <Truck className="w-4 h-4 text-[#dac773] shrink-0" />
              <div>
                <span className="font-semibold text-white">Estimated Delivery:</span>{' '}
                <span className="text-[#dac773]">2-3 Business Days via Express Courier</span>
              </div>
            </div>
          </div>

          {/* Items Purchased List */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Order Summary</span>
            <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                  <span className="text-slate-200">{item.name} × {item.quantity}</span>
                  <span className="font-bold text-[#dac773]">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm font-serif font-bold text-white pt-2">
              <span>Total Paid:</span>
              <span className="text-lg text-[#dac773]">€{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              to="/account"
              onClick={onClose}
              className="flex-1 text-center bg-white/10 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-widest hover:bg-white/20 transition-all border border-white/15"
            >
              VIEW IN ACCOUNT
            </Link>
            <Link
              to="/shop"
              onClick={onClose}
              className="flex-1 text-center bg-gradient-to-r from-[#dac773] via-[#b89f31] to-[#dac773] text-[#142342] font-bold text-xs py-3.5 rounded-xl uppercase tracking-widest shadow-xl hover:brightness-110 transition-all"
            >
              RETURN TO BOUTIQUE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
