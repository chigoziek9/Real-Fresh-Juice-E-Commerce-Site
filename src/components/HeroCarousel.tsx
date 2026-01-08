import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface Slide {
  flavor: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  gradient: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export function HeroCarousel({
  slides,
  autoPlayInterval = 9000,
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, slides.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <div
            className={`relative h-full bg-gradient-to-br ${slides[currentSlide].gradient}`}
            style={{ backgroundColor: slides[currentSlide].bgColor }}
          >
            <div className="container mx-auto p-4 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2  h-full items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-white z-10 order-2 lg:order-1"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                  >
                    <span className="text-sm uppercase tracking-wider">
                      {slides[currentSlide].flavor} Flavor
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-5xl md:text-7xl mb-6"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-xl mb-8 text-white/90"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex gap-4"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-white/90 shadow-xl"
                    >
                      <Link to="/products">Explore Products</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white/30"
                    >
                      <Link to="/about">Our Story</Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Image Content - Simplified without infinite animations */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative h-full flex items-center justify-center order-1 lg:order-2"
                >
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.4 }}
                  >
                   <div className="relative h-[320px] md:h-[420px] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">

                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].flavor}
                        className="w-full max-h-[50px] h-[50px] object-contain "
                      />

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center pb-4 "
                      >
                        <span className="text-white text-lg mt-4">
                          {slides[currentSlide].flavor}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Simplified decorative circle */}
                  <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-3xl opacity-30" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div> */}

      {/* Dots Indicator */}
      {/* <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full border-2 border-white transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-3 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
