import React, { useState } from 'react';
import { Module, Question } from '../types';
import { ArrowRight, CheckCircle, XCircle, BookOpen, AlertTriangle } from 'lucide-react';

interface QuizModalProps {
  module: Module;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ module, onClose, onComplete }) => {
  const [step, setStep] = useState<'summary' | 'quiz' | 'result'>('summary');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentQuestionIndex < module.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setStep('result');
    }
  };

  const renderSummary = () => (
    <div className="animate-fadeIn">
      <div className={`h-2 w-full ${module.color} mb-6 rounded-t-lg`}></div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-blue-600" />
        Revisão Rápida: {module.title}
      </h2>
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
        <ul className="space-y-3">
          {module.summary.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700">
              <span className="min-w-[24px] h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-xs font-bold mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setStep('quiz')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          Começar Desafio <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-slate-500">
          Questão {currentQuestionIndex + 1} de {module.questions.length}
        </span>
        <span className="text-sm font-bold text-blue-600">
          Pontos: {score}
        </span>
      </div>

      <div className="mb-8">
        {currentQuestion.context && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mb-4 text-sm text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            {currentQuestion.context}
          </div>
        )}
        <h3 className="text-xl font-semibold text-slate-800 leading-relaxed">
          {currentQuestion.question}
        </h3>
      </div>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((opt) => {
          let baseStyle = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex justify-between items-center ";
          
          if (showFeedback) {
            if (opt.isCorrect) baseStyle += "bg-green-100 border-green-500 text-green-900";
            else if (selectedOption === opt.id) baseStyle += "bg-red-100 border-red-500 text-red-900";
            else baseStyle += "bg-slate-50 border-slate-200 text-slate-400";
          } else {
            if (selectedOption === opt.id) baseStyle += "bg-blue-50 border-blue-500 text-blue-900 shadow-md";
            else baseStyle += "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700";
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleOptionSelect(opt.id)}
              disabled={showFeedback}
              className={baseStyle}
            >
              <span className="font-medium">{opt.text}</span>
              {showFeedback && opt.isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
              {showFeedback && !opt.isCorrect && selectedOption === opt.id && <XCircle className="w-5 h-5 text-red-600" />}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mb-6 p-4 bg-slate-100 rounded-lg border border-slate-300 animate-fadeIn">
          <p className="text-sm text-slate-700">
            <span className="font-bold">Explicação:</span> {currentQuestion.explanation}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        {!showFeedback ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={!selectedOption}
            className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Confirmar Resposta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            {currentQuestionIndex < module.questions.length - 1 ? 'Próxima' : 'Ver Resultado'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  const renderResult = () => {
    const percentage = (score / module.questions.length) * 100;
    const passed = percentage >= 50;

    return (
      <div className="text-center animate-fadeIn py-8">
        <div className="mb-6 flex justify-center">
          {passed ? (
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          ) : (
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-2">
          {passed ? 'Missão Cumprida!' : 'Precisa Revisar'}
        </h2>
        <p className="text-slate-600 mb-8">
          Você acertou {score} de {module.questions.length} questões.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={() => onComplete(score)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {passed ? 'Avançar' : 'Tentar Novamente'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 overflow-y-auto">
          {step === 'summary' && renderSummary()}
          {step === 'quiz' && renderQuiz()}
          {step === 'result' && renderResult()}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;