"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/currencyFormat"
import { addToCart } from "@/modules/products/details/addToCart"
import ProductValueProps from "@/modules/products/details/ProductValueProps"
import type { ProductDetail } from "@/modules/products/types"

type ProductInfoProps = {
  product: ProductDetail
}

const QUANTITY_OPTIONS = Array.from({ length: 10 }, (_, index) => index + 1)

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { title, description, price, salePrice } = product
  const displayPrice = salePrice ?? price
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart(quantity)
  }

  return (
    <div className="flex flex-col gap-10 px-6 pt-12 pb-4 md:p-12">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
          <button type="button" aria-label="Añadir a favoritos" className="shrink-0">
            <Image
              src="/icons/heart.svg"
              alt=""
              width={24}
              height={40}
              aria-hidden
            />
          </button>
        </div>

        {description ? (
          <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
            {description}
          </p>
        ) : null}

        {displayPrice != null ? (
          <p className="text-lg font-semibold md:text-xl">
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

        <p className="text-sm text-neutral-600">
          Fracciona tu pago en cómodas cuotas.{" "}
          <Link href="/" className="underline underline-offset-2">
            Más información
          </Link>
        </p>
      </div>

      <div className="flex items-stretch gap-3 md:pt-20">
        <label className="sr-only" htmlFor="product-quantity">
          Cantidad
        </label>
        <select
          id="product-quantity"
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="min-w-16 border border-neutral-300 bg-white px-3 py-3 text-sm"
        >
          {QUANTITY_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 bg-neutral-800 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-900"
        >
          Añadir a mi cesta
        </button>
      </div>

      <p className="flex items-start gap-2 text-sm text-neutral-700">
        <Image
          src="/icons/truck.svg"
          alt=""
          width={24}
          height={24}
          className="mt-0.5 shrink-0"
          aria-hidden
        />
        <span>
          Compra ahora y recíbelo aproximadamente entre el{" "}
          <strong>28/08</strong> y el <strong>04/09</strong>.
        </span>
      </p>
    </div>
  )
}

export default ProductInfo
