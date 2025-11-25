
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ModuleCard from './components/ModuleCard';
import QuizModal from './components/QuizModal';
import { modules } from './data';
import { UserState } from './types';
import { Trophy, Award, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>({
    currentModuleId: null,
    completedModules: [],
    score: 0,
    level: 1,
    rank: 'Estagiário'
  });

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    // Simple leveling system
    const newLevel = Math.floor(userState.score / 500) + 1;
    let newRank = 'Estagiário';
    if (newLevel >= 2) newRank = 'Analista Jr.';
    if (newLevel >= 4) newRank = 'Analista Pleno';
    if (newLevel >= 6) newRank = 'Analista Sênior';
    if (newLevel >= 8) newRank = 'Arquiteto de Sistemas';

    if (newLevel !== userState.level || newRank !== userState.rank) {
      setUserState(prev => ({ ...prev, level: newLevel, rank: newRank }));
    }
  }, [userState.score]);

  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };

  const handleQuizComplete = (score: number) => {
    if (activeModuleId) {
      const module = modules.find(m => m.id === activeModuleId);
      if (!module) return;

      // Calculate XP (Score * 10)
      const xpEarned = score * 10;
      
      if (!userState.completedModules.includes(activeModuleId)) {
        setUserState(prev => ({
          ...prev,
          completedModules: [...prev.completedModules, activeModuleId],
          score: prev.score + xpEarned
        }));
      } else {
        // Small XP bonus for replaying
        setUserState(prev => ({
          ...prev,
          score: prev.score + Math.floor(xpEarned / 5)
        }));
      }
      
      setActiveModuleId(null);
    }
  };

  const isModuleLocked = (index: number) => {
    if (index === 0) return false;
    const previousModuleId = modules[index - 1].id;
    return !userState.completedModules.includes(previousModuleId);
  };

  const activeModule = activeModuleId ? modules.find(m => m.id === activeModuleId) : null;
  const progress = Math.round((userState.completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full p-6">
        
        {/* Dashboard / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 animate-in slide-in-from-top-4 duration-700">
          
          {/* Rank Card */}
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <Award className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Cargo Atual</p>
              <h2 className="text-xl font-bold text-white">{userState.rank}</h2>
              <span className="text-xs text-purple-400 font-mono">Nível {userState.level}</span>
            </div>
          </div>

          {/* XP Card */}
          <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <Zap className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Total de XP</p>
              <h2 className="text-xl font-bold text-white">{userState.score}</h2>
              <span className="text-xs text-amber-400 font-mono">Próx. Nível: {(userState.level * 500)}</span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">Domínio do Sistema</p>
              <span className="text-xl font-bold text-green-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mb-6">
          <h2 className="text-xl text-white font-mono flex items-center gap-2 mb-6">
            <span className="w-2 h-6 bg-cyan-500 rounded-sm block"></span>
            MÓDULOS DE TREINAMENTO
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                isLocked={isModuleLocked(index)}
                isCompleted={userState.completedModules.includes(module.id)}
                score={0} // Individual module score tracking could be added here
                onClick={() => handleModuleClick(module.id)}
              />
            ))}
          </div>
        </div>

        {/* Completion Banner */}
        {progress === 100 && (
          <div className="mt-12 p-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-glow">
            <div className="bg-slate-900 rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-white mb-2">CERTIFICAÇÃO COMPLETA</h2>
              <p className="text-slate-300 max-w-lg mx-auto">
                Você dominou todos os conceitos de Análise e Modelagem de Sistemas. 
                Você está pronto para enfrentar qualquer desafio na AV1 e AV2!
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {activeModule && (
        <QuizModal
          module={activeModule}
          onClose={() => setActiveModuleId(null)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

export default App;
