import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, to, onClick, variant = 'gold', size = 'md', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full tracking-wider uppercase text-xs";
  
  const variants = {
    gold: "bg-[#dac773] text-[#142342] hover:bg-[#b89f31] hover:text-white shadow-md hover:shadow-lg",
    outlined: "border border-[#142342] text-[#142342] hover:bg-[#142342] hover:text-white",
    outlinedGold: "border border-[#dac773] text-[#dac773] hover:bg-[#dac773] hover:text-[#142342]",
    dark: "bg-[#142342] text-white hover:bg-[#0d172b] shadow-md",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
