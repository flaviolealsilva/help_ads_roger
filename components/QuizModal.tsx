
import React, { useState, useEffect } from 'react';
import { Module, Question } from '../types';
import { ArrowRight, CheckCircle, XCircle, Terminal, AlertTriangle, Cpu, X } from 'lucide-react';

interface QuizModalProps {
  module: Module;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ module, onClose, onComplete }) => {
  const [step, setStep] = useState<'briefing' | 'quiz' | 'result'>('briefing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const currentQuestion: Question = module.questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleConfirmAnswer = () => {
    const correct = currentQuestion.options.find(o => o.id === selectedOption)?.isCorrect;
    if (correct) setScore(s => s + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      setAnimating(false);
      if (currentQuestionIndex < module.questions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setStep('result');
      }
    }, 300);
  };

  // Briefing Screen
  const renderBriefing = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className={`p-2 rounded bg-slate-900 ${module.color}`}>
          <Terminal size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white font-mono">BRIEFING DA MISSÃO</h2>
          <p className={`text-sm font-mono ${module.color} opacity-80`}>{module.title}: {module.subtitle}</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-white/10 rounded-lg p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Cpu size={16} /> Base de Conhecimento
        </h3>
        <ul className="space-y-4">
          {module.summary.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
              <span className="min-w-[20px] h-5 flex items-center justify-center bg-slate-800 text-cyan-400 rounded text-xs font-mono border border-cyan-500/30 mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-slate-500 font-mono">
          Total de Perguntas: {module.questions.length}
        </div>
        <button
          onClick={() => setStep('quiz')}
          className="group bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          INICIAR SEQUÊNCIA <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  // Quiz Screen
  const renderQuiz = () => (
    <div className={`transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800 mb-6">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
          style={{ width: `${((currentQuestionIndex + 1) / module.questions.length) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded border border-white/5">
          QUERY_ID: #{currentQuestionIndex + 1 < 10 ? `0${currentQuestionIndex + 1}` : currentQuestionIndex + 1}
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${
          currentQuestion.difficulty === 'Easy' ? 'text-green-400 bg-green-400/10' :
          currentQuestion.difficulty === 'Medium' ? 'text-amber-400 bg-amber-400/10' :
          'text-red-400 bg-red-400/10'
        }`}>
          DIFICULDADE: {currentQuestion.difficulty === 'Easy' ? 'FÁCIL' : currentQuestion.difficulty === 'Medium' ? 'MÉDIA' : 'DIFÍCIL'}
        </span>
      </div>

      <div className="mb-8 min-h-[120px]">
        <h3 className="text-lg md:text-xl font-medium text-white leading-relaxed">
          {currentQuestion.question}
        </h3>
      </div>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((opt, idx) => {
          let stateStyle = "bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-cyan-500/50";
          let icon = <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center text-xs font-mono text-slate-600 transition-all group-hover:border-cyan-500 group-hover:text-cyan-500">{String.fromCharCode(65 + idx)}</div>;

          if (selectedOption === opt.id && !showFeedback) {
            stateStyle = "bg-cyan-900/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]";
            icon = <div className="w-6 h-6 rounded-full border-2 border-cyan-500 bg-cyan-500 flex items-center justify-center text-xs font-bold text-black">✓</div>;
          }

          if (showFeedback) {
            if (opt.isCorrect) {
              stateStyle = "bg-green-900/20 border-green-500 text-green-100";
              icon = <CheckCircle className="w-6 h-6 text-green-500" />;
            } else if (selectedOption === opt.id) {
              stateStyle = "bg-red-900/20 border-red-500 text-red-100 opacity-50";
              icon = <XCircle className="w-6 h-6 text-red-500" />;
            } else {
              stateStyle = "bg-slate-900/30 border-slate-800 text-slate-600 opacity-50";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleOptionSelect(opt.id)}
              disabled={showFeedback}
              className={`group w-full p-4 text-left rounded-xl border transition-all duration-200 flex items-center gap-4 ${stateStyle}`}
            >
              {icon}
              <span className="font-medium text-sm md:text-base">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border-l-4 border-cyan-500 animate-in slide-in-from-bottom-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-cyan-400 font-bold uppercase mb-1">Análise do Sistema:</p>
              <p className="text-sm text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end border-t border-white/5 pt-6">
        {!showFeedback ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={!selectedOption}
            className="bg-white text-black hover:bg-cyan-50 disabled:bg-slate-700 disabled:text-slate-500 px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            CONFIRMAR SELEÇÃO
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all animate-pulse-slow"
          >
            {currentQuestionIndex < module.questions.length - 1 ? 'PRÓXIMO BLOCO DE DADOS' : 'FINALIZAR'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  // Result Screen
  const renderResult = () => {
    const percentage = Math.round((score / module.questions.length) * 100);
    const passed = percentage >= 70; // Harder passing requirement

    return (
      <div className="text-center animate-in zoom-in duration-300 py-8">
        <div className="relative mb-8 inline-block">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${passed ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
            {passed ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          {passed && <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">SUBIU DE NÍVEL!</div>}
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2 font-mono">
          {passed ? 'MISSÃO CUMPRIDA' : 'FALHA NA MISSÃO'}
        </h2>
        
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2 font-mono">
          {percentage}%
        </div>
        
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          {passed 
            ? 'Performance satisfatória. O sistema foi atualizado com suas novas competências.' 
            : 'Índice de precisão insuficiente. Recomenda-se revisão dos dados antes de nova tentativa.'}
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
          <div className="bg-slate-900 p-4 rounded-lg border border-white/10">
            <div className="text-xs text-slate-500 uppercase">Corretas</div>
            <div className="text-xl font-bold text-green-400">{score}</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-white/10">
            <div className="text-xs text-slate-500 uppercase">Incorretas</div>
            <div className="text-xl font-bold text-red-400">{module.questions.length - score}</div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-slate-700 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors font-mono text-sm"
          >
            SAIR
          </button>
          <button
            onClick={() => passed ? onComplete(score) : setStep('briefing')}
            className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg font-mono text-sm flex items-center gap-2 ${
              passed ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-white text-black hover:bg-slate-200'
            }`}
          >
            {passed ? 'SALVAR PROGRESSO' : 'TENTAR NOVAMENTE'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          {step === 'briefing' && renderBriefing()}
          {step === 'quiz' && renderQuiz()}
          {step === 'result' && renderResult()}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
