"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, ArrowRight, RotateCcw } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
}

export function Quiz({ questions }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 rounded-[32px] p-10 text-center shadow-lg border border-[#F0EBE3]"
      >
        <div className="w-20 h-20 bg-[#F5F2FF] text-[#9E86E0] rounded-[24px] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-[#5B507A] mb-2">Quiz Selesai! ✨</h2>
        <p className="text-gray-500 font-light italic mb-8">
          Kamu menjawab {score} dari {questions.length} pertanyaan dengan benar.
          {score === questions.length ? " Wah, sempurna! Kamu hebat banget!" : " Keren! Terus tingkatin ya pemahamannya."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 border border-[#F0EBE3] px-8 py-3 rounded-full font-bold text-[#5B507A] hover:bg-gray-50 transition-all text-sm"
          >
            <RotateCcw size={18} /> Ulangi Kuis
          </button>
          <button 
            className="flex items-center justify-center gap-2 bg-[#5B507A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#483F61] transition-all shadow-md text-sm"
          >
            Selesai Belajar <CheckCircle2 size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-10 shadow-lg border border-[#F0EBE3]">
      <div className="flex justify-between items-center mb-8">
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
          Pertanyaan {currentStep + 1} / {questions.length}
        </span>
        <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#9E86E0]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-10 leading-relaxed text-[#5B507A]">
        {currentQuestion.text}
      </h3>

      <div className="space-y-4 mb-10">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = isAnswered && index === currentQuestion.correctAnswer;
          const isWrong = isAnswered && isSelected && index !== currentQuestion.correctAnswer;

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
              className={`w-full text-left p-5 rounded-[20px] border-2 transition-all flex items-center justify-between group ${
                isSelected ? "border-[#9E86E0] bg-[#F5F2FF]" : "border-gray-50 hover:border-[#E0D7F5]"
              } ${isCorrect ? "border-green-400 bg-green-50 text-green-700" : ""} ${
                isWrong ? "border-red-400 bg-red-50 text-red-700" : ""
              }`}
            >
              <span className={`text-sm font-medium ${isSelected ? "text-[#5B507A]" : "text-gray-500"}`}>{option}</span>
              {isCorrect && <CheckCircle2 size={18} className="text-green-500" />}
              {isWrong && <XCircle size={18} className="text-red-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-[#F9F8FF] border border-[#F0EEFF] rounded-[24px] mb-10 flex gap-4"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
               <Info size={16} className="text-[#9E86E0]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#9E86E0] uppercase tracking-wider mb-1">Catatan Kak Rara</p>
              <p className="text-sm text-[#5B507A] leading-relaxed italic">
                “{currentQuestion.explanation}”
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end border-t border-gray-50 pt-8">
        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            className="flex items-center gap-2 bg-[#5B507A] text-white px-10 py-4 rounded-full font-bold hover:bg-[#483F61] transition-all shadow-lg disabled:opacity-50"
          >
            Cek Jawaban
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 bg-[#5B507A] text-white px-10 py-4 rounded-full font-bold hover:bg-[#483F61] transition-all shadow-lg"
          >
            Lanjut <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
