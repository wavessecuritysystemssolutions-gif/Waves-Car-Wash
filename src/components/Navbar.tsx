import {useState} from 'react';
import {Menu, X} from 'lucide-react';

const NAV_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'How It Works', href: '#how-it-works'},
  {label: 'Areas', href: '#service-areas'},
  {label: 'Gallery', href: '#gallery'},
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-lg font-display font-bold tracking-tight text-[#081B33] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00B4D8] rounded"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#081B33" />
            <path
              d="M5 18.5C8.2 15.2 11.4 15.2 14.6 18.5C17.8 21.8 21 21.8 27 16.2"
              stroke="#00B4D8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M7 13C9.6 10.5 12.2 10.5 14.8 13C17.4 15.5 20.5 15.5 25 11.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Waves Car Wash</span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#081B33] transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#00B4D8] hover:after:w-full after:transition-all after:duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00B4D8] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#booking"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#081B33] to-[#0284C7] hover:from-[#0F294A] hover:to-[#00B4D8] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8]"
          >
            Book Now
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-[#081B33] hover:bg-slate-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4D8]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-base font-medium text-[#081B33] rounded-lg hover:bg-slate-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#081B33] to-[#0284C7] rounded-lg"
            >
              Book Now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
