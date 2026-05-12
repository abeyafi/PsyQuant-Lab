"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Monitor, BookOpen, Terminal, Layout, BarChart, ChevronRight, CheckCircle2, PlayCircle, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const SOFTWARE_DATA = [
  {
    id: "spss",
    name: "SPSS",
    fullName: "Statistical Package for the Social Sciences",
    color: "bg-[#002D72]",
    description: "Software paling legendaris di dunia psikologi. Sangat kuat untuk manipulasi data besar dan analisis klasik.",
    steps: [
      "Input data di 'Data View'",
      "Definisikan variabel di 'Variable View' (Penting: Atur Measure ke Nominal/Ordinal/Scale)",
      "Klik Analyze -> Descriptive Statistics (Untuk Mean/SD)",
      "Klik Analyze -> Correlate -> Bivariate (Untuk Pearson)",
      "Interpretasi Output: Fokus pada kolom Sig. (p-value)"
    ],
    tips: "Gunakan 'Syntax' untuk merekam langkah analisis agar bisa diulang sama persis nanti."
  },
  {
    id: "jasp",
    name: "JASP",
    fullName: "Jeffrey's Amazing Statistics Program",
    color: "bg-blue-400",
    description: "Open-source, gratis, dan modern. Sangat user-friendly dengan hasil visualisasi yang aesthetic.",
    steps: [
      "Buka file .csv atau .xlsx",
      "Pilih icon analisis di bar atas (e.g. T-Tests)",
      "Drag variabel ke kotak 'Variables'",
      "Hasil muncul secara Real-Time di kolom kanan",
      "Copy table langsung ke Word dengan format APA"
    ],
    tips: "JASP sangat bagus untuk analisis Bayesian yang sulit dilakukan di SPSS."
  },
  {
    id: "tableau",
    name: "Tableau",
    color: "bg-orange-500",
    description: "Powerfull untuk visualisasi data interaktif dan dashboard bisnis/penelitian.",
    steps: [
      "Connect to Data (Excel/CSV)",
      "Drag variabel ke 'Columns' dan 'Rows'",
      "Pilih jenis visualisasi di panel 'Show Me'",
      "Gunakan Filter untuk data interaktif",
      "Publish dashboard ke Tableau Public"
    ],
    tips: "Gunakan Tableau jika kamu ingin membuat Infografis penelitian yang menarik."
  },
  {
    id: "rstudio",
    name: "R Studio",
    color: "bg-blue-600",
    description: "Standard industri data science. Berbasis script, sangat fleksibel untuk analisis apa pun.",
    steps: [
      "Import data: `data <- read.csv('file.csv')`",
      "Cek data: `summary(data)`",
      "Analisis: `cor.test(data$x, data$y)`",
      "Visualisasi: Gunakan library `ggplot2`",
      "Laporan: Gunakan R-Markdown (.rmd)"
    ],
    tips: "Belajarlah R jika kamu ingin berkarir serius di bidang riset kuantitatif global."
  }
];

export default function SoftwareLabsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(SOFTWARE_DATA[0]);

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
            <div className="w-8 h-8 bg-[#5B507A] rounded-lg flex items-center justify-center text-white">
              <Monitor size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Software Mastering Lab</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#5B507A] mb-4 text-center md:text-left">Kuasai Alat Analisismu</h1>
          <p className="text-gray-500 max-w-2xl leading-relaxed text-center md:text-left">
            Pilih software yang ingin kamu pelajari. Kami sudah rangkum langkah-langkah esensial untuk memproses data penelitianmu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-3">
             <div className="bg-white p-4 rounded-[32px] border border-[#F0EBE3] shadow-sm space-y-2">
                {SOFTWARE_DATA.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveTab(s)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      activeTab.id === s.id 
                        ? "bg-[#5B507A] text-white shadow-xl scale-[1.02]" 
                        : "text-gray-400 hover:bg-[#F5F2FF] hover:text-[#5B507A]"
                    }`}
                  >
                    <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-xs font-black shadow-md`}>
                      {s.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">{s.name}</p>
                      <p className={`text-[10px] ${activeTab.id === s.id ? "text-white/60" : "text-gray-400"}`}>
                        {s.id === 'spss' ? 'Legenda Statistik' : s.id === 'jasp' ? 'Modern & Open' : s.id === 'tableau' ? 'Data Visual' : 'Coding Power'}
                      </p>
                    </div>
                    <ChevronRight size={16} className={`ml-auto ${activeTab.id === s.id ? "opacity-100" : "opacity-0"}`} />
                  </button>
                ))}
             </div>

             <div className="bg-[#FFF4ED] p-6 rounded-[32px] border border-orange-100 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-400 shadow-sm font-bold italic">
                   !
                </div>
                <div>
                   <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Catatan Penting</p>
                   <p className="text-[10px] text-[#8B6E5F] leading-relaxed">
                     Setiap software punya kelebihan masing-masing. SPSS untuk data berat, JASP untuk keindahan visual, dan R untuk fleksibilitas total.
                   </p>
                </div>
             </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[48px] border border-[#F0EBE3] shadow-sm overflow-hidden"
              >
                <div className={`p-8 md:p-12 ${activeTab.color} text-white`}>
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <h2 className="text-4xl font-bold mb-2">{activeTab.name}</h2>
                        <p className="text-white/60 font-medium uppercase tracking-widest text-xs">
                          {activeTab.fullName || activeTab.name}
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                         <PlayCircle size={32} />
                      </div>
                   </div>
                </div>

                <div className="p-8 md:p-12 space-y-10">
                   <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BookOpen size={14} /> Deskripsi Software
                      </h4>
                      <p className="text-lg text-[#5B507A] leading-relaxed">
                        {activeTab.description}
                      </p>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Terminal size={14} /> Langkah-Langkah Dasar
                      </h4>
                      <div className="space-y-3">
                         {activeTab.steps.map((step, i) => (
                           <div key={i} className="flex items-center gap-4 bg-[#FDFBF9] p-4 rounded-2xl border border-[#F0EBE3] group hover:border-[#E0D7F5] transition-all">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[10px] font-black text-[#9E86E0] shadow-sm border border-[#F5F2FF]">
                                 {i + 1}
                              </div>
                              <p className="text-sm text-[#5B507A] font-medium">{step}</p>
                              <CheckCircle2 size={16} className="ml-auto text-[#E0D7F5] group-hover:text-green-400 transition-colors" />
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-[#F5F2FF] p-8 rounded-[32px] border border-[#E0D7F5] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-5">
                         <Zap size={60} />
                      </div>
                      <h4 className="text-xs font-bold text-[#9E86E0] uppercase tracking-widest mb-2">Pro Tips</h4>
                      <p className="text-[#5B507A] font-bold italic">
                        &quot;{activeTab.tips}&quot;
                      </p>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
