'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getOrderedModules } from '@/lib/constants';
import { useUserProgressStore } from '@/store/user-progress-store';

export default function Dashboard() {
  const { progress, calculateOverallProgress } = useUserProgressStore();
  const modules = getOrderedModules();
  
  useEffect(() => {
    // Update overall progress when the component mounts
    calculateOverallProgress();
  }, [calculateOverallProgress]);

  // Get the next recommended module (first incomplete module)
  const getNextRecommendedModule = () => {
    return modules.find(module => 
      !progress.completedLessons[module.id] || 
      !progress.completedDemonstrations[module.id] || 
      !progress.quizResults[module.id]?.score
    );
  };

  const nextModule = getNextRecommendedModule() || modules[0];
  
  // Get due reviews
  const getDueReviews = () => {
    const now = new Date();
    return Object.entries(progress.reviewSchedule)
      .filter(([_, review]) => {
        if (!review.nextReviewDate) return false;
        const reviewDate = new Date(review.nextReviewDate);
        return reviewDate <= now;
      })
      .map(([moduleId]) => moduleId);
  };
  
  const dueReviews = getDueReviews();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome to Geometry Tutor</h1>
        <div className="bg-blue-100 rounded-lg p-4 flex items-center">
          <div className="w-full">
            <p className="text-blue-800 mb-2">Overall Progress: {progress.overallProgress}% complete</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress.overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next recommended module */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500"
        >
          <h3 className="text-xl font-semibold">{nextModule.title}</h3>
          <p className="text-gray-600 mt-2">{nextModule.description}</p>
          <div className="mt-4">
            <Link 
              href={`/modules/${nextModule.id}/lesson`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              {progress.completedLessons[nextModule.id] ? 'Continue Module' : 'Start Module'}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Due reviews */}
      {dueReviews.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Reviews Due</h2>
          <div className="grid gap-4">
            {dueReviews.map(moduleId => {
              const module = modules.find(m => m.id === moduleId);
              if (!module) return null;
              
              return (
                <motion.div
                  key={moduleId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-yellow-50 shadow-sm rounded-lg p-4 border-l-4 border-yellow-400"
                >
                  <h3 className="font-medium">{module.title} Review</h3>
                  <p className="text-sm text-gray-600 mt-1">Review due to reinforce your learning</p>
                  <div className="mt-2">
                    <Link 
                      href={`/modules/${moduleId}/review`}
                      className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition-colors"
                    >
                      Start Review
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* All modules */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{moduleProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full" 
                        style={{ width: `${moduleProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex mt-4 space-x-2">
                    <Link 
                      href={`/modules/${module.id}/lesson`}
                      className={`text-xs py-1 px-2 rounded ${
                        lessonComplete 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {lessonComplete ? 'Lesson ✓' : 'Lesson'}
                    </Link>
                    <Link 
                      href={`/modules/${module.id}/demonstration`}
                      className={`text-xs py-1 px-2 rounded ${
                        !lessonComplete 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : demoComplete 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-blue-500 text-white'
                      }`}
                      onClick={e => !lessonComplete && e.preventDefault()}
                    >
                      {demoComplete ? 'Demo ✓' : 'Demo'}
                    </Link>
                    <Link 
                      href={`/modules/${module.id}/quiz`}
                      className={`text-xs py-1 px-2 rounded ${
                        !demoComplete 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : quizComplete 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-blue-500 text-white'
                      }`}
                      onClick={e => !demoComplete && e.preventDefault()}
                    >
                      {quizComplete ? 'Quiz ✓' : 'Quiz'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}