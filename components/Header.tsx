
import React from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 glass-panel sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 animate-pulse-slow">
            <Terminal className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
              System<span className="text-white">Architect</span>
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] font-semibold">
              Protocolo de Treinamento v2.0
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-white/5">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-xs text-slate-300 font-mono">UNG.SISTEMAS.SECURE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
