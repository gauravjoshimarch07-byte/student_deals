export default function CTAButton({ href, label = 'Check Price', variant = 'primary', className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`btn-${variant} ${className}`}
      onClick={() => {
        // Track affiliate click (add your analytics here)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'affiliate_click', {
            event_category: 'Affiliate',
            event_label: label,
            value: href,
          });
        }
      }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {label}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
