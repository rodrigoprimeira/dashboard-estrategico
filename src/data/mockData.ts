// Dados fictícios para o dashboard estratégico
export interface VendaData {
  CLIENTE_ID: string;
  PRODUTO: string;
  CATEGORIA: string;
  DATA_VENDA: string;
  VALOR: number;
  QUANTIDADE: number;
  REGIAO: string;
  CANAL: 'PDV' | 'ECOMMERCE' | 'DELIVERY';
  CPF: string;
  SEXO: 'M' | 'F';
  FAIXA_ETARIA: '18-25' | '26-35' | '36-45' | '46-60' | '60+';
}

// Função para gerar dados fictícios
const gerarDadosFicticios = (): VendaData[] => {
  const regioes = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
  const canais = ['PDV', 'ECOMMERCE', 'DELIVERY'] as const;
  const categorias = ['Eletrônicos', 'Vestuário', 'Alimentos', 'Móveis', 'Cosméticos', 'Esportes'];
  const produtos = {
    'Eletrônicos': ['Smartphone', 'Notebook', 'TV LED', 'Tablet', 'Fone Bluetooth'],
    'Vestuário': ['Camisa', 'Calça Jeans', 'Vestido', 'Tênis', 'Jaqueta'],
    'Alimentos': ['Arroz', 'Feijão', 'Macarrão', 'Óleo', 'Café'],
    'Móveis': ['Sofá', 'Mesa', 'Cadeira', 'Armário', 'Cama'],
    'Cosméticos': ['Perfume', 'Shampoo', 'Batom', 'Base', 'Hidratante'],
    'Esportes': ['Bola', 'Raquete', 'Tênis Esportivo', 'Bicicleta', 'Luvas']
  };
  const faixasEtarias = ['18-25', '26-35', '36-45', '46-60', '60+'] as const;
  const sexos = ['M', 'F'] as const;
  
  // Gerar 1000 clientes
  const clientes = Array.from({ length: 1000 }, (_, i) => {
    const id = `CLI${String(i + 1).padStart(6, '0')}`;
    const sexo = sexos[Math.floor(Math.random() * sexos.length)];
    const faixaEtaria = faixasEtarias[Math.floor(Math.random() * faixasEtarias.length)];
    const cpf = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');
    
    return { id, sexo, faixaEtaria, cpf };
  });
  
  // Gerar 5000 vendas
  const vendas: VendaData[] = [];
  const dataInicial = new Date('2024-01-01');
  const dataFinal = new Date('2024-05-24');
  
  for (let i = 0; i < 5000; i++) {
    const cliente = clientes[Math.floor(Math.random() * clientes.length)];
    const regiao = regioes[Math.floor(Math.random() * regioes.length)];
    const canal = canais[Math.floor(Math.random() * canais.length)];
    const categoria = categorias[Math.floor(Math.random() * categorias.length)];
    const produto = produtos[categoria][Math.floor(Math.random() * produtos[categoria].length)];
    const quantidade = Math.floor(Math.random() * 5) + 1;
    const valorUnitario = (Math.random() * 500) + 10;
    const valor = valorUnitario * quantidade;
    
    // Gerar data aleatória entre dataInicial e dataFinal
    const dataVenda = new Date(dataInicial.getTime() + Math.random() * (dataFinal.getTime() - dataInicial.getTime()));
    
    vendas.push({
      CLIENTE_ID: cliente.id,
      PRODUTO: produto,
      CATEGORIA: categoria,
      DATA_VENDA: dataVenda.toISOString().split('T')[0],
      VALOR: parseFloat(valor.toFixed(2)),
      QUANTIDADE: quantidade,
      REGIAO: regiao,
      CANAL: canal,
      CPF: cliente.cpf,
      SEXO: cliente.sexo,
      FAIXA_ETARIA: cliente.faixaEtaria
    });
  }
  
  return vendas;
};

// Gerar os dados fictícios uma única vez
export const dadosMock = gerarDadosFicticios();

