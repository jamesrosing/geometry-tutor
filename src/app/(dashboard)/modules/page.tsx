'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getOrderedModules } from '@/lib/constants';
import { useUserProgressStore } from '@/store/user-progress-store';

export default function ModulesPage() {
  const { progress } = useUserProgressStore();
  const modules = getOrderedModules();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-4">Geometry Modules</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select a module to begin learning or continue where you left off.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          // Calculate module progress
          const lessonComplete = progress.completedLessons[module.id];
          const demoComplete = progress.completedDemonstrations[module.id];
          const quizComplete = progress.quizResults[module.id]?.score > 0;
          const completedSections = [lessonComplete, demoComplete, quizComplete].filter(Boolean).length;
          const moduleProgress = Math.round((completedSections / 3) * 100);

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{moduleProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${moduleProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link 
                    href={`/modules/${module.id}/lesson`}
                    className={`text-sm py-1 px-3 rounded-full ${
                      lessonComplete 
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {lessonComplete ? 'Lesson ✓' : 'Lesson'}
                  </Link>
                  <Link 
                    href={`/modules/${module.id}/demonstration`}
                    className={`text-sm py-1 px-3 rounded-full ${
                      !lessonComplete 
                        ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed' 
                        : demoComplete 
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                          : 'bg-blue-500 text-white'
                    }`}
                    onClick={e => !lessonComplete && e.preventDefault()}
                  >
                    {demoComplete ? 'Demo ✓' : 'Demo'}
                  </Link>
                  <Link 
                    href={`/modules/${module.id}/quiz`}
                    className={`text-sm py-1 px-3 rounded-full ${
                      !demoComplete 
                        ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed' 
                        : quizComplete 
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' 
                          : 'bg-blue-500 text-white'
                    }`}
                    onClick={e => !demoComplete && e.preventDefault()}
                  >
                    {quizComplete ? 'Quiz ✓' : 'Quiz'}
                  </Link>
                </div>

                <Link 
                  href={`/modules/${module.id}/${!lessonComplete ? 'lesson' : !demoComplete ? 'demonstration' : !quizComplete ? 'quiz' : 'review'}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  {!lessonComplete ? 'Start Module' : 'Continue Module'}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 