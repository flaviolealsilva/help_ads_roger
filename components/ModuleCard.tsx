
import React from 'react';
import { Module } from '../types';
import * as Icons from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
  score: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isLocked, isCompleted, onClick, score }) => {
  const IconComponent = (Icons as any)[module.icon] || Icons.Box;

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        group relative w-full text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden
        ${isLocked 
          ? 'bg-slate-900/40 border border-slate-800 opacity-50 cursor-not-allowed' 
          : 'glass-panel hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] cursor-pointer hover:-translate-y-1'}
      `}
    >
      {/* Background Gradient Hover Effect */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-slate-950/50 border border-white/10 ${!isLocked && module.color}`}>
              <IconComponent size={28} className={isLocked ? 'text-slate-600' : ''} />
            </div>
            {isCompleted && (
              <div className="flex flex-col items-end">
                <Icons.CheckCircle2 className="text-green-400 w-6 h-6 mb-1" />
                <span className="text-[10px] text-green-400 font-mono">CONCLUÍDO</span>
              </div>
            )}
            {isLocked && <Icons.Lock className="text-slate-600 w-5 h-5" />}
          </div>
          
          <div className="mb-2">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{module.subtitle}</span>
            <h3 className={`text-xl font-bold mt-1 ${isLocked ? 'text-slate-600' : 'text-slate-100 group-hover:text-cyan-300 transition-colors'}`}>
              {module.title}
            </h3>
          </div>
          
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            {module.description}
          </p>
        </div>

        <div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-3">
            <div 
              className={`h-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-cyan-500'}`}
              style={{ width: isCompleted ? '100%' : '0%' }}
            />
          </div>
          
          <div className="flex justify-between items-center text-xs font-mono">
            <span className={isLocked ? 'text-slate-600' : 'text-cyan-400'}>
              {isLocked ? 'ACESSO NEGADO' : isCompleted ? 'PONTUAÇÃO MÁX.' : 'PRONTO PARA INICIAR'}
            </span>
            {!isLocked && (
              <span className="text-slate-500 group-hover:text-white transition-colors flex items-center gap-1">
                INICIAR <Icons.ChevronRight size={12} />
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ModuleCard;
