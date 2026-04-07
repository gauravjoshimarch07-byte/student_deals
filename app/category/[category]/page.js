import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostsByCategory, getAllCategories } from '@/lib/getPosts';
import BlogCard from '@/components/BlogCard';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({ category: category.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: `Best ${category} Products for Students — Budget Picks`,
    description: `Find the best budget ${category.toLowerCase()} products for students in India. Honest reviews and top picks curated for student life.`,
  };
}

const categoryMeta = {
  tech: { emoji: '💻', title: 'Tech Gadgets', desc: 'Laptops, earbuds, chargers, and all things tech on a student budget.' },
  study: { emoji: '📚', title: 'Study Essentials', desc: 'Notebooks, pens, planners, and everything you need to ace exams.' },
  lifestyle: { emoji: '🎒', title: 'Lifestyle Picks', desc: 'Bags, accessories, and room essentials for student life.' },
  kitchen: { emoji: '🍳', title: 'Kitchen Finds', desc: 'Hostel-friendly kitchen gadgets and cooking essentials.' },
  fitness: { emoji: '💪', title: 'Fitness Gear', desc: 'Budget gym equipment and fitness accessories.' },
};

export default function CategoryPage({ params }) {
  const slug = params.category.toLowerCase();
  const posts = getPostsByCategory(params.category);
  const meta = categoryMeta[slug] || { emoji: '📂', title: params.category, desc: `Browse all ${params.category} articles.` };

  return (
    <div className="container-site py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-ink-muted mb-8">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-brand-600">Blog</Link>
        <span>›</span>
        <span className="text-ink">{meta.title}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">{meta.emoji}</div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mb-3">{meta.title}</h1>
        <p className="text-ink-muted max-w-lg mx-auto">{meta.desc}</p>
        <p className="text-sm text-ink-faint mt-2">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🚧</p>
          <p className="text-ink-muted mb-4">No articles in this category yet. Check back soon!</p>
          <Link href="/blog" className="btn-primary">Browse All Articles</Link>
        </div>
      )}
    </div>
  );
}
