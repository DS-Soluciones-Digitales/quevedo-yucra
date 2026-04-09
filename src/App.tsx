import { useExchangeRate } from './hooks/useExchangeRate';
import { ConverterHeader } from './components/converter/ConverterHeader';
import { ConverterForm } from './components/converter/ConverterForm';
import { ConverterChart } from './components/converter/ConverterChart';

function App() {
  const {
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
  } = useExchangeRate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Conversor de Monedas</h1>
           <p className="text-slate-500 text-sm mt-1">Prueba Técnica Frontend</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-600 text-sm font-medium">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna Izquierda: Formulario */}
          <div className="lg:col-span-5 flex flex-col gap-8">
             <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-8 transition-all hover:shadow-2xl hover:shadow-slate-200/50">
               <ConverterHeader 
                 fromCurrency={fromCurrency}
                 toCurrency={toCurrency}
                 currentRate={currentRate}
                 server={exchangeData?.server || '...'}
               />
               <div className="mt-10">
                 <ConverterForm 
                   fromCurrency={fromCurrency}
                   toCurrency={toCurrency}
                   fromAmount={fromAmount}
                   toAmount={toAmount}
                   fromOptions={fromOptions}
                   toOptions={toOptions}
                   onFromCurrencyChange={handleFromCurrencyChange}
                   onToCurrencyChange={handleToCurrencyChange}
                   onFromAmountChange={handleFromAmountChange}
                   onToAmountChange={handleToAmountChange}
                 />
               </div>
             </div>
          </div>

          {/* Columna Derecha: Gráfica */}
          <div className="lg:col-span-7 flex flex-col">
             <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-8 h-full transition-all hover:shadow-2xl hover:shadow-slate-200/50">
               <div className="mb-2 flex items-center justify-between">
                 <h3 className="text-lg font-bold text-slate-800 tracking-tight">Evolución del Tipo de Cambio</h3>
               </div>
               <div className="mt-4 flex-1">
                 <ConverterChart 
                   data={exchangeData?.exchangeRates || []}
                   isLoading={isLoading}
                 />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
