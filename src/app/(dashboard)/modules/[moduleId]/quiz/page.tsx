// src/app/(dashboard)/modules/[moduleId]/quiz/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getModuleById } from '@/lib/constants';
import { useUserProgressStore } from '@/store/user-progress-store';
import { ModuleId } from '@/lib/types';
import QuizComponent from '@/components/modules/quiz-component';

export default function QuizPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const { saveQuizResult, scheduleReview, progress } = useUserProgressStore();
  const [module, setModule] = useState<ReturnType<typeof getModuleById> | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState({ score: 0, total: 0 });
  const resolvedParams = React.use(params);

  useEffect(() => {
    // Get module data
    const moduleData = getModuleById(resolvedParams.moduleId);
    setModule(moduleData);
    setLoading(false);

    // If module doesn't exist, redirect to dashboard
    if (!moduleData) {
      router.push('/');
    }

    // Check if user has completed the demonstration
    if (moduleData && !progress.completedDemonstrations[moduleData.id as ModuleId]) {
      router.push(`/modules/${resolvedParams.moduleId}/demonstration`);
    }
    
    // Check if the quiz was already completed
    if (moduleData && progress.quizResults[moduleData.id as ModuleId]?.score > 0) {
      setQuizCompleted(true);
      setQuizScore({
        score: progress.quizResults[moduleData.id as ModuleId].score,
        total: progress.quizResults[moduleData.id as ModuleId].totalQuestions
      });
    }
  }, [resolvedParams.moduleId, router, progress]);

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    if (module) {
      saveQuizResult(module.id as ModuleId, score, totalQuestions);
      scheduleReview(module.id as ModuleId);
      setQuizCompleted(true);
      setQuizScore({ score, total: totalQuestions });
    }
  };

  const handleReturnToDashboard = () => {
    router.push('/');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!module) {
    return null; // Will redirect in useEffect
  }

  const { quiz } = module.sections;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold">{module.title}</h1>
          <h2 className="text-xl mt-2 text-blue-600">{quiz.title}</h2>
          <p className="text-gray-600 mt-2">{quiz.description}</p>
        </div>

        <div className="p-6">
          {quizCompleted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 rounded-lg text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
              <div className="mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {quizScore.score}/{quizScore.total}
                </div>
                <p className="text-gray-600">
                  {quizScore.score === quizScore.total 
                    ? 'Perfect score! Excellent work!' 
                    : quizScore.score >= quizScore.total * 0.7 
                      ? 'Great job! You\'re understanding this well.' 
                      : 'Keep practicing! Review the material and try again.'}
                </p>
              </div>
              
              <div className="p-4 mb-6 bg-yellow-50 rounded-lg border border-yellow-100 text-left">
                <h3 className="font-medium mb-2">What's next?</h3>
                <p>A review session has been scheduled to help you reinforce what you've learned.</p>
                <p className="mt-2">The app will remind you when it's time for your review.</p>
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReturnToDashboard}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition-colors"
                >
                  Return to Dashboard
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <QuizComponent 
              questions={quiz.questions} 
              onComplete={handleQuizComplete} 
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}