import React from 'react';

export default function GlassPanel({ children, className = '', dark = false, ...props }) {
  return (
    <div
      className={`rounded-2xl ${dark ? 'glass-panel-dark' : 'glass-panel'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
