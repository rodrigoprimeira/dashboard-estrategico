import React from 'react';

interface FiltrosProps {
  periodos: string[];
  canais: string[];
  regioes: string[];
  categorias: string[];
  periodoSelecionado: string;
  canalSelecionado: string;
  regiaoSelecionada: string;
  categoriaSelecionada: string;
  setPeriodoSelecionado: (periodo: string) => void;
  setCanalSelecionado: (canal: string) => void;
  setRegiaoSelecionada: (regiao: string) => void;
  setCategoriaSelecionada: (categoria: string) => void;
}

const Filtros: React.FC<FiltrosProps> = ({
  periodos,
  canais,
  regioes,
  categorias,
  periodoSelecionado,
  canalSelecionado,
  regiaoSelecionada,
  categoriaSelecionada,
  setPeriodoSelecionado,
  setCanalSelecionado,
  setRegiaoSelecionada,
  setCategoriaSelecionada
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro de Período */}
        <div>
          <label htmlFor="periodo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Período
          </label>
          <select
            id="periodo"
            className="select w-full"
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
          >
            {periodos.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo === 'todos' ? 'Todos os períodos' : periodo}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro de Canal */}
        <div>
          <label htmlFor="canal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Canal
          </label>
          <select
            id="canal"
            className="select w-full"
            value={canalSelecionado}
            onChange={(e) => setCanalSelecionado(e.target.value)}
          >
            {canais.map((canal) => (
              <option key={canal} value={canal}>
                {canal === 'todos' ? 'Todos os canais' : canal}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro de Região */}
        <div>
          <label htmlFor="regiao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Região
          </label>
          <select
            id="regiao"
            className="select w-full"
            value={regiaoSelecionada}
            onChange={(e) => setRegiaoSelecionada(e.target.value)}
          >
            {regioes.map((regiao) => (
              <option key={regiao} value={regiao}>
                {regiao === 'todas' ? 'Todas as regiões' : regiao}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro de Categoria */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoria
          </label>
          <select
            id="categoria"
            className="select w-full"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria === 'todas' ? 'Todas as categorias' : categoria}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filtros;
