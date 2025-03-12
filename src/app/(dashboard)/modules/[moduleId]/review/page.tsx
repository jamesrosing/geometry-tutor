// src/app/(dashboard)/modules/[moduleId]/review/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getModuleById } from '@/lib/constants';
import { useUserProgressStore } from '@/store/user-progress-store';
import { ModuleId } from '@/lib/types';
import QuizComponent from '@/components/modules/quiz-component';

export default function ReviewPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const { completeReview, progress } = useUserProgressStore();
  const [module, setModule] = useState<ReturnType<typeof getModuleById> | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewCompleted, setReviewCompleted] = useState(false);
  const [reviewScore, setReviewScore] = useState({ score: 0, total: 0 });
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

    // Check if user has completed the quiz
    if (moduleData && !progress.quizResults[moduleData.id as ModuleId]?.score) {
      router.push(`/modules/${resolvedParams.moduleId}/quiz`);
    }
    
    // Check if the review is due
    if (moduleData) {
      const reviewSchedule = progress.reviewSchedule[moduleData.id as ModuleId];
      if (!reviewSchedule || !reviewSchedule.nextReviewDate) {
        // No review scheduled yet
        router.push('/');
      } else {
        const reviewDate = new Date(reviewSchedule.nextReviewDate);
        const now = new Date();
        if (reviewDate > now) {
          // Review not due yet
          router.push('/');
        }
      }
    }
  }, [resolvedParams.moduleId, router, progress]);

  const handleReviewComplete = (score: number, totalQuestions: number) => {
    if (module) {
      completeReview(module.id as ModuleId);
      setReviewCompleted(true);
      setReviewScore({ score, total: totalQuestions });
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

  const { review } = module.sections;
  const reviewNumber = progress.reviewSchedule[module.id as ModuleId]?.reviewCount || 0;

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
          <h2 className="text-xl mt-2 text-blue-600">{review.title}</h2>
          <p className="text-gray-600 mt-2">{review.description}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            Review #{reviewNumber}
          </div>
        </div>

        <div className="p-6">
          {reviewCompleted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 rounded-lg text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Review Completed!</h2>
              <div className="mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {reviewScore.score}/{reviewScore.total}
                </div>
                <p className="text-gray-600">
                  {reviewScore.score === reviewScore.total 
                    ? 'Perfect score! Your knowledge is solid!' 
                    : reviewScore.score >= reviewScore.total * 0.7 
                      ? 'Great job! Keep reinforcing these concepts.' 
                      : 'You might need to revisit this module. Consider going through the lesson again.'}
                </p>
              </div>
              
              <div className="p-4 mb-6 bg-blue-50 rounded-lg border border-blue-100 text-left">
                <h3 className="font-medium mb-2">Spaced Repetition</h3>
                <p>Studies show that reviewing material at increasing intervals helps with long-term retention.</p>
                <p className="mt-2">Your next review will be scheduled in a few days. The app will notify you when it's time.</p>
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
            <>
              <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h3 className="font-medium mb-2">Why Review?</h3>
                <p>Reviewing material after some time has passed helps move knowledge from short-term to long-term memory.</p>
                <p className="mt-2">Take this opportunity to refresh your understanding of {module.title}.</p>
              </div>
              
              <QuizComponent 
                questions={review.questions} 
                onComplete={handleReviewComplete} 
              />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}