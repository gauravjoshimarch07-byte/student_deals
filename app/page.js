import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPosts, getAllPosts } from '@/lib/getPosts';
import BlogCard from '@/components/BlogCard';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata = {
  title: 'StudentDeals — Best Budget Products for Students in India',
  description: 'Find the best budget products for students in India. Honest reviews on tech, study essentials, and lifestyle picks under ₹500, ₹1000, ₹2000.',
};

const categories = [
  {
    name: 'Tech Gadgets',
    emoji: '💻',
    href: '/category/tech',
    description: 'Laptops, earbuds, chargers & more',
    color: 'bg-blue-50 border-blue-100 hover:border-blue-300',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Study Essentials',
    emoji: '📚',
    href: '/category/study',
    description: 'Notebooks, pens, planners & stationery',
    color: 'bg-green-50 border-green-100 hover:border-green-300',
    iconBg: 'bg-green-100 text-green-600',
  },
  {
    name: 'Lifestyle',
    emoji: '🎒',
    href: '/category/lifestyle',
    description: 'Bags, accessories, room essentials',
    color: 'bg-orange-50 border-orange-100 hover:border-orange-300',
    iconBg: 'bg-orange-100 text-orange-600',
  },
  {
    name: 'Kitchen',
    emoji: '🍳',
    href: '/category/kitchen',
    description: 'Hostel-friendly kitchen must-haves',
    color: 'bg-pink-50 border-pink-100 hover:border-pink-300',
    iconBg: 'bg-pink-100 text-pink-600',
  },
  {
    name: 'Fitness',
    emoji: '💪',
    href: '/category/fitness',
    description: 'Budget gym gear & fitness tools',
    color: 'bg-purple-50 border-purple-100 hover:border-purple-300',
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Under ₹1000',
    emoji: '🔥',
    href: '/blog?tag=under-1000',
    description: 'Best products at unbeatable prices',
    color: 'bg-brand-50 border-brand-100 hover:border-brand-300',
    iconBg: 'bg-brand-100 text-brand-600',
  },
];

const trendingDeals = [
  { name: 'boAt Airdopes 141', price: '₹999', originalPrice: '₹2,990', discount: '67%', category: 'Tech', href: '/blog/best-budget-earbuds' },
  { name: 'Classmate Premium Notebook', price: '₹89', originalPrice: '₹150', discount: '41%', category: 'Study', href: '/blog/best-notebooks-for-students' },
  { name: 'Wildcraft Campus Backpack', price: '₹799', originalPrice: '₹1,499', discount: '47%', category: 'Lifestyle', href: '/blog/best-college-bags' },
  { name: 'Mi Smart Band 8', price: '₹1,799', originalPrice: '₹3,499', discount: '49%', category: 'Tech', href: '/blog/best-smartwatches-under-2000' },
];

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-warm to-orange-50 pt-12 pb-20">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="container-site relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 badge-orange mb-6 animate-fade-up animate-on-load delay-100">
              🎓 India's #1 Student Deals Blog
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.1] mb-5 animate-fade-up animate-on-load delay-200">
              Best Budget Products
              <br />
              <span className="text-brand-500">for Students</span> in India
            </h1>

            <p className="text-lg text-ink-soft max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up animate-on-load delay-300">
              Honest reviews and top picks under ₹500, ₹1000 & ₹2000. Save more, study better, live smarter.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up animate-on-load delay-400">
              <Link href="/blog" className="btn-primary text-base px-7 py-3.5">
                🔥 Browse Top Deals
              </Link>
              <Link href="/blog?tag=under-1000" className="btn-outline text-base px-7 py-3.5">
                Under ₹1000
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-6 mt-10 animate-fade-up animate-on-load delay-500">
              {[
                { value: '50+', label: 'Products Reviewed' },
                { value: '10K+', label: 'Students Helped' },
                { value: '₹2Cr+', label: 'Savings Generated' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-bold text-2xl text-ink">{stat.value}</div>
                  <div className="text-xs text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="container-site py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              Shop by Category
            </h2>
            <p className="text-ink-muted text-sm mt-1">Find deals curated for every student need</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`card border-2 p-4 text-center transition-all duration-200 hover:-translate-y-1 group ${cat.color}`}
            >
              <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl ${cat.iconBg} group-hover:scale-110 transition-transform`}>
                {cat.emoji}
              </div>
              <h3 className="font-display font-semibold text-sm text-ink leading-tight mb-1">{cat.name}</h3>
              <p className="text-xs text-ink-muted leading-tight hidden sm:block">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED POSTS ── */}
      {featuredPosts.length > 0 && (
        <section className="container-site pb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">Featured Guides</h2>
              <p className="text-ink-muted text-sm mt-1">Our most popular & comprehensive buying guides</p>
            </div>
          </div>
          <div className="space-y-5">
            {featuredPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* ── TRENDING DEALS ── */}
      <section className="bg-cream-warm py-16">
        <div className="container-site">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">🔥 Trending Deals</h2>
              <p className="text-ink-muted text-sm mt-1">Top products students are buying right now</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingDeals.map((deal) => (
              <Link key={deal.name} href={deal.href} className="group card p-4 hover:-translate-y-1 transition-transform duration-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-orange text-xs">{deal.category}</span>
                  <span className="badge-green text-xs">{deal.discount} off</span>
                </div>
                <h3 className="font-display font-semibold text-ink text-sm leading-snug mb-3 group-hover:text-brand-600 transition-colors">{deal.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-xl text-brand-600">{deal.price}</span>
                  <span className="text-xs text-ink-faint line-through">{deal.originalPrice}</span>
                </div>
                <div className="mt-3 text-xs font-semibold text-brand-600 flex items-center gap-1">
                  View Deal
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST POSTS ── */}
      <section className="container-site py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">Latest Articles</h2>
            <p className="text-ink-muted text-sm mt-1">Fresh buying guides and product reviews</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            All articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-ink-muted">
            <p className="text-5xl mb-4">📝</p>
            <p>Articles coming soon. Add .md files to <code className="bg-cream-warm px-1 py-0.5 rounded text-sm">content/posts/</code></p>
          </div>
        )}
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="container-site pb-20">
        <NewsletterSection />
      </section>
    </>
  );
}
