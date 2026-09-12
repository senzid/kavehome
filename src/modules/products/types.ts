export type Product = {
  sku: string
  title: string
  description: string
  image: string | null
  price: number | null
  salePrice: number | null
}

export type ProductDetail = Product & {
  categories: string[]
  collection: string | null
  images: string[]
}

export type ProductImageApi = {
  code: string
  url: string
  type?: string
  order?: number
}

export type ProductApi = {
  sku: string
  title: string
  description: string
  price: number | null
  salePrice: number | null
  mainImage: ProductImageApi | null
  categories?: string[]
  collection?: string
  images?: ProductImageApi[]
}

export type ProductsApiResponse = {
  count: number
  next: string | null
  previous: string | null
  results: ProductApi[]
}

export type ProductsPage = {
  products: Product[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}
