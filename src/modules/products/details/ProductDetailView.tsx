import type { ProductDetail } from "../types"
import ProductGallery from "./ProductGallery"
import ProductInfo from "./ProductInfo"
import ProductValueProps from "./ProductValueProps"

type ProductDetailViewProps = {
  product: ProductDetail
}

const ProductDetailView = ({ product }: ProductDetailViewProps) => {
  return (
    <article>
      <div className="flex w-full flex-col pb-8 md:flex-row md:py-8">
        <div className="min-w-0 md:flex-3">
          <ProductGallery
            title={product.title}
            mainImage={product.image}
            images={product.images}
          />
        </div>
        <div className="min-w-0 md:flex-2">
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductValueProps />
    </article>
  )
}

export default ProductDetailView
