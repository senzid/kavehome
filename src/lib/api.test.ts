import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { apiGet } from "./api"

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response
}

describe("apiGet", () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock)
    process.env.API_BASE_URL = "https://api.example.com/"
    vi.spyOn(console, "warn").mockImplementation(() => {})
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    fetchMock.mockReset()
    delete process.env.API_BASE_URL
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it("throws when API_BASE_URL is missing", async () => {
    delete process.env.API_BASE_URL

    await expect(apiGet("products/")).rejects.toThrow(
      "Set the API_BASE_URL environment variable",
    )
  })

  it("returns JSON on successful response", async () => {
    const payload = { results: [{ id: 1 }] }
    fetchMock.mockResolvedValue(jsonResponse(payload))

    await expect(apiGet("products/")).resolves.toEqual(payload)
  })

  it("builds URL without double slashes", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }))

    await apiGet("/products/")

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.com/products/",
      expect.objectContaining({ method: "GET" }),
    )
  })

  it("returns fallback when response is not ok", async () => {
    const fallback = { results: [] }
    fetchMock.mockResolvedValue(jsonResponse({ error: true }, 500))

    await expect(
      apiGet("products/", { fallback }),
    ).resolves.toEqual(fallback)
  })

  it("throws when response is not ok and no fallback is provided", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ error: true }, 404))

    await expect(apiGet("products/missing")).rejects.toThrow(
      "[api] GET products/missing responded 404",
    )
  })

  it("returns fallback when fetch rejects", async () => {
    const fallback = { offline: true }
    fetchMock.mockRejectedValue(new Error("network down"))

    await expect(
      apiGet("products/", { fallback }),
    ).resolves.toEqual(fallback)
  })

  it("rethrows when fetch rejects and no fallback is provided", async () => {
    const error = new Error("network down")
    fetchMock.mockRejectedValue(error)

    await expect(apiGet("products/")).rejects.toBe(error)
  })
})
