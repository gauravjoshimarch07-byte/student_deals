'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogClient({ posts }) {
  // 1. Fixed the search state syntax
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                
                {/* 2. Restored Image Section with "Featured" Badge */}
                <div className="relative h-56 w-full bg-gray-50">
                  {post.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase shadow-sm">
                      ⭐ Featured
                    </div>
                  )}
                  
                  <Image
                    src={post.thumbnail || 'https://via.placeholder.com/400x250?text=No+Image'}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={true} 
                  />
                </div>

                {/* 3. Details Section that matches your Home Page design */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-600 text-xs font-bold uppercase">
                      {post.category || 'Tech'}
                    </span>
                    <span className="text-gray-300 text-xs">•</span>
                    <span className="text-gray-400 text-xs">
                      {post.readingTime || '5 min read'}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-ink leading-tight group-hover:text-orange-600 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {post.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-[11px] font-medium text-gray-400">
                    <span>{post.date}</span>
                    <span className="text-orange-500 font-bold group-hover:translate-x-1 transition-transform">
                      Read review →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-lg">No deals found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}