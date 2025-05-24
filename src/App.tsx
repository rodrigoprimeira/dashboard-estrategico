import { useState, useEffect } from 'react';
import { dadosMock, VendaData } from './data/mockData';
import { exportarDadosParaJSON } from './data/exportData';
import Footer from './components/Footer';
import ResumoExecutivo from './components/ResumoExecutivo';
import AnaliseTemporalChart from './components/AnaliseTemporalChart';
import RecorrenciaCompraHeatmap from './components/RecorrenciaCompraHeatmap';
import TopProdutosChart from './components/TopProdutosChart';
import MapaCalorRegioes from './components/MapaCalorRegioes';
import DistribuicaoCanalChart from './components/DistribuicaoCanalChart';
import PerfilClientesChart from './components/PerfilClientesChart';
import InsightGenerator from './components/InsightGenerator';
import Filtros from './components/Filtros';

function App() {
  const [dados] = useState<VendaData[]>(dadosMock);
  const [dadosFiltrados, setDadosFiltrados] = useState<VendaData[]>(dadosMock);
  const [darkMode, setDarkMode] = useState(false);
  
  // Opções para filtros
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string>('todos');
  const [canalSelecionado, setCanalSelecionado] = useState<string>('todos');
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string>('todas');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('todas');
  
  // Extrair opções únicas dos dados
  const canais = ['todos', ...Array.from(new Set(dados.map(item => item.CANAL)))];
  const regioes = ['todas', ...Array.from(new Set(dados.map(item => item.REGIAO)))];
  const categorias = ['todas', ...Array.from(new Set(dados.map(item => item.CATEGORIA)))];
  
  // Aplicar filtros aos dados
  useEffect(() => {
    let dadosFiltrados = [...dados];
    
    // Filtro de período
    if (periodoSelecionado !== 'todos') {
      const [mes, ano] = periodoSelecionado.split('/');
      dadosFiltrados = dadosFiltrados.filter(item => {
        const [itemAno, itemMes] = item.DATA_VENDA.split('-');
        return itemAno === ano && itemMes === mes;
      });
    }
    
    // Filtro de canal
    if (canalSelecionado !== 'todos') {
      dadosFiltrados = dadosFiltrados.filter(item => item.CANAL === canalSelecionado);
    }
    
    // Filtro de região
    if (regiaoSelecionada !== 'todas') {
      dadosFiltrados = dadosFiltrados.filter(item => item.REGIAO === regiaoSelecionada);
    }
    
    // Filtro de categoria
    if (categoriaSelecionada !== 'todas') {
      dadosFiltrados = dadosFiltrados.filter(item => item.CATEGORIA === categoriaSelecionada);
    }
    
    setDadosFiltrados(dadosFiltrados);
  }, [dados, periodoSelecionado, canalSelecionado, regiaoSelecionada, categoriaSelecionada]);
  
  // Extrair períodos únicos (mês/ano) dos dados
  const periodos = (() => {
    const periodosUnicos = new Set<string>();
    dados.forEach(item => {
      const [ano, mes] = item.DATA_VENDA.split('-');
      periodosUnicos.add(`${mes}/${ano}`);
    });
    
    return ['todos', ...Array.from(periodosUnicos).sort((a, b) => {
      const [mesA, anoA] = a.split('/');
      const [mesB, anoB] = b.split('/');
      
      if (anoA !== anoB) {
        return parseInt(anoA) - parseInt(anoB);
      }
      
      return parseInt(mesA) - parseInt(mesB);
    })];
  })();
  
  // Alternar entre modo claro e escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Aplicar modo escuro com base na preferência do sistema
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Exportar dados filtrados para CSV
  const exportarDadosCSV = () => {
    // Cabeçalho do CSV
    const cabecalho = Object.keys(dadosFiltrados[0]).join(';');
    
    // Linhas do CSV
    const linhas = dadosFiltrados.map(item => {
      return Object.values(item).join(';');
    });
    
    // Conteúdo completo do CSV
    const conteudoCSV = [cabecalho, ...linhas].join('\n');
    
    // Criar blob e link para download
    const blob = new Blob([conteudoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dashboard_dados_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-light">Dashboard Estratégico</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="flex space-x-2">
              <button
                onClick={exportarDadosCSV}
                className="btn btn-primary"
              >
                Exportar CSV
              </button>
              <button
                onClick={exportarDadosParaJSON}
                className="btn btn-secondary"
              >
                Exportar JSON
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        {/* Filtros */}
        <Filtros
          periodos={periodos}
          canais={canais}
          regioes={regioes}
          categorias={categorias}
          periodoSelecionado={periodoSelecionado}
          canalSelecionado={canalSelecionado}
          regiaoSelecionada={regiaoSelecionada}
          categoriaSelecionada={categoriaSelecionada}
          setPeriodoSelecionado={setPeriodoSelecionado}
          setCanalSelecionado={setCanalSelecionado}
          setRegiaoSelecionada={setRegiaoSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
        
        {/* Resumo Executivo */}
        <ResumoExecutivo dados={dadosFiltrados} />
        
        {/* Gerador de Insights */}
        <InsightGenerator />
        
        {/* Grid de gráficos */}
        <div className="dashboard-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {/* Análise Temporal */}
          <div className="card col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Análise Temporal</h2>
            <AnaliseTemporalChart dados={dadosFiltrados} />
          </div>
          
          {/* Top Produtos */}
          <div className="card col-span-1 md:col-span-1 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Top Produtos Vendidos</h2>
            <TopProdutosChart dados={dadosFiltrados} />
          </div>
          
          {/* Distribuição por Canal */}
          <div className="card col-span-1 md:col-span-1 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Distribuição por Canal</h2>
            <DistribuicaoCanalChart dados={dadosFiltrados} />
          </div>
          
          {/* Perfil de Clientes */}
          <div className="card col-span-1 md:col-span-1 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Perfil de Clientes</h2>
            <PerfilClientesChart dados={dadosFiltrados} />
          </div>
          
          {/* Mapa de Calor de Regiões */}
          <div className="card col-span-1 md:col-span-1 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Mapa de Calor de Regiões</h2>
            <MapaCalorRegioes dados={dadosFiltrados} />
          </div>
          
          {/* Recorrência de Compra */}
          <div className="card col-span-1 md:col-span-2 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recorrência de Compra</h2>
            <RecorrenciaCompraHeatmap dados={dadosFiltrados} />
          </div>
        </div>
      </main>
      
      <Footer version="1.0.1" />
    </div>
  );
}

export default App;
