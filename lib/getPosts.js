import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || 'General',
      description: data.description || '',
      thumbnail: data.thumbnail || '/images/default-thumb.jpg',
      tags: data.tags || [],
      featured: data.featured || false,
      readingTime: stats.text,
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || 'General',
    description: data.description || '',
    thumbnail: data.thumbnail || '/images/default-thumb.jpg',
    tags: data.tags || [],
    featured: data.featured || false,
    readingTime: stats.text,
    content,
  };
}

export function getAllCategories() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  return categories;
}

export function getPostsByCategory(category) {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedPosts(slug, category, limit = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export function getFeaturedPosts(limit = 3) {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  return featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit);
}
