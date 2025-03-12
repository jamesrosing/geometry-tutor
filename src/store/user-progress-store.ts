// src/store/user-progress-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ModuleId, UserProgress } from '@/lib/types';
import { MODULES } from '@/lib/constants';

interface UserProgressState {
  progress: UserProgress;
  completeLesson: (moduleId: ModuleId) => void;
  completeDemonstration: (moduleId: ModuleId) => void;
  saveQuizResult: (moduleId: ModuleId, score: number, totalQuestions: number) => void;
  scheduleReview: (moduleId: ModuleId) => void;
  completeReview: (moduleId: ModuleId) => void;
  calculateOverallProgress: () => number;
  resetProgress: () => void;
}

// Initialize empty progress record for all modules
const initializeEmptyProgress = (): UserProgress => {
  const completedLessons: Record<ModuleId, boolean> = {} as Record<ModuleId, boolean>;
  const completedDemonstrations: Record<ModuleId, boolean> = {} as Record<ModuleId, boolean>;
  const quizResults: Record<ModuleId, { score: number; totalQuestions: number; completedAt: string }> = 
    {} as Record<ModuleId, { score: number; totalQuestions: number; completedAt: string }>;
  const reviewSchedule: Record<ModuleId, { nextReviewDate: string; reviewCount: number }> = 
    {} as Record<ModuleId, { nextReviewDate: string; reviewCount: number }>;

  MODULES.forEach(module => {
    completedLessons[module.id] = false;
    completedDemonstrations[module.id] = false;
    quizResults[module.id] = { score: 0, totalQuestions: 0, completedAt: '' };
    reviewSchedule[module.id] = { nextReviewDate: '', reviewCount: 0 };
  });

  return {
    completedLessons,
    completedDemonstrations,
    quizResults,
    reviewSchedule,
    overallProgress: 0
  };
};

export const useUserProgressStore = create<UserProgressState>()(
  persist(
    (set, get) => ({
      progress: initializeEmptyProgress(),
      
      completeLesson: (moduleId: ModuleId) => set(state => {
        const newProgress = { ...state.progress };
        newProgress.completedLessons[moduleId] = true;
        newProgress.overallProgress = get().calculateOverallProgress();
        return { progress: newProgress };
      }),
      
      completeDemonstration: (moduleId: ModuleId) => set(state => {
        const newProgress = { ...state.progress };
        newProgress.completedDemonstrations[moduleId] = true;
        newProgress.overallProgress = get().calculateOverallProgress();
        return { progress: newProgress };
      }),
      
      saveQuizResult: (moduleId: ModuleId, score: number, totalQuestions: number) => set(state => {
        const newProgress = { ...state.progress };
        newProgress.quizResults[moduleId] = {
          score,
          totalQuestions,
          completedAt: new Date().toISOString()
        };
        newProgress.overallProgress = get().calculateOverallProgress();
        return { progress: newProgress };
      }),
      
      scheduleReview: (moduleId: ModuleId) => set(state => {
        const module = MODULES.find(m => m.id === moduleId);
        if (!module) return state;
        
        const reviewInterval = module.sections.review.reviewInterval;
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + reviewInterval);
        
        const newProgress = { ...state.progress };
        newProgress.reviewSchedule[moduleId] = {
          nextReviewDate: nextReviewDate.toISOString(),
          reviewCount: (newProgress.reviewSchedule[moduleId]?.reviewCount || 0) + 1
        };
        
        return { progress: newProgress };
      }),
      
      completeReview: (moduleId: ModuleId) => set(state => {
        const newProgress = { ...state.progress };
        // Schedule the next review with increasing interval (spaced repetition)
        const currentReviewCount = newProgress.reviewSchedule[moduleId]?.reviewCount || 0;
        const nextReviewDate = new Date();
        // Fibonacci-like increasing intervals: 3 days, 5 days, 8 days, etc.
        const daysToAdd = currentReviewCount === 1 ? 5 : currentReviewCount === 2 ? 8 : 13;
        nextReviewDate.setDate(nextReviewDate.getDate() + daysToAdd);
        
        newProgress.reviewSchedule[moduleId] = {
          nextReviewDate: nextReviewDate.toISOString(),
          reviewCount: currentReviewCount + 1
        };
        
        return { progress: newProgress };
      }),
      
      calculateOverallProgress: () => {
        const state = get();
        const totalModules = MODULES.length;
        const totalComponents = totalModules * 3; // lesson, demonstration, quiz for each module
        
        // Count completed components
        let completedComponents = 0;
        
        // Count completed lessons
        completedComponents += Object.values(state.progress.completedLessons).filter(Boolean).length;
        
        // Count completed demonstrations
        completedComponents += Object.values(state.progress.completedDemonstrations).filter(Boolean).length;
        
        // Count completed quizzes (where score > 0)
        completedComponents += Object.values(state.progress.quizResults)
          .filter(result => result.score > 0).length;
        
        // Calculate percentage
        return Math.round((completedComponents / totalComponents) * 100);
      },
      
      resetProgress: () => set({ progress: initializeEmptyProgress() })
    }),
    {
      name: 'geometry-tutor-progress'
    }
  )
);