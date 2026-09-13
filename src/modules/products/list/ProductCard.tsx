import Image from "next/image"
import Link from "next/link"
import FavoriteToggle from "@/modules/products/favorites/FavoriteToggle"
import { formatPrice } from "@/lib/currencyFormat"
import type { Product } from "@/modules/products/types"

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { title, description, image, price, salePrice, sku } = product
  const displayPrice = salePrice ?? price

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
        {displayPrice != null ? (
          <p className="font-semibold text-sm text-neutral-700 md:text-base">
            {salePrice != null && price != null && salePrice < price ? (
              <>
                <span className="mr-2 text-neutral-400 line-through">
                  {formatPrice(price)}
                </span>
                <span>{formatPrice(salePrice)}</span>
              </>
            ) : (
              formatPrice(displayPrice)
            )}
          </p>
        ) : null}
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
