import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { VendaData, calcularDistribuicaoPorCanal } from '../data/mockData';

interface DistribuicaoCanalChartProps {
  dados: VendaData[];
}

const DistribuicaoCanalChart: React.FC<DistribuicaoCanalChartProps> = ({ dados }) => {
  // Calcular distribuição por canal
  const distribuicaoPorCanal = calcularDistribuicaoPorCanal(dados);
  
  // Calcular o total para percentuais
  const total = distribuicaoPorCanal.reduce((acc, item) => acc + item.valor, 0);
  
  // Preparar dados para o gráfico
  const dadosGrafico = distribuicaoPorCanal.map(item => ({
    name: item.canal,
    value: item.valor,
    percentual: (item.valor / total) * 100
  }));
  
  // Cores para os canais
  const COLORS = {
    'PDV': '#2563eb',
    'ECOMMERCE': '#059669',
    'DELIVERY': '#d97706'
  };
  
  // Formatar valores para o tooltip
  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Customizar o tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-semibold text-gray-800 dark:text-gray-200">{data.name}</p>
          <p className="text-primary dark:text-primary-light">
            Vendas: {formatarValor(data.value)}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {data.percentual.toFixed(1)}% do total
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Renderizar rótulos personalizados
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dadosGrafico}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1500}
          >
            {dadosGrafico.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistribuicaoCanalChart;
