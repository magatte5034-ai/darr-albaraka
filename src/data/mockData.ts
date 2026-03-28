export interface MockProduct {
  id: string
  title: string
  titleEn: string
  price: number
  compareAtPrice?: number
  image: string
  categoryId: string
  categoryName: string
  rating: number
  reviews: number
  description: string
  descriptionEn: string
  stock: number
  featured: boolean
  seller: string
  badge?: string
}

export interface MockCategory {
  id: string
  slug: string
  name: string
  nameEn: string
  icon: string
  image: string
  count: number
  color: string
}

export interface MockBusiness {
  id: string
  name: string
  logo: string
  cover: string
  description: string
  descriptionEn: string
  category: string
  productCount: number
  rating: number
  city: string
}

export const CATEGORIES: MockCategory[] = [
  {
    id: 'cat-1', slug: 'electronics',
    name: 'Électronique', nameEn: 'Electronics',
    icon: '📱', color: 'from-blue-500 to-blue-700',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
    count: 142,
  },
  {
    id: 'cat-2', slug: 'vehicles',
    name: 'Véhicules', nameEn: 'Vehicles',
    icon: '🚗', color: 'from-red-500 to-red-700',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80',
    count: 87,
  },
  {
    id: 'cat-3', slug: 'clothing',
    name: 'Vêtements', nameEn: 'Clothing',
    icon: '👗', color: 'from-pink-500 to-pink-700',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
    count: 215,
  },
  {
    id: 'cat-4', slug: 'food',
    name: 'Alimentation', nameEn: 'Food',
    icon: '🛒', color: 'from-green-500 to-green-700',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    count: 98,
  },
]

export const PRODUCTS: MockProduct[] = [
  {
    id: 'p-1', categoryId: 'cat-1', categoryName: 'Électronique',
    title: 'Smartphone Samsung Galaxy A54', titleEn: 'Samsung Galaxy A54 Smartphone',
    price: 185000, compareAtPrice: 210000,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
    rating: 4.5, reviews: 128, stock: 15, featured: true,
    seller: 'Tech Dakar', badge: 'Promo',
    description: 'Smartphone Samsung Galaxy A54 5G, écran 6.4" Super AMOLED, 128 Go, caméra 50 MP.',
    descriptionEn: 'Samsung Galaxy A54 5G smartphone, 6.4" Super AMOLED display, 128GB, 50MP camera.',
  },
  {
    id: 'p-2', categoryId: 'cat-1', categoryName: 'Électronique',
    title: 'Écouteurs JBL Tune 510BT', titleEn: 'JBL Tune 510BT Headphones',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.3, reviews: 64, stock: 30, featured: true,
    seller: 'Sound Store', badge: 'Nouveau',
    description: 'Écouteurs sans fil Bluetooth 5.0, autonomie 40h, son puissant JBL Pure Bass.',
    descriptionEn: 'Bluetooth 5.0 wireless headphones, 40h battery, powerful JBL Pure Bass sound.',
  },
  {
    id: 'p-3', categoryId: 'cat-2', categoryName: 'Véhicules',
    title: 'Toyota Corolla 2020', titleEn: 'Toyota Corolla 2020',
    price: 9500000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&q=80',
    rating: 4.8, reviews: 12, stock: 1, featured: true,
    seller: 'AutoDakar',
    description: 'Toyota Corolla 2020, essence, automatique, 45 000 km, excellente condition.',
    descriptionEn: 'Toyota Corolla 2020, petrol, automatic, 45,000 km, excellent condition.',
  },
  {
    id: 'p-4', categoryId: 'cat-3', categoryName: 'Vêtements',
    title: 'Boubou Grand Bazin Brodé', titleEn: 'Embroidered Grand Bazin Boubou',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80',
    rating: 4.7, reviews: 89, stock: 8, featured: true,
    seller: 'Mode Sénégal', badge: 'Best-seller',
    description: 'Boubou traditionnel en grand bazin riche, broderie dorée, taille universelle.',
    descriptionEn: 'Traditional boubou in rich grand bazin fabric, gold embroidery, universal size.',
  },
  {
    id: 'p-5', categoryId: 'cat-4', categoryName: 'Alimentation',
    title: 'Huile d\'Arachide Bio 5L', titleEn: 'Organic Peanut Oil 5L',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80',
    rating: 4.6, reviews: 203, stock: 50, featured: true,
    seller: 'Ferme Nataal',
    description: 'Huile d\'arachide 100% naturelle, pressée à froid, sans additifs, 5 litres.',
    descriptionEn: '100% natural peanut oil, cold-pressed, no additives, 5 liters.',
  },
  {
    id: 'p-6', categoryId: 'cat-1', categoryName: 'Électronique',
    title: 'Laptop HP 15" Intel i5', titleEn: 'HP 15" Intel i5 Laptop',
    price: 420000, compareAtPrice: 480000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    rating: 4.4, reviews: 47, stock: 6, featured: true,
    seller: 'Tech Dakar', badge: 'Promo',
    description: 'PC portable HP, Intel Core i5 12e gen, 8 Go RAM, 512 Go SSD, Windows 11.',
    descriptionEn: 'HP laptop, Intel Core i5 12th gen, 8GB RAM, 512GB SSD, Windows 11.',
  },
  {
    id: 'p-7', categoryId: 'cat-3', categoryName: 'Vêtements',
    title: 'Sneakers Nike Air Max 270', titleEn: 'Nike Air Max 270 Sneakers',
    price: 89000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    rating: 4.9, reviews: 156, stock: 12, featured: false,
    seller: 'SportZone Dakar',
    description: 'Nike Air Max 270, semelle Air à grand volume, confort exceptionnel.',
    descriptionEn: 'Nike Air Max 270, large-volume Air sole, exceptional comfort.',
  },
  {
    id: 'p-8', categoryId: 'cat-4', categoryName: 'Alimentation',
    title: 'Thé Ataya Premium 500g', titleEn: 'Premium Ataya Tea 500g',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    rating: 4.8, reviews: 312, stock: 100, featured: false,
    seller: 'Épicerie Thiossane',
    description: 'Thé vert de Chine, qualité supérieure, idéal pour le thé sénégalais traditionnel.',
    descriptionEn: 'Premium Chinese green tea, ideal for traditional Senegalese tea ceremony.',
  },
]

