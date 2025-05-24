import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { VendaData, calcularTopProdutos } from '../data/mockData';

interface TopProdutosChartProps {
  dados: VendaData[];
}

const TopProdutosChart: React.FC<TopProdutosChartProps> = ({ dados }) => {
  // Calcular top produtos
  const topProdutos = calcularTopProdutos(dados, 5);
  
  // Cores para as barras
  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];
  
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
          <p className="font-semibold text-gray-800 dark:text-gray-200">{payload[0].payload.produto}</p>
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
        <BarChart
          layout="vertical"
          data={topProdutos}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            type="number"
            tickFormatter={(value) => formatarValor(value)}
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <YAxis 
            type="category"
            dataKey="produto"
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#9ca3af' }}
            width={120}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="valor" 
            fill="#2563eb"
            radius={[0, 4, 4, 0]}
            animationDuration={1500}
          >
            {topProdutos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProdutosChart;
