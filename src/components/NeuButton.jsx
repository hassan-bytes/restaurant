import React from 'react';

export default function NeuButton({
  children,
  className = '',
  gold = false,
  active = false,
  onClick,
  ...props
}) {
  const baseClass = gold ? 'neu-button-gold' : 'neu-button';
  const activeClass = active ? 'neu-button-pressed' : '';
  
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-sans font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${baseClass} ${activeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
