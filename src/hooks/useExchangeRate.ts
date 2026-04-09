import { useState, useEffect, useMemo } from 'react';
import { getExchangeData } from '../services/exchange';
import type { CurrencyCode, ExchangeRateResponse } from '../types/exchange';
import { getValidSources, getValidTargets } from '../utils/currency';

export function useExchangeRate() {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('EUR');
  
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0');
  const [activeInput, setActiveInput] = useState<'from' | 'to'>('from');
  
  const [exchangeData, setExchangeData] = useState<ExchangeRateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const currentRate = exchangeData?.exchangeRates[0]?.exchangeRate ?? 0;

  // Cargar datos cuando cambia la moneda
  useEffect(() => {
    async function loadExchangeRate() {
      setIsLoading(true);
      setError('');
      try {
        const data = await getExchangeData(fromCurrency, toCurrency);
        setExchangeData(data);
        setFromAmount('1');
        setToAmount(String(data.exchangeRates[0].exchangeRate));
        setActiveInput('from');
      } catch (err) {
        setExchangeData(null);
        setError(err instanceof Error ? err.message : 'Error inesperado');
      } finally {
        setIsLoading(false);
      }
    }

    loadExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Sincronizar montos bidireccionalmente
  useEffect(() => {
    if (!currentRate) return;

    if (activeInput === 'from') {
      const parsedFrom = parseFloat(fromAmount);
      if (isNaN(parsedFrom)) {
        setToAmount('');
        return;
      }
      const nextAmount = parsedFrom * currentRate;
      setToAmount(nextAmount.toFixed(4).replace(/\.?0+$/, '')); // Limpiar ceros extra
      return;
    }

    if (activeInput === 'to') {
      const parsedTo = parseFloat(toAmount);
      if (isNaN(parsedTo)) {
        setFromAmount('');
        return;
      }
      const nextAmount = parsedTo / currentRate;
      setFromAmount(nextAmount.toFixed(4).replace(/\.?0+$/, ''));
    }
  }, [fromAmount, toAmount, activeInput, currentRate]);

  const fromOptions = useMemo(() => getValidSources(toCurrency), [toCurrency]);
  const toOptions = useMemo(() => getValidTargets(fromCurrency), [fromCurrency]);

  const handleFromCurrencyChange = (c: CurrencyCode) => setFromCurrency(c);
  const handleToCurrencyChange = (c: CurrencyCode) => setToCurrency(c);

  const handleFromAmountChange = (val: string) => {
    setActiveInput('from');
    setFromAmount(val);
  };

  const handleToAmountChange = (val: string) => {
    setActiveInput('to');
    setToAmount(val);
  };

  return {
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    fromOptions,
    toOptions,
    isLoading,
    error,
    exchangeData,
    currentRate,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    handleFromAmountChange,
    handleToAmountChange,
  };
}
