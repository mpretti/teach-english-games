import React, { useState } from 'react';
import type { TacoCatGrammarExercise } from '../types/tacoCatGame';

interface TacoCatGrammarExerciseProps {
  exercise: TacoCatGrammarExercise;
  onAnswer: (correct: boolean, points: number) => void;
  language: 'en' | 'ko';
}

export const TacoCatGrammarExerciseComponent: React.FC<TacoCatGrammarExerciseProps> = ({
  exercise,
  onAnswer,
  language
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setAnswered(true);
    
    const isCorrect = answerIndex === exercise.correctAnswer;
    const points = isCorrect ? exercise.points : 0;
    
    setTimeout(() => {
      onAnswer(isCorrect, points);
    }, 2000);
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case 'speed': return '⚡';
      case 'recognition': return '👁️';
      case 'memory': return '🧠';
      default: return '📚';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return '📝';
      case 'listening': return '👂';
      case 'matching': return '🎯';
      case 'pronunciation': return '🗣️';
      default: return '❓';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-2xl">{getTypeIcon(exercise.type)}</span>
          <h2 className="text-2xl font-bold text-gray-800">Grammar Challenge</h2>
          <span className="text-2xl">{getContextIcon(exercise.context)}</span>
        </div>
        <div className="text-sm text-gray-600">
          Type: {exercise.type} | Context: {exercise.context} | Points: {exercise.points}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {language === 'ko' ? exercise.questionKorean : exercise.question}
        </h3>
        {language === 'en' && (
          <p className="text-sm text-gray-600">{exercise.questionKorean}</p>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {exercise.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
          
          if (!answered) {
            buttonClass += "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer";
          } else if (index === exercise.correctAnswer) {
            buttonClass += "border-green-500 bg-green-100 text-green-800";
          } else if (index === selectedAnswer && index !== exercise.correctAnswer) {
            buttonClass += "border-red-500 bg-red-100 text-red-800";
          } else {
            buttonClass += "border-gray-300 bg-gray-50 text-gray-600";
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswerSelect(index)}
              disabled={answered}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="font-medium">{option}</span>
                {answered && index === exercise.correctAnswer && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
                {answered && index === selectedAnswer && index !== exercise.correctAnswer && (
                  <span className="ml-auto text-red-600">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Result and Explanation */}
      {showResult && (
        <div className="border-t pt-4">
          <div className={`p-4 rounded-lg mb-4 ${
            selectedAnswer === exercise.correctAnswer 
              ? 'bg-green-100 border border-green-300' 
              : 'bg-red-100 border border-red-300'
          }`}>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">
                {selectedAnswer === exercise.correctAnswer ? '🎉' : '😅'}
              </span>
              <span className="font-bold text-lg">
                {selectedAnswer === exercise.correctAnswer ? 'Correct!' : 'Not quite right!'}
              </span>
              <span className="ml-auto font-bold">
                {selectedAnswer === exercise.correctAnswer ? `+${exercise.points}` : '+0'} points
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">📚 Explanation:</h4>
            <p className="text-blue-700 mb-2">
              {language === 'ko' ? exercise.explanationKorean : exercise.explanation}
            </p>
            {language === 'en' && (
              <p className="text-sm text-blue-600">{exercise.explanationKorean}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 