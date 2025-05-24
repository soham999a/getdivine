import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import Link from 'next/link';

const posts = [
  {
    title: 'The Future of Web Design',
    excerpt: 'Explore the latest trends and technologies shaping the future of web design.',
    date: 'March 15, 2024',
    author: 'John Doe',
    image: '🌐',
  },
  {
    title: 'How to Write Compelling Copy',
    excerpt: 'Learn the secrets to writing copy that converts visitors into customers.',
    date: 'March 10, 2024',
    author: 'Jane Smith',
    image: '✍️',
  },
  {
    title: 'SEO Best Practices for 2024',
    excerpt: 'Stay ahead of the curve with these SEO best practices for the year ahead.',
    date: 'March 5, 2024',
    author: 'Mike Johnson',
    image: '📈',
  },
];

const Blog = () => {
  return (
    <SectionWrapper className="bg-white dark:bg-darkTheme-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-darkTheme-text mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-gray-600 dark:text-darkTheme-muted max-w-2xl mx-auto">
            Stay up to date with the latest trends and insights in web design, copywriting, and SEO.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-darkTheme-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{post.image}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-darkTheme-text mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-darkTheme-muted mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-darkTheme-muted">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full px-4 py-2 bg-darkTheme-primary text-white rounded-lg font-medium hover:bg-darkTheme-primary/90 transition-colors"
                >
                  Read More
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Blog; 