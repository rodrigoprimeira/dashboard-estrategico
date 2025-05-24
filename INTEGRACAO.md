# Guia de Integração com Dados Reais

Este documento descreve como adaptar o Dashboard Estratégico para trabalhar com dados reais em vez dos dados fictícios incluídos na demonstração.

## Estrutura de Dados

O dashboard espera dados com a seguinte estrutura:

```typescript
interface VendaData {
  CLIENTE_ID: string;
  PRODUTO: string;
  CATEGORIA: string;
  DATA_VENDA: string; // Formato: 'YYYY-MM-DD'
  VALOR: number;
  QUANTIDADE: number;
  REGIAO: string;
  CANAL: 'PDV' | 'ECOMMERCE' | 'DELIVERY';
  CPF: string;
  SEXO: 'M' | 'F';
  FAIXA_ETARIA: '18-25' | '26-35' | '36-45' | '46-60' | '60+';
}
```

## Passos para Integração

### 1. Substituir a Fonte de Dados

Localize o arquivo `src/data/mockData.ts` e substitua a função `gerarDadosFicticios()` por uma chamada à sua API ou fonte de dados real.

Exemplo com uma API REST:

```typescript
// Antes:
export const dadosMock = gerarDadosFicticios();

// Depois:
export const fetchDados = async (): Promise<VendaData[]> => {
  try {
    const response = await fetch('https://sua-api.com/dados-vendas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
};
```

### 2. Adaptar o Componente App

Modifique o componente `App.tsx` para carregar os dados da API:

```typescript
function App() {
  const [dados, setDados] = useState<VendaData[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<VendaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Carregar dados da API
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        const dadosAPI = await fetchDados();
        setDados(dadosAPI);
        setDadosFiltrados(dadosAPI);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarDados();
  }, []);
  
  // Resto do componente...
}
```

### 3. Adaptar as Funções de Processamento

Revise as funções de processamento em `src/data/mockData.ts` para garantir que elas funcionem corretamente com seus dados reais. Você pode precisar ajustar:

- Formatação de datas
- Cálculos específicos
- Agrupamentos e filtros

### 4. Implementar Autenticação (se necessário)

Se sua API requer autenticação, adicione a lógica necessária:

```typescript
const fetchDados = async (): Promise<VendaData[]> => {
  const token = localStorage.getItem('auth_token');
  
  try {
    const response = await fetch('https://sua-api.com/dados-vendas', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Falha na autenticação ou acesso negado');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
};
```

### 5. Adicionar Tratamento de Erros

Implemente um tratamento de erros robusto para lidar com falhas na API:

```typescript
// No componente App
const [error, setError] = useState<string | null>(null);

// Na função de carregamento
const carregarDados = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const dadosAPI = await fetchDados();
    setDados(dadosAPI);
    setDadosFiltrados(dadosAPI);
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
  } finally {
    setLoading(false);
  }
};
```

## Considerações Adicionais

### Paginação

Se você estiver trabalhando com grandes volumes de dados, considere implementar paginação:

```typescript
const [pagina, setPagina] = useState(1);
const [totalPaginas, setTotalPaginas] = useState(1);
const itensPorPagina = 100;

const fetchDadosPaginados = async (pagina: number): Promise<{dados: VendaData[], total: number}> => {
  try {
    const response = await fetch(`https://sua-api.com/dados-vendas?page=${pagina}&limit=${itensPorPagina}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return { dados: [], total: 0 };
  }
};
```

### Cache de Dados

Para melhorar a performance, considere implementar um cache local:

```typescript
const carregarDados = async () => {
  setLoading(true);
  
  // Verificar se há dados em cache
  const dadosCache = localStorage.getItem('dashboard_dados');
  const timestampCache = localStorage.getItem('dashboard_timestamp');
  
  // Se o cache for válido (menos de 1 hora)
  if (dadosCache && timestampCache) {
    const agora = new Date().getTime();
    const timestamp = parseInt(timestampCache);
    
    if (agora - timestamp < 3600000) { // 1 hora em milissegundos
      setDados(JSON.parse(dadosCache));
      setDadosFiltrados(JSON.parse(dadosCache));
      setLoading(false);
      return;
    }
  }
  
  // Se não houver cache válido, buscar da API
  try {
    const dadosAPI = await fetchDados();
    setDados(dadosAPI);
    setDadosFiltrados(dadosAPI);
    
    // Salvar no cache
    localStorage.setItem('dashboard_dados', JSON.stringify(dadosAPI));
    localStorage.setItem('dashboard_timestamp', new Date().getTime().toString());
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  } finally {
    setLoading(false);
  }
};
```

## Exemplo de Implementação Completa

Para um exemplo completo de integração com uma API REST, consulte o arquivo `src/examples/ApiIntegration.tsx` incluído neste projeto.
