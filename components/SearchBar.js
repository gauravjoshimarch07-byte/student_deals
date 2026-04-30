'use client';

export default function SearchBar({ onSearch }) {
  return (
    <div className="max-w-2xl mx-auto mb-10 px-4">
      <input
        type="text"
        placeholder="🔍 Search budget earbuds, laptops..."
        className="w-full p-4 rounded-xl border-2 border-orange-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all text-gray-800"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}