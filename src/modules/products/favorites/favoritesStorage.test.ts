import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  FAVORITES_STORAGE_KEY,
  readFavorites,
  writeFavorites,
  type FavoritesMap,
} from "./favoritesStorage"
import type { Product } from "../types"

const validProduct: Product = {
  sku: "SKU-1",
  title: "Chair",
  description: "A chair",
  image: "https://example.com/chair.jpg",
  price: 100,
  salePrice: 80,
}

function createMemoryStorage(): Storage {
  const store = new Map<string, string>()

  return {
    get length() {
      return store.size
    },
    clear() {
      store.clear()
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null
    },
    key(index: number) {
      return [...store.keys()][index] ?? null
    },
    removeItem(key: string) {
      store.delete(key)
    },
    setItem(key: string, value: string) {
      store.set(key, value)
    },
  }
}

describe("favoritesStorage", () => {
  let storage: Storage

  beforeEach(() => {
    storage = createMemoryStorage()
    vi.stubGlobal("localStorage", storage)
    vi.stubGlobal("window", { localStorage: storage })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe("readFavorites", () => {
    it("returns empty object when window is undefined (SSR)", () => {
      vi.stubGlobal("window", undefined)

      expect(readFavorites()).toEqual({})
    })

    it("returns empty object when storage has no key", () => {
      expect(readFavorites()).toEqual({})
    })

    it("returns empty object for invalid JSON", () => {
      storage.setItem(FAVORITES_STORAGE_KEY, "{not-json")

      expect(readFavorites()).toEqual({})
    })

    it("returns empty object when parsed value is an array", () => {
      storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([validProduct]))

      expect(readFavorites()).toEqual({})
    })

    it("keeps valid products and drops invalid ones", () => {
      storage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify({
          "SKU-1": validProduct,
          "SKU-2": { sku: "SKU-2", title: "Broken" },
        }),
      )

      expect(readFavorites()).toEqual({ "SKU-1": validProduct })
    })

    it("drops entries whose value.sku does not match the key", () => {
      storage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify({
          "WRONG-KEY": validProduct,
        }),
      )

      expect(readFavorites()).toEqual({})
    })

    it("accepts null image, price and salePrice", () => {
      const product: Product = {
        sku: "SKU-NULL",
        title: "Nullables",
        description: "Ok",
        image: null,
        price: null,
        salePrice: null,
      }

      storage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify({ "SKU-NULL": product }),
      )

      expect(readFavorites()).toEqual({ "SKU-NULL": product })
    })
  })

  describe("writeFavorites", () => {
    it("serializes favorites under the expected key", () => {
      const favorites: FavoritesMap = { "SKU-1": validProduct }

      writeFavorites(favorites)

      expect(storage.getItem(FAVORITES_STORAGE_KEY)).toBe(
        JSON.stringify(favorites),
      )
    })

    it("does nothing when window is undefined", () => {
      vi.stubGlobal("window", undefined)

      expect(() => writeFavorites({ "SKU-1": validProduct })).not.toThrow()
    })

    it("swallows setItem failures", () => {
      storage.setItem = () => {
        throw new Error("QuotaExceededError")
      }

      expect(() => writeFavorites({ "SKU-1": validProduct })).not.toThrow()
    })
  })
})
