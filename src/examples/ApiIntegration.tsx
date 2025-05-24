import React, { useState, useEffect } from 'react';
import { VendaData } from '../data/mockData';

/**
 * Este é um exemplo de como integrar o dashboard com uma API real.
 * Substitua a URL da API e ajuste a estrutura de dados conforme necessário.
 */

// Configuração da API
const API_URL = 'https://api.exemplo.com/vendas';
const API_KEY = 'SUA_API_KEY'; // Em produção, use variáveis de ambiente

// Interface para resposta paginada da API
interface ApiResponse {
  dados: VendaData[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

// Componente de exemplo
const DashboardComDadosReais: React.FC = () => {
  // Estados
  const [dados, setDados] = useState<VendaData[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<VendaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagina, setPagina] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  
  // Parâmetros de filtro
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const [canal, setCanal] = useState<string>('');
  const [regiao, setRegiao] = useState<string>('');
  
  // Função para buscar dados da API
  const fetchDados = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Construir URL com parâmetros de filtro
      let url = `${API_URL}?pagina=${pagina}`;
      
      if (dataInicio) url += `&dataInicio=${dataInicio}`;
      if (dataFim) url += `&dataFim=${dataFim}`;
      if (canal) url += `&canal=${canal}`;
      if (regiao) url += `&regiao=${regiao}`;
      
      // Fazer requisição à API
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }
      
      // Processar resposta
      const responseData: ApiResponse = await response.json();
      
      // Atualizar estados
      setDados(responseData.dados);
      setDadosFiltrados(responseData.dados);
      setTotalPaginas(responseData.totalPaginas);
      
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Carregar dados quando o componente montar ou quando os filtros mudarem
  useEffect(() => {
    fetchDados();
  }, [pagina, dataInicio, dataFim, canal, regiao]);
  
  // Função para aplicar filtros adicionais no cliente
  const aplicarFiltrosCliente = (filtros: {
    categoria?: string;
    produto?: string;
    valorMinimo?: number;
    valorMaximo?: number;
  }) => {
    let dadosFiltrados = [...dados];
    
    if (filtros.categoria) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.CATEGORIA === filtros.categoria
      );
    }
    
    if (filtros.produto) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.PRODUTO.toLowerCase().includes(filtros.produto.toLowerCase())
      );
    }
    
    if (filtros.valorMinimo !== undefined) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.VALOR >= filtros.valorMinimo!
      );
    }
    
    if (filtros.valorMaximo !== undefined) {
      dadosFiltrados = dadosFiltrados.filter(item => 
        item.VALOR <= filtros.valorMaximo!
      );
    }
    
    setDadosFiltrados(dadosFiltrados);
  };
  
  // Função para exportar dados
  const exportarDados = async (formato: 'csv' | 'json') => {
    setLoading(true);
    
    try {
      // URL para exportação
      const url = `${API_URL}/exportar?formato=${formato}`;
      
      // Parâmetros de filtro
      const params = new URLSearchParams();
      if (dataInicio) params.append('dataInicio', dataInicio);
      if (dataFim) params.append('dataFim', dataFim);
      if (canal) params.append('canal', canal);
      if (regiao) params.append('regiao', regiao);
      
      // Fazer requisição para exportação
      const response = await fetch(`${url}&${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro na exportação: ${response.status} ${response.statusText}`);
      }
      
      // Obter o blob da resposta
      const blob = await response.blob();
      
      // Criar URL para download
      const downloadUrl = URL.createObjectURL(blob);
      
      // Criar link para download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `vendas_${new Date().toISOString().split('T')[0]}.${formato}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
    } catch (err) {
      console.error('Erro ao exportar dados:', err);
      setError('Não foi possível exportar os dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Renderizar componente
  return (
    <div>
      {/* Interface de filtros */}
      <div className="filtros">
        <h2>Filtros</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Data Início</label>
            <input 
              type="date" 
              value={dataInicio} 
              onChange={(e) => setDataInicio(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label>Data Fim</label>
            <input 
              type="date" 
              value={dataFim} 
              onChange={(e) => setDataFim(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label>Canal</label>
            <select 
              value={canal} 
              onChange={(e) => setCanal(e.target.value)}
              className="select"
            >
              <option value="">Todos</option>
              <option value="PDV">PDV</option>
              <option value="ECOMMERCE">E-commerce</option>
              <option value="DELIVERY">Delivery</option>
            </select>
          </div>
          <div>
            <label>Região</label>
            <select 
              value={regiao} 
              onChange={(e) => setRegiao(e.target.value)}
              className="select"
            >
              <option value="">Todas</option>
              <option value="Norte">Norte</option>
              <option value="Nordeste">Nordeste</option>
              <option value="Centro-Oeste">Centro-Oeste</option>
              <option value="Sudeste">Sudeste</option>
              <option value="Sul">Sul</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={() => aplicarFiltrosCliente({})} 
            className="btn btn-primary"
          >
            Aplicar Filtros
          </button>
          <button 
            onClick={() => exportarDados('csv')} 
            className="btn btn-secondary"
          >
            Exportar CSV
          </button>
          <button 
            onClick={() => exportarDados('json')} 
            className="btn btn-secondary"
          >
            Exportar JSON
          </button>
        </div>
      </div>
      
      {/* Exibir mensagem de carregamento */}
      {loading && (
        <div className="loading">
          <p>Carregando dados...</p>
        </div>
      )}
      
      {/* Exibir mensagem de erro */}
      {error && (
        <div className="error">
          <p>{error}</p>
          <button 
            onClick={fetchDados} 
            className="btn btn-primary mt-2"
          >
            Tentar Novamente
          </button>
        </div>
      )}
      
      {/* Exibir dados */}
      {!loading && !error && (
        <div className="dados">
          <h2>Dados Carregados: {dadosFiltrados.length}</h2>
          
          {/* Aqui você integraria os componentes do dashboard */}
          {/* Exemplo: <ResumoExecutivo dados={dadosFiltrados} /> */}
          
          {/* Paginação */}
          <div className="paginacao mt-4 flex justify-center space-x-2">
            <button 
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="btn btn-outline"
            >
              Anterior
            </button>
            <span className="py-2 px-4">
              Página {pagina} de {totalPaginas}
            </span>
            <button 
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="btn btn-outline"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComDadosReais;