// Função para gerar insights fictícios
export const gerarInsights = () => {
  const insights = [
    "Clientes da faixa 26-35 estão com maior ticket médio em delivery",
    "Produto X tem alta taxa de recompra após 15 dias",
    "Vendas na região Sul aumentaram 15% no último mês",
    "Categoria Eletrônicos representa 40% do faturamento total",
    "Canal ECOMMERCE cresceu 22% em comparação ao mesmo período do ano anterior",
    "Clientes do sexo feminino compram 30% mais em Cosméticos que masculinos",
    "Região Nordeste tem o maior potencial de crescimento para a categoria Vestuário",
    "60% dos clientes da faixa 18-25 preferem o canal ECOMMERCE",
    "Produtos da categoria Alimentos têm maior recorrência de compra",
    "Ticket médio no PDV é 25% maior que nos outros canais"
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};

// Funções auxiliares para análise de dados
export const calcularTotalVendas = (dados: VendaData[]): number => {
  return dados.reduce((total, venda) => total + venda.VALOR, 0);
};

export const calcularTicketMedio = (dados: VendaData[]): number => {
  const totalVendas = calcularTotalVendas(dados);
  return totalVendas / dados.length;
};

export const contarClientesUnicos = (dados: VendaData[]): number => {
  const clientesUnicos = new Set(dados.map(venda => venda.CLIENTE_ID));
  return clientesUnicos.size;
};

export const contarProdutosUnicos = (dados: VendaData[]): number => {
  const produtosUnicos = new Set(dados.map(venda => venda.PRODUTO));
  return produtosUnicos.size;
};

export const agruparPorMes = (dados: VendaData[]): { mes: string; valor: number }[] => {
  const vendasPorMes: Record<string, number> = {};
  
  dados.forEach(venda => {
    const [ano, mes] = venda.DATA_VENDA.split('-');
    const chave = `${ano}-${mes}`;
    
    if (!vendasPorMes[chave]) {
      vendasPorMes[chave] = 0;
    }
    
    vendasPorMes[chave] += venda.VALOR;
  });
  
  return Object.entries(vendasPorMes)
    .map(([chave, valor]) => {
      const [ano, mes] = chave.split('-');
      return {
        mes: `${mes}/${ano}`,
        valor: parseFloat(valor.toFixed(2))
      };
    })
    .sort((a, b) => {
      const [mesA, anoA] = a.mes.split('/');
      const [mesB, anoB] = b.mes.split('/');
      
      if (anoA !== anoB) {
        return parseInt(anoA) - parseInt(anoB);
      }
      
      return parseInt(mesA) - parseInt(mesB);
    });
};

export const calcularTopProdutos = (dados: VendaData[], limite: number = 10): { produto: string; valor: number }[] => {
  const vendasPorProduto: Record<string, number> = {};
  
  dados.forEach(venda => {
    if (!vendasPorProduto[venda.PRODUTO]) {
      vendasPorProduto[venda.PRODUTO] = 0;
    }
    
    vendasPorProduto[venda.PRODUTO] += venda.VALOR;
  });
  
  return Object.entries(vendasPorProduto)
    .map(([produto, valor]) => ({ produto, valor: parseFloat(valor.toFixed(2)) }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, limite);
};

export const calcularDistribuicaoPorCanal = (dados: VendaData[]): { canal: string; valor: number }[] => {
  const vendasPorCanal: Record<string, number> = {};
  
  dados.forEach(venda => {
    if (!vendasPorCanal[venda.CANAL]) {
      vendasPorCanal[venda.CANAL] = 0;
    }
    
    vendasPorCanal[venda.CANAL] += venda.VALOR;
  });
  
  return Object.entries(vendasPorCanal)
    .map(([canal, valor]) => ({ canal, valor: parseFloat(valor.toFixed(2)) }));
};

export const calcularDistribuicaoPorRegiao = (dados: VendaData[]): { regiao: string; valor: number }[] => {
  const vendasPorRegiao: Record<string, number> = {};
  
  dados.forEach(venda => {
    if (!vendasPorRegiao[venda.REGIAO]) {
      vendasPorRegiao[venda.REGIAO] = 0;
    }
    
    vendasPorRegiao[venda.REGIAO] += venda.VALOR;
  });
  
  return Object.entries(vendasPorRegiao)
    .map(([regiao, valor]) => ({ regiao, valor: parseFloat(valor.toFixed(2)) }));
};

export const calcularPerfilClientes = (dados: VendaData[]): {
  porFaixaEtaria: { faixa: string; quantidade: number }[];
  porSexo: { sexo: string; quantidade: number }[];
} => {
  const clientesPorFaixaEtaria: Record<string, Set<string>> = {};
  const clientesPorSexo: Record<string, Set<string>> = {};
  
  dados.forEach(venda => {
    // Por faixa etária
    if (!clientesPorFaixaEtaria[venda.FAIXA_ETARIA]) {
      clientesPorFaixaEtaria[venda.FAIXA_ETARIA] = new Set();
    }
    clientesPorFaixaEtaria[venda.FAIXA_ETARIA].add(venda.CLIENTE_ID);
    
    // Por sexo
    if (!clientesPorSexo[venda.SEXO]) {
      clientesPorSexo[venda.SEXO] = new Set();
    }
    clientesPorSexo[venda.SEXO].add(venda.CLIENTE_ID);
  });
  
  return {
    porFaixaEtaria: Object.entries(clientesPorFaixaEtaria)
      .map(([faixa, clientes]) => ({ faixa, quantidade: clientes.size }))
      .sort((a, b) => {
        const faixaA = parseInt(a.faixa.split('-')[0]);
        const faixaB = parseInt(b.faixa.split('-')[0]);
        return faixaA - faixaB;
      }),
    porSexo: Object.entries(clientesPorSexo)
      .map(([sexo, clientes]) => ({ sexo, quantidade: clientes.size }))
  };
};

export const calcularRecorrenciaCompra = (dados: VendaData[]): { cliente: string; mes: string; compras: number }[] => {
  const comprasPorClienteMes: Record<string, Record<string, number>> = {};
  
  dados.forEach(venda => {
    const [ano, mes] = venda.DATA_VENDA.split('-');
    const chave = `${ano}-${mes}`;
    
    if (!comprasPorClienteMes[venda.CLIENTE_ID]) {
      comprasPorClienteMes[venda.CLIENTE_ID] = {};
    }
    
    if (!comprasPorClienteMes[venda.CLIENTE_ID][chave]) {
      comprasPorClienteMes[venda.CLIENTE_ID][chave] = 0;
    }
    
    comprasPorClienteMes[venda.CLIENTE_ID][chave] += 1;
  });
  
  // Pegar apenas os top 20 clientes com mais compras para o heatmap
  const clientesComMaisCompras = Object.entries(comprasPorClienteMes)
    .map(([cliente, comprasPorMes]) => ({
      cliente,
      totalCompras: Object.values(comprasPorMes).reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.totalCompras - a.totalCompras)
    .slice(0, 20)
    .map(item => item.cliente);
  
  const resultado: { cliente: string; mes: string; compras: number }[] = [];
  
  // Obter todos os meses únicos
  const mesesUnicos = new Set<string>();
  Object.values(comprasPorClienteMes).forEach(comprasPorMes => {
    Object.keys(comprasPorMes).forEach(mes => mesesUnicos.add(mes));
  });
  
  const mesesOrdenados = Array.from(mesesUnicos).sort();
  
  // Criar o dataset para o heatmap
  clientesComMaisCompras.forEach(cliente => {
    mesesOrdenados.forEach(mesChave => {
      const [ano, mes] = mesChave.split('-');
      const mesFormatado = `${mes}/${ano}`;
      const compras = comprasPorClienteMes[cliente][mesChave] || 0;
      
      resultado.push({
        cliente: cliente.substring(0, 8), // Abreviando o ID do cliente
        mes: mesFormatado,
        compras
      });
    });
  });
  
  return resultado;
};

// Exportar todas as funções e dados
export default {
  dadosMock,
  gerarInsights,
  calcularTotalVendas,
  calcularTicketMedio,
  contarClientesUnicos,
  contarProdutosUnicos,
  agruparPorMes,
  calcularTopProdutos,
  calcularDistribuicaoPorCanal,
  calcularDistribuicaoPorRegiao,
  calcularPerfilClientes,
  calcularRecorrenciaCompra
};
