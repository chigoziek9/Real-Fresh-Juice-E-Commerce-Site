import { Award, Leaf, Users, Heart } from 'lucide-react';
import { Card } from '../ui/card';
import { motion } from 'framer-motion';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1507844090982-e6e9452ea68d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaW5ncmVkaWVudHMlMjBmYXJtfGVufDF8fHx8MTc2Mjg4MDkyM3ww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl mb-4"
            >
              About RootsnJuices
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl"
            >
              Bringing you the freshest, healthiest, and most delicious organic products since 2015.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl mb-8 text-center"
            >
              Our Story
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="mb-4">
                  RootsnJuices was born from a simple belief: everyone deserves access to fresh, healthy, and delicious food. What started as a small juice bar in 2015 has grown into a trusted name in healthy living.
                </p>
                <p className="mb-4">
                  We partner directly with local organic farms to source the freshest fruits and vegetables. Every product is made fresh daily, with no preservatives or artificial ingredients - just pure, natural goodness.
                </p>
                <p>
                  Our commitment goes beyond just selling products. We're dedicated to promoting a healthy lifestyle and making nutritious food accessible to everyone in our community.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="relative rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1507844090982-e6e9452ea68d?w=800"
                    alt="Fresh organic farm"
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-6"
                  >
                    <span className="text-white text-lg">Our Journey</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Founder / Lead Juicer */}
     

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl mb-12 text-center"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                Icon: Leaf,
                title: 'Organic & Natural',
                desc: '100% certified organic ingredients with no artificial additives or preservatives.',
                color: '#79cd47',
              },
              {
                Icon: Heart,
                title: 'Health First',
                desc: 'Every product is designed with your health and wellness in mind.',
                color: '#fa8906',
              },
              {
                Icon: Users,
                title: 'Community',
                desc: 'Supporting local farmers and building a healthier community together.',
                color: '#79cd47',
              },
              {
                Icon: Award,
                title: 'Quality Excellence',
                desc: 'Maintaining the highest standards in every product we create.',
                color: '#fa8906',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-shadow h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl mb-8 text-center"
            >
              Our Sourcing & Production
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  number: '1',
                  title: 'Farm Selection',
                  desc: 'We carefully select certified organic farms that share our commitment to sustainable and ethical farming practices.',
                },
                {
                  number: '2',
                  title: 'Fresh Harvest',
                  desc: 'Fruits and vegetables are harvested at peak ripeness to ensure maximum flavor and nutritional value.',
                },
                {
                  number: '3',
                  title: 'Cold-Press Technology',
                  desc: 'Our state-of-the-art cold-press process preserves nutrients and natural enzymes that traditional juicing destroys.',
                },
                {
                  number: '4',
                  title: 'Quality Control',
                  desc: 'Every batch is tested for quality, taste, and nutritional content before reaching you.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-[#79cd47] rounded-full flex items-center justify-center text-white"
                    >
                      {item.number}
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl mb-8">Certifications & Awards</h2>
            <p className="text-gray-600 mb-8">
              We're proud to be recognized for our commitment to quality, sustainability, and healthy living.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <Award className="w-12 h-12 text-[#79cd47] mx-auto mb-2" />
                <p>USDA Organic Certified</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Award className="w-12 h-12 text-[#79cd47] mx-auto mb-2" />
                <p>Best Healthy Brand 2024</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Award className="w-12 h-12 text-[#79cd47] mx-auto mb-2" />
                <p>Sustainability Leader</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <Award className="w-12 h-12 text-[#79cd47] mx-auto mb-2" />
                <p>Customer Choice Award</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl mb-8">Our Commitment to Sustainability</h2>
            <p className="text-gray-600 mb-8">
              We believe in protecting the planet for future generations. That's why we use eco-friendly packaging, minimize waste, and support sustainable farming practices.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="mb-3 text-[#79cd47]">Recyclable Packaging</h3>
                <p className="text-sm text-gray-600">
                  All our bottles and containers are 100% recyclable and made from post-consumer materials.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-3 text-[#79cd47]">Zero Waste Goal</h3>
                <p className="text-sm text-gray-600">
                  We compost all organic waste and work towards zero waste in our production facilities.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="mb-3 text-[#79cd47]">Carbon Neutral</h3>
                <p className="text-sm text-gray-600">
                  We offset our carbon footprint through renewable energy and tree planting initiatives.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}