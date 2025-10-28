import { Product } from '../types'
import pinnedUnsplash from './pinnedImages'

const products: Product[] = [
  {
    id: 'p_sku_001',
    slug: 'organic-coffee-beans',
    title: 'Organic Single Origin Coffee Beans',
    shortDescription: 'Medium roast from Ethiopia',
    description: '<p>Delicious medium roast...</p>',
    price: 24.99,
    compareAtPrice: 36.99,
    currency: 'USD',
    rating: 4.7,
    reviewsCount: 128,
    images: [
      { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=80&auto=format&fit=crop', alt: 'bag front', width: 1600, height: 1200 }
    ],
    variants: [
      { id: 'v_250g', title: '250 g', price: 24.99, sku: 'p1-250' },
      { id: 'v_1kg', title: '1 kg', price: 79.99, sku: 'p1-1kg' }
    ],
    inventory: { total: 120, perVariant: { v_250g: 60, v_1kg: 60 } },
    tags: ['coffee', 'organic'],
    categories: ['beverages', 'coffee'],
    createdAt: '2025-09-05'
  },
  {
    id: 'p_sku_002',
    slug: 'ceramic-coffee-mug',
    title: 'Ceramic Coffee Mug',
    shortDescription: '12 oz mug, dishwasher safe',
    description: '<p>Nice ceramic mug</p>',
    price: 12.5,
    compareAtPrice: null,
    currency: 'USD',
    rating: 4.2,
    reviewsCount: 34,
    images: [{ src: 'https://images.unsplash.com/photo-1517686469429-8bdb88d8e6c2?w=1200&q=80&auto=format&fit=crop', alt: 'coffee mug' }],
    variants: [{ id: 'v_default', title: 'Default', price: 12.5, sku: 'mug-1' }],
    inventory: { total: 40, perVariant: { v_default: 40 } },
    tags: ['mug', 'kitchen'],
    categories: ['kitchen', 'accessories'],
    createdAt: '2025-07-12'
  }
]

// generate additional sample products to reach ~50 items
// curated product templates - realistic product names and image queries
const templates = [
  { title: 'Apple AirPods Pro (2nd Gen)', query: 'airpods' },
  { title: 'Sony WH-1000XM5 Headphones', query: 'wireless headphones' },
  { title: 'Bose Portable Smart Speaker', query: 'portable speaker' },
  { title: 'Nike Air Max 270', query: 'running shoes' },
  { title: 'Adidas Ultraboost', query: 'sneakers' },
  { title: "Levi's 501 Original Jeans", query: 'jeans' },
  { title: 'Samsung Galaxy S23 (Case)', query: 'smartphone' },
  { title: 'Apple iPhone 14 Case', query: 'phone case' },
  { title: 'Dell XPS 13 Laptop', query: 'laptop' },
  { title: 'MacBook Air', query: 'macbook air' },
  { title: 'Canon EOS R6 Camera', query: 'camera dslr' },
  { title: 'Nikon Z6 II', query: 'camera' },
  { title: 'Fujifilm X-T4', query: 'mirrorless camera' },
  { title: 'GoPro HERO11', query: 'action camera' },
  { title: 'Sony PlayStation 5 Controller', query: 'game controller' },
  { title: 'Xbox Wireless Controller', query: 'xbox controller' },
  { title: 'Logitech MX Master 3 Mouse', query: 'wireless mouse' },
  { title: 'Keychron Mechanical Keyboard', query: 'mechanical keyboard' },
  { title: 'Anker Portable Charger 20000mAh', query: 'power bank' },
  { title: 'Samsung 27" 4K Monitor', query: '4k monitor' },
  { title: 'Amazon Kindle Paperwhite', query: 'kindle' },
  { title: 'Fitbit Charge 5', query: 'fitness tracker' },
  { title: 'Apple Watch Series 8', query: 'smartwatch' },
  { title: 'Hydro Flask Water Bottle', query: 'water bottle stainless steel' },
  { title: 'Yeti Rambler 30oz', query: 'yeti bottle' },
  { title: 'Instant Pot Duo 7-in-1', query: 'instant pot' },
  { title: 'Ninja Air Fryer', query: 'air fryer' },
  { title: 'Dyson V11 Vacuum', query: 'stick vacuum' },
  { title: 'KitchenAid Stand Mixer', query: 'stand mixer' },
  { title: 'Breville Espresso Machine', query: 'espresso machine' },
  { title: 'Le Creuset Dutch Oven', query: 'dutch oven' },
  { title: 'Sennheiser Momentum Earbuds', query: 'earbuds' },
  { title: "Patagonia Down Jacket", query: 'down jacket' },
  { title: 'The North Face Backpack', query: 'backpack' },
  { title: 'Ray-Ban Aviator Sunglasses', query: 'sunglasses' },
  { title: 'Fender Player Stratocaster', query: 'electric guitar' },
  { title: 'Yamaha Acoustic Guitar', query: 'acoustic guitar' },
  { title: 'Casio Digital Piano', query: 'digital piano' },
  { title: 'Garmin Forerunner 255', query: 'running watch' },
  { title: 'Osprey Farpoint 40 Travel Bag', query: 'travel backpack' },
  { title: 'Herman Miller Aeron Chair', query: 'office chair' },
  { title: 'Moleskine Classic Notebook', query: 'notebook journal' },
  { title: 'Rifle Paper Co. Planner', query: 'planner' },
  { title: 'Bose QuietComfort Earbuds', query: 'noise cancelling earbuds' },
  { title: 'Tile Mate (2022) Tracker', query: 'tracker tile' }
]

// create products from templates to add to the existing curated items
templates.forEach((t, idx) => {
  const i = idx + 3
  const id = `p_sku_${String(i).padStart(3, '0')}`
  const slug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const price = Math.round((15 + Math.random() * 285) * 100) / 100

  // Use the pinned mapping from src/mock/pinnedImages.ts (permanent URLs).
  // pinnedUnsplash maps product title -> Unsplash URL (or null)

  // rotate through a small set of reliable image providers as fallback
  const providers = [
    (s: string) => `https://picsum.photos/seed/${encodeURIComponent(s)}/800/600`,
    (_s: string, q: string) => `https://loremflickr.com/800/600/${encodeURIComponent(q)}`,
    () => `https://placeimg.com/800/600/tech`,
    (_s: string, q: string) => `https://placehold.co/800x600?text=${encodeURIComponent(q)}`
  ]

  const provider = providers[idx % providers.length]
  const imgUrl = pinnedUnsplash[t.title] ?? provider(slug, t.query)

  products.push({
    id,
    slug,
    title: t.title,
    shortDescription: `${t.title} — great choice`,
    description: `<p>${t.title} with high-quality materials and great reviews.</p>`,
    price,
    compareAtPrice: null,
    currency: 'USD',
    rating: +(3 + Math.random() * 2).toFixed(1),
    reviewsCount: Math.floor(Math.random() * 1000),
    images: [{ src: imgUrl, alt: t.title, width: 800, height: 600 }],
    variants: [{ id: `v_default`, title: 'Default', price, sku: `${id}-v1` }],
    inventory: { total: Math.floor(5 + Math.random() * 200), perVariant: { v_default: Math.floor(5 + Math.random() * 200) } },
    tags: [t.query.split(' ')[0], 'featured'],
    categories: ['featured'],
    createdAt: new Date().toISOString().slice(0, 10)
  })
})

// Simulate network delay and simple cache
let cache: Product[] | null = null

export async function fetchProducts(): Promise<Product[]> {
  if (cache) return cache
  await new Promise((r) => setTimeout(r, 200))
  cache = products
  return products
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 150))
  return products.find((p) => p.slug === slug) ?? null
}

export default products
