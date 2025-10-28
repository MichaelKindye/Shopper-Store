export type Image = { src: string; alt: string; width?: number; height?: number }

export type Variant = { id: string; title: string; price: number; sku: string }

export type Product = {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number | null
  currency: string
  rating?: number
  reviewsCount?: number
  images: Image[]
  variants: Variant[]
  inventory: { total: number; perVariant: Record<string, number> }
  tags: string[]
  categories: string[]
  createdAt: string
}

export type CartItem = {
  productId: string
  variantId?: string
  quantity: number
  unitPrice: number
}
