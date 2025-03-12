// src/app/(dashboard)/modules/[moduleId]/lesson/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getModuleById } from '@/lib/constants';
import { useUserProgressStore } from '@/store/user-progress-store';
import { ModuleId } from '@/lib/types';

export default function LessonPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const { completeLesson, progress } = useUserProgressStore();
  const [module, setModule] = useState<ReturnType<typeof getModuleById> | null>(null);
  const [loading, setLoading] = useState(true);
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
  }, [resolvedParams.moduleId, router]);

  const handleCompleteLesson = () => {
    if (module) {
      completeLesson(module.id as ModuleId);
      // Navigate to demonstration page
      router.push(`/modules/${module.id}/demonstration`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!module) {
    return null; // Will redirect in useEffect
  }

  const { lesson } = module.sections;

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
          <h2 className="text-xl mt-2 text-blue-600">{lesson.title}</h2>
          <p className="text-gray-600 mt-2">{lesson.description}</p>
        </div>

        <div className="p-6">
          {/* Lesson content */}
          <div className="prose max-w-none">
            {/* This would ideally be a markdown renderer */}
            <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br />') }} />
          </div>

          {/* Images */}
          {lesson.images && lesson.images.length > 0 && (
            <div className="mt-6 mb-6">
              {lesson.images.map((image, index) => (
                <div key={index} className="my-4 rounded-lg overflow-hidden border border-gray-200">
                  <Image 
                    src={image} 
                    alt={`${module.title} illustration ${index + 1}`} 
                    width={600}
                    height={400}
                    className="mx-auto"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Video */}
          {lesson.videoUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Video Explanation</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-gray-200">
                <video 
                  src={lesson.videoUrl}
                  poster="/images/video-placeholder.jpg"
                  controls
                  className="w-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {/* Navigation Button */}
          <div className="mt-8 flex justify-between">
            <Link 
              href="/"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded transition-colors"
            >
              Cancel
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompleteLesson}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition-colors"
            >
              {progress.completedLessons[module.id as ModuleId] 
                ? 'Continue to Demonstration' 
                : 'Mark as Complete & Continue'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}