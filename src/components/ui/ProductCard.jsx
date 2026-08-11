import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Button from './Button';
import SmartImage from './SmartImage';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-square bg-slate-50">
        <SmartImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 bg-[#142342]/85 backdrop-blur-md text-[#dac773] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-[#dac773]/30">
          {product.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base font-serif font-semibold text-[#142342] group-hover:text-[#b89f31] transition-colors mb-1.5">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 font-light line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-base font-bold text-[#142342]">
            €{product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            variant="gold"
            onClick={() => onAddToCart && onAddToCart(product)}
            className="gap-1.5 shadow-sm hover:shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
