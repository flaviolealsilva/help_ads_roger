export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  ASSOCIATION = 'ASSOCIATION'
}

export interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  context?: string; 
  options: Option[];
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind class for text color
  borderColor: string; // Tailwind class for border
  summary: string[];
  questions: Question[];
}

export interface UserState {
  currentModuleId: string | null;
  completedModules: string[]; // IDs of completed modules
  score: number;
  level: number;
  rank: string;
}