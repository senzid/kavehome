import React from 'react'
import Link from 'next/link'

type Variant = 'solid' | 'outline'

type ButtonLinkProps = {
    href: string
    variant?: Variant
    children: React.ReactNode
    className?: string
    props?: React.ComponentProps<typeof Link>
}

const variants: Record<Variant, string> = {
    solid: "bg-white text-black border border-transparent",
    outline: "bg-transparent border border-white text-white",
}

export const buttonSurfaceClassName = (
  variant: Variant = 'solid',
  className = '',
) =>
  `whitespace-nowrap px-5 py-2 min-h-10 ${variants[variant]} ${className}`.trim()

const ButtonLink = ({ href, variant='solid', children, className='', ...props }: ButtonLinkProps) => {

  return (
    <Link href={href} className={buttonSurfaceClassName(variant, `hover:opacity-80 ${className}`)} {...props}>
        {children}
    </Link>
  )
}

export default ButtonLink
