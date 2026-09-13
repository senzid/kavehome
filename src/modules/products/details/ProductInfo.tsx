"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/ui/Button"
import FavoriteToggle from "../favorites/FavoriteToggle"
import ProductPrice from "../ProductPrice"
import { toProductSummary } from "../toProductSummary"
import type { ProductDetail } from "../types"
import { addToCart } from "./addToCart"

type ProductInfoProps = {
  product: ProductDetail
}

const QUANTITY_OPTIONS = Array.from({ length: 10 }, (_, index) => index + 1)

const formatDeliveryDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${day}/${month}`
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { title, description, price, salePrice } = product
  const [quantity, setQuantity] = useState(1)

  const deliveryFrom = new Date()
  deliveryFrom.setDate(deliveryFrom.getDate() + 1)
  const deliveryTo = new Date(deliveryFrom)
  deliveryTo.setDate(deliveryFrom.getDate() + 7)

  const handleAddToCart = () => {
    addToCart(quantity)
  }

  return (
    <div className="flex flex-col gap-10 px-6 pt-12 pb-4 md:p-12">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl">{title}</h1>
          <FavoriteToggle
            product={toProductSummary(product)}
            className="shrink-0"
          />
        </div>

        {description ? (
          <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
            {description}
          </p>
        ) : null}

        <ProductPrice
          price={price}
          salePrice={salePrice}
          className="text-lg font-semibold md:text-xl"
        />

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

        <Button
          variant="solid"
          tone="onLight"
          size="sm"
          className="flex-1"
          onClick={handleAddToCart}
        >
          Añadir a mi cesta
        </Button>
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
          <strong>{formatDeliveryDate(deliveryFrom)}</strong> y el{" "}
          <strong>{formatDeliveryDate(deliveryTo)}</strong>.
        </span>
      </p>
    </div>
  )
}

export default ProductInfo
