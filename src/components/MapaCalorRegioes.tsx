import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { VendaData, calcularDistribuicaoPorRegiao } from '../data/mockData';

interface MapaCalorRegioesProps {
  dados: VendaData[];
}

const MapaCalorRegioes: React.FC<MapaCalorRegioesProps> = ({ dados }) => {
  // Calcular distribuição por região
  const distribuicaoPorRegiao = calcularDistribuicaoPorRegiao(dados);
  
  // Preparar dados para o treemap
  const treemapData = distribuicaoPorRegiao.map(item => ({
    name: item.regiao,
    size: item.valor,
    valor: item.valor
  }));
  
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
            Vendas: {formatarValor(data.valor)}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // Cores para as regiões
  const COLORS = {
    'Norte': '#3b82f6',
    'Nordeste': '#2563eb',
    'Centro-Oeste': '#60a5fa',
    'Sudeste': '#1d4ed8',
    'Sul': '#93c5fd'
  };
  
  // Função para determinar a cor com base na região
  const getColor = (name: string) => {
    return COLORS[name as keyof typeof COLORS] || '#2563eb';
  };
  
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treemapData}
          dataKey="size"
          nameKey="name"
          aspectRatio={4/3}
          stroke="#fff"
          fill="#2563eb"
          animationDuration={1000}
          content={({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
            const region = name as string;
            return (
              <g>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  style={{
                    fill: getColor(region),
                    stroke: '#fff',
                    strokeWidth: 2,
                    strokeOpacity: 1,
                  }}
                />
                {width > 30 && height > 30 && (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fill: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                  >
                    {region}
                  </text>
                )}
              </g>
            );
          }}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default MapaCalorRegioes;
