import type { Product } from "@/modules/products/types"
import ProductCard from "./ProductCard"

type ProductsGridProps = {
  products: Product[]
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  if (products.length === 0) {
    return (
      <p className="px-6 py-16 text-center text-neutral-600 md:px-18">
        No hay productos en esta página.
      </p>
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.sku}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default ProductsGrid
