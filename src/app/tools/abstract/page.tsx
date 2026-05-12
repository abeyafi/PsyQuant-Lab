"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlignLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AbstractPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const isHealthy = wordCount >= 150 && wordCount <= 250;

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
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <AlignLeft size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Abstract Word Counter</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm">
                 <h2 className="text-xl font-bold text-[#5B507A] mb-4">Paste Abstrak Kamu</h2>
                 <textarea 
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   placeholder="Abstrak harus mencakup: Tujuan, Metode, Hasil, dan Kesimpulan..."
                   className="w-full h-[400px] bg-[#FDFBF9] border border-[#F0EBE3] rounded-3xl p-8 outline-none focus:border-[#E0D7F5] transition-all text-sm leading-relaxed text-[#5B507A]"
                 />
              </div>
           </div>

           <div className="space-y-6">
              <div className={`p-10 rounded-[40px] shadow-xl text-center transition-all ${isHealthy ? 'bg-green-500 text-white' : 'bg-white border-2 border-[#F0EBE3]'}`}>
                 <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${isHealthy ? 'text-green-100' : 'text-gray-400'}`}>Word Count</span>
                 <h3 className={`text-6xl font-black mb-4 ${isHealthy ? 'text-white' : 'text-[#5B507A]'}`}>{wordCount}</h3>
                 <p className={`text-xs font-bold px-4 py-2 rounded-full inline-block ${isHealthy ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-500'}`}>
                    {isHealthy ? "APA Compliant (Perfect!)" : wordCount < 150 ? "Terlalu Pendek" : "Terlalu Panjang (Max 250)"}
                 </p>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-[#F0EBE3] shadow-sm space-y-4">
                 <div className="flex items-center gap-3 text-[#5B507A]">
                    <ShieldCheck size={20} className="text-green-500" />
                    <h4 className="text-sm font-bold">Standard APA 7</h4>
                 </div>
                 <p className="text-xs text-gray-400 leading-relaxed text-justify">
                    Abstrak skripsi psikologi biasanya berkisar antara 150 - 250 kata. Pastikan tidak ada sitasi di dalam abstrak dan tuliskan kata kunci (keywords) di bagian bawah.
                 </p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
