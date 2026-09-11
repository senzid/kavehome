type ApiGetOptions<T> = {
  revalidate?: number | false
  tags?: string[]
  fallback?: T
  headers?: HeadersInit
}

export async function apiGet<T>(
  endpoint: string,
  options: ApiGetOptions<T> = {},
): Promise<T> {
  const { revalidate, tags, fallback, headers } = options

  const baseUrl = process.env.API_BASE_URL
  if (!baseUrl) {
    throw new Error("Set the API_BASE_URL environment variable")
  }

  const url = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`
  const hasFallback = fallback !== undefined

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "es-ES,es;q=0.9",
        Referer: "https://kavehome.com/es/es/",
        ...headers,
      },
      ...(revalidate !== undefined || tags
        ? {
            next: {
              ...(revalidate !== undefined ? { revalidate } : {}),
              ...(tags ? { tags } : {}),
            },
          }
        : {}),
    })

    if (!response.ok) {
      if (hasFallback) {
        console.warn(
          `[api] GET ${endpoint} responded ${response.status}; using fallback`,
        )
        return fallback
      }

      throw new Error(`[api] GET ${endpoint} responded ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    if (hasFallback) {
      console.error(`[api] GET ${endpoint} failed; using fallback`, error)
      return fallback
    }

    throw error
  }
}
