import Link from "next/link"

const VALUE_PROPS = [
  { title: "Devoluciones gratuitas", linkLabel: "Ver condiciones" },
  { title: "Garantía 10 años", linkLabel: "Ver condiciones" },
  { title: "Más de 175 puntos de venta", linkLabel: "Ver tiendas" },
  { title: "Financiación sin intereses", linkLabel: "Ver opciones" },
] as const

export default function ProductValueProps() {
  return (
    <ul className="flex flex-col items-center gap-6 bg-neutral-10 px-6 py-8 text-center md:flex-row md:justify-between md:px-28">
      {VALUE_PROPS.map(({ title, linkLabel }) => (
        <li key={title} className="flex flex-col gap-1">
          <p className="text-sm font-semibold md:text-base">{title}</p>
          <Link href="/" className="text-sm underline underline-offset-2">
            {linkLabel}
          </Link>
        </li>
      ))}
    </ul>
  )
}
