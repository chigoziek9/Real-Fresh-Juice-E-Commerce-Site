import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from './CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const defaultSize = product.sizes[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: defaultSize.price,
      size: defaultSize.size,
      image: product.image,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-shadow h-full">
        <Link to={`/product/${product.id}`}>
          <div className="relative h-64 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-4"
            >
              <span className="text-white text-sm">View Details</span>
            </motion.div>
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {product.popular && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Badge className="bg-[#fa8906]">Popular</Badge>
                </motion.div>
              )}
              {product.new && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Badge className="bg-[#79cd47]">New</Badge>
                </motion.div>
              )}
            </div>
          </div>
        </Link>
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="mb-2 hover:text-[#79cd47] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-[#fa8906] text-[#fa8906]" />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl text-[#79cd47]">
              ${product.price.toFixed(2)}
            </span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="bg-[#79cd47] hover:bg-[#79cd47]/90"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}