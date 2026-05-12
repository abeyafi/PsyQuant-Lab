"use client";

import { useUserStore } from "@/src/lib/store";
import { MODULES } from "@/src/lib/data";
import { Brain, Trophy, Flame, Target, BookOpen, ChevronRight, Calculator, FileSpreadsheet, BookMarked, Library, FileText, Zap, Sparkles, RotateCw, Database, Compass, AlignLeft, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { completedModules, xp, userName } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const progress = (completedModules.length / MODULES.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950">
      <nav className="h-20 border-b border-[#F0EBE3] bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-10 h-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#E0D7F5] to-[#FFDBC5] rounded-xl flex items-center justify-center text-white shadow-sm">
              <span className="font-bold text-xl font-serif">Ψ</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-[#5B507A]">PsyQuant <span className="font-light">Lab</span></span>
          </Link>
          <div className="flex items-center gap-4">
             <div className="w-9 h-9 rounded-full bg-[#D1E9F6] border-2 border-white shadow-sm flex items-center justify-center">
               <span className="text-xs font-bold text-[#4A86A8] uppercase">{userName?.charAt(0) || "U"}</span>
             </div>
             <span className="text-sm font-medium text-[#5B507A]">{userName || "User"}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-10 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-[#5B507A] mb-2">Halo, {userName || "Sarah"}! ✨</h1>
          <p className="text-lg text-gray-500 font-light italic">“Statistika itu cuma alat bantu untuk memahami manusia. Pelan-pelan aja ya...”</p>
        </header>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="cozy-card bg-gradient-to-br from-[#F5F2FF] to-[#E0D7F5] border-white shadow-sm overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center text-[#5B507A]">
                  <Trophy size={24} />
                </div>
                <span className="text-[10px] font-bold bg-white/60 px-3 py-1 rounded-full uppercase tracking-wider text-[#5B507A]">Total XP</span>
              </div>
              <p className="text-4xl font-bold text-[#5B507A] mb-1">{xp}</p>
              <p className="text-[#7D739E] text-xs uppercase font-bold tracking-widest">Experience Points</p>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#FFDBC5] rounded-full blur-3xl opacity-30"></div>
          </div>

          <div className="cozy-card bg-white border-[#F0EBE3] shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#FFF4ED] text-orange-400 rounded-2xl flex items-center justify-center">
                <Flame size={24} />
              </div>
              <span className="text-[10px] font-bold text-orange-400 bg-[#FFF4ED] px-3 py-1 rounded-full uppercase tracking-wider">Materi</span>
            </div>
            <p className="text-4xl font-bold text-[#5B507A] mb-1">{completedModules.length} Selesai</p>
            <p className="text-xs text-[#9E86E0] font-medium">Lanjutkan progresmu!</p>
          </div>

          <div className="cozy-card bg-white border-[#F0EBE3] shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-[#E8F6FF] text-[#4A86A8] rounded-2xl flex items-center justify-center">
                <Target size={24} />
              </div>
              <span className="text-[10px] font-bold text-[#4A86A8] bg-[#E8F6FF] px-3 py-1 rounded-full uppercase tracking-wider">Progress</span>
            </div>
            <p className="text-4xl font-bold text-[#5B507A] mb-1">{Math.round(progress)}%</p>
            <div className="h-2 w-full bg-gray-100/50 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-[#9E86E0]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recent Modules */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#5B507A]">Lanjutkan Belajar</h2>
            <Link href="/modules" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              Semua Modul <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {MODULES.slice(0, 3).map((module) => {
              const isCompleted = completedModules.includes(module.id);
              
              return (
                <Link 
                  key={module.id} 
                  href={`/modules/${module.id}`}
                  className="group block"
                >
                  <div className="bg-white p-6 rounded-[32px] border border-[#F0EBE3] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-[#E0D7F5] shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 ${
                        isCompleted ? "bg-[#F5F2FF] text-[#9E86E0]" : "bg-gray-50 text-gray-300"
                      }`}>
                         <BookOpen size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#9E86E0] uppercase tracking-wider mb-1">{module.category}</p>
                        <h3 className="text-xl font-bold text-[#5B507A] transition-colors">{module.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                       <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Difficulty</p>
                          <p className="text-sm font-medium text-[#7D739E]">{module.difficulty}</p>
                       </div>
                       <div className="h-10 w-10 rounded-full bg-[#F9F8FF] text-[#5B507A] flex items-center justify-center group-hover:bg-[#E0D7F5] transition-all shadow-sm">
                          <ChevronRight size={20} />
                       </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Educational Tools Area - THE LABS */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#5B507A]">The Research Labs</h2>
              <p className="text-sm text-gray-500 font-light mt-1 italic">“Pilih peralatan yang kamu butuhkan untuk risetmu...”</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Statistics Lab */}
            <Link href="/tools/calculator" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-[#F5F2FF] rounded-2xl flex items-center justify-center text-[#5B507A] mb-4">
                  <Calculator size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Statistik Lab</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Mean, SD, Z-Score, & Cronbach Alpha.
                </p>
              </div>
            </Link>

            {/* 2. Visual Lab */}
            <Link href="/tools/advanced-stats" className="group">
              <div className="bg-[#5B507A] p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4">
                  <FileSpreadsheet size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Visual Playground</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Upload & Visualisasi data (Histogram, Scatter).
                </p>
              </div>
            </Link>

            {/* 3. Decision Tree */}
            <Link href="/tools/decision-tree" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-[#E8F6FF] rounded-2xl flex items-center justify-center text-[#4A86A8] mb-4">
                  <Library size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Decision Tree</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Pilih uji statistik yang tepat untuk judulmu.
                </p>
              </div>
            </Link>

            {/* 4. Normal Distribution */}
            <Link href="/tools/normal-distribution" className="group">
              <div className="bg-[#F0FDF4] p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#DCFCE7] h-full">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-600 mb-4 shadow-sm">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Bell Curve Lab</h3>
                <p className="text-green-800/50 text-xs leading-relaxed">
                  Eksplorasi Distribusi Normal secara visual.
                </p>
              </div>
            </Link>

            {/* 5. Variable Lab */}
            <Link href="/tools/variable-generator" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-[#FFF4ED] rounded-2xl flex items-center justify-center text-orange-400 mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Variable Builder</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Generate Tabel Operasional Variabel Skripsi.
                </p>
              </div>
            </Link>

            {/* 6. Citation Lab */}
            <Link href="/tools/citations" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-[#FFF1F2] rounded-2xl flex items-center justify-center text-rose-500 mb-4">
                  <BookMarked size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">APA Citation</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Format sitasi & daftar pustaka APA 7.
                </p>
              </div>
            </Link>

            {/* 7. Hypothesis Lab */}
            <Link href="/tools/hypothesis-templates" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-[#F5F2FF] rounded-2xl flex items-center justify-center text-[#9E86E0] mb-4">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Hypothesis Lab</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Template kalimat hipotesis penelitian.
                </p>
              </div>
            </Link>

            {/* 8. Scoring Lab */}
            <Link href="/tools/scoring" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 mb-4">
                  <RotateCw size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Reverse Scorer</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Balik skor item unfavorable secara otomatis.
                </p>
              </div>
            </Link>

            {/* 9. Psychometrics Lab */}
            <Link href="/tools/psychometrics" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Psikometri Lab</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Cronbach Alpha & Sample Size Calculator.
                </p>
              </div>
            </Link>

            {/* 10. Dataset Lab */}
            <Link href="/tools/datasets" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4">
                  <Database size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Data Sandbox</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Koleksi dataset dummy untuk latihan statistik.
                </p>
              </div>
            </Link>

            {/* 11. Career Roadmap */}
            <Link href="/tools/career" className="group">
              <div className="bg-[#FFDBC5] p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5B507A] mb-4">
                  <Compass size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Psy-Compass</h3>
                <p className="text-[#5B507A]/60 text-xs leading-relaxed">
                  Peta jalan karier & perkuliahan psikologi.
                </p>
              </div>
            </Link>

            {/* 12. Abstract Counter */}
            <Link href="/tools/abstract" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-[#F0FDF4] rounded-2xl flex items-center justify-center text-green-600 mb-4">
                  <AlignLeft size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Abstract Lab</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Cek jumlah kata abstrak sesuai standar APA.
                </p>
              </div>
            </Link>

            {/* 13. Visual Playground */}
            <Link href="/tools/visual-playground" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Visual Playground</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Generate histogram, scatter, & charts dari file Excel.
                </p>
              </div>
            </Link>

            {/* 14. Flashcards Lab */}
            <Link href="/tools/flashcards" className="group">
              <div className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-[#F0EBE3] h-full">
                <div className="w-12 h-12 bg-[#9E86E0] rounded-2xl flex items-center justify-center text-white mb-4 shadow-md">
                  <Brain size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#5B507A] mb-2">Flashcards Lab</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Uji ingatan istilah statistika dengan kartu interaktif.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section className="bg-[#5B507A] py-20 text-white mt-20 rounded-[64px]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Software Mastering</h2>
                <p className="text-white/60 max-w-lg leading-relaxed">
                  Kuasai alat analisis statistik yang paling banyak digunakan di penelitian psikologi dunia. Dari SPSS hingga R Studio.
                </p>
              </div>
            </div>

            {/* Software Cards */}
            {[
              { id: "spss", name: "SPSS", desc: "Favorit skripsi psikologi.", color: "bg-[#002D72]" },
              { id: "jasp", name: "JASP", desc: "Open source & Modern.", color: "bg-blue-400" },
              { id: "tableau", name: "Tableau", desc: "Visualisasi data bisnis.", color: "bg-orange-500" },
              { id: "rstudio", name: "R Studio", desc: "Powerfull scripting.", color: "bg-blue-600" }
            ].map((s) => (
              <Link key={s.name} href="/tools/software-labs" className="bg-white/10 border border-white/20 p-8 rounded-[40px] hover:bg-white/20 transition-all cursor-pointer group">
                <div className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
                   <span className="font-black text-xs text-white">{s.name[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="text-[10px] font-bold text-[#FFDBC5] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  LIHAT MODUL <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 text-center text-gray-400 text-xs mt-20">
        © 2026 PsyQuant Lab. Abe Yafi
      </footer>
    </div>
  );
}
