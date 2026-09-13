import { describe, expect, it } from "vitest"
import { getDisplayPrice, hasProductDiscount } from "./ProductPrice"

describe("ProductPrice helpers", () => {
  describe("hasProductDiscount", () => {
    it("is true when salePrice is lower than price", () => {
      expect(hasProductDiscount(100, 80)).toBe(true)
    })

    it("is false when salePrice is equal or higher", () => {
      expect(hasProductDiscount(100, 100)).toBe(false)
      expect(hasProductDiscount(100, 120)).toBe(false)
    })

    it("is false when price or salePrice is null", () => {
      expect(hasProductDiscount(null, 80)).toBe(false)
      expect(hasProductDiscount(100, null)).toBe(false)
      expect(hasProductDiscount(null, null)).toBe(false)
    })
  })

  describe("getDisplayPrice", () => {
    it("prefers salePrice when present", () => {
      expect(getDisplayPrice(100, 80)).toBe(80)
    })

    it("falls back to price when salePrice is null", () => {
      expect(getDisplayPrice(100, null)).toBe(100)
    })

    it("returns null when both are null", () => {
      expect(getDisplayPrice(null, null)).toBeNull()
    })
  })
})
