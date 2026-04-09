import { CURRENCIES } from '../../utils/currency';
import type { CurrencyCode } from '../../types/exchange';

interface ConverterHeaderProps {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  currentRate: number;
  server: string;
}

export function ConverterHeader({ fromCurrency, toCurrency, currentRate, server }: ConverterHeaderProps) {
  const fromInfo = CURRENCIES[fromCurrency];
  const toInfo = CURRENCIES[toCurrency];

  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()} ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-slate-500">
        1 {fromInfo.label} ({fromInfo.symbol}) equivale a
      </p>
      <h2 className="text-4xl font-bold tracking-tight text-slate-900">
        {currentRate.toFixed(4)}{' '}
        <span className="text-2xl text-slate-600">
          {toInfo.label}s ({toInfo.symbol})
        </span>
      </h2>
      <p className="mt-2 text-xs font-medium text-slate-400">
        {formattedDate} - Obtenido de {server || 'servidor desconocido'}
      </p>
    </div>
  );
}
