import type { CurrencyCode } from "../types/exchange";

export const CURRENCIES: Record<
  CurrencyCode,
  { label: string; symbol: string }
> = {
  USD: { label: "Dólar", symbol: "US$" },
  EUR: { label: "Euro", symbol: "€" },
  PEN: { label: "Sol", symbol: "S/." },
  CNY: { label: "Yuan", symbol: "¥" },
};

export const ALLOWED_TARGETS: Record<CurrencyCode, CurrencyCode[]> = {
  USD: ["EUR", "PEN"],
  EUR: ["USD", "PEN", "CNY"],
  PEN: ["USD", "EUR", "CNY"],
  CNY: ["EUR", "PEN"],
};

export function getValidTargets(from: CurrencyCode): CurrencyCode[] {
  return ALLOWED_TARGETS[from];
}

export function getValidSources(to: CurrencyCode): CurrencyCode[] {
  return (Object.keys(ALLOWED_TARGETS) as CurrencyCode[]).filter((currency) =>
    ALLOWED_TARGETS[currency].includes(to),
  );
}
