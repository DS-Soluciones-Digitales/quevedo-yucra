import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ExchangeRateItem } from '../../types/exchange';

interface ConverterChartProps {
  data: ExchangeRateItem[];
  isLoading: boolean;
}

export function ConverterChart({ data, isLoading }: ConverterChartProps) {
  // Invertir datos para mostrar la línea de tiempo de pasado a presente
  const chartData = [...data].reverse().map((item) => {
    const d = new Date(item.date);
    return {
      formattedDate: `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`,
      rate: item.exchangeRate,
    };
  });

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary-500"></div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/50">
        <p className="text-slate-500">No hay datos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="flex h-87.5 w-full flex-col p-4">
      <h3 className="mb-4 text-center text-sm font-medium text-slate-500">Últimos 5 días</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={['dataMin - 0.02', 'dataMax + 0.02']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickFormatter={(val) => val.toFixed(4)}
              width={70}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0F172A', fontWeight: 600 }}
              labelStyle={{ color: '#64748B', marginBottom: '4px' }}
              formatter={(value: any) => [Number(value).toFixed(4), 'Tipo de cambio']}
              labelFormatter={(label) => `Fecha: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#3B82F6" // Tailwind blue-500
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF', stroke: '#3B82F6' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#2563EB' }} // Tailwind blue-600
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
