"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Product } from "@/modules/products/types"
import {
  readFavorites,
  writeFavorites,
  type FavoritesMap,
} from "@/modules/products/favorites/favoritesStorage"

type FavoritesStateValue = {
  favorites: Product[]
  isReady: boolean
  isFavorite: (sku: string) => boolean
}

type FavoritesActionsValue = {
  toggleFavorite: (product: Product) => void
}

const FavoritesStateContext = createContext<FavoritesStateValue | null>(null)
const FavoritesActionsContext = createContext<FavoritesActionsValue | null>(
  null,
)

type FavoritesProviderProps = {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [items, setItems] = useState<FavoritesMap>({})
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setItems(readFavorites())
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return
    writeFavorites(items)
  }, [items, isReady])

  const isFavorite = useCallback(
    (sku: string) => Boolean(items[sku]),
    [items],
  )

  const toggleFavorite = useCallback((product: Product) => {
    setItems((current) => {
      if (current[product.sku]) {
        const { [product.sku]: _removed, ...rest } = current
        return rest
      }

      return {
        ...current,
        [product.sku]: {
          sku: product.sku,
          title: product.title,
          description: product.description,
          image: product.image,
          price: product.price,
          salePrice: product.salePrice,
        },
      }
    })
  }, [])

  const favorites = useMemo(() => Object.values(items), [items])

  const stateValue = useMemo<FavoritesStateValue>(() => ({
      favorites,
      isReady,
      isFavorite,
    }),
    [favorites, isReady, isFavorite],
  )

  const actionsValue = useMemo<FavoritesActionsValue>(() => ({
      toggleFavorite,
    }),
    [toggleFavorite],
  )

  return (
    <FavoritesActionsContext.Provider value={actionsValue}>
      <FavoritesStateContext.Provider value={stateValue}>
        {children}
      </FavoritesStateContext.Provider>
    </FavoritesActionsContext.Provider>
  )
}

export function useFavorites(): FavoritesStateValue & FavoritesActionsValue {
  const state = useContext(FavoritesStateContext)
  const actions = useContext(FavoritesActionsContext)

  if (!state || !actions) {
    throw new Error("useFavorites must be used within FavoritesProvider")
  }

  return { ...state, ...actions }
}
