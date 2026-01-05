import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <motion.div 
                className="w-12 h-12 bg-[#7fc94e] rounded-full flex items-center justify-center mb-3"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white text-xl">🍊</span>
              </motion.div>
              <div className="font-bold text-xl">
                <span style={{ color: '#7fc94e' }}>Roots</span>
                <span style={{ color: '#80838c' }}>n</span>
                <span style={{ color: '#f99212' }}>Juices</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Fresh. Healthy. Natural. Premium quality juices, smoothies, and healthy meals made from 100% organic ingredients.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4 text-[#79cd47]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Contact', path: '/contact' },
              ].map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link to={link.path} className="text-gray-400 hover:text-[#79cd47] transition-colors">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4 text-[#79cd47]">Categories</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Juices', path: '/products/juices' },
                { name: 'Smoothies', path: '/products/smoothies' },
                { name: 'Parfaits', path: '/products/parfaits' },
                { name: 'Shawarma', path: '/products/shawarma' },
                { name: 'Salads', path: '/products/salads' },
              ].map((category, index) => (
                <motion.li
                  key={category.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Link to={category.path} className="text-gray-400 hover:text-[#79cd47] transition-colors">
                    {category.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4 text-[#79cd47]">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              {[
                { Icon: MapPin, text: '123 Fresh Street, City, Country' },
                { Icon: Phone, text: '+1 (555) 123-4567' },
                { Icon: Mail, text: 'hello@freshlife.com' },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <item.Icon className="w-4 h-4 text-[#fa8906]" />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex gap-4 mt-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#79cd47] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400"
        >
          <div className="flex items-center justify-center gap-4">
            <p>&copy; 2025 RootsnJuices. All rights reserved. | Fresh. Healthy. Natural.</p>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link 
                to="/admin" 
                className="flex items-center gap-1 hover:text-[#7fc94e] transition-colors"
                title="Admin Dashboard"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs">Admin</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}