export const BUSINESSES: MockBusiness[] = [
  {
    id: 'b-1', name: 'Auchan Dakar',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Auchan_logo.svg/200px-Auchan_logo.svg.png',
    cover: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80',
    description: 'Grande surface française avec alimentation, électronique et produits du quotidien.',
    descriptionEn: 'French hypermarket with groceries, electronics and everyday products.',
    category: 'Alimentation & Électronique', productCount: 1200, rating: 4.5, city: 'Dakar',
  },
  {
    id: 'b-2', name: 'Tech Dakar',
    logo: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=100&q=80',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    description: 'Spécialiste en informatique, smartphones et accessoires high-tech.',
    descriptionEn: 'Specialist in computers, smartphones and high-tech accessories.',
    category: 'Électronique', productCount: 342, rating: 4.7, city: 'Dakar',
  },
  {
    id: 'b-3', name: 'AutoDakar',
    logo: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100&q=80',
    cover: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    description: 'Vente et location de véhicules neufs et d\'occasion au Sénégal.',
    descriptionEn: 'Sales and rental of new and used vehicles in Senegal.',
    category: 'Véhicules', productCount: 87, rating: 4.6, city: 'Dakar',
  },
  {
    id: 'b-4', name: 'Mode Sénégal',
    logo: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=100&q=80',
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    description: 'Vêtements traditionnels et modernes : boubous, bazin, wax et prêt-à-porter.',
    descriptionEn: 'Traditional and modern clothing: boubous, bazin, wax and ready-to-wear.',
    category: 'Vêtements', productCount: 215, rating: 4.8, city: 'Thiès',
  },
  {
    id: 'b-5', name: 'Ferme Nataal',
    logo: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&q=80',
    cover: 'https://images.unsplash.com/photo-1595351298020-038700609878?w=800&q=80',
    description: 'Produits agricoles locaux : huiles, céréales, épices et fruits frais.',
    descriptionEn: 'Local agricultural products: oils, grains, spices and fresh fruit.',
    category: 'Alimentation', productCount: 98, rating: 4.9, city: 'Saint-Louis',
  },
  {
    id: 'b-6', name: 'SportZone Dakar',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80',
    cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    description: 'Équipements sportifs, chaussures et vêtements de sport.',
    descriptionEn: 'Sports equipment, shoes and sportswear.',
    category: 'Vêtements & Sport', productCount: 178, rating: 4.5, city: 'Dakar',
  },
]
