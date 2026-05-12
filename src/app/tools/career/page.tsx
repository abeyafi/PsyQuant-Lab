"use client";

import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap, Briefcase, Award, Compass, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const ROADMAP = [
  {
    phase: "Junior Years (Sem 1-4)",
    title: "Membangun Fondasi",
    items: ["Sejarah Psikologi", "Statistik Dasar", "Psikologi Kepribadian", "Metodologi Penelitian"],
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    phase: "Senior Years (Sem 5-8)",
    title: "Spesialisasi & Skripsi",
    items: ["Psikometri", "SPSS / Data Science", "Psikologi Klinis/PIO", "Skripsi & Publikasi"],
    color: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    phase: "Professional Path",
    title: "Pasca Sarjana (S2)",
    items: ["S2 Psikologi Profesi", "S2 Psikologi Terapan", "S2 Psikologi Dasar", "Doktor (S3)"],
    color: "bg-orange-50 text-orange-600 border-orange-100"
  },
  {
    phase: "Career World",
    title: "Dunia Kerja",
    items: ["HRD (People Ops)", "Konselor / Psikolog", "UX Researcher", "Behavioral Scientist"],
    color: "bg-green-50 text-green-600 border-green-100"
  }
];

export default function CareerRoadmapPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[#5B507A] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
              <Compass size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Psy-Career Compass</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-bold text-[#5B507A] mb-4">Peta Jalan Karier Psikologi</h1>
           <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
             Psikologi itu luas. Dari statistik ke empati, semuanya punya jalannya sendiri. Mau ke arah mana kamu nanti?
           </p>
        </div>

        <div className="relative">
           {/* Vertical Line */}
           <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#F0EBE3] -translate-x-1/2 hidden md:block" />

           <div className="space-y-12">
              {ROADMAP.map((step, idx) => (
                <motion.div 
                  key={step.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                   <div className="flex-1 w-full">
                      <div className={`p-8 rounded-[40px] border-2 bg-white transition-all hover:shadow-xl ${step.color}`}>
                         <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block">{step.phase}</span>
                         <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                         <ul className="space-y-3">
                            {step.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                 <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />
                                 {item}
                              </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                   
                   <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-[#F0EBE3] flex items-center justify-center text-[#5B507A]">
                      {idx === 0 && <GraduationCap size={20} />}
                      {idx === 1 && <Award size={20} />}
                      {idx === 2 && <Briefcase size={20} />}
                      {idx === 3 && <Heart size={20} />}
                   </div>

                   <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
           </div>
        </div>

        <div className="mt-24 p-12 bg-[#5B507A] rounded-[56px] text-white text-center relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Mulai Dengan Satu Langkah</h3>
              <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed mb-8">
                Gak harus tahu segalanya sekarang. Yang penting, nikmati proses belajarmu satu semester demi satu semester.
              </p>
              <button onClick={() => router.push('/dashboard')} className="bg-[#FFDBC5] text-[#5B507A] px-10 py-4 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95">
                Balik ke Dashboard
              </button>
           </div>
        </div>
      </main>
    </div>
  );
}
