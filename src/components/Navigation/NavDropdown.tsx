import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import type { NavLink } from '../../config/site';

interface NavDropdownProps {
  link: NavLink;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ link }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  const children = link.children ?? [];

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-black transition hover:text-black/70 xl:text-base"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        {link.label}
        <FiChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="overflow-hidden rounded-2xl border border-[#eeeeec] bg-white p-2 shadow-card-hover">
          {children.map((child) => (
            <li key={child.href}>
              <a
                href={child.href}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#f6f6f4] hover:text-black"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default NavDropdown;
