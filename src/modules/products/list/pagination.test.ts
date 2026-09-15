import { describe, expect, it } from "vitest"
import { getVisiblePages, pageHref } from "./pagination"

describe("pagination helpers", () => {
  describe("pageHref", () => {
    it.each([
      [1, "/products"],
      [0, "/products"],
      [2, "/products/2"],
      [10, "/products/10"],
    ])("pageHref(%s) => %s", (page, href) => {
      expect(pageHref(page)).toBe(href)
    })
  })

  describe("getVisiblePages", () => {
    it.each([
      {
        currentPage: 1,
        totalPages: 5,
        expected: [1, 2, 3, "ellipsis"],
      },
      {
        currentPage: 2,
        totalPages: 5,
        expected: [1, 2, 3, "ellipsis"],
      },
      {
        currentPage: 3,
        totalPages: 5,
        expected: [2, 3, 4, "ellipsis"],
      },
      {
        currentPage: 5,
        totalPages: 5,
        expected: [4, 5],
      },
      {
        currentPage: 1,
        totalPages: 2,
        expected: [1, 2],
      },
      {
        currentPage: 1,
        totalPages: 1,
        expected: [1],
      },
    ])(
      "current=$currentPage total=$totalPages",
      ({ currentPage, totalPages, expected }) => {
        expect(getVisiblePages(currentPage, totalPages)).toEqual(expected)
      },
    )
  })
})
