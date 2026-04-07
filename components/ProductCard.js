import Image from 'next/image';
import CTAButton from './CTAButton';

export default function ProductCard({
  rank,
  name,
  image,
  description,
  price,
  originalPrice,
  pros = [],
  cons = [],
  affiliateLink,
  badge,
  rating,
}) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className="card p-5 sm:p-6 my-6 relative overflow-hidden">
      {/* Rank badge */}
      {rank && (
        <div className="absolute top-0 left-0 w-10 h-10 bg-ink flex items-center justify-center rounded-br-xl">
          <span className="font-display font-bold text-sm text-cream-DEFAULT">#{rank}</span>
        </div>
      )}

      {/* Best pick badge */}
      {badge && (
        <div className="absolute top-3 right-3">
          <span className="badge bg-brand-500 text-white text-xs">{badge}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Product Image */}
        <div className="sm:w-40 sm:flex-shrink-0">
          <div className="relative h-40 sm:h-full rounded-xl overflow-hidden bg-cream-warm">
            <Image
              src={image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=75'}
              alt={name}
              fill
              className="object-contain p-3"
              sizes="160px"
              loading="lazy"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h3 className="font-display font-bold text-ink text-lg leading-tight mb-1">{name}</h3>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-brand-400' : 'text-cream-warm'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-ink-muted ml-1">{rating}/5</span>
            </div>
          )}

          <p className="text-sm text-ink-soft mb-4 leading-relaxed">{description}</p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display font-bold text-2xl text-brand-600">
              ₹{price?.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <>
                <span className="text-sm text-ink-faint line-through">
                  ₹{originalPrice?.toLocaleString('en-IN')}
                </span>
                <span className="badge-green text-xs">{discount}% off</span>
              </>
            )}
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {pros.length > 0 && (
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs font-display font-semibold text-green-700 uppercase tracking-wide mb-2">✅ Pros</p>
                <ul className="space-y-1">
                  {pros.map((pro, i) => (
                    <li key={i} className="text-xs text-green-800 flex items-start gap-1">
                      <span className="mt-0.5">•</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cons.length > 0 && (
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-xs font-display font-semibold text-red-700 uppercase tracking-wide mb-2">❌ Cons</p>
                <ul className="space-y-1">
                  {cons.map((con, i) => (
                    <li key={i} className="text-xs text-red-800 flex items-start gap-1">
                      <span className="mt-0.5">•</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <CTAButton href={affiliateLink} label="Check Price on Amazon" />
        </div>
      </div>
    </div>
  );
}
