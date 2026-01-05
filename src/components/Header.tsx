import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, Settings } from 'lucide-react';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const categories = [
    { name: 'Juices', path: '/products/juices' },
    { name: 'Smoothies', path: '/products/smoothies' },
    { name: 'Parfaits', path: '/products/parfaits' },
    { name: 'Shawarma', path: '/products/shawarma' },
    { name: 'Salads', path: '/products/salads' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white border-b shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-8">
            <motion.span
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-2xl"
            >
              🥤
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-xl"
            >
              <span style={{ color: '#7fc94e' }}>Roots</span>
              <span style={{ color: '#80838c' }}>n</span>
              <span style={{ color: '#f99212' }}>Juices</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/" className="hover:text-[#79cd47] transition-colors">
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/about" className="hover:text-[#79cd47] transition-colors">
                About
              </Link>
            </motion.div>
            <div className="relative group">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/products" className="hover:text-[#79cd47] transition-colors">
                  Products
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.path}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={category.path}
                      className="block px-4 py-2 hover:bg-[#79cd47]/10 hover:text-[#79cd47] transition-colors"
                    >
                      {category.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/contact" className="hover:text-[#79cd47] transition-colors">
                Contact
              </Link>
            </motion.div>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <AnimatePresence>
                      {getTotalItems() > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-[#fa8906] text-white rounded-full text-xs flex items-center justify-center"
                        >
                          {getTotalItems()}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <CartSheet />
              </SheetContent>
            </Sheet>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t"
            >
              <div className="py-4">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>
                <nav className="flex flex-col gap-4">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About', path: '/about' },
                    { name: 'All Products', path: '/products' },
                    ...categories,
                    { name: 'Contact', path: '/contact' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`hover:text-[#79cd47] transition-colors ${
                          categories.some((c) => c.path === item.path) ? 'pl-4' : ''
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function CartSheet() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-64 text-gray-500"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
        </motion.div>
        <p>Your cart is empty</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-4">
        {cart.map((item, index) => (
          <motion.div
            key={`${item.id}-${item.size}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 mb-4 pb-4 border-b"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.size}</p>
              <p className="text-[#79cd47]">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity - 1)
                  }
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateQuantity(item.id, item.size, item.quantity + 1)
                  }
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="ml-auto text-red-500"
                >
                  Remove
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span>Total:</span>
          <span className="text-xl text-[#79cd47]">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-[#79cd47] hover:bg-[#79cd47]/90">
            Checkout
          </Button>
        </motion.div>
      </div>
    </div>
  );
}