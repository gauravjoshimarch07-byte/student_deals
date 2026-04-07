'use client';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Replace with your actual newsletter API
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="bg-ink text-cream-DEFAULT rounded-3xl px-6 py-12 sm:px-10 sm:py-14 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 badge bg-brand-500/20 text-brand-300 mb-4">
          🎓 For Students
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3">
          Never Miss a Deal
        </h2>
        <p className="text-ink-faint max-w-md mx-auto mb-8">
          Get the hottest student deals, budget picks, and exclusive discounts straight to your inbox every week.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-6 py-3 rounded-xl font-semibold">
            🎉 You're in! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-ink-soft text-cream-DEFAULT placeholder:text-ink-faint border border-ink-soft focus:outline-none focus:border-brand-500 transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Get Free Deals'}
            </button>
          </form>
        )}

        <p className="text-xs text-ink-faint mt-4">
          No spam. Unsubscribe anytime. 🔒 Your data is safe.
        </p>
      </div>
    </section>
  );
}
