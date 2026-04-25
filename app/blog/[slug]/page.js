import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/getPosts';
import TableOfContents from '@/components/TableOfContents';
import BlogCard from '@/components/BlogCard';
import NewsletterSection from '@/components/NewsletterSection';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.thumbnail }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

function extractHeadings(content) {
  const lines = content.split('\n');
  const headings = [];
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ level, text, id });
    }
  }
  return headings;
}

function getFaqSchema(content) {
  const faqSection = content.match(/## FAQ[\s\S]*?(?=##|$)/i);
  if (!faqSection) return null;
  const pairs = [];
  const qMatches = [...faqSection[0].matchAll(/\*\*Q:\s*(.+?)\*\*[\s\n]+A:\s*(.+?)(?=\*\*Q:|$)/gis)];
  for (const m of qMatches) {
    pairs.push({ '@type': 'Question', name: m[1].trim(), acceptedAnswer: { '@type': 'Answer', text: m[2].trim() } });
  }
  if (!pairs.length) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: pairs };
}

const categoryBadgeMap = {
  Tech: 'badge-blue', Study: 'badge-green', Lifestyle: 'badge-orange',
  Kitchen: 'bg-pink-100 text-pink-700 badge', Fitness: 'bg-purple-100 text-purple-700 badge',
};

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, post.category, 3);
  const headings = extractHeadings(post.content);
  const faqSchema = getFaqSchema(post.content);
  const badgeClass = categoryBadgeMap[post.category] || 'badge-orange';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'StudentDeals' },
    publisher: { '@type': 'Organization', name: 'StudentDeals', logo: { '@type': 'ImageObject', url: 'https://studentdeals.in/logo.png' } },
    image: post.thumbnail,
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Hero */}
      <div className="bg-gradient-to-b from-cream-warm to-cream pt-8 pb-4">
        <div className="container-site max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
            <span>›</span>
            <Link href={`/category/${post.category.toLowerCase()}`} className="hover:text-brand-600 transition-colors">{post.category}</Link>
            <span>›</span>
            <span className="text-ink truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={badgeClass}>{post.category}</span>
            <span className="text-xs text-ink-muted">{post.readingTime}</span>
            <time className="text-xs text-ink-muted" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] mb-5">
            {post.title}
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed mb-8 max-w-2xl">{post.description}</p>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="container-site max-w-4xl mb-10">
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-md">
          <Image src={post.thumbnail} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 896px" />
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <div className="container-site max-w-4xl mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3 text-sm text-amber-800">
          <span className="text-lg flex-shrink-0">ℹ️</span>
          <p><strong>Affiliate Disclosure:</strong> Some links in this article are affiliate links. If you purchase through them, we earn a small commission at no extra cost to you. This helps us keep producing free content for students.</p>
        </div>
      </div>

      {/* Main content */}
      <div className="container-site max-w-4xl">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-10 items-start">
          {/* Article body */}
          <article className="prose-blog min-w-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => {
                  const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return <h2 id={id}>{children}</h2>;
                },
                h3: ({ children }) => {
                  const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return <h3 id={id}>{children}</h3>;
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="comparison-table">{children}</table>
                  </div>
                ),
                a: ({ href, children }) => (
                  <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer nofollow' : undefined}>
                    {children}
                  </a>
                ),
                 img: ({ src, alt }) => (
                <div className="my-6 flex justify-center">
                <Image
                src={src}
                alt={alt || ''}
                width={500}
                height={300}
                className="rounded-xl"
                 />
                </div>
),
              }
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            {headings.length > 0 && <TableOfContents headings={headings} />}

            {/* Sticky deals widget */}
            <div className="card p-5 border-2 border-brand-100">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🔥</div>
                <h3 className="font-display font-bold text-ink text-sm">Today's Hot Deal</h3>
                <p className="text-xs text-ink-muted mt-1">Limited time offers for students</p>
              </div>
              <Link href="/blog" className="btn-primary w-full text-sm text-center justify-center">
                View All Deals
              </Link>
            </div>

            {/* Quick links */}
            <div className="card p-5">
              <h3 className="font-display font-bold text-sm text-ink mb-3 uppercase tracking-wide">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: '💻 Best Budget Laptops', href: '/blog/best-budget-laptops' },
                  { label: '🎧 Earbuds Under ₹1000', href: '/blog/best-budget-earbuds' },
                  { label: '📚 Study Essentials', href: '/category/study' },
                  { label: '🔥 Under ₹500 Picks', href: '/blog?tag=under-500' },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block text-sm text-ink-soft hover:text-brand-600 py-1 border-b border-cream-warm last:border-0 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container-site max-w-4xl mt-16 pt-10 border-t border-cream-warm">
          <h2 className="font-display font-bold text-2xl text-ink mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <div className="container-site max-w-4xl mt-16 pb-16">
        <NewsletterSection />
      </div>
    </>
  );
}
