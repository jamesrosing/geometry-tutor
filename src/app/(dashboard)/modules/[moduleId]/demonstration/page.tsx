// src/app/(dashboard)/modules/[moduleId]/demonstration/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getModuleById } from '@/lib/constants';
import { useUserProgressStore } from '@/store/user-progress-store';
import { ModuleId } from '@/lib/types';
import PythagoreanDemo from '@/components/modules/pythagorean-demo';

// This would be expanded with more demonstration components
const getDemonstrationComponent = (moduleId: string, props: any) => {
  switch (moduleId) {
    case 'pythagorean-theorem':
      return <PythagoreanDemo {...props} />;
    // Add more cases for other module demonstrations
    default:
      return (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-bold mb-2">Demonstration Placeholder</h2>
          <p>
            This is a placeholder for the {moduleId} demonstration. 
            In a complete app, this would be an interactive component specific to this concept.
          </p>
        </div>
      );
  }
};

export default function DemonstrationPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const { completeDemonstration, progress } = useUserProgressStore();
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

    // Check if user has completed the lesson
    if (moduleData && !progress.completedLessons[moduleData.id as ModuleId]) {
      router.push(`/modules/${resolvedParams.moduleId}/lesson`);
    }
  }, [resolvedParams.moduleId, router, progress]);

  const handleCompleteDemonstration = () => {
    if (module) {
      completeDemonstration(module.id as ModuleId);
      // Navigate to quiz page
      router.push(`/modules/${module.id}/quiz`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!module) {
    return null; // Will redirect in useEffect
  }

  const { demonstration } = module.sections;

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
          <h2 className="text-xl mt-2 text-blue-600">{demonstration.title}</h2>
          <p className="text-gray-600 mt-2">{demonstration.description}</p>
        </div>

        <div className="p-6">
          {/* Interactive demonstration component */}
          {getDemonstrationComponent(module.id, demonstration.interactiveProps)}

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-lg mb-2">How to use this demonstration</h3>
            <p>Explore the concept by interacting with the elements above. Try different values and observe how they affect the results.</p>
            <p className="mt-2">Take your time to understand how this works before continuing to the quiz.</p>
          </div>

          {/* Navigation Button */}
          <div className="mt-8 flex justify-between">
            <Link 
              href={`/modules/${module.id}/lesson`}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded transition-colors"
            >
              Back to Lesson
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompleteDemonstration}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition-colors"
            >
              {progress.completedDemonstrations[module.id as ModuleId] 
                ? 'Continue to Quiz' 
                : 'Mark as Complete & Continue'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}