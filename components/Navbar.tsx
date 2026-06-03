'use client';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/categorias', label: 'Categorías' },
  { href: '/sobre-nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-kob-border/50 backdrop-blur-md bg-kob-void/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
              <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" fill="#7c3aed" opacity="0.3"/>
              <circle cx="16" cy="16" r="3" fill="#a78bfa"/>
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-[0.15em] text-kob-light group-hover:text-kob-glow transition-colors">
            KOB<span className="text-kob-purple">CRAFT</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body font-semibold text-sm tracking-widest uppercase text-kob-light/70 hover:text-kob-glow transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-kob-purple group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/tienda" className="hidden md:flex kob-btn-primary text-xs py-2 px-4">
            Ver Productos
          </Link>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-kob-light/70 hover:text-kob-glow"
            aria-label="Menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open
                ? <><path d="M6 6l12 12M6 18L18 6"/></>
                : <><path d="M3 6h18M3 12h18M3 18h18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-kob-dark border-t border-kob-border/50 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-body font-semibold tracking-widest uppercase text-kob-light/80 hover:text-kob-glow py-2 border-b border-kob-border/30"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
