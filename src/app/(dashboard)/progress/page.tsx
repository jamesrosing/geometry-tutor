// src/app/(dashboard)/progress/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MODULES } from '@/lib/constants';
import { useUserProgressStore } from '@/store/user-progress-store';
import { ModuleId } from '@/lib/types';

// Define the function locally if the import is failing
const getOrderedModules = () => {
  return [...MODULES].sort((a, b) => a.order - b.order);
};

export default function ProgressPage() {
  const { progress, calculateOverallProgress } = useUserProgressStore();
  const modules = getOrderedModules();
  const [strengths, setStrengths] = useState<ModuleId[]>([]);
  const [weaknesses, setWeaknesses] = useState<ModuleId[]>([]);
  
  useEffect(() => {
    // Update overall progress
    calculateOverallProgress();
    
    // Determine strengths and weaknesses
    const moduleScores = modules.map(module => {
      const quizResult = progress.quizResults[module.id];
      return {
        id: module.id as ModuleId,
        score: quizResult ? (quizResult.score / quizResult.totalQuestions) * 100 : 0,
      };
    });
    
    // Sort by score
    const sortedScores = [...moduleScores].sort((a, b) => b.score - a.score);
    
    // Top 3 strengths (modules with highest scores)
    setStrengths(sortedScores.filter(m => m.score > 0).slice(0, 3).map(m => m.id));
    
    // Top 3 weaknesses (modules with lowest scores that have been attempted)
    const attempted = sortedScores.filter(m => m.score > 0);
    setWeaknesses(attempted.slice(-3).map(m => m.id).reverse());
    
  }, [calculateOverallProgress, modules, progress.quizResults]);

  // Create data for radar chart
  const getModuleProgress = (moduleId: ModuleId) => {
    const lessonComplete = progress.completedLessons[moduleId] ? 1 : 0;
    const demoComplete = progress.completedDemonstrations[moduleId] ? 1 : 0;
    const quizComplete = progress.quizResults[moduleId]?.score > 0 ? 1 : 0;
    const reviewCount = progress.reviewSchedule[moduleId]?.reviewCount || 0;
    
    const completedSections = lessonComplete + demoComplete + quizComplete;
    return Math.round((completedSections / 3) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress: {progress.overallProgress}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full" 
                  style={{ width: `${progress.overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Your Strengths</h2>
          {strengths.length > 0 ? (
            <ul className="space-y-4">
              {strengths.map((moduleId) => {
                const module = modules.find(m => m.id === moduleId);
                if (!module) return null;
                
                const quizResult = progress.quizResults[moduleId];
                const score = quizResult 
                  ? `${quizResult.score}/${quizResult.totalQuestions} (${Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%)`
                  : 'Not attempted';
                
                return (
                  <li key={moduleId} className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-gray-600">Quiz score: {score}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Complete some quizzes to see your strengths!</p>
          )}
        </motion.div>
        
        {/* Areas for Improvement */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
          {weaknesses.length > 0 ? (
            <ul className="space-y-4">
              {weaknesses.map((moduleId) => {
                const module = modules.find(m => m.id === moduleId);
                if (!module) return null;
                
                const quizResult = progress.quizResults[moduleId];
                const score = quizResult 
                  ? `${quizResult.score}/${quizResult.totalQuestions} (${Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%)`
                  : 'Not attempted';
                
                return (
                  <li key={moduleId} className="flex items-start">
                    <div className="bg-yellow-100 rounded-full p-2 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-gray-600">Quiz score: {score}</p>
                      <Link 
                        href={`/modules/${moduleId}/lesson`}
                        className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                      >
                        Review this module
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Complete some quizzes to see areas for improvement!</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}