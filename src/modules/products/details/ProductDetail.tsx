import ProductGallery from "@/modules/products/details/ProductGallery"
import ProductInfo from "@/modules/products/details/ProductInfo"
import type { ProductDetail as ProductDetailType } from "@/modules/products/types"
import ProductValueProps from "./ProductValueProps";

type ProductDetailProps = {
  product: ProductDetailType
}

const ProductDetail = ({ product }: ProductDetailProps) => {
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

export default ProductDetail
