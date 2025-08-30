export const clothingCategories = [
  {
    id: 1,
    name: "Shirts",
    icon: "👕",
    description: "Casual and formal shirts",
    color: "bg-blue-100"
  },
  {
    id: 2,
    name: "Jackets",
    icon: "🧥",
    description: "Warm and stylish jackets",
    color: "bg-green-100"
  },
  {
    id: 3,
    name: "Polos",
    icon: "👔",
    description: "Classic polo shirts and collared tops",
    color: "bg-purple-100"
  },
  {
    id: 4,
    name: "Jacquards",
    icon: "🎨",
    description: "Patterned and textured fabrics",
    color: "bg-yellow-100"
  },
  {
    id: 5,
    name: "Hats",
    icon: "🧢",
    description: "Caps, beanies, and fedoras",
    color: "bg-red-100"
  },
  {
    id: 6,
    name: "Pants",
    icon: "👖",
    description: "Jeans, slacks, and shorts",
    color: "bg-indigo-100"
  },
  {
    id: 7,
    name: "Dresses",
    icon: "👗",
    description: "Casual and formal dresses",
    color: "bg-pink-100"
  },
  {
    id: 8,
    name: "Shoes",
    icon: "👟",
    description: "Sneakers, boots, and heels",
    color: "bg-orange-100"
  }
];

export const thriftStores = [
  {
    id: 1,
    name: "Vintage Vault",
    rating: 4.8,
    reviewCount: 127,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    minOrder: "$15",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    categories: ["Shirts", "Jackets", "Polos"],
    featured: true,
    distance: "0.8 mi"
  },
  {
    id: 2,
    name: "Retro Revival",
    rating: 4.6,
    reviewCount: 89,
    deliveryTime: "25-35 min",
    deliveryFee: "$1.99",
    minOrder: "$12",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    categories: ["Dresses", "Hats", "Jacquards"],
    featured: true,
    distance: "1.2 mi"
  },
  {
    id: 3,
    name: "Thrift & Thrive",
    rating: 4.7,
    reviewCount: 156,
    deliveryTime: "15-25 min",
    deliveryFee: "$3.99",
    minOrder: "$20",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
    categories: ["Pants", "Shoes", "Shirts"],
    featured: false,
    distance: "0.5 mi"
  },
  {
    id: 4,
    name: "Eco Fashion Hub",
    rating: 4.5,
    reviewCount: 73,
    deliveryTime: "30-40 min",
    deliveryFee: "$2.49",
    minOrder: "$18",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    categories: ["Jackets", "Hats", "Polos"],
    featured: false,
    distance: "1.5 mi"
  },
  {
    id: 5,
    name: "Classic Collectibles",
    rating: 4.9,
    reviewCount: 203,
    deliveryTime: "18-28 min",
    deliveryFee: "$1.49",
    minOrder: "$25",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    categories: ["Jacquards", "Dresses", "Shoes"],
    featured: true,
    distance: "0.9 mi"
  },
  {
    id: 6,
    name: "Urban Thrift",
    rating: 4.4,
    reviewCount: 67,
    deliveryTime: "22-32 min",
    deliveryFee: "$2.99",
    minOrder: "$16",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    categories: ["Pants", "Shirts", "Hats"],
    featured: false,
    distance: "1.1 mi"
  }
];

export const storeProducts = {
  1: [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      price: 24.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=400&fit=crop",
      category: "Jackets",
      condition: "Excellent",
      size: "M",
      brand: "Levi's"
    },
    {
      id: 2,
      name: "Classic Oxford Shirt",
      price: 12.99,
      originalPrice: 45.99,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
      category: "Shirts",
      condition: "Good",
      size: "L",
      brand: "Ralph Lauren"
    },
    {
      id: 3,
      name: "Retro Polo Shirt",
      price: 8.99,
      originalPrice: 35.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop",
      category: "Polos",
      condition: "Very Good",
      size: "S",
      brand: "Lacoste"
    }
  ],
  2: [
    {
      id: 4,
      name: "Floral Summer Dress",
      price: 18.99,
      originalPrice: 65.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      category: "Dresses",
      condition: "Excellent",
      size: "M",
      brand: "Free People"
    },
    {
      id: 5,
      name: "Vintage Fedora Hat",
      price: 14.99,
      originalPrice: 55.99,
      image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=300&h=400&fit=crop",
      category: "Hats",
      condition: "Good",
      size: "One Size",
      brand: "Stetson"
    }
  ]
};
