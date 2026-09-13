import { describe, expect, it } from "vitest"
import { formatPrice } from "./currencyFormat"

describe("formatPrice", () => {
  it("formats integers without fraction digits in es-ES EUR", () => {
    // Intl es-ES uses NBSP (U+00A0) as empty space
    expect(formatPrice(100)).toBe("100\u00A0€")
  })

  it("formats decimals with two fraction digits", () => {
    expect(formatPrice(99.5)).toBe("99,50\u00A0€")
  })

  it("formats with en-US USD", () => {
    expect(formatPrice(10, { locale: "en-US", currency: "USD" })).toBe("$10")
  })
})
