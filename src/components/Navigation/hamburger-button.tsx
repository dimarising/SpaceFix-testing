import React from 'react';

interface HamburgerButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function HamburgerButton({ className = '', onClick }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className={`nav:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 cursor-pointer ${className}`}
      aria-label="Otwórz menu"
      onClick={onClick}
    >
      <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-black" />
      <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-black" />
      <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-black" />
    </button>
  );
}
