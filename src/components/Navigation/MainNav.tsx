import React, { useState } from 'react';
import HamburgerButton from './hamburger-button.tsx';
import MobileMenu from './mobile-menu.tsx';
import PhoneCta from './phone-cta.tsx';
import { homeNavLinks } from '../../config/site';
import { withBase } from '../../utils/withBase';

const LOGO_SRC = withBase('/images/assets/spacefix-logo.png');

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <a href={withBase('/')} className="flex shrink-0 items-center">
          <img
            alt="SpaceFix logo"
            src={LOGO_SRC}
            className="h-[0.9rem] w-auto object-contain sm:h-5 nav:h-6"
          />
        </a>

        <nav className="hidden items-center gap-8 nav:flex lg:gap-12" aria-label="Główne menu">
          <ul className="flex items-center gap-6 lg:gap-8">
            {homeNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-black transition hover:text-black/70 lg:text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <PhoneCta />
        </nav>

        <HamburgerButton
          className={isMenuOpen ? 'invisible' : ''}
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      <MobileMenu show={isMenuOpen} onClose={() => setIsMenuOpen(false)} logoSrc={LOGO_SRC} />
    </>
  );
};

export default MainNav;
