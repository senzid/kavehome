export type Blog = {
    id: number
    title: string
    slug: string
    coverImage: string
    linkText: string
    seoTitle: string
    seoDescription: string
    content: string
}

export type BlogCover = Pick<Blog, "id" | "title" | "slug" | "coverImage" | "linkText">