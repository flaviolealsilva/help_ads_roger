import React from 'react';
import { Module } from '../types';
import * as Icons from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isLocked, isCompleted, onClick }) => {
  // Dynamically load icon
  const IconComponent = (Icons as any)[module.icon] || Icons.Box;

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative w-full text-left p-6 rounded-xl transition-all duration-300 border-2
        ${isLocked 
          ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed grayscale' 
          : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer'}
        ${isCompleted ? 'border-green-400 bg-green-50' : ''}
      `}
    >
      <div className={`absolute top-4 right-4 p-2 rounded-full ${module.color} text-white shadow-sm`}>
        <IconComponent size={24} />
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{module.title}</h3>
        <p className="text-sm text-slate-600 mb-4 min-h-[3rem]">{module.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`
            text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide
            ${isCompleted ? 'bg-green-200 text-green-800' : isLocked ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-800'}
          `}>
            {isCompleted ? 'Concluído' : isLocked ? 'Bloqueado' : 'Iniciar Missão'}
          </span>
          
          {isCompleted && <Icons.CheckCircle2 className="text-green-600 w-5 h-5" />}
          {isLocked && <Icons.Lock className="text-slate-400 w-5 h-5" />}
        </div>
      </div>
    </button>
  );
};

export default ModuleCard;