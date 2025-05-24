import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { VendaData, calcularPerfilClientes } from '../data/mockData';

interface PerfilClientesChartProps {
  dados: VendaData[];
}

const PerfilClientesChart: React.FC<PerfilClientesChartProps> = ({ dados }) => {
  // Calcular perfil de clientes
  const perfilClientes = calcularPerfilClientes(dados);
  
  // Preparar dados para o gráfico de faixa etária
  const dadosFaixaEtaria = perfilClientes.porFaixaEtaria;
  
  // Preparar dados para o gráfico de sexo
  const dadosSexo = perfilClientes.porSexo.map(item => ({
    sexo: item.sexo === 'M' ? 'Masculino' : 'Feminino',
    quantidade: item.quantidade
  }));
  
  // Cores para as faixas etárias
  const COLORS_FAIXA = ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'];
  
  // Cores para sexo
  const COLORS_SEXO = {
    'Masculino': '#2563eb',
    'Feminino': '#d946ef'
  };
  
  // Customizar o tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {payload[0].payload.faixa || payload[0].payload.sexo}
          </p>
          <p className="text-primary dark:text-primary-light">
            Clientes: {payload[0].value}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="w-full h-80 flex flex-col">
      {/* Gráfico de Faixa Etária */}
      <div className="flex-1 mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Distribuição por Faixa Etária</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart
            data={dadosFaixaEtaria}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="faixa" 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="quantidade" 
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            >
              {dadosFaixaEtaria.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_FAIXA[index % COLORS_FAIXA.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Gráfico de Sexo */}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Distribuição por Sexo</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart
            data={dadosSexo}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="sexo" 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="quantidade" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            >
              {dadosSexo.map((entry) => (
                <Cell 
                  key={`cell-${entry.sexo}`} 
                  fill={COLORS_SEXO[entry.sexo as keyof typeof COLORS_SEXO]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerfilClientesChart;
