"use client"

import { useState } from "react"
import Button from "@/components/ui/Button"
import { addToCart } from "./addToCart"

const QUANTITY_OPTIONS = Array.from({ length: 10 }, (_, index) => index + 1)

export default function AddToCartControls() {
  const [quantity, setQuantity] = useState(1)

  return (
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
        onClick={() => addToCart(quantity)}
      >
        Añadir a mi cesta
      </Button>
    </div>
  )
}
