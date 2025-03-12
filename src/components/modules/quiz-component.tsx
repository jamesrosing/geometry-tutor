// src/components/modules/quiz-component.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/lib/types';

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string | number | boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || isAnswered) return;
    
    setIsAnswered(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowExplanation(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      onComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0), questions.length);
    }
  };

  const getAnswerButtonClass = (answer: string | number | boolean) => {
    if (!isAnswered) {
      return selectedAnswer === answer 
        ? 'bg-blue-200 border-blue-500' 
        : 'bg-white hover:bg-gray-100';
    }
    
    if (answer === currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    
    if (selectedAnswer === answer && answer !== currentQuestion.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    
    return 'bg-white';
  };

  // Render different question types
  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-3 border-2 rounded-lg transition-colors ${getAnswerButtonClass(option)}`}
                disabled={isAnswered}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            ))}
          </div>
        );
        
      case 'true-false':
        return (
          <div className="space-y-2">
            <button
              onClick={() => handleAnswerSelect(true)}
              className={`w-full text-left p-3 border-2 rounded-lg transition-colors ${getAnswerButtonClass(true)}`}
              disabled={isAnswered}
            >
              True
            </button>
            <button
              onClick={() => handleAnswerSelect(false)}
              className={`w-full text-left p-3 border-2 rounded-lg transition-colors ${getAnswerButtonClass(false)}`}
              disabled={isAnswered}
            >
              False
            </button>
          </div>
        );
        
      case 'fill-in-blank':
        return (
          <div>
            <input
              type="text"
              value={selectedAnswer as string || ''}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="w-full p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
              placeholder="Type your answer here..."
              disabled={isAnswered}
            />
          </div>
        );
        
      // Other question types can be added here
      
      default:
        return <p>Unsupported question type</p>;
    }
  };

  if (quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-lg shadow-md text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <div className="mb-6">
          <div className="text-5xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
          <p className="text-gray-600">
            {score === questions.length 
              ? 'Perfect score! Excellent work!' 
              : score >= questions.length * 0.7 
                ? 'Great job! You\'re understanding this well.' 
                : 'Keep practicing! Review the material and try again.'}
          </p>
        </div>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete(score, questions.length)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition-colors"
          >
            Complete Quiz
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <div className="text-sm text-blue-600">Score: {score}/{currentQuestionIndex}</div>
      </div>

      <div className="mb-2 text-gray-500 text-sm">
        Difficulty: {currentQuestion.difficulty === 'easy' 
          ? '⭐' 
          : currentQuestion.difficulty === 'medium' 
            ? '⭐⭐' 
            : '⭐⭐⭐'}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">{currentQuestion.text}</h3>
        {renderQuestionContent()}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100"
          >
            <h4 className="font-medium mb-1">
              {selectedAnswer === currentQuestion.correctAnswer 
                ? '✅ Correct!' 
                : '❌ Incorrect'}
            </h4>
            <p>{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        {isAnswered ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
            className={`py-2 px-6 rounded transition-colors ${
              selectedAnswer === null 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Check Answer
          </motion.button>
        )}
      </div>
      
      <div className="w-full bg-gray-200 h-1.5 mt-8 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full rounded-full"
          style={{
            width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
            transition: 'width 0.5s ease-in-out'
          }}
        ></div>
      </div>
    </div>
  );
};

export default QuizComponent;