const DEFAULT_LOCALE = "es-ES"
const DEFAULT_CURRENCY = "EUR"

type FormatPriceOptions = {
  locale?: string
  currency?: string
}

export function formatPrice(
  value: number,
  { locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY }: FormatPriceOptions = {},
): string {
  const hasDecimals = value % 1 !== 0
  const fractionDigits = hasDecimals ? 2 : 0

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}
