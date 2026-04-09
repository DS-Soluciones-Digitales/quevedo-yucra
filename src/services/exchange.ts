import type { CurrencyCode, ExchangeRateResponse } from '../types/exchange';

const baseRates: Record<CurrencyCode, Partial<Record<CurrencyCode, number>>> = {
  USD: { EUR: 0.92, PEN: 3.78 },
  EUR: { USD: 1.09, PEN: 4.1, CNY: 7.81 },
  PEN: { USD: 0.26, EUR: 0.24, CNY: 1.95 },
  CNY: { EUR: 0.13, PEN: 0.51 },
};

export async function getExchangeData(
  from: CurrencyCode,
  to: CurrencyCode,
): Promise<ExchangeRateResponse> {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/exchangeRate/${from}/${to}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Error en la API. Recurriendo a los datos mock locales.', error);
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const baseRate = baseRates[from][to];

      if (!baseRate) {
        reject(new Error(`Combinación no permitida: ${from} -> ${to}`));
        return;
      }

      const now = new Date();
      const exchangeRates = Array.from({ length: 5 }, (_, index) => {
        const variation = (Math.random() * 0.04 - 0.02) * baseRate;

        return {
          date: new Date(now.getTime() - index * 24 * 60 * 60 * 1000).toISOString(),
          exchangeRate: Number((baseRate + variation).toFixed(4)),
        };
      });

      resolve({
        from,
        to,
        server: "mock-exchange-server",
        exchangeRates,
      });
    }, 400);
  });
}
