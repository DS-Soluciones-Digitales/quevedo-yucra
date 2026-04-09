import type { CurrencyCode } from '../../types/exchange';
import { CURRENCIES } from '../../utils/currency';

interface ConverterFormProps {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  fromAmount: string;
  toAmount: string;
  fromOptions: CurrencyCode[];
  toOptions: CurrencyCode[];
  onFromCurrencyChange: (c: CurrencyCode) => void;
  onToCurrencyChange: (c: CurrencyCode) => void;
  onFromAmountChange: (v: string) => void;
  onToAmountChange: (v: string) => void;
}

export function ConverterForm({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  fromOptions,
  toOptions,
  onFromCurrencyChange,
  onToCurrencyChange,
  onFromAmountChange,
  onToAmountChange,
}: ConverterFormProps) {
  return (
    <div className="grid gap-6">
      {/* Origen */}
      <div className="relative flex items-stretch overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 hover:border-slate-400">
        <input
          type="number"
          min="0"
          className="w-full flex-1 appearance-none bg-transparent px-4 py-4 text-xl font-medium text-slate-800 outline-none"
          value={fromAmount}
          onChange={(e) => onFromAmountChange(e.target.value)}
          placeholder="0.00"
        />
        <div className="relative flex items-center bg-slate-50 px-2 border-l border-slate-200">
          <select
            className="h-full cursor-pointer appearance-none bg-transparent py-4 pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none"
            value={fromCurrency}
            onChange={(e) => onFromCurrencyChange(e.target.value as CurrencyCode)}
          >
            {fromOptions.map((c) => (
              <option key={c} value={c}>
                {CURRENCIES[c].label} ({CURRENCIES[c].symbol})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 flex items-center">
            <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Destino */}
      <div className="relative flex items-stretch overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 hover:border-slate-400">
        <input
          type="number"
          min="0"
          className="w-full flex-1 appearance-none bg-transparent px-4 py-4 text-xl font-medium text-slate-800 outline-none"
          value={toAmount}
          onChange={(e) => onToAmountChange(e.target.value)}
          placeholder="0.00"
        />
        <div className="relative flex items-center bg-slate-50 px-2 border-l border-slate-200">
          <select
            className="h-full cursor-pointer appearance-none bg-transparent py-4 pl-4 pr-10 text-sm font-semibold text-slate-700 outline-none"
            value={toCurrency}
            onChange={(e) => onToCurrencyChange(e.target.value as CurrencyCode)}
          >
            {toOptions.map((c) => (
              <option key={c} value={c}>
                {CURRENCIES[c].label} ({CURRENCIES[c].symbol})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 flex items-center">
            <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
