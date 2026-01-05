import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, products } from '../../data/products';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '../CartContext';
import { ProductCard } from '../ProductCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'framer-motion';

export function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(Number(id));
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product Not Found</h2>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const size = product.sizes[selectedSize];
    addToCart({
      id: product.id,
      name: product.name,
      price: size.price,
      size: size.size,
      image: product.image,
    });
  };

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-[#79cd47]">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#79cd47]">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products/${product.category}`}
            className="hover:text-[#79cd47]"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-8"
              >
                <span className="text-white text-xl">{product.name}</span>
              </motion.div>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.popular && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Badge className="bg-[#fa8906]">Popular</Badge>
                  </motion.div>
                )}
                {product.new && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Badge className="bg-[#79cd47]">New</Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#fa8906] text-[#fa8906]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <Label className="mb-3 block">Select Size:</Label>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedSize === index
                        ? 'border-[#79cd47] bg-[#79cd47]/10'
                        : 'border-gray-300 hover:border-[#79cd47]'
                    }`}
                  >
                    <div>{size.size}</div>
                    <div className="text-[#79cd47] mt-1">
                      ${size.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Actions */}
            <div className="mb-6">
              <div className="text-4xl text-[#79cd47] mb-4">
                ${product.sizes[selectedSize].price.toFixed(2)}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 bg-[#79cd47] hover:bg-[#79cd47]/90"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="p-4 bg-gray-50">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#79cd47] rounded-full"></span>
                  <span>Made fresh daily</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#79cd47] rounded-full"></span>
                  <span>100% organic ingredients</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#79cd47] rounded-full"></span>
                  <span>No preservatives or artificial flavors</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#79cd47] rounded-full"></span>
                  <span>Free delivery on orders over $50</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="ingredients" className="mb-12">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Ingredients</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#79cd47] rounded-full"></span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
          <TabsContent value="nutrition" className="mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Nutritional Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl text-[#79cd47] mb-1">
                    {product.nutritionInfo.calories}
                  </div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div>
                  <div className="text-3xl text-[#79cd47] mb-1">
                    {product.nutritionInfo.protein}
                  </div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="text-3xl text-[#79cd47] mb-1">
                    {product.nutritionInfo.carbs}
                  </div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div>
                  <div className="text-3xl text-[#79cd47] mb-1">
                    {product.nutritionInfo.fat}
                  </div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              <div className="space-y-6">
                {/* Sample reviews */}
                <div className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span>Sarah Johnson</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[#fa8906] text-[#fa8906]"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">2 days ago</div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Absolutely delicious! The perfect balance of flavors. I order this every week.
                  </p>
                </div>
                <div className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.img
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span>Michael Chen</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[#fa8906] text-[#fa8906]"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">1 week ago</div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Great product! You can really taste the quality of the ingredients.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-medium ${className || ''}`}>{children}</div>;
}