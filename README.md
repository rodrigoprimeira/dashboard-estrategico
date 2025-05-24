# Dashboard Estratégico - Prova de Conceito

Este projeto é uma prova de conceito (POC) de um dashboard estratégico para análise de dados de vendas, utilizando React, Tailwind CSS e Recharts.

![Dashboard Estratégico](https://via.placeholder.com/800x400?text=Dashboard+Estratégico)

## Demonstração

Para ver uma demonstração ao vivo, clone este repositório e execute:

```bash
npm install
npm run dev
```

## Visão Geral

O dashboard apresenta uma análise completa de dados de vendas, incluindo:

- **Resumo Executivo**: Cards com métricas principais (Total de Vendas, Ticket Médio, Clientes Ativos, Produtos Vendidos)
- **Análise Temporal**: Gráfico de linha mostrando a evolução das vendas ao longo do tempo
- **Recorrência de Compra**: Heatmap mostrando a frequência de compras por cliente
- **Top Produtos Vendidos**: Gráfico de barras com os produtos mais vendidos
- **Mapa de Calor de Regiões**: Visualização das vendas por região
- **Distribuição por Canal**: Gráfico de pizza mostrando a distribuição de vendas por canal
- **Perfil de Clientes**: Análise demográfica dos clientes por faixa etária e sexo

## Funcionalidades

- **Filtros Dinâmicos**: Filtragem por período, canal, região e categoria
- **Modo Escuro/Claro**: Suporte a tema escuro e claro
- **Exportação de Dados**: Possibilidade de exportar dados filtrados em formato CSV
- **Gerador de Insights**: Simulação de insights automáticos baseados nos dados

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Recharts**: Biblioteca de gráficos para React

## Estrutura do Projeto

```text
dashboard-estrategico/
├── src/
│   ├── components/         # Componentes React
│   ├── data/               # Dados e funções de processamento
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada
├── public/                 # Arquivos estáticos
├── package.json            # Dependências e scripts
└── README.md               # Documentação
```

## Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`
4. Acesse o dashboard em: `http://localhost:5173`

## Adaptação para Dados Reais

Para conectar este dashboard a dados reais:

1. Substitua os dados fictícios em `src/data/mockData.ts` por uma API real
2. Adapte as funções de processamento para o formato dos seus dados
3. Ajuste os componentes conforme necessário para exibir os dados reais

## Notas de Implementação

- Os dados são gerados aleatoriamente para fins de demonstração
- O dashboard é totalmente responsivo e se adapta a diferentes tamanhos de tela
- A interface suporta temas claro e escuro, com detecção automática da preferência do sistema
