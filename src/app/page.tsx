"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Brain, Heart, ArrowRight, User, BookMarked, Calculator, FileText } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/src/lib/store";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const { userName, setUserName } = useUserStore();
  const [nameInput, setNameInput] = useState("");
  const [showEntry, setShowEntry] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!userName) {
      setShowEntry(true);
    }
  }, [userName]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
      setShowEntry(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#4A4A4A] dark:bg-slate-950">
      <AnimatePresence>
        {showEntry && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FDFBF7] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md w-full text-center space-y-8"
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-[#E0D7F5] to-[#FFDBC5] rounded-[32px] flex items-center justify-center text-white shadow-xl mx-auto mb-10 rotate-12">
                <span className="font-bold text-3xl font-serif">Ψ</span>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-[#5B507A] mb-3">Selamat Datang di PsyQuant Lab</h2>
                <p className="text-gray-400 font-light italic">&quot;Halo! Aku Kak Rara. Sebelum kita belajar statistik bareng, aku boleh tau nama kamu siapa?&quot;</p>
              </div>

              <form onSubmit={handleStart} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#9E86E0]" size={20} />
                  <input 
                    type="text" 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Ketik namamu di sini..."
                    className="w-full bg-white border-2 border-[#F0EBE3] focus:border-[#E0D7F5] rounded-[32px] px-16 py-5 text-lg outline-none transition-all shadow-sm placeholder:text-gray-300"
                    autoFocus
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!nameInput.trim()}
                  className="w-full bg-[#5B507A] text-white py-5 rounded-[32px] text-lg font-bold shadow-lg hover:shadow-[#5B507A]/20 transition-all disabled:opacity-50 disabled:grayscale active:scale-[0.98]"
                >
                  Yuk, Mulai Belajar!
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="h-20 px-10 flex justify-between items-center max-w-7xl mx-auto w-full border-b border-[#F0EBE3] bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#E0D7F5] to-[#FFDBC5] rounded-xl flex items-center justify-center text-white shadow-sm">
            <span className="font-bold text-xl font-serif">Ψ</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#5B507A]">PsyQuant <span className="font-light">Lab</span></span>
        </div>
        <div className="flex gap-8 items-center">
          <Link href="/modules" className="text-sm font-medium text-gray-400 hover:text-[#5B507A] transition-colors">
            Modules
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-[#E0D7F5] text-[#5B507A] px-6 py-2.5 rounded-full text-sm font-bold shadow-sm hover:shadow-md hover:bg-[#D4C8ED] transition-all"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-10 text-center max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/10 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold text-[#5B507A] border border-[#F0EBE3] shadow-sm">
            <Sparkles size={14} className="text-[#9E86E0]" />
            <span>Cozy Learning Sanctuary</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight text-[#5B507A] dark:text-white leading-[1.1]"
          >
            Master Psychology Statistics, <br />
            <span className="text-[#9E86E0] italic font-light">Without the Anxiety.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-500 font-light italic max-w-2xl mx-auto leading-relaxed"
          >
            &quot;Statistika itu cuma alat bantu untuk memahami manusia. Pelan-pelan aja ya...&quot;
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/modules" 
              className="group flex items-center gap-2 bg-[#5B507A] text-white px-10 py-4 rounded-[24px] text-lg font-bold shadow-lg hover:shadow-[#5B507A]/20 hover:scale-[1.02] transition-all"
            >
              Mulai Belajar
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/modules" 
              className="flex items-center gap-2 bg-white dark:bg-white/5 border border-[#F0EBE3] px-10 py-4 rounded-[24px] text-lg font-bold hover:bg-[#FDFBF7] dark:hover:bg-white/10 transition-all text-[#5B507A]"
            >
              Lihat Materi
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full"
        >
          <div className="cozy-card bg-white rounded-[24px] shadow-sm border border-[#F0EBE3] hover:border-[#E0D7F5] transition-all">
            <div className="w-12 h-12 bg-[#F9F8FF] rounded-2xl flex items-center justify-center text-[#5B507A] mb-4">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#5B507A]">Interactive Modules</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Belajar langkah demi langkah dari dasar riset hingga tingkat lanjut dengan panduan ramah (LOKI system).
            </p>
          </div>

          <div className="cozy-card bg-white rounded-[24px] shadow-sm border border-[#F0EBE3] hover:border-[#FFDBC5] transition-all">
            <div className="w-12 h-12 bg-[#FFF4ED] text-orange-400 rounded-2xl flex items-center justify-center">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#5B507A]">Mental Well-being</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              UI yang menenangkan dan feedback suportif untuk menjaga kamu tetap semangat tanpa terbebani.
            </p>
          </div>

          <div className="cozy-card bg-white rounded-[24px] shadow-sm border border-[#F0EBE3] hover:border-[#D1E9F6] transition-all">
            <div className="w-12 h-12 bg-[#E8F6FF] rounded-2xl flex items-center justify-center text-[#4A86A8] mb-4">
              <BookMarked size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#5B507A]">Psychology Glossary</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kamus instan untuk istilah statistik dan metodologi riset psikologi langsung di genggamanmu.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="p-12 border-t border-border mt-20 text-center text-sm text-gray-500">
        <p>© 2026 PsyQuant Lab. Crafted for Psychology Students. No AI, Just Pure Content. ❤️</p>
      </footer>
    </div>
  );
}
