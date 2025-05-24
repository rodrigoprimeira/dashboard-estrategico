import React, { useState } from 'react';
import { gerarInsights } from '../data/mockData';

const InsightGenerator: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleGerarInsight = () => {
    setLoading(true);
    
    // Simular tempo de processamento
    setTimeout(() => {
      const novoInsight = gerarInsights();
      setInsight(novoInsight);
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Insights Automáticos</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            Descubra padrões e tendências nos seus dados com um clique.
          </p>
          
          {insight && (
            <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700 mt-2">
              <p className="text-primary dark:text-primary-light font-medium">
                <span className="text-secondary dark:text-secondary-light mr-2">💡</span>
                {insight}
              </p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleGerarInsight}
          disabled={loading}
          className={`btn ${loading ? 'bg-gray-400 dark:bg-gray-600' : 'btn-primary'} min-w-[150px] flex items-center justify-center`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </>
          ) : (
            'Gerar Insight'
          )}
        </button>
      </div>
    </div>
  );
};

export default InsightGenerator;
