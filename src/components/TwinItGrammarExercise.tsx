import React, { useState } from 'react';
import type { TwinItGrammarExercise as TwinItGrammarExerciseType } from '../types/twinItGame';

interface TwinItGrammarExerciseProps {
  exercise: TwinItGrammarExerciseType;
  onAnswer: (correct: boolean) => void;
  timeRemaining?: number;
}

export const TwinItGrammarExercise: React.FC<TwinItGrammarExerciseProps> = ({
  exercise,
  onAnswer,
  timeRemaining
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
      return 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-300';
    }
    
    if (index === exercise.correctAnswer) {
      return 'bg-green-500 text-white border-2 border-green-600';
    }
    
    if (index === selectedAnswer && index !== exercise.correctAnswer) {
      return 'bg-red-500 text-white border-2 border-red-600';
    }
    
    return 'bg-gray-100 text-gray-600 border-2 border-gray-300';
  };

  const getContextEmoji = (context: string) => {
    switch (context) {
      case 'found': return '🔍';
      case 'match': return '🎯';
      case 'speed': return '⚡';
      case 'pattern': return '🎨';
      default: return '📝';
    }
  };

  const getContextBackground = (context: string) => {
    switch (context) {
      case 'found': return 'bg-blue-50 border-blue-200';
      case 'match': return 'bg-green-50 border-green-200';
      case 'speed': return 'bg-yellow-50 border-yellow-200';
      case 'pattern': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyLevel = () => {
    if (timeRemaining && timeRemaining <= 30) return 'high';
    if (timeRemaining && timeRemaining <= 60) return 'medium';
    return 'low';
  };

  const urgencyLevel = getUrgencyLevel();

  return (
    <div className={`card max-w-2xl mx-auto border-2 ${getContextBackground(exercise.context)} ${
      urgencyLevel === 'high' ? 'animate-pulse' : ''
    }`}>
      {/* Header with Context and Urgency */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">{getContextEmoji(exercise.context)}</span>
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
              exercise.context === 'speed' ? 'bg-yellow-500 text-white animate-pulse' :
              exercise.context === 'match' ? 'bg-green-500 text-white' :
              exercise.context === 'found' ? 'bg-blue-500 text-white' :
              exercise.context === 'pattern' ? 'bg-purple-500 text-white' :
              'bg-gray-500 text-white'
            }`}>
              {exercise.type.replace('-', ' ').toUpperCase()}
            </span>
          </div>
          
          {/* Time Indicator */}
          {timeRemaining && (
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-bold ${
              urgencyLevel === 'high' ? 'bg-red-500 text-white animate-bounce' :
              urgencyLevel === 'medium' ? 'bg-yellow-500 text-white' :
              'bg-green-500 text-white'
            }`}>
              <span>⏰</span>
              <span>{Math.ceil(timeRemaining)}s</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.question}</h3>
        <p className="text-gray-600">{exercise.questionKorean}</p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full p-4 text-left rounded-lg transition-all duration-200 transform hover:scale-102 ${
              getButtonClass(index)
            } ${!showResult ? 'hover:shadow-md' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <span className="font-bold text-lg">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className={`p-4 rounded-lg border-2 ${
          selectedAnswer === exercise.correctAnswer 
            ? 'bg-green-50 border-green-300' 
            : 'bg-red-50 border-red-300'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className={`text-2xl ${
                selectedAnswer === exercise.correctAnswer ? '✅' : '❌'
              }`}>
                {selectedAnswer === exercise.correctAnswer ? '✅' : '❌'}
              </span>
              <span className={`text-lg font-bold ${
                selectedAnswer === exercise.correctAnswer ? 'text-green-700' : 'text-red-700'
              }`}>
                {selectedAnswer === exercise.correctAnswer ? 'Excellent!' : 'Not quite!'}
              </span>
            </div>
            
            {selectedAnswer === exercise.correctAnswer && (
              <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full">
                <span>🎯</span>
                <span className="font-bold">+{exercise.points} points</span>
              </div>
            )}
          </div>
          
          <div className="mb-3">
            <p className="text-gray-700 font-medium mb-1">{exercise.explanation}</p>
            <p className="text-gray-600 text-sm">{exercise.explanationKorean}</p>
          </div>

          {/* Context-specific encouragement */}
          {exercise.context === 'speed' && (
            <div className="bg-yellow-100 border border-yellow-300 rounded p-3 mt-3">
              <p className="text-yellow-800 text-sm font-medium">
                ⚡ Quick thinking helps you find patterns faster!
              </p>
              <p className="text-yellow-700 text-xs">
                빠른 사고는 패턴을 더 빨리 찾는 데 도움이 됩니다!
              </p>
            </div>
          )}

          {exercise.context === 'match' && (
            <div className="bg-green-100 border border-green-300 rounded p-3 mt-3">
              <p className="text-green-800 text-sm font-medium">
                🎯 Great pattern recognition skills!
              </p>
              <p className="text-green-700 text-xs">
                훌륭한 패턴 인식 능력입니다!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <span>Grammar Challenge</span>
          <span>•</span>
          <span>문법 도전</span>
        </div>
      </div>
    </div>
  );
}; 