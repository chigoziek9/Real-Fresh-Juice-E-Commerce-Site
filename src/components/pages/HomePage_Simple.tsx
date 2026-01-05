import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Star, Leaf, Award, Heart } from 'lucide-react';
import { getAllProducts } from '../../data/products';
import { ProductCard } from '../ProductCard';
import { HeroCarousel } from '../HeroCarousel';

export function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Listen for localStorage changes from admin dashboard
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('productsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleStorageChange);
    };
  }, []);

  const allProducts = getAllProducts();
  const featuredProducts = allProducts.filter((p) => p.popular || p.new).slice(0, 6);
  
  const heroSlides = [
    {
      flavor: 'Orange',
      title: 'Sunshine in Every Sip',
      description: 'Bursting with vitamin C and natural sweetness, our fresh orange juice is your daily dose of energy and vitality.',
      image: 'https://images.unsplash.com/photo-1697479815895-23ea2934711a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBqdWljZSUyMGRyaW5rfGVufDF8fHx8MTc2NjU5ODk3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      bgColor: '#fa8906',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      flavor: 'Pineapple',
      title: 'Tropical Paradise',
      description: 'Transport yourself to a tropical island with our exotic pineapple blend, packed with enzymes and natural goodness.',
      image: 'https://images.unsplash.com/photo-1665582513044-376da77ebec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMHRyb3BpY2FsfGVufDF8fHx8MTc2NjU5ODk3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      bgColor: '#fbbf24',
      gradient: 'from-yellow-400 to-amber-500',
    },
    {
      flavor: 'Strawberry',
      title: 'Berry Bliss',
      description: 'Indulge in the sweet and tangy perfection of our strawberry smoothie, loaded with antioxidants and pure joy.',
      image: 'https://images.unsplash.com/photo-1621797350487-c8996f886ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwc21vb3RoaWUlMjBkcmlua3xlbnwxfHx8fDE3NjY1OTg5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bgColor: '#ef4444',
      gradient: 'from-red-400 to-pink-500',
    },
    {
      flavor: 'Apple',
      title: 'Crisp Refreshment',
      description: 'Experience the crisp, clean taste of fresh apples in every refreshing sip of our signature apple juice.',
      image: 'https://images.unsplash.com/photo-1640039269847-f462c3406c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMGp1aWNlJTIwZnJlc2h8ZW58MXx8fHwxNzY2NTk4OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bgColor: '#79cd47',
      gradient: 'from-green-400 to-emerald-500',
    },
  ];

  const categories = [
    {
      name: 'Juices',
      path: '/products/juices',
      emoji: '🍊',
      color: 'bg-orange-100',
    },
    {
      name: 'Smoothies',
      path: '/products/smoothies',
      emoji: '🥤',
      color: 'bg-pink-100',
    },
    {
      name: 'Parfaits',
      path: '/products/parfaits',
      emoji: '🍨',
      color: 'bg-purple-100',
    },
    {
      name: 'Shawarma',
      path: '/products/shawarma',
      emoji: '🌯',
      color: 'bg-yellow-100',
    },
    {
      name: 'Salads',
      path: '/products/salads',
      emoji: '🥗',
      color: 'bg-green-100',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'The juices are incredibly fresh and delicious! I love that they use 100% organic ingredients.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      name: 'Michael Chen',
      text: 'Best smoothie bowls in town! The acai bowl is my go-to breakfast every morning.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      name: 'Emily Davis',
      text: 'Their salads are always so fresh and filling. Perfect for a healthy lunch!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Carousel Section */}
      <HeroCarousel slides={heroSlides} autoPlayInterval={5000} />

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: '100% Organic',
                desc: 'All our ingredients are sourced from certified organic farms.',
                color: '#79cd47',
              },
              {
                icon: Heart,
                title: 'Health First',
                desc: 'No preservatives, no artificial flavors, just pure goodness.',
                color: '#fa8906',
              },
              {
                icon: Award,
                title: 'Award Winning',
                desc: 'Recognized for quality and taste by food industry experts.',
                color: '#79cd47',
              },
              {
                icon: Star,
                title: 'Customer Favorite',
                desc: 'Loved by thousands of health-conscious customers.',
                color: '#fa8906',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center hover:transform hover:-translate-y-2 transition-transform"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Our Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1675106566514-a2e9738f0880?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWlzc2lvbiUyMG9yZ2FuaWN8ZW58MXx8fHwxNzY2NTk4OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Our Mission"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            <div>
              <div className="inline-block px-4 py-2 bg-[#79cd47]/10 rounded-full mb-4">
                <span className="text-sm uppercase tracking-wider text-[#79cd47]">
                  Our Mission
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl mb-6">
                Nourishing Lives with Nature's Best
              </h2>
              
              <p className="text-gray-600 mb-4">
                At FreshLife, our mission is to make healthy living accessible and delicious for everyone. We believe that nutrition should never compromise on taste, which is why we carefully craft each product using only the finest organic ingredients.
              </p>
              
              <p className="text-gray-600 mb-6">
                From our farm-fresh juices to our nutrient-packed smoothie bowls, every product is designed to fuel your body and delight your senses. We're committed to transparency, sustainability, and your well-being.
              </p>
              
              <Button
                asChild
                size="lg"
                className="bg-[#79cd47] hover:bg-[#79cd47]/90"
              >
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>

          {/* Our Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-[#fa8906]/10 rounded-full mb-4">
                <span className="text-sm uppercase tracking-wider text-[#fa8906]">
                  Our Vision
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl mb-6">
                A Healthier, Happier World
              </h2>
              
              <p className="text-gray-600 mb-4">
                We envision a world where healthy food choices are the norm, not the exception. Our goal is to lead the industry in sustainable practices, creating a positive impact on both personal health and planetary wellness.
              </p>
              
              <p className="text-gray-600 mb-6">
                Through innovation, education, and community engagement, we're building a future where everyone has access to fresh, nutritious, and sustainably sourced foods that support vibrant living.
              </p>
              
              <Button
                asChild
                size="lg"
                className="bg-[#fa8906] hover:bg-[#fa8906]/90"
              >
                <Link to="/products">Shop Our Products</Link>
              </Button>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559770692-df92b4573725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhcm1pbmclMjB2aXNpb258ZW58MXx8fHwxNzY2NTk4OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Our Vision"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Shop by Category</h2>
            <p className="text-gray-600">
              Discover our wide range of fresh and healthy products
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link key={category.path} to={category.path} className="group block">
                <Card className="p-6 text-center hover:shadow-xl transition-all hover:transform hover:-translate-y-2">
                  <div className={`${category.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-4xl">{category.emoji}</span>
                  </div>
                  <h3>{category.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl mb-4">Featured Products</h2>
              <p className="text-gray-600">Our best sellers and new arrivals</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">
              Join thousands of happy and healthy customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 h-full hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#fa8906] text-[#fa8906]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[#79cd47] to-[#5fb32e] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl mb-4">Stay Fresh & Informed</h2>
            <p className="mb-8">
              Subscribe to our newsletter for exclusive offers, health tips, and new product launches.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-black"
              />
              <Button className="bg-[#fa8906] hover:bg-[#fa8906]/90 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
