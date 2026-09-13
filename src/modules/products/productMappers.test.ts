import { describe, expect, it } from "vitest"
import {
  getTotalPages,
  normalizePage,
  toProduct,
  toProductDetail,
  toProductImages,
} from "./productMappers"
import { toProductSummary } from "./toProductSummary"
import type { ProductApi, ProductDetail } from "./types"

const baseApiProduct: ProductApi = {
  sku: "AA123",
  title: "Sofa",
  description: "Comfortable sofa",
  price: 999,
  salePrice: 799,
  mainImage: {
    code: "main",
    url: "https://cdn.example.com/main.jpg",
  },
  categories: ["living"],
  collection: "  Nord  ",
  images: [
    { code: "b", url: "https://cdn.example.com/b.jpg", order: 2 },
    { code: "a", url: "https://cdn.example.com/a.jpg", order: 1 },
    {
      code: "main-dup",
      url: "https://cdn.example.com/main.jpg",
      order: 0,
    },
    { code: "dup", url: "https://cdn.example.com/a.jpg", order: 3 },
    { code: "empty", url: "", order: 4 },
  ],
}

describe("productMappers", () => {
  describe("toProduct", () => {
    it("maps API product fields and main image url", () => {
      expect(toProduct(baseApiProduct)).toEqual({
        sku: "AA123",
        title: "Sofa",
        description: "Comfortable sofa",
        image: "https://cdn.example.com/main.jpg",
        price: 999,
        salePrice: 799,
      })
    })

    it("uses null image when mainImage is missing", () => {
      expect(
        toProduct({ ...baseApiProduct, mainImage: null }).image,
      ).toBeNull()
    })
  })

  describe("toProductImages", () => {
    it("sorts by order, excludes main url, empty urls and duplicates", () => {
      expect(toProductImages(baseApiProduct)).toEqual([
        "https://cdn.example.com/a.jpg",
        "https://cdn.example.com/b.jpg",
      ])
    })

    it("returns empty array when images is undefined", () => {
      expect(
        toProductImages({ ...baseApiProduct, images: undefined }),
      ).toEqual([])
    })
  })

  describe("toProductDetail", () => {
    it("trims collection and defaults missing categories", () => {
      expect(
        toProductDetail({
          ...baseApiProduct,
          categories: undefined,
          collection: "  ",
        }),
      ).toMatchObject({
        categories: [],
        collection: null,
        images: [
          "https://cdn.example.com/a.jpg",
          "https://cdn.example.com/b.jpg",
        ],
      })
    })

    it("keeps trimmed non-empty collection", () => {
      expect(toProductDetail(baseApiProduct).collection).toBe("Nord")
    })
  })

  describe("normalizePage", () => {
    it.each([
      [NaN, 1],
      [0, 1],
      [-3, 1],
      [1.9, 1],
      [2.1, 2],
      [3, 3],
    ])("normalizePage(%s) => %s", (input, expected) => {
      expect(normalizePage(input)).toBe(expected)
    })
  })

  describe("getTotalPages", () => {
    it("returns 0 when totalCount is 0", () => {
      expect(getTotalPages(0, 20)).toBe(0)
    })

    it("ceils totalCount / pageSize", () => {
      expect(getTotalPages(41, 20)).toBe(3)
    })
  })
})

describe("toProductSummary", () => {
  it("keeps only summary fields from a ProductDetail", () => {
    const detail: ProductDetail = {
      sku: "AA123",
      title: "Sofa",
      description: "Comfortable sofa",
      image: "https://cdn.example.com/main.jpg",
      price: 999,
      salePrice: 799,
      categories: ["living"],
      collection: "Nord",
      images: ["https://cdn.example.com/a.jpg"],
    }

    expect(toProductSummary(detail)).toEqual({
      sku: "AA123",
      title: "Sofa",
      description: "Comfortable sofa",
      image: "https://cdn.example.com/main.jpg",
      price: 999,
      salePrice: 799,
    })
  })
})
