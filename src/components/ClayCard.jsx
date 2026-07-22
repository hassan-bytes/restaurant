import React from 'react';

export default function ClayCard({ children, className = '', dark = false, ...props }) {
  return (
    <div
      className={`${dark ? 'clay-card-dark text-cream-bg' : 'clay-card'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
