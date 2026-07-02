import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';
import PhoneCta from './phone-cta.tsx';
import { homeNavLinks } from '../../config/site';
import { withBase } from '../../utils/withBase';

interface MobileMenuProps {
  show?: boolean;
  onClose?: () => void;
  logoSrc: string;
}

export default function MobileMenu({ show = false, onClose, logoSrc }: MobileMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <div
      className={`nav:hidden fixed inset-0 z-[60] flex flex-col bg-white transition-opacity duration-300 ${
        show ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
      }`}
      aria-hidden={!show}
    >
      <div className="page-shell flex items-center justify-between py-5">
        <a href={withBase('/')} className="flex items-center" onClick={onClose}>
          <img alt="SpaceFix logo" src={logoSrc} className="h-[0.9rem] w-auto object-contain sm:h-5" />
        </a>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-black"
          aria-label="Zamknij menu"
          onClick={onClose}
        >
          <FiX className="h-7 w-7" aria-hidden="true" />
        </button>
      </div>

      <div className="page-shell flex flex-col items-center pb-8 pt-6 sm:pt-8">
        <nav className="flex w-full flex-col items-center gap-8" aria-label="Menu mobilne">
          {homeNavLinks.map((link) =>
            link.children && link.children.length > 0 ? (
              <div key={link.href} className="flex w-full flex-col items-center">
                <button
                  type="button"
                  className="flex items-center gap-2 text-2xl font-medium text-black transition hover:text-black/70 sm:text-3xl"
                  aria-expanded={openGroup === link.href}
                  onClick={() =>
                    setOpenGroup((prev) => (prev === link.href ? null : link.href))
                  }
                >
                  {link.label}
                  <FiChevronDown
                    className={`h-6 w-6 transition-transform ${
                      openGroup === link.href ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openGroup === link.href && (
                  <div className="mt-5 flex flex-col items-center gap-4">
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="text-lg font-medium text-[#64748b] transition hover:text-black sm:text-xl"
                        onClick={onClose}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-2xl font-medium text-black transition hover:text-black/70 sm:text-3xl"
                onClick={onClose}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="mt-8 w-full">
          <PhoneCta fullWidth className="py-4 text-lg sm:py-5 sm:text-xl" />
        </div>
      </div>
    </div>
  );
}
