'use client';
import { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';

const categoryColors = {
  All: 'bg-ink text-cream-DEFAULT',
  Tech: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  Study: 'bg-green-100 text-green-700 hover:bg-green-200',
  Lifestyle: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  Kitchen: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
  Fitness: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
};

export default function BlogClient({ posts, categories }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, activeCategory]);

  return (
    <>
      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles, products, categories..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-cream-warm bg-white focus:outline-none focus:border-brand-400 text-sm text-ink placeholder:text-ink-muted transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink text-lg leading-none">×</button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold font-display transition-all duration-150 ${
              activeCategory === cat
                ? 'bg-brand-500 text-white shadow-sm shadow-brand-200'
                : 'bg-white border border-cream-warm text-ink-soft hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-ink-muted mb-6">
        {filtered.length === 0
          ? 'No articles found.'
          : `Showing ${filtered.length} article${filtered.length !== 1 ? 's' : ''}${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}${search ? ` for "${search}"` : ''}`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-ink-muted">
          <p className="text-5xl mb-4">🔍</p>
          <p>No results found. Try a different search or category.</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); }}
            className="mt-4 text-brand-600 font-semibold text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
