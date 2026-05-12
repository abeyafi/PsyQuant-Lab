"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, HelpCircle, CheckCircle2, RotateCcw, Brain } from "lucide-react";
import { useRouter } from "next/navigation";

type Option = {
  label: string;
  next: string | Result;
};

type Result = {
  test: string;
  explanation: string;
  assumptions: string[];
};

const TREE: Record<string, { question: string; options: Option[] }> = {
  start: {
    question: "Apa tujuan utama penelitian kamu?",
    options: [
      { label: "Mencari Hubungan (Korelasi)", next: "relationship" },
      { label: "Membandingkan Kelompok (Perbedaan)", next: "difference" },
      { label: "Memprediksi Variabel (Regresi)", next: "prediction" }
    ]
  },
  relationship: {
    question: "Apa jenis data dari kedua variabel kamu?",
    options: [
      { label: "Keduanya Interval/Rasio", next: "param_corr" },
      { label: "Minimal satu Ordinal", next: "nonparam_corr" },
      { label: "Keduanya Nominal/Kategorik", next: "chi_square" }
    ]
  },
  param_corr: {
    question: "Apakah asumsi normalitas terpenuhi?",
    options: [
      { label: "Ya (Parametrik)", next: {
        test: "Pearson Correlation",
        explanation: "Mengukur hubungan linear antara dua variabel interval/rasio.",
        assumptions: ["Data Interval/Rasio", "Distribusi Normal", "Hubungan Linear"]
      }},
      { label: "Tidak", next: "nonparam_corr" }
    ]
  },
  nonparam_corr: {
    question: "Pilih uji non-parametrik yang sesuai:",
    options: [
      { label: "Spearman Correlation", next: {
        test: "Spearman Rank Correlation",
        explanation: "Versi non-parametrik Pearson, cocok untuk data ordinal atau tidak normal.",
        assumptions: ["Minimal Data Ordinal", "Hubungan Monotonik"]
      }}
    ]
  },
  chi_square: {
    question: "Berapa banyak variabel nominal kamu?",
    options: [
      { label: "1 Variabel", next: {
        test: "Chi-Square Goodness-of-Fit",
        explanation: "Mengevaluasi apakah distribusi frekuensi kategori cocok dengan nilai teoretis.",
        assumptions: ["Data Nominal", "Frekuensi Harapan > 5"]
      }},
      { label: "2 Variabel", next: {
        test: "Chi-Square Test of Independence",
        explanation: "Menguji apakah ada hubungan antara dua variabel kategorikal.",
        assumptions: ["Data Nominal", "Antar kategori saling eksklusif"]
      }}
    ]
  },
  difference: {
    question: "Berapa banyak kelompok yang kamu bandingkan?",
    options: [
      { label: "2 Kelompok (T-Test)", next: "two_groups" },
      { label: "3+ Kelompok (ANOVA)", next: "more_groups" }
    ]
  },
  two_groups: {
    question: "Apakah kelompok tersebut orang yang sama (berpasangan)?",
    options: [
      { label: "Sama (Pre-Post Test)", next: "paired" },
      { label: "Berbeda (Eksperimen vs Kontrol)", next: "independent" }
    ]
  },
  paired: {
    question: "Apakah data terdistribusi normal?",
    options: [
      { label: "Ya (Parametrik)", next: { 
        test: "Paired-Samples T-Test", 
        explanation: "Membandingkan rata-rata dari dua pengukuran pada subjek yang sama.",
        assumptions: ["Data Berpasangan", "Distribusi Normal", "Skala Interval/Rasio"]
      }},
      { label: "Tidak (Non-Parametrik)", next: {
        test: "Wilcoxon Signed-Ranks Test",
        explanation: "Alternatif untuk paired t-test saat data tidak normal atau ordinal.",
        assumptions: ["Data Berpasangan", "Ordinal/Interval/Rasio"]
      }}
    ]
  },
  independent: {
    question: "Apakah data terdistribusi normal?",
    options: [
      { label: "Ya (Parametrik)", next: { 
        test: "Independent-Samples T-Test", 
        explanation: "Membandingkan rata-rata dari dua kelompok yang tidak saling terkait.",
        assumptions: ["Data Independen", "Distribusi Normal", "Homogenitas Varians"]
      }},
      { label: "Tidak (Non-Parametrik)", next: {
        test: "Mann-Whitney U Test",
        explanation: "Alternatif untuk independent t-test saat data tidak normal.",
        assumptions: ["Data Independen", "Ordinal/Interval/Rasio"]
      }}
    ]
  },
  more_groups: {
    question: "Bagaimana desain penelitian kamu?",
    options: [
      { label: "Between-Groups (Subjek Berbeda)", next: "anova_between" },
      { label: "Within-Groups (Subjek Sama)", next: "anova_within" }
    ]
  },
  anova_between: {
    question: "Apakah data terdistribusi normal?",
    options: [
      { label: "Ya", next: {
        test: "One-Way ANOVA",
        explanation: "Membandingkan rata-rata 3+ kelompok yang berbeda subjeknya.",
        assumptions: ["Distribusi Normal", "Homogenitas Varians", "Independensi Observasi"]
      }},
      { label: "Tidak", next: {
        test: "Kruskal-Wallis Test",
        explanation: "Alternatif non-parametrik untuk One-Way ANOVA.",
        assumptions: ["Data Ordinal/Interval/Rasio", "Independensi Observasi"]
      }}
    ]
  },
  prediction: {
    question: "Berapa banyak prediktor (X) yang kamu gunakan?",
    options: [
      { label: "1 Prediktor", next: {
        test: "Simple Linear Regression",
        explanation: "Memprediksi satu variabel outcome dari satu variabel prediktor tunggal.",
        assumptions: ["Linearitas", "Normalitas Residual", "Homoskedastisitas"]
      }},
      { label: "2+ Prediktor", next: {
        test: "Multiple Regression",
        explanation: "Memprediksi variabel outcome menggunakan dua atau lebih variabel prediktor sekaligus.",
        assumptions: ["Linearitas", "No Multikolinearitas", "Normalitas Residual"]
      }}
    ]
  }
};

