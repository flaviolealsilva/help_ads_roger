import React, { useState } from 'react';
import Header from './components/Header';
import ModuleCard from './components/ModuleCard';
import QuizModal from './components/QuizModal';
import { modules } from './data';
import { UserState } from './types';
import { Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>({
    currentModuleId: null,
    completedModules: [],
    score: 0
  });

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
  };

  const handleQuizComplete = (score: number) => {
    if (activeModuleId) {
      const module = modules.find(m => m.id === activeModuleId);
      if (!module) return;

      // If passed (50% or more), mark as completed
      const passed = (score / module.questions.length) >= 0.5;
      
      if (passed && !userState.completedModules.includes(activeModuleId)) {
        setUserState(prev => ({
          ...prev,
          completedModules: [...prev.completedModules, activeModuleId],
          score: prev.score + (score * 100)
        }));
      }
      
      setActiveModuleId(null);
    }
  };

  // Logic to unlock modules sequentially
  const isModuleLocked = (index: number) => {
    if (index === 0) return false;
    const previousModuleId = modules[index - 1].id;
    return !userState.completedModules.includes(previousModuleId);
  };

  const activeModule = activeModuleId ? modules.find(m => m.id === activeModuleId) : null;

  // Calculate total progress
  const progress = Math.round((userState.completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        
        {/* Progress Section */}
        <div className="mb-10 glass-panel p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Sua Jornada Profissional</h2>
            <div className="flex items-center gap-2 text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-full">
              <Trophy className="w-5 h-5" />
              <span>{userState.score} XP</span>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500 text-right">{progress}% Completo</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              isLocked={isModuleLocked(index)}
              isCompleted={userState.completedModules.includes(module.id)}
              onClick={() => handleModuleClick(module.id)}
            />
          ))}
        </div>

        {/* Final Message */}
        {progress === 100 && (
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white text-center animate-bounce-in">
            <h2 className="text-3xl font-bold mb-4">Parabéns, Analista Senior! 🎓</h2>
            <p className="text-lg opacity-90">
              Você completou todas as etapas da revisão de Análise e Modelagem de Sistemas.
              Você está pronto para a AV1 e AV2!
            </p>
          </div>
        )}
      </main>

      {/* Quiz Modal */}
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