import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import SEO from '../../components/SEO';

export default function BlogPost({ source, frontMatter }) {
  if (!source) return <div className="text-center py-20">404 - Post not found</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <SEO title={frontMatter.title} description={frontMatter.excerpt} />
      <h1 className="text-3xl font-heading font-bold mb-2">{frontMatter.title}</h1>
      <div className="text-gray-500 mb-8">{frontMatter.date}</div>
      <article className="prose prose-lg max-w-none">
        <MDXRemote {...source} />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'blog');
  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];
  const paths = files.filter(f => f.endsWith('.mdx')).map(f => ({ params: { slug: f.replace(/\.mdx$/, '') } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postPath = path.join(process.cwd(), 'blog', `${params.slug}.mdx`);
  if (!fs.existsSync(postPath)) return { props: { source: null, frontMatter: {} } };
  const source = fs.readFileSync(postPath, 'utf8');
  const { content, data } = matter(source);
  const mdxSource = await serialize(content, { scope: data });
  return { props: { source: mdxSource, frontMatter: data } };
} 