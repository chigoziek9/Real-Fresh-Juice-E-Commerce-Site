export interface Product {
  id: number;
  name: string;
  category: 'juices' | 'smoothies' | 'parfaits' | 'shawarma' | 'salads';
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  nutritionInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  sizes: Array<{ size: string; price: number }>;
  tags: string[];
  rating: number;
  reviews: number;
  popular?: boolean;
  new?: boolean;
}

export const products: Product[] = [
  // Juices
  {
    id: 1,
    name: 'Fresh Orange Burst',
    category: 'juices',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1734773557735-8fc50f94b473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGp1aWNlJTIwYm90dGxlc3xlbnwxfHx8fDE3NjI4MTE4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Pure, freshly squeezed orange juice packed with vitamin C and natural sweetness.',
    ingredients: ['100% Fresh Oranges', 'No Added Sugar', 'No Preservatives'],
    nutritionInfo: {
      calories: 112,
      protein: '2g',
      carbs: '26g',
      fat: '0.5g',
    },
    sizes: [
      { size: '250ml', price: 5.99 },
      { size: '500ml', price: 9.99 },
      { size: '1L', price: 16.99 },
    ],
    tags: ['Vegan', 'Gluten-Free', 'Vitamin C Rich'],
    rating: 4.8,
    reviews: 124,
    popular: true,
  },
  {
    id: 2,
    name: 'Green Detox',
    category: 'juices',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800',
    description: 'A powerful blend of kale, spinach, cucumber, apple, and lemon for ultimate detoxification.',
    ingredients: ['Kale', 'Spinach', 'Cucumber', 'Green Apple', 'Lemon', 'Ginger'],
    nutritionInfo: {
      calories: 85,
      protein: '3g',
      carbs: '18g',
      fat: '0.8g',
    },
    sizes: [
      { size: '250ml', price: 7.99 },
      { size: '500ml', price: 13.99 },
      { size: '1L', price: 22.99 },
    ],
    tags: ['Vegan', 'Organic', 'Detox', 'Low-Calorie'],
    rating: 4.9,
    reviews: 203,
    popular: true,
  },
  {
    id: 3,
    name: 'Tropical Paradise',
    category: 'juices',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
    description: 'A refreshing mix of pineapple, mango, and passion fruit that transports you to the tropics.',
    ingredients: ['Pineapple', 'Mango', 'Passion Fruit', 'Orange', 'Coconut Water'],
    nutritionInfo: {
      calories: 135,
      protein: '1.5g',
      carbs: '32g',
      fat: '0.4g',
    },
    sizes: [
      { size: '250ml', price: 6.99 },
      { size: '500ml', price: 11.99 },
      { size: '1L', price: 19.99 },
    ],
    tags: ['Vegan', 'Tropical', 'Vitamin C Rich'],
    rating: 4.7,
    reviews: 98,
    new: true,
  },
  {
    id: 4,
    name: 'Berry Blast',
    category: 'juices',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800',
    description: 'A delicious mix of strawberries, blueberries, and raspberries loaded with antioxidants.',
    ingredients: ['Strawberries', 'Blueberries', 'Raspberries', 'Blackberries', 'Apple'],
    nutritionInfo: {
      calories: 98,
      protein: '1.8g',
      carbs: '23g',
      fat: '0.6g',
    },
    sizes: [
      { size: '250ml', price: 6.49 },
      { size: '500ml', price: 10.99 },
      { size: '1L', price: 18.99 },
    ],
    tags: ['Vegan', 'Antioxidant Rich', 'Berry'],
    rating: 4.8,
    reviews: 156,
  },

  // Smoothies
  {
    id: 5,
    name: 'Protein Power Smoothie',
    category: 'smoothies',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1592503469446-7c9a9f55b5ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc21vb3RoaWUlMjBib3lsfGVufDF8fHx8MTc2Mjc4NDIyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A thick, creamy smoothie packed with plant-based protein and superfoods.',
    ingredients: ['Banana', 'Peanut Butter', 'Oat Milk', 'Chia Seeds', 'Protein Powder', 'Honey'],
    nutritionInfo: {
      calories: 285,
      protein: '18g',
      carbs: '38g',
      fat: '9g',
    },
    sizes: [
      { size: '350ml', price: 8.99 },
      { size: '500ml', price: 12.99 },
    ],
    tags: ['High-Protein', 'Post-Workout', 'Energy Boost'],
    rating: 4.9,
    reviews: 187,
    popular: true,
  },
  {
    id: 6,
    name: 'Acai Berry Bowl',
    category: 'smoothies',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
    description: 'Thick acai smoothie topped with granola, fresh fruits, and coconut flakes.',
    ingredients: ['Acai Puree', 'Banana', 'Blueberries', 'Granola', 'Coconut Flakes', 'Honey'],
    nutritionInfo: {
      calories: 325,
      protein: '8g',
      carbs: '58g',
      fat: '11g',
    },
    sizes: [
      { size: 'Regular', price: 9.99 },
      { size: 'Large', price: 13.99 },
    ],
    tags: ['Antioxidant Rich', 'Superfood', 'Instagram-Worthy'],
    rating: 5.0,
    reviews: 241,
    popular: true,
  },
  {
    id: 7,
    name: 'Mango Madness',
    category: 'smoothies',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800',
    description: 'Creamy mango smoothie with a hint of turmeric for anti-inflammatory benefits.',
    ingredients: ['Mango', 'Banana', 'Coconut Milk', 'Turmeric', 'Ginger', 'Orange Juice'],
    nutritionInfo: {
      calories: 210,
      protein: '3g',
      carbs: '45g',
      fat: '5g',
    },
    sizes: [
      { size: '350ml', price: 7.99 },
      { size: '500ml', price: 11.99 },
    ],
    tags: ['Vegan', 'Anti-Inflammatory', 'Tropical'],
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 8,
    name: 'Chocolate Peanut Butter Dream',
    category: 'smoothies',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800',
    description: 'Indulgent yet healthy chocolate smoothie with rich peanut butter.',
    ingredients: ['Banana', 'Cacao Powder', 'Peanut Butter', 'Almond Milk', 'Dates', 'Vanilla'],
    nutritionInfo: {
      calories: 295,
      protein: '12g',
      carbs: '42g',
      fat: '11g',
    },
    sizes: [
      { size: '350ml', price: 8.49 },
      { size: '500ml', price: 12.49 },
    ],
    tags: ['Vegan', 'Dessert-Like', 'High-Protein'],
    rating: 4.8,
    reviews: 134,
    new: true,
  },

  // Parfaits
  {
    id: 9,
    name: 'Greek Yogurt Parfait',
    category: 'parfaits',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    description: 'Layers of creamy Greek yogurt, honey, granola, and fresh berries.',
    ingredients: ['Greek Yogurt', 'Honey', 'Granola', 'Strawberries', 'Blueberries', 'Almonds'],
    nutritionInfo: {
      calories: 245,
      protein: '14g',
      carbs: '35g',
      fat: '7g',
    },
    sizes: [
      { size: 'Regular', price: 6.99 },
      { size: 'Large', price: 9.99 },
    ],
    tags: ['High-Protein', 'Breakfast', 'Probiotic'],
    rating: 4.8,
    reviews: 178,
    popular: true,
  },
  {
    id: 10,
    name: 'Tropical Chia Parfait',
    category: 'parfaits',
    price: 7.49,
    image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=800',
    description: 'Chia pudding layered with tropical fruits and coconut yogurt.',
    ingredients: ['Chia Seeds', 'Coconut Yogurt', 'Mango', 'Pineapple', 'Coconut Flakes', 'Mint'],
    nutritionInfo: {
      calories: 215,
      protein: '8g',
      carbs: '32g',
      fat: '8g',
    },
    sizes: [
      { size: 'Regular', price: 7.49 },
      { size: 'Large', price: 10.49 },
    ],
    tags: ['Vegan', 'Omega-3 Rich', 'Tropical'],
    rating: 4.6,
    reviews: 89,
  },

  // Shawarma
  {
    id: 11,
    name: 'Classic Chicken Shawarma',
    category: 'shawarma',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800',
    description: 'Marinated grilled chicken with fresh vegetables, pickles, and tahini sauce in warm pita.',
    ingredients: ['Grilled Chicken', 'Pita Bread', 'Lettuce', 'Tomato', 'Pickles', 'Tahini Sauce', 'Garlic Sauce'],
    nutritionInfo: {
      calories: 485,
      protein: '32g',
      carbs: '48g',
      fat: '18g',
    },
    sizes: [
      { size: 'Regular', price: 9.99 },
      { size: 'Large', price: 13.99 },
    ],
    tags: ['High-Protein', 'Lunch', 'Mediterranean'],
    rating: 4.9,
    reviews: 267,
    popular: true,
  },
  {
    id: 12,
    name: 'Falafel Shawarma',
    category: 'shawarma',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800',
    description: 'Crispy falafel with fresh vegetables, hummus, and tahini in warm pita.',
    ingredients: ['Falafel', 'Pita Bread', 'Hummus', 'Lettuce', 'Tomato', 'Cucumber', 'Tahini', 'Pickled Turnips'],
    nutritionInfo: {
      calories: 420,
      protein: '16g',
      carbs: '52g',
      fat: '16g',
    },
    sizes: [
      { size: 'Regular', price: 8.99 },
      { size: 'Large', price: 12.99 },
    ],
    tags: ['Vegan', 'Plant-Based', 'Mediterranean'],
    rating: 4.7,
    reviews: 152,
    new: true,
  },

  // Salads
  {
    id: 13,
    name: 'Mediterranean Quinoa Bowl',
    category: 'salads',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1720022477040-685f8c3a01be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwc2FsYWR8ZW58MXx8fHwxNzYyODgwOTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fluffy quinoa with cherry tomatoes, cucumber, olives, feta cheese, and lemon dressing.',
    ingredients: ['Quinoa', 'Cherry Tomatoes', 'Cucumber', 'Red Onion', 'Kalamata Olives', 'Feta Cheese', 'Lemon Vinaigrette'],
    nutritionInfo: {
      calories: 385,
      protein: '14g',
      carbs: '45g',
      fat: '16g',
    },
    sizes: [
      { size: 'Regular', price: 10.99 },
      { size: 'Large', price: 14.99 },
    ],
    tags: ['Vegetarian', 'High-Protein', 'Mediterranean'],
    rating: 4.9,
    reviews: 198,
    popular: true,
  },
  {
    id: 14,
    name: 'Caesar Salad with Grilled Chicken',
    category: 'salads',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
    description: 'Classic Caesar salad with romaine lettuce, parmesan, croutons, and grilled chicken.',
    ingredients: ['Romaine Lettuce', 'Grilled Chicken', 'Parmesan Cheese', 'Croutons', 'Caesar Dressing'],
    nutritionInfo: {
      calories: 425,
      protein: '35g',
      carbs: '22g',
      fat: '22g',
    },
    sizes: [
      { size: 'Regular', price: 11.99 },
      { size: 'Large', price: 15.99 },
    ],
    tags: ['High-Protein', 'Classic', 'Lunch'],
    rating: 4.8,
    reviews: 224,
  },
  {
    id: 15,
    name: 'Rainbow Power Salad',
    category: 'salads',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    description: 'A vibrant mix of kale, purple cabbage, carrots, beets, and edamame with ginger dressing.',
    ingredients: ['Kale', 'Purple Cabbage', 'Carrots', 'Beets', 'Edamame', 'Sunflower Seeds', 'Ginger Dressing'],
    nutritionInfo: {
      calories: 295,
      protein: '12g',
      carbs: '35g',
      fat: '12g',
    },
    sizes: [
      { size: 'Regular', price: 9.99 },
      { size: 'Large', price: 13.99 },
    ],
    tags: ['Vegan', 'Nutrient-Dense', 'Colorful'],
    rating: 4.7,
    reviews: 143,
  },
];

export function getProductById(id: number): Product | undefined {
  const stored = localStorage.getItem('freshlife_products');
  const allProducts = stored ? JSON.parse(stored) : products;
  return allProducts.find((p: Product) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  const stored = localStorage.getItem('freshlife_products');
  const allProducts = stored ? JSON.parse(stored) : products;
  if (category === 'all') return allProducts;
  return allProducts.filter((p: Product) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const stored = localStorage.getItem('freshlife_products');
  const allProducts = stored ? JSON.parse(stored) : products;
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(
    (p: Product) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery))
  );
}

export function getAllProducts(): Product[] {
  const stored = localStorage.getItem('freshlife_products');
  return stored ? JSON.parse(stored) : products;
}