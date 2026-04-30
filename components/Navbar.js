'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Tech', href: '/category/tech', emoji: '💻' },
  { name: 'Study', href: '/category/study', emoji: '📚' },
  { name: 'Lifestyle', href: '/category/lifestyle', emoji: '🎒' },
  { name: 'Kitchen', href: '/category/kitchen', emoji: '🍳' },
  { name: 'Fitness', href: '/category/fitness', emoji: '💪' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-warm'
          : 'bg-cream'
      }`}
    >
      <div className="container-site">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm group-hover:scale-110 transition-transform">
              SD
            </div>
            <span className="font-display font-bold text-ink text-lg">
              Student<span className="text-brand-500">Deals</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="nav-link px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-cream-warm transition-all">
              Home
            </Link>
            <Link href="/blog" className="nav-link px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-cream-warm transition-all">
              Blog
            </Link>

            {/* Categories dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-cream-warm transition-all">
                Categories
                <svg className={`w-4 h-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-cream-warm p-2 animate-fade-in">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-ink-soft hover:text-ink hover:bg-cream-warm rounded-lg transition-all"
                    >
                      <span>{cat.emoji}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog?tag=under-1000" className="nav-link px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-cream-warm transition-all">
              Under ₹1000
            </Link>
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link href="/blog" className="hidden md:flex btn-primary text-sm px-4 py-2">
              🔥 Top Deals
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-cream-warm transition-all"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-0.5 bg-ink transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-ink transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-ink transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-cream-warm py-4 space-y-1 animate-fade-in">
            {[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog' },
              { name: 'Under ₹1000', href: '/blog?tag=under-1000' },
              ...categories.map((c) => ({ name: `${c.emoji} ${c.name}`, href: c.href })),
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-ink-soft hover:text-ink hover:bg-cream-warm rounded-lg transition-all"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/blog" className="btn-primary w-full text-center text-sm">
                🔥 Browse All Deals
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}