// Exportar componentes principais
export { default as DashboardEstrategico } from './App';

// Exportar componentes individuais
export { default as ResumoExecutivo } from './components/ResumoExecutivo';
export { default as AnaliseTemporalChart } from './components/AnaliseTemporalChart';
export { default as RecorrenciaCompraHeatmap } from './components/RecorrenciaCompraHeatmap';
export { default as TopProdutosChart } from './components/TopProdutosChart';
export { default as MapaCalorRegioes } from './components/MapaCalorRegioes';
export { default as DistribuicaoCanalChart } from './components/DistribuicaoCanalChart';
export { default as PerfilClientesChart } from './components/PerfilClientesChart';
export { default as InsightGenerator } from './components/InsightGenerator';
export { default as Filtros } from './components/Filtros';

// Exportar tipos e funções de dados
export { VendaData, calcularTotalVendas, calcularTicketMedio, contarClientesUnicos, contarProdutosUnicos, 
         agruparPorMes, calcularTopProdutos, calcularDistribuicaoPorCanal, calcularDistribuicaoPorRegiao, 
         calcularPerfilClientes, calcularRecorrenciaCompra } from './data/mockData';

// Exportar funções de exportação
export { exportarDadosParaJSON } from './data/exportData';

// Exportar exemplo de integração com API
export { default as DashboardComDadosReais } from './examples/ApiIntegration';
