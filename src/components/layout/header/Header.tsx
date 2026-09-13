'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { desktopNavigation, favoritesNavigation } from './navigation';


const Header = () => {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastY && y > 64) setHidden(true)
      else if (y < lastY) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`bg-background h-(--header-height) flex flex-row justify-between items-center gap-2 px-4 py-2 sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <Link href="/" aria-label="Ir al inicio">
          <Image src="/home/logo.svg" alt="Logo de Kave Home" width={114} height={16} priority />
        </Link>
      <nav aria-label="Navegación principal en escritorio" className="hidden md:flex flex-row gap-3">
        {desktopNavigation.map((item) => (
          <Link key={item.name} href={item.href}>{item.name}</Link>
        ))}
      </nav>
      <nav aria-label="Favoritos" className="flex flex-row gap-2">
        {favoritesNavigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Image src={item.icon} alt={item.iconAlt} width={24} height={40}/></Link>
        ))}
      </nav>
    </header>
  )
}

export default Header