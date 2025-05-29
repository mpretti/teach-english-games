import React, { useState } from 'react';
import type { SurviveGrammarExercise as SurviveGrammarExerciseType } from '../types/surviveGame';

interface SurviveGrammarExerciseProps {
  exercise: SurviveGrammarExerciseType;
  onAnswer: (correct: boolean) => void;
}

export const SurviveGrammarExercise: React.FC<SurviveGrammarExerciseProps> = ({
  exercise,
  onAnswer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === exercise.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 2000);
  };

  const getButtonClass = (index: number) => {
    if (!showResult) {
      return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
    
    if (index === exercise.correctAnswer) {
      return 'bg-green-500 text-white';
    }
    
    if (index === selectedAnswer && index !== exercise.correctAnswer) {
      return 'bg-red-500 text-white';
    }
    
    return 'bg-gray-100 text-gray-600';
  };

  const getContextEmoji = (context: string) => {
    switch (context) {
      case 'swimming': return '🏊';
      case 'boat': return '🚤';
      case 'dolphin': return '🐬';
      case 'escape': return '🏃';
      case 'danger': return '⚠️';
      default: return '🌊';
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-2xl">{getContextEmoji(exercise.context)}</span>
          <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {exercise.type.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.question}</h3>
        <p className="text-gray-600">{exercise.questionKorean}</p>
      </div>

      <div className="space-y-3 mb-6">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full p-3 text-left rounded-lg border transition-colors duration-200 ${getButtonClass(index)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg ${
          selectedAnswer === exercise.correctAnswer 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center mb-2">
            <span className={`text-lg font-bold ${
              selectedAnswer === exercise.correctAnswer ? 'text-green-700' : 'text-red-700'
            }`}>
              {selectedAnswer === exercise.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
            </span>
            {selectedAnswer === exercise.correctAnswer && (
              <span className="ml-2 text-sm text-green-600">+{exercise.points} points</span>
            )}
          </div>
          <p className="text-gray-700 mb-1">{exercise.explanation}</p>
          <p className="text-gray-600 text-sm">{exercise.explanationKorean}</p>
        </div>
      )}
    </div>
  );
}; 