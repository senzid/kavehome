type NavItem = {
  name: string
  href: string
}

type FavNavItem = NavItem & {
  icon: string
}

export const desktopNavigation: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Categorías", href: "/products" },
  { name: "Artículos", href: "/products" },
]

export const favoritesNavigation: FavNavItem[] = [
  { name: "Favoritos", href: "/favorites", icon: "/icons/heart.svg" },
]