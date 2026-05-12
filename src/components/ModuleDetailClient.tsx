"use client";

import { Module } from "@/src/lib/data";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, RotateCw, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Quiz } from "@/src/components/Quiz";
import { motion, AnimatePresence } from "framer-motion";

interface ModuleDetailClientProps {
  module: Module;
}

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export function ModuleDetailClient({ module }: ModuleDetailClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"lesson" | "quiz">("lesson");

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[#5B507A] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5B507A] rounded-lg flex items-center justify-center text-white">
              <BookOpen size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">PsyQuant Module</span>
          </div>

          <div className="flex bg-[#FDFBF9] p-1 rounded-xl border border-[#F0EBE3]">
             <button 
               onClick={() => setActiveTab("lesson")}
               className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                 activeTab === "lesson" ? "bg-[#5B507A] text-white shadow-md shadow-[#5B507A]/20" : "text-gray-400"
               }`}
             >
               MATERI
             </button>
             <button 
               onClick={() => setActiveTab("quiz")}
               className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                 activeTab === "quiz" ? "bg-[#5B507A] text-white shadow-md shadow-[#5B507A]/20" : "text-gray-400"
               }`}
             >
               KUIS
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12">
          <span className="text-[10px] font-bold text-[#9E86E0] uppercase tracking-[0.2em] mb-3 block">{module.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5B507A] mb-4 tracking-tight leading-tight">{module.title}</h1>
          <div className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="bg-white border border-[#F0EBE3] px-3 py-1 rounded-full">{module.difficulty}</span>
            <span className="flex items-center gap-1"><RotateCw size={14} className="text-[#9E86E0]" /> {module.estimatedTime}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "lesson" ? (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-none"
            >
              <div className="bg-white p-8 md:p-12 rounded-[48px] border border-[#F0EBE3] shadow-sm leading-relaxed text-[#5B507A]/90 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <BookOpen size={120} />
                </div>

                <div className="p-8 bg-[#F5F2FF] rounded-[32px] mb-12 border border-[#E0D7F5] relative z-10">
                  <p className="text-[#5B507A] font-bold italic leading-relaxed">
                    &quot;Halo! Mari kita bedah materi ini perlahan. Ingat, pemahaman konsep lebih penting daripada menghafal rumus.&quot;
                  </p>
                </div>
                
                <div className="markdown-body prose prose-slate max-w-none prose-headings:text-[#5B507A] prose-strong:text-[#9E86E0] prose-p:mb-6 prose-p:leading-relaxed text-lg relative z-10">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {module.content}
                  </ReactMarkdown>
                </div>

                <div className="mt-16 flex justify-center border-t border-[#F5F2FF] pt-12">
                  <button 
                    onClick={() => setActiveTab("quiz")}
                    className="flex items-center gap-4 bg-[#5B507A] text-white px-10 py-5 rounded-[24px] font-bold shadow-xl hover:shadow-[#5B507A]/20 hover:scale-[1.05] transition-all active:scale-95 group"
                  >
                    Siap untuk Uji Pemahaman? <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-12 text-center">
                 <h2 className="text-3xl font-bold text-[#5B507A] mb-3">Uji Skill Psikometrimu</h2>
                 <p className="text-gray-500 italic text-sm">“Jangan takut salah, di sini tempatnya belajar dari kesalahan.”</p>
              </div>
              <Quiz questions={module.quizzes} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Suggestion */}
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-border mt-12 mb-20 text-center">
         <p className="text-sm text-gray-400 mb-2">Selesai belajar?</p>
         <Link href="/modules" className="font-bold text-primary hover:underline">Lihat Modul Lainnya</Link>
      </footer>
    </div>
  );
}
