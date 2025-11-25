import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-6 bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BrainCircuit className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">AnalistaPro</h1>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Simulador de Modelagem de Sistemas</p>
          </div>
        </div>
        <div className="hidden md:block text-sm text-slate-300">
          Baseado no Conteúdo Programático UNG
        </div>
      </div>
    </header>
  );
};

export default Header;