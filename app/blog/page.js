import { getAllPosts, getAllCategories } from '@/lib/getPosts';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'All Articles — Budget Product Reviews for Students',
  description: 'Browse all our student budget product reviews and buying guides. Find the best deals on tech, study essentials, lifestyle picks and more.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="container-site py-12">
      {/* Page header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 badge-orange mb-4">📝 All Articles</div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink mb-3">
          Budget Buying Guides for Students
        </h1>
        <p className="text-ink-muted max-w-xl mx-auto">
          Honest, in-depth reviews to help you spend smart. Every product tested and curated for student life.
        </p>
      </div>

      <BlogClient posts={posts} categories={categories} />
    </div>
  );
}
