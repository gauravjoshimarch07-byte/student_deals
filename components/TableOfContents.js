'use client';
import { useEffect, useState } from 'react';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings?.length) return null;

  return (
    <nav className="card p-5 sticky top-20">
      <h3 className="font-display font-bold text-sm text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-brand-500 rounded-full inline-block" />
        Table of Contents
      </h3>
      <ol className="space-y-0.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`toc-link ${h.level === 3 ? 'pl-6 text-xs' : ''} ${activeId === h.id ? 'active' : ''}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
