import type { Metadata } from "next"

export const SITE_NAME = "Kave Home"

export const SITE_DESCRIPTION =
  "Descubre mobiliario y decoración Kave Home: colecciones, productos y artículos de inspiración para tu hogar."

export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) {
    throw new Error(
      "Missing NEXT_PUBLIC_SITE_URL. Set it in your environment (see .env.example).",
    )
  }

  return new URL(raw.replace(/\/$/, ""))
}

// noIndexRobots because it's a demo and we don't want to index the site
export const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    nosnippet: true,
  },
}

export const rootMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: noIndexRobots,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
}

type BuildPageMetadataInput = {
  title: string | { absolute: string }
  description: string
  path: string
  images?: Array<string | null | undefined>
  type?: "website" | "article"
}

export function buildPageMetadata({
  title,
  description,
  path,
  images,
  type = "website",
}: BuildPageMetadataInput): Metadata {
  const ogImages = (images ?? [])
    .filter((url): url is string => Boolean(url))
    .map((url) => ({ url }))

  const resolvedTitle =
    typeof title === "string" ? title : title.absolute

  return {
    title,
    description,
    robots: noIndexRobots,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "es_ES",
      type,
      ...(ogImages.length > 0 ? { images: ogImages } : {}),
    },
    twitter: {
      card: ogImages.length > 0 ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description,
      ...(ogImages.length > 0
        ? { images: ogImages.map((image) => image.url) }
        : {}),
    },
  }
}
