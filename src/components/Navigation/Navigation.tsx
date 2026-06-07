import React from 'react';
import MainNav from './MainNav.tsx';

const Navigation = () => {
  return (
    <header className="fixed top-0 left-0 z-50 flex h-[var(--header-height)] w-full items-center justify-center bg-white">
      <div className="page-shell flex h-full items-center">
        <MainNav />
      </div>
    </header>
  );
};

export default Navigation;
