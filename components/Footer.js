import Link from 'next/link';

const footerLinks = {
  Categories: [
    { name: 'Tech Gadgets', href: '/category/tech' },
    { name: 'Study Essentials', href: '/category/study' },
    { name: 'Lifestyle', href: '/category/lifestyle' },
    { name: 'Kitchen', href: '/category/kitchen' },
    { name: 'Fitness', href: '/category/fitness' },
  ],
  'Budget Guides': [
    { name: 'Under ₹500', href: '/blog?tag=under-500' },
    { name: 'Under ₹1000', href: '/blog?tag=under-1000' },
    { name: 'Under ₹2000', href: '/blog?tag=under-2000' },
    { name: 'Best Value Picks', href: '/blog?tag=best-value' },
  ],
  Site: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-cream-DEFAULT mt-20">
      {/* Affiliate Disclosure */}
      <div className="border-b border-ink-soft">
        <div className="container-site py-4">
          <p className="text-xs text-ink-faint text-center">
            <strong className="text-cream-warm">Affiliate Disclosure:</strong> StudentDeals participates in affiliate programs. We may earn a commission when you click on links and make purchases — at no extra cost to you. We only recommend products we genuinely believe in.
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-site py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">
                SD
              </div>
              <span className="font-display font-bold text-lg">
                Student<span className="text-brand-400">Deals</span>
              </span>
            </Link>
            <p className="text-sm text-ink-faint leading-relaxed mb-6">
              Helping students find the best value products without breaking the bank. Honest reviews, real savings.
            </p>
            <div className="flex gap-3">
              {['Instagram', 'YouTube', 'Twitter'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-ink-soft hover:bg-brand-500 flex items-center justify-center transition-colors text-xs text-ink-faint hover:text-white"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-sm text-cream-warm mb-4 uppercase tracking-wider">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-faint hover:text-brand-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-soft">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} StudentDeals. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Made with ❤️ for students across India
          </p>
        </div>
      </div>
    </footer>
  );
}