export default function DecisionTreePage() {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>(["start"]);
  const [currentStep, setCurrentStep] = useState<string>("start");
  const [result, setResult] = useState<Result | null>(null);

  const handleOption = (next: string | Result) => {
    if (typeof next === "string") {
      setHistory([...history, next]);
      setCurrentStep(next);
    } else {
      setResult(next);
    }
  };

  const reset = () => {
    setHistory(["start"]);
    setCurrentStep("start");
    setResult(null);
  };

  const goBack = () => {
    if (result) {
      setResult(null);
      return;
    }
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentStep(newHistory[newHistory.length - 1]);
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-gray-500 hover:text-[#5B507A] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E8F6FF] rounded-lg flex items-center justify-center text-[#4A86A8]">
              <Brain size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Statistical Decision Tree</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-[#F5F2FF] px-4 py-1 rounded-full text-[10px] font-bold text-[#9E86E0] uppercase tracking-widest">
                  Step {history.length}
                </div>
                <h1 className="text-3xl font-bold text-[#5B507A] leading-tight">
                  {TREE[currentStep]?.question || "Pertanyaan selanjutnya..."}
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {TREE[currentStep]?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOption(opt.next)}
                    className="group bg-white border-2 border-[#F0EBE3] hover:border-[#E0D7F5] p-6 rounded-[24px] text-left transition-all flex items-center justify-between shadow-sm hover:shadow-md"
                  >
                    <span className="text-lg font-medium text-[#5B507A] group-hover:text-[#9E86E0]">{opt.label}</span>
                    <ChevronRight className="text-gray-300 group-hover:text-[#9E86E0] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-[#E0D7F5] rounded-[40px] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Brain size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 text-[#9E86E0] mb-6">
                  <CheckCircle2 size={32} />
                  <span className="font-bold uppercase tracking-widest text-sm">Rekomendasi Uji</span>
                </div>

                <h2 className="text-4xl font-bold text-[#5B507A] mb-4">
                  {result.test}
                </h2>
                
                <p className="text-gray-500 leading-relaxed text-lg mb-8 italic">
                  &quot;{result.explanation}&quot;
                </p>

                <div className="space-y-4 mb-10">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <HelpCircle size={16} /> Asumsi Utama
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.assumptions.map((asm, i) => (
                      <li key={i} className="bg-[#FDFBF9] px-4 py-3 rounded-xl text-sm text-[#7D739E] border border-[#F0EBE3] flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#9E86E0] rounded-full"></div>
                        {asm}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={reset}
                  className="flex items-center gap-2 text-[#9E86E0] hover:text-[#5B507A] font-bold transition-colors group"
                >
                  <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  Mulai Dari Awal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
