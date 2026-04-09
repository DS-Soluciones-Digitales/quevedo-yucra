export type CurrencyCode = 'USD' | 'EUR' | 'PEN' | 'CNY'

export type ExchangeRateItem = {
  date: string
  exchangeRate: number
}

export type ExchangeRateResponse = {
  from: CurrencyCode
  to: CurrencyCode
  server: string
  exchangeRates: ExchangeRateItem[]
}