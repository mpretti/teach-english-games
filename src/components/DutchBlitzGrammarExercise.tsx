import React, { useState } from 'react';
import type { DutchBlitzGrammarExercise } from '../types/dutchBlitzGame';

interface DutchBlitzGrammarExerciseProps {
  exercise: DutchBlitzGrammarExercise;
  onAnswer: (correct: boolean, points: number) => void;
  language: 'en' | 'ko';
}

const DutchBlitzGrammarExerciseComponent: React.FC<DutchBlitzGrammarExerciseProps> = ({
  exercise,
  onAnswer,
  language
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === exercise.correctAnswer;
    const points = isCorrect ? exercise.points : 0;
    
    setTimeout(() => {
      onAnswer(isCorrect, points);
    }, 2000);
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case 'speed': return '⚡';
      case 'fluency': return '🗣️';
      case 'commands': return '📢';
      case 'coordination': return '🤝';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'imperative': return 'bg-red-100 text-red-800';
      case 'declarative': return 'bg-blue-100 text-blue-800';
      case 'numbers': return 'bg-green-100 text-green-800';
      case 'colors': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getContextIcon(exercise.context)}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(exercise.type)}`}>
            {exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {exercise.points} points
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {language === 'ko' ? exercise.questionKorean : exercise.question}
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`
              w-full p-4 text-left rounded-lg border-2 transition-all duration-200
              ${showResult
                ? index === exercise.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : index === selectedAnswer
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-gray-200 bg-gray-50 text-gray-600'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }
              ${selectedAnswer === index && !showResult ? 'border-blue-500 bg-blue-50' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {showResult && index === exercise.correctAnswer && (
                <span className="text-green-600">✓</span>
              )}
              {showResult && index === selectedAnswer && index !== exercise.correctAnswer && (
                <span className="text-red-600">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {showResult && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className={selectedAnswer === exercise.correctAnswer ? 'text-green-600' : 'text-red-600'}>
              {selectedAnswer === exercise.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
            </span>
            {selectedAnswer === exercise.correctAnswer && (
              <span className="text-sm text-green-600 font-medium">
                +{exercise.points} points
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700">
            {language === 'ko' ? exercise.explanationKorean : exercise.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default DutchBlitzGrammarExerciseComponent; 