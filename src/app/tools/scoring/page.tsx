"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCw, Trash2, Plus, Info, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReverseScoringPage() {
  const router = useRouter();
  const [scaleMax, setScaleMax] = useState(5);
  const [inputScores, setInputScores] = useState<string>("1, 2, 3, 4, 5");

  const scoresArray = inputScores.split(",").map(s => s.trim()).filter(s => s !== "");
  
  const calculateReverse = (score: string) => {
    const s = parseInt(score);
    if (isNaN(s)) return "Err";
    // Formula: (Max + 1) - Score
    const reversed = (scaleMax + 1) - s;
    return reversed < 1 ? 1 : reversed;
  };

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
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              <RotateCw size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Reverse Scoring Tool</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm space-y-8">
              <h1 className="text-2xl font-bold text-[#5B507A]">Setup Skala</h1>

              <div className="space-y-4">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Skala Likert (Pilih Max)</label>
                 <div className="flex gap-2">
                    {[4, 5, 6, 7].map((val) => (
                      <button
                        key={val}
                        onClick={() => setScaleMax(val)}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                          scaleMax === val 
                            ? "bg-[#5B507A] text-white shadow-lg scale-105" 
                            : "bg-[#FDFBF9] border border-[#F0EBE3] text-gray-400 hover:text-[#5B507A]"
                        }`}
                      >
                        1 - {val}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Masukkan Skor Mentah (Pisahkan koma)</label>
                 <textarea 
                   value={inputScores}
                   onChange={(e) => setInputScores(e.target.value)}
                   placeholder="Contoh: 1, 4, 3, 2, 5"
                   className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-3xl px-6 py-6 outline-none focus:border-[#E0D7F5] transition-all text-[#5B507A] text-xl font-bold min-h-[150px]"
                 />
              </div>

              <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-200 flex items-start gap-4">
                <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={24} />
                <p className="text-xs text-amber-800/70 leading-relaxed">
                  Gunakan tool ini hanya untuk <strong>item unfavorable</strong> (pernyataan negatif). Item favorable tidak perlu di-reverse.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#5B507A] p-10 rounded-[48px] shadow-xl text-white relative overflow-hidden flex flex-col min-h-[400px]">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <RotateCw size={120} />
              </div>

              <div className="mb-10 flex justify-between items-center relative z-10">
                <span className="text-[10px] font-bold text-[#FFDBC5] uppercase tracking-[0.2em]">HASIL REVERSE SCORE</span>
                <span className="text-xs text-white/40">Skala 1-{scaleMax}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {scoresArray.map((score, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/10 border border-white/20 p-4 rounded-3xl flex flex-col items-center"
                  >
                    <span className="text-[10px] text-white/40 font-bold mb-1">Items {i+1}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-rose-300 line-through font-mono">{score}</span>
                       <span className="text-2xl font-bold text-[#FFDBC5]">{calculateReverse(score)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-white/10 relative z-10">
                 <p className="text-xs text-white/50 italic leading-relaxed text-center">
                    &quot;Data ini siap kamu masukkan kembali ke SPSS untuk proses analisis selanjutnya.&quot;
                 </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-[#F0EBE3] shadow-sm flex items-start gap-4">
               <Info className="text-[#9E86E0] shrink-0" size={24} />
               <div className="space-y-2">
                  <h4 className="text-sm font-bold text-[#5B507A]">Cara Hitung Manual:</h4>
                  <p className="text-xs text-gray-400">
                    Skor Baru = (Skor Max + 1) - Skor Lama. <br/>
                    Contoh: Untuk skala 1-5, skor 1 menjadi (5+1)-1 = 5.
                  </p>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
