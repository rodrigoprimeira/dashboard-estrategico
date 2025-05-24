import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Scatter, ScatterChart, Cell, CartesianGrid } from 'recharts';
import { VendaData, calcularRecorrenciaCompra } from '../data/mockData';

interface RecorrenciaCompraHeatmapProps {
  dados: VendaData[];
}

const RecorrenciaCompraHeatmap: React.FC<RecorrenciaCompraHeatmapProps> = ({ dados }) => {
  // Calcular dados de recorrência
  const dadosRecorrencia = calcularRecorrenciaCompra(dados);
  
  // Extrair meses e clientes únicos
  const mesesUnicos = Array.from(new Set(dadosRecorrencia.map(item => item.mes))).sort();
  const clientesUnicos = Array.from(new Set(dadosRecorrencia.map(item => item.cliente))).sort();
  
  // Preparar dados para o heatmap
  const heatmapData = dadosRecorrencia.map(item => ({
    x: mesesUnicos.indexOf(item.mes),
    y: clientesUnicos.indexOf(item.cliente),
    z: item.compras,
    cliente: item.cliente,
    mes: item.mes
  }));
  
  // Escala de cores para o heatmap
  const getColor = (value: number) => {
    const maxValue = Math.max(...dadosRecorrencia.map(item => item.compras));
    const normalizedValue = value / maxValue;
    
    // Escala de azul
    if (normalizedValue === 0) return '#f3f4f6';
    if (normalizedValue < 0.2) return '#dbeafe';
    if (normalizedValue < 0.4) return '#bfdbfe';
    if (normalizedValue < 0.6) return '#93c5fd';
    if (normalizedValue < 0.8) return '#60a5fa';
    return '#2563eb';
  };
  
  // Customizar o tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Cliente: {data.cliente}</p>
          <p className="text-gray-600 dark:text-gray-300">Mês: {data.mes}</p>
          <p className="text-primary dark:text-primary-light font-medium">
            Compras: {data.z}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 70, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            name="Mês"
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#9ca3af' }}
            tickFormatter={(value) => mesesUnicos[value] || ''}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis 
            dataKey="y" 
            type="number" 
            name="Cliente"
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#9ca3af' }}
            tickFormatter={(value) => clientesUnicos[value] || ''}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            name="Frequência de Compra" 
            data={heatmapData} 
            fill="#2563eb"
          >
            {heatmapData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColor(entry.z)} 
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecorrenciaCompraHeatmap;
