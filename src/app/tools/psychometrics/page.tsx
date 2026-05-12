"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Box, Calculator, Info, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PsychometricsLabPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"alpha" | "sample">("alpha");
  
  // Alpha State
  const [k, setK] = useState(10); // number of items
  const [sumVar, setSumVar] = useState(5.5); // sum of individual variances
  const [totalVar, setTotalVar] = useState(25.0); // variance of total scores

  // Sample Size State
  const [pop, setPop] = useState(1000);
  const [margin, setMargin] = useState(5);
  const [conf, setConf] = useState(95);

  const calculateAlpha = () => {
    if (k <= 1 || totalVar === 0 || isNaN(totalVar) || isNaN(sumVar)) return 0;
    const alpha = (k / (k - 1)) * (1 - (sumVar / totalVar));
    return isNaN(alpha) ? 0 : alpha;
  };

  const calculateSample = () => {
    if (isNaN(pop) || isNaN(margin)) return 0;
    // Slovin's Formula: n = N / (1 + Ne^2)
    const e = margin / 100;
    const n = pop / (1 + pop * Math.pow(e, 2));
    return isNaN(n) ? 0 : Math.ceil(n);
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
            <div className="w-8 h-8 bg-[#F5F2FF] rounded-lg flex items-center justify-center text-[#9E86E0]">
              <Box size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Psychometrics Lab</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="flex justify-center mb-12">
           <div className="bg-white p-1.5 rounded-2xl border border-[#F0EBE3] flex gap-2">
              <button 
                onClick={() => setTab("alpha")}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'alpha' ? 'bg-[#5B507A] text-white shadow-lg' : 'text-gray-400'}`}
              >
                Reliabilitas (Alpha)
              </button>
              <button 
                onClick={() => setTab("sample")}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'sample' ? 'bg-[#5B507A] text-white shadow-lg' : 'text-gray-400'}`}
              >
                Sample Size
              </button>
           </div>
        </div>

        {tab === "alpha" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm space-y-8">
               <h2 className="text-2xl font-bold text-[#5B507A]">Cronbach&apos;s Alpha</h2>
               
               <div className="space-y-6">
                  <InputGroup label="Jumlah Item (k)" value={k} onChange={setK} help="Banyaknya butir pernyataan dalam skala." />
                  <InputGroup label="Jumlah Varians Item (Σσ²)" value={sumVar} onChange={setSumVar} help="Hasil penjumlahan varians setiap butir." />
                  <InputGroup label="Varians Skor Total (σ²x)" value={totalVar} onChange={setTotalVar} help="Varians dari jumlah seluruh skor responden." />
               </div>
            </div>

            <div className="flex flex-col gap-6">
               <div className="bg-[#5B507A] p-10 rounded-[48px] shadow-xl text-white text-center">
                  <div className="text-[10px] font-bold text-[#FFDBC5] uppercase tracking-widest mb-4">Hasil Koefisien Reliabilitas</div>
                  <div className="text-6xl font-bold mb-6">{calculateAlpha().toFixed(3)}</div>
                  <div className={`inline-flex px-6 py-2 rounded-full text-sm font-bold ${calculateAlpha() >= 0.7 ? 'bg-green-500/20 text-green-300' : 'bg-rose-500/20 text-rose-300'}`}>
                    {calculateAlpha() >= 0.7 ? 'Reliabel (Good)' : 'Kurang Reliabel'}
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[32px] border border-[#F0EBE3] shadow-sm">
                  <div className="flex gap-3 items-start">
                    <Info size={20} className="text-[#9E86E0] shrink-0 mt-1" />
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Cronbach&apos;s Alpha mengukur konsistensi internal. Umumnya nilai di atas <strong>0.70</strong> dianggap cukup baik untuk penelitian psikologi.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm space-y-8">
               <h2 className="text-2xl font-bold text-[#5B507A]">Rumus Slovin</h2>
               
               <div className="space-y-6">
                  <InputGroup label="Populasi (N)" value={pop} onChange={setPop} help="Total seluruh anggota kelompok." />
                  <InputGroup label="Batas Toleransi Error (e%)" value={margin} onChange={setMargin} help="Semakin kecil %, semakin akurat hasilnya (Umumnya 1% atau 5%)." />
               </div>
            </div>

            <div className="bg-[#5B507A] p-10 rounded-[48px] shadow-xl text-white text-center flex flex-col items-center justify-center">
               <div className="text-[10px] font-bold text-[#FFDBC5] uppercase tracking-widest mb-4">Rekomendasi Jumlah Sampel (n)</div>
               <div className="text-7xl font-bold mb-4">{calculateSample()}</div>
               <p className="text-white/50 text-sm">Responden yang dibutuhkan.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function InputGroup({ label, value, onChange, help }: { label: string, value: number, onChange: (v: number) => void, help: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">{label}</label>
      <input 
        type="number" 
        value={isNaN(value) ? "" : value} 
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          onChange(isNaN(val) ? 0 : val);
        }}
        className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-6 py-4 outline-none focus:border-[#E0D7F5] transition-all text-[#5B507A] font-bold"
      />
      <p className="text-[10px] text-gray-400 italic px-2">{help}</p>
    </div>
  );
}
