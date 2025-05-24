import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const team = [
  {
    name: 'Soham Das',
    role: 'Founder & Creative Director' ,
    bio: 'With over 5 years of experience in web design and branding, Alex leads our creative vision and strategy.',
    image: '👨‍💼',
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Developer',
    bio: 'Sarah brings technical expertise and innovation to every project, ensuring our websites are both beautiful and functional.',
    image: '👩‍💻',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Content Strategist',
    bio: 'Michael crafts compelling narratives that connect brands with their audience and drive engagement.',
    image: '👨‍💼',
  },
  {
    name: 'Emma Wilson',
    role: 'UX/UI Designer',
    bio: 'Emma creates intuitive and engaging user experiences that delight our clients and their customers.',
    image: '👩‍🎨',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About Devine Studio
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're a team of passionate creatives and technologists dedicated to helping businesses thrive in the digital world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <p className="text-lg text-gray-600">
                  Founded in 2020, Devine Studio was born from a vision to create digital experiences that not only look beautiful but also drive real business results.
                </p>
                <p className="text-lg text-gray-600">
                  We believe that great design and compelling content should work together to create meaningful connections between brands and their audience.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we're proud to work with businesses of all sizes, helping them establish a strong online presence and achieve their goals.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-indigo-50 rounded-xl p-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">100+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">5+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">15+</div>
                    <div className="text-gray-600">Team Members</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The talented people behind our success.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's create something amazing for your business.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Get in Touch
              </motion.button>
            </motion.div>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
