import React from 'react';

interface FooterProps {
  version?: string;
}

const Footer: React.FC<FooterProps> = ({ version = '1.0.0' }) => {
  return (
    <footer className="bg-white dark:bg-gray-800 p-4 mt-8 shadow-inner">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>Dashboard Estratégico - Prova de Conceito © {new Date().getFullYear()}</p>
        <p className="text-xs mt-1">Versão {version} | Desenvolvido com React, Tailwind CSS e Recharts</p>
        <p className="text-xs mt-1">
          <a 
            href="https://github.com/rodrigoprimeira/dashboard-estrategico" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary dark:text-primary-light hover:underline"
          >
            Código-fonte disponível no GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
