import React from 'react';
import { VendaData, calcularTotalVendas, calcularTicketMedio, contarClientesUnicos, contarProdutosUnicos } from '../data/mockData';

interface ResumoExecutivoProps {
  dados: VendaData[];
}

const ResumoExecutivo: React.FC<ResumoExecutivoProps> = ({ dados }) => {
  // Calcular métricas
  const totalVendas = calcularTotalVendas(dados);
  const ticketMedio = calcularTicketMedio(dados);
  const clientesAtivos = contarClientesUnicos(dados);
  const produtosVendidos = contarProdutosUnicos(dados);
  
  // Formatar valores
  const formatarValor = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Card de Total de Vendas */}
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-l-4 border-primary">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total de Vendas</h3>
        <p className="text-2xl font-bold text-primary dark:text-primary-light">{formatarValor(totalVendas)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {dados.length} transações
        </p>
      </div>
      
      {/* Card de Ticket Médio */}
      <div className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-l-4 border-secondary">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Ticket Médio</h3>
        <p className="text-2xl font-bold text-secondary dark:text-secondary-light">{formatarValor(ticketMedio)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Por transação
        </p>
      </div>
      
      {/* Card de Clientes Ativos */}
      <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-l-4 border-purple-500">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Clientes Ativos</h3>
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{clientesAtivos}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Clientes únicos
        </p>
      </div>
      
      {/* Card de Produtos Vendidos */}
      <div className="card bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 border-l-4 border-amber-500">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Produtos Vendidos</h3>
        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{produtosVendidos}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          SKUs únicos
        </p>
      </div>
    </div>
  );
};

export default ResumoExecutivo;
