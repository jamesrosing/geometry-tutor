// src/lib/types.ts
export type ModuleId = 
  | 'basic-shapes'
  | 'angles'
  | 'parallel-perpendicular-lines'
  | 'congruence-similarity'
  | 'pythagorean-theorem'
  | 'area-perimeter'
  | 'volume-surface-area'
  | 'transformations';

export interface Module {
  id: ModuleId;
  title: string;
  description: string;
  order: number;
  sections: {
    lesson: {
      title: string;
      description: string;
      content: string;
      videoUrl?: string;
      images?: string[];
    };
    demonstration: {
      title: string;
      description: string;
      type: 'interactive' | 'animation' | 'static';
      interactiveProps?: Record<string, any>;
    };
    quiz: {
      title: string;
      description: string;
      questions: Question[];
    };
    review: {
      title: string;
      description: string;
      questions: Question[];
      reviewInterval: number; // in days
    };
  };
}

export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'interactive' | 'true-false';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  completedLessons: Record<ModuleId, boolean>;
  completedDemonstrations: Record<ModuleId, boolean>;
  quizResults: Record<ModuleId, {
    score: number;
    totalQuestions: number;
    completedAt: string;
  }>;
  reviewSchedule: Record<ModuleId, {
    nextReviewDate: string;
    reviewCount: number;
  }>;
  overallProgress: number; // 0-100
}