import Image from "next/image"
import Link from "next/link"
import FavoriteToggle from "../favorites/FavoriteToggle"
import ProductPrice from "../ProductPrice"
import type { Product } from "../types"

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { title, description, image, price, salePrice, sku } = product

  return (
    <article className="relative flex w-full flex-col gap-2">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100">
        <FavoriteToggle
          product={product}
          className="absolute top-0 right-1 z-10"
        />
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5 p-2">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold min-w-0 flex-1 line-clamp-1 text-sm md:text-base">{title}</h2>
          <span className="shrink-0" aria-hidden>
            <Image src="/icons/plus.svg" alt="" width={20} height={20} />
          </span>
        </div>
        <p className="line-clamp-2 md:line-clamp-1 text-sm">{description}</p>
        <ProductPrice
          price={price}
          salePrice={salePrice}
          className="font-semibold text-sm text-neutral-700 md:text-base"
        />
      </div>
      <Link
        href={`/products/${sku}`}
        className="absolute inset-0 z-1 focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-label={`Ver más detalles de ${title}`}
      />
    </article>
  )
}

export default ProductCard
