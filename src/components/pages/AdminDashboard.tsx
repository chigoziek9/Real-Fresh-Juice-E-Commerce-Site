import { useState, useEffect } from 'react';
import { Trash2, Plus, Edit, Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { products as initialProducts, Product } from '../../data/products';

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form state for adding/editing products
  const [formData, setFormData] = useState({
    name: '',
    category: 'juices' as Product['category'],
    price: '',
    image: '',
    description: '',
    ingredients: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    sizes: '',
    tags: '',
    rating: '0',
    reviews: '0',
    popular: false,
    new: false,
  });

  // Load products from localStorage or use initial products
  useEffect(() => {
    const stored = localStorage.getItem('freshlife_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('freshlife_products', JSON.stringify(initialProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('freshlife_products', JSON.stringify(updatedProducts));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('productsUpdated'));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: 'juices',
      price: '',
      image: '',
      description: '',
      ingredients: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      sizes: '',
      tags: '',
      rating: '0',
      reviews: '0',
      popular: false,
      new: false,
    });
    setEditingProduct(null);
  };

  // Handle add product
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      description: formData.description,
      ingredients: formData.ingredients.split(',').map(i => i.trim()),
      nutritionInfo: {
        calories: parseInt(formData.calories) || 0,
        protein: formData.protein,
        carbs: formData.carbs,
        fat: formData.fat,
      },
      sizes: formData.sizes.split(',').map(s => {
        const parts = s.trim().split(':');
        return {
          size: parts[0],
          price: parseFloat(parts[1]) || parseFloat(formData.price),
        };
      }),
      tags: formData.tags.split(',').map(t => t.trim()),
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0,
      popular: formData.popular,
      new: formData.new,
    };

    saveProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  // Handle edit product
  const handleEditProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            image: formData.image,
            description: formData.description,
            ingredients: formData.ingredients.split(',').map(i => i.trim()),
            nutritionInfo: {
              calories: parseInt(formData.calories) || 0,
              protein: formData.protein,
              carbs: formData.carbs,
              fat: formData.fat,
            },
            sizes: formData.sizes.split(',').map(s => {
              const parts = s.trim().split(':');
              return {
                size: parts[0],
                price: parseFloat(parts[1]) || parseFloat(formData.price),
              };
            }),
            tags: formData.tags.split(',').map(t => t.trim()),
            rating: parseFloat(formData.rating) || 0,
            reviews: parseInt(formData.reviews) || 0,
            popular: formData.popular,
            new: formData.new,
          }
        : p
    );

    saveProducts(updatedProducts);
    setEditingProduct(null);
    resetForm();
  };

  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      saveProducts(updatedProducts);
    }
  };

  // Start editing a product
  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      ingredients: product.ingredients.join(', '),
      calories: product.nutritionInfo.calories.toString(),
      protein: product.nutritionInfo.protein,
      carbs: product.nutritionInfo.carbs,
      fat: product.nutritionInfo.fat,
      sizes: product.sizes.map(s => `${s.size}:${s.price}`).join(', '),
      tags: product.tags.join(', '),
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      popular: product.popular || false,
      new: product.new || false,
    });
  };

  // Filter products
  const filteredProducts = filterCategory === 'all'
    ? products
    : products.filter(p => p.category === filterCategory);

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    totalRevenue: products.reduce((sum, p) => sum + (p.price * p.reviews * 0.1), 0),
    avgRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length,
    totalReviews: products.reduce((sum, p) => sum + p.reviews, 0),
  };

  // Get category counts
  const categoryCounts = {
    juices: products.filter(p => p.category === 'juices').length,
    smoothies: products.filter(p => p.category === 'smoothies').length,
    parfaits: products.filter(p => p.category === 'parfaits').length,
    shawarma: products.filter(p => p.category === 'shawarma').length,
    salads: products.filter(p => p.category === 'salads').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#7fc94e] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your RootsnJuices products and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Products</CardTitle>
              <Package className="h-4 w-4 text-[#79cd47]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.totalProducts}</div>
              <p className="text-xs text-gray-600 mt-1">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#fa8906]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.avgRating.toFixed(1)}</div>
              <p className="text-xs text-gray-600 mt-1">Out of 5.0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Reviews</CardTitle>
              <Users className="h-4 w-4 text-[#79cd47]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.totalReviews}</div>
              <p className="text-xs text-gray-600 mt-1">Customer feedback</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Est. Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-[#fa8906]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">${stats.totalRevenue.toFixed(0)}</div>
              <p className="text-xs text-gray-600 mt-1">Based on reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Add, edit, or remove products from your catalog</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#79cd47] hover:bg-[#6ab93d]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the details to add a new product to your catalog</DialogDescription>
                  </DialogHeader>
                  <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleAddProduct}
                    onCancel={() => {
                      setIsAddDialogOpen(false);
                      resetForm();
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all" onClick={() => setFilterCategory('all')}>
                  All ({products.length})
                </TabsTrigger>
                <TabsTrigger value="juices" onClick={() => setFilterCategory('juices')}>
                  Juices ({categoryCounts.juices})
                </TabsTrigger>
                <TabsTrigger value="smoothies" onClick={() => setFilterCategory('smoothies')}>
                  Smoothies ({categoryCounts.smoothies})
                </TabsTrigger>
                <TabsTrigger value="parfaits" onClick={() => setFilterCategory('parfaits')}>
                  Parfaits ({categoryCounts.parfaits})
                </TabsTrigger>
                <TabsTrigger value="shawarma" onClick={() => setFilterCategory('shawarma')}>
                  Shawarma ({categoryCounts.shawarma})
                </TabsTrigger>
                <TabsTrigger value="salads" onClick={() => setFilterCategory('salads')}>
                  Salads ({categoryCounts.salads})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={filterCategory} className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No products found in this category
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-12 w-12 rounded-md object-cover"
                                />
                                <div>
                                  <p>{product.name}</p>
                                  <p className="text-sm text-gray-500">{product.reviews} reviews</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {product.category}
                              </Badge>
                            </TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span>{product.rating}</span>
                                <span className="text-yellow-500">★</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {product.popular && (
                                  <Badge className="bg-[#fa8906] hover:bg-[#e87d05]">Popular</Badge>
                                )}
                                {product.new && (
                                  <Badge className="bg-[#79cd47] hover:bg-[#6ab93d]">New</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => startEdit(product)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Edit Product</DialogTitle>
                                      <DialogDescription>Update product details</DialogDescription>
                                    </DialogHeader>
                                    <ProductForm
                                      formData={formData}
                                      setFormData={setFormData}
                                      onSubmit={handleEditProduct}
                                      onCancel={() => {
                                        setEditingProduct(null);
                                        resetForm();
                                      }}
                                      isEdit
                                    />
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Product Form Component
interface ProductFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

function ProductForm({ formData, setFormData, onSubmit, onCancel, isEdit }: ProductFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Fresh Orange Burst"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="juices">Juices</SelectItem>
              <SelectItem value="smoothies">Smoothies</SelectItem>
              <SelectItem value="parfaits">Parfaits</SelectItem>
              <SelectItem value="shawarma">Shawarma</SelectItem>
              <SelectItem value="salads">Salads</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g., 5.99"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            placeholder="e.g., 4.8"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reviews">Number of Reviews</Label>
          <Input
            id="reviews"
            type="number"
            value={formData.reviews}
            onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
            placeholder="e.g., 124"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the product..."
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ingredients">Ingredients (comma-separated) *</Label>
        <Textarea
          id="ingredients"
          value={formData.ingredients}
          onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
          placeholder="e.g., 100% Fresh Oranges, No Added Sugar, No Preservatives"
          rows={2}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="calories">Calories</Label>
          <Input
            id="calories"
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
            placeholder="e.g., 112"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="protein">Protein</Label>
          <Input
            id="protein"
            value={formData.protein}
            onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
            placeholder="e.g., 2g"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carbs">Carbs</Label>
          <Input
            id="carbs"
            value={formData.carbs}
            onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
            placeholder="e.g., 26g"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fat">Fat</Label>
          <Input
            id="fat"
            value={formData.fat}
            onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
            placeholder="e.g., 0.5g"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sizes">Sizes (format: size:price, comma-separated)</Label>
        <Input
          id="sizes"
          value={formData.sizes}
          onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
          placeholder="e.g., 250ml:5.99, 500ml:9.99, 1L:16.99"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="e.g., Vegan, Gluten-Free, Vitamin C Rich"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.popular}
            onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span>Mark as Popular</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.new}
            onChange={(e) => setFormData({ ...formData, new: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span>Mark as New</span>
        </label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-[#79cd47] hover:bg-[#6ab93d]">
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}