import Link from 'next/link';
import Image from 'next/image';

const categoryColors = {
  Tech: 'badge-blue',
  Study: 'badge-green',
  Lifestyle: 'badge-orange',
  Kitchen: 'bg-pink-100 text-pink-700 badge',
  Fitness: 'bg-purple-100 text-purple-700 badge',
  General: 'badge-orange',
};

export default function BlogCard({ post, featured = false }) {
  const badgeClass = categoryColors[post.category] || 'badge-orange';

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className={`card overflow-hidden h-full flex flex-col ${featured ? 'md:flex-row' : ''}`}>
        {/* Thumbnail */}
        <div className={`relative overflow-hidden bg-cream-warm ${featured ? 'md:w-2/5 md:flex-shrink-0' : ''}`}>
          <div className={`${featured ? 'h-52 md:h-full' : 'h-48'} relative`}>
            <Image
              src={post.thumbnail || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=75'}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          {post.featured && (
            <div className="absolute top-3 left-3">
              <span className="badge bg-brand-500 text-white">⭐ Featured</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={badgeClass}>{post.category}</span>
            <span className="text-xs text-ink-muted">{post.readingTime}</span>
          </div>

          <h2 className={`font-display font-bold text-ink group-hover:text-brand-600 transition-colors leading-snug mb-2 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {post.title}
          </h2>

          <p className="text-sm text-ink-muted leading-relaxed mb-4 flex-1 line-clamp-2">
            {post.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-cream-warm">
            <time className="text-xs text-ink-faint" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <span className="text-xs font-semibold text-brand-600 group-hover:gap-2 flex items-center gap-1 transition-all">
              Read more
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
