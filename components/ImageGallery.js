import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    src: '/gallery/image1.jpg',
    alt: 'Web Design Project',
    category: 'Web Design',
    color: 'from-primary-500 to-secondary-500',
  },
  {
    src: '/gallery/image2.jpg',
    alt: 'Brand Identity Project',
    category: 'Branding',
    color: 'from-secondary-500 to-accent-500',
  },
  {
    src: '/gallery/image3.jpg',
    alt: 'local app Design',
    category: 'App Design',
    color: 'from-accent-500 to-primary-500',
  },
  {
    src: '/gallery/image4.jpg',
    alt: 'UI/UX Design',
    category: 'UI/UX',
    color: 'from-primary-500 to-accent-500',
  },
  {
    src: '/gallery/image5.jpg',
    alt: 'ai Design',
    category: 'Print',
    color: 'from-secondary-500 to-primary-500',
  },
  {
    src: '/gallery/image6.jpg',
    alt: 'Digital Marketing',
    category: 'Marketing',
    color: 'from-accent-500 to-secondary-500',
  },
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredImages = filter === 'all'
    ? images
    : images.filter(image => image.category === filter);

  const categories = ['all', ...new Set(images.map(image => image.category))];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Our Work
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of creative projects and innovative solutions.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${image.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center p-4">
                  <h3 className="text-white text-xl font-bold mb-2">{image.alt}</h3>
                  <p className="text-white/80 text-sm">{image.category}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative max-w-4xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedImage.color} opacity-20`} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ✕
                </motion.button>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-xl font-bold">{selectedImage.alt}</h3>
                  <p className="text-white/80">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageGallery; 