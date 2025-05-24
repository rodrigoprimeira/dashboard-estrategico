import { dadosMock } from './mockData';

/**
 * Esta função exporta os dados fictícios para um arquivo JSON
 * Pode ser usada para gerar um arquivo de dados para consumo por outras aplicações
 * ou para testes de integração.
 */
export const exportarDadosParaJSON = () => {
  const dados = dadosMock;
  const conteudoJSON = JSON.stringify(dados, null, 2);
  
  // Em um ambiente Node.js, você poderia usar:
  // fs.writeFileSync(path.join(__dirname, 'dados_vendas.json'), conteudoJSON);
  
  // No navegador, podemos usar o Blob para download
  const blob = new Blob([conteudoJSON], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `dados_vendas_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Esta função pode ser chamada para exportar os dados para JSON
 * Exemplo de uso:
 * import { exportarDadosParaJSON } from './data/exportData';
 * 
 * // Em algum evento ou botão
 * exportarDadosParaJSON();
 */
