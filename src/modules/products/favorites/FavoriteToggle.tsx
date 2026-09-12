"use client"

import type { MouseEvent } from "react"
import type { Product } from "@/modules/products/types"
import { useFavorites } from "@/modules/products/favorites/FavoritesContext"

type FavoriteToggleProps = {
  product: Product
  className?: string
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="24"
    height="40"
    viewBox="0 0 24 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4.81484 20.0444L12.0042 27.5L19.1935 20.0444C19.9927 19.2156 20.4417 18.0915 20.4417 16.9194C20.4417 14.4786 18.5337 12.5 16.1801 12.5C15.0498 12.5 13.9659 12.9656 13.1667 13.7944L12.0042 15L10.8416 13.7944C10.0424 12.9656 8.95847 12.5 7.82823 12.5C5.47462 12.5 3.56665 14.4786 3.56665 16.9194C3.56665 18.0915 4.01564 19.2156 4.81484 20.0444Z"
      fill={filled ? "red" : "none"}
      stroke={filled ? "red" : "black"}
      strokeLinecap="round"
    />
  </svg>
)

const FavoriteToggle = ({ product, className }: FavoriteToggleProps) => {
  const { isReady, isFavorite, toggleFavorite } = useFavorites()
  const active = isReady && isFavorite(product.sku)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault()
    // event.stopPropagation()
    toggleFavorite(product)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={
        active
          ? `Quitar ${product.title} de favoritos`
          : `Añadir ${product.title} a favoritos`
      }
      className={className}
    >
      <HeartIcon filled={active} />
    </button>
  )
}

export default FavoriteToggle
