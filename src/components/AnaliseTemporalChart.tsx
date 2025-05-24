import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { VendaData, agruparPorMes } from '../data/mockData';

interface AnaliseTemporalChartProps {
  dados: VendaData[];
}

const AnaliseTemporalChart: React.FC<AnaliseTemporalChartProps> = ({ dados }) => {
  // Agrupar dados por mês
  const dadosPorMes = agruparPorMes(dados);
  
  // Formatar valores para o tooltip
  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Customizar o tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{label}</p>
          <p className="text-primary dark:text-primary-light">
            Vendas: {formatarValor(payload[0].value)}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dadosPorMes}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="mes" 
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <YAxis 
            tickFormatter={(value) => formatarValor(value)}
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="valor"
            name="Receita"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#2563eb', stroke: '#ffffff', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnaliseTemporalChart;
