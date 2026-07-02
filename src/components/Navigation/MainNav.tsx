import React, { useState } from 'react';
import HamburgerButton from './hamburger-button.tsx';
import MobileMenu from './mobile-menu.tsx';
import NavDropdown from './NavDropdown.tsx';
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
            className="h-[0.9rem] w-auto object-contain sm:h-5 xl:h-6"
          />
        </a>

        <nav className="hidden items-center gap-3 nav:flex lg:gap-6 xl:gap-8" aria-label="Główne menu">
          <ul className="flex items-center gap-4 lg:gap-5 xl:gap-6">
            {homeNavLinks.map((link) =>
              link.children && link.children.length > 0 ? (
                <NavDropdown key={link.href} link={link} />
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="whitespace-nowrap text-sm font-medium text-black transition hover:text-black/70 xl:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <PhoneCta compact />
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
