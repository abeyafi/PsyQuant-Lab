"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Brain, RotateCcw, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import { GLOSSARY } from "@/src/lib/data";

export default function FlashcardsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % GLOSSARY.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + GLOSSARY.length) % GLOSSARY.length);
    }, 150);
  };

  const currentTerm = GLOSSARY[currentIndex];

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[#5B507A] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#9E86E0] rounded-lg flex items-center justify-center text-white">
              <Brain size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Flashcards Lab</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#5B507A] mb-2">Uji Ingatanmu</h1>
          <p className="text-gray-400 text-sm">Klik kartu untuk melihat definisi. Gunakan panah untuk navigasi.</p>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-w-2xl group perspective-1000">
           <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="w-full h-full cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-white border-2 border-[#F0EBE3] rounded-[48px] shadow-xl flex flex-col items-center justify-center p-12 text-center">
                    <span className="text-[10px] font-bold text-[#9E86E0] uppercase tracking-[0.2em] mb-4">
                      {currentTerm.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#5B507A] tracking-tight">{currentTerm.term}</h2>
                    <div className="absolute bottom-10 text-gray-300 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                       <RotateCcw size={14} /> Klik untuk membalik
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#5B507A] text-white rounded-[48px] shadow-xl flex flex-col items-center justify-center p-12 text-center">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">
                      DEFINISI
                    </span>
                    <p className="text-xl md:text-2xl leading-relaxed font-medium">
                      {currentTerm.definition}
                    </p>
                    <div className="absolute bottom-10 text-white/30 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                       <RotateCcw size={14} /> Kembali ke Istilah
                    </div>
                  </div>
                </div>
              </motion.div>
           </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-8">
           <button 
             onClick={prevCard}
             className="w-14 h-14 bg-white border border-[#F0EBE3] rounded-full flex items-center justify-center text-[#5B507A] hover:bg-[#F5F2FF] hover:border-[#E0D7F5] transition-all shadow-sm active:scale-95"
           >
             <ChevronLeft size={24} />
           </button>

           <div className="flex items-center gap-2 bg-[#F5F2FF] px-6 py-3 rounded-2xl border border-[#E0D7F5]">
              <span className="text-[#5B507A] font-black text-sm">{currentIndex + 1}</span>
              <span className="text-[#9E86E0] text-xs font-bold">/</span>
              <span className="text-[#9E86E0] text-xs font-bold">{GLOSSARY.length}</span>
           </div>

           <button 
             onClick={nextCard}
             className="w-14 h-14 bg-white border border-[#F0EBE3] rounded-full flex items-center justify-center text-[#5B507A] hover:bg-[#F5F2FF] hover:border-[#E0D7F5] transition-all shadow-sm active:scale-95"
           >
             <ChevronRight size={24} />
           </button>
        </div>
      </main>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
