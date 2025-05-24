import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function BlogIndex({ posts }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <SEO title="Blog" description="Latest posts and tutorials" />
      <h1 className="text-3xl font-heading font-bold mb-8">Blog</h1>
      <ul className="space-y-8">
        {posts.map(post => (
          <li key={post.slug} className="bg-white/80 rounded-xl shadow p-6 border border-primary-100">
            <Link href={`/blog/${post.slug}`} className="text-2xl font-bold text-primary-700 hover:underline">
              {post.title}
            </Link>
            <div className="text-gray-500 mb-2">{post.date}</div>
            <div className="text-gray-700 mb-2">{post.excerpt}</div>
            <Link href={`/blog/${post.slug}`} className="text-primary-500 hover:underline font-semibold">Read more →</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'blog');
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];
  const posts = files.filter(f => f.endsWith('.mdx')).map(f => {
    const source = fs.readFileSync(path.join(postsDir, f), 'utf8');
    const { data } = matter(source);
    return {
      slug: f.replace(/\.mdx$/, ''),
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      date: data.date || '',
    };
  });
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { props: { posts } };
} 