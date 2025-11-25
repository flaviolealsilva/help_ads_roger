export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  DRAG_DROP = 'DRAG_DROP', // Simplified to categorization for this implementation
  TRUE_FALSE = 'TRUE_FALSE'
}

export interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
  category?: string; // For drag and drop categorization
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  context?: string; // Context from the case study (e.g., Car Parts Factory)
  options: Option[];
  explanation: string; // Feedback based on the slide content
  imagePlaceholder?: string; // Concept for where a diagram would go
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  summary: string[]; // Bullet points for quick revision before the quiz
  questions: Question[];
}

export interface UserState {
  currentModuleId: string | null;
  completedModules: string[];
  score: number;
}