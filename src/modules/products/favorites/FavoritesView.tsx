"use client"

import Link from "next/link"
import { useFavorites } from "@/modules/products/favorites/FavoritesContext"
import ProductsGrid from "@/modules/products/list/ProductsGrid"

const FavoritesView = () => {
  const { favorites, isReady } = useFavorites()

  if (!isReady) {
    return (
      <div className="grid grid-cols-2 gap-x-1 gap-y-4 px-0 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="aspect-4/5 w-full animate-pulse bg-neutral-100" />
            <div className="h-4 w-3/4 animate-pulse bg-neutral-100" />
            <div className="h-3 w-1/2 animate-pulse bg-neutral-100" />
          </div>
        ))}
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
        <p className="text-neutral-600">
          Todavía no tienes productos en favoritos.
        </p>
        <Link
          href="/products"
          className="text-sm font-medium underline underline-offset-4"
        >
          Explorar productos
        </Link>
      </div>
    )
  }

  return <ProductsGrid products={favorites} />
}

export default FavoritesView
