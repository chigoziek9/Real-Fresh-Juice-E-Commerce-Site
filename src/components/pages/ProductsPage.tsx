import { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getAllProducts, getProductsByCategory, searchProducts } from '../../data/products';
import { ProductCard } from '../ProductCard';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

export function ProductsPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const [priceRange, setPriceRange] = useState([0, 20]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');
  const [refreshKey, setRefreshKey] = useState(0);

  // Listen for localStorage changes from admin dashboard
  useEffect(() => {
    const handleStorageChange = () => {
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab changes
    window.addEventListener('productsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleStorageChange);
    };
  }, []);

  // Get products based on category or search
  const baseProducts = useMemo(() => {
    if (searchQuery) {
      return searchProducts(searchQuery);
    }
    if (category) {
      return getProductsByCategory(category);
    }
    return getAllProducts();
  }, [category, searchQuery, refreshKey]);

  // Get all available tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    baseProducts.forEach((p) => p.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, [baseProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = baseProducts.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        (selectedTags.length === 0 || selectedTags.some((tag) => p.tags.includes(tag)))
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [baseProducts, priceRange, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : searchQuery
    ? `Search Results for "${searchQuery}"`
    : 'All Products';

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Price Filter */}
      <div>
        <Label className="mb-4 block">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={20}
          step={1}
          className="mb-2"
        />
      </div>

      {/* Tags Filter */}
      <div>
        <Label className="mb-4 block">Dietary & Tags</Label>
        <div className="space-y-2">
          {allTags.map((tag) => (
            <div key={tag} className="flex items-center gap-2">
              <Checkbox
                id={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <label htmlFor={tag} className="text-sm cursor-pointer">
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedTags.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 20) && (
        <Button
          variant="outline"
          onClick={() => {
            setPriceRange([0, 20]);
            setSelectedTags([]);
          }}
          className="w-full"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4">{categoryTitle}</h1>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h3 className="mb-6">Filters</h3>
              <FilterSection />
            </Card>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters & Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600">
                  No products found matching your criteria. Try adjusting your filters.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}