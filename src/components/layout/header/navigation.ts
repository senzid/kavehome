type NavItem = {
    name: string
    href: string
}

type FavNavItem = NavItem & {
    icon: string
    iconAlt: string
}

export const desktopNavigation: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Categorías', href: '/categories' },
    { name: 'Artículos', href: '/articles' },
]

export const favoritesNavigation: FavNavItem[] = [
    { name: 'Favoritos', href: '/favorites', icon: '/common/icons/heart.svg', iconAlt: 'Icono de favoritos' },
]