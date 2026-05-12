"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Copy, Check, Info, FileEdit } from "lucide-react";
import { useRouter } from "next/navigation";

type HType = "relationship" | "difference" | "influence";

export default function HypothesisLabPage() {
  const router = useRouter();
  const [type, setType] = useState<HType>("relationship");
  const [v1, setV1] = useState("Kecemasan");
  const [v2, setV2] = useState("Kualitas Tidur");
  const [v3, setV3] = useState("Efikasi Diri"); // For more complex ones
  const [copied, setCopied] = useState(false);

  const getHypothesis = () => {
    if (type === "relationship") {
      return `Terdapat hubungan yang signifikan antara ${v1} dan ${v2} pada mahasiswa psikologi.`;
    }
    if (type === "difference") {
      return `Terdapat perbedaan ${v1} yang signifikan antara kelompok yang diberikan ${v2} dan kelompok kontrol.`;
    }
    if (type === "influence") {
      return `Terdapat pengaruh yang signifikan dari ${v1} terhadap ${v2} yang dimoderasi oleh ${v3}.`;
    }
    return "";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getHypothesis());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Hypothesis Builder</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm">
              <h2 className="text-2xl font-bold text-[#5B507A] mb-8 flex items-center gap-2">
                <FileEdit size={24} className="text-[#9E86E0]" /> Input Variabel
              </h2>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Jenis Hipotesis</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {["relationship", "difference", "influence"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t as HType)}
                        className={`py-3 px-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          type === t 
                            ? "bg-[#5B507A] text-white shadow-md" 
                            : "bg-[#FDFBF9] border border-[#F0EBE3] text-gray-400 hover:text-[#5B507A]"
                        }`}
                      >
                        {t === "influence" ? "Pengaruh" : t === "difference" ? "Perbedaan" : "Hubungan"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Variabel 1 (Independent/X)</label>
                    <input 
                      type="text" value={v1} onChange={(e) => setV1(e.target.value)}
                      className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-6 py-4 outline-none focus:border-[#E0D7F5] transition-all text-[#5B507A] font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Variabel 2 (Dependent/Y)</label>
                    <input 
                      type="text" value={v2} onChange={(e) => setV2(e.target.value)}
                      className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-6 py-4 outline-none focus:border-[#E0D7F5] transition-all text-[#5B507A] font-medium"
                    />
                  </div>
                  {type === "influence" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Variabel 3 (Moderator/Z)</label>
                      <input 
                        type="text" value={v3} onChange={(e) => setV3(e.target.value)}
                        className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-6 py-4 outline-none focus:border-[#E0D7F5] transition-all text-[#5B507A] font-medium"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#9E86E0]/10 p-6 rounded-[32px] border border-[#9E86E0]/20 flex items-start gap-4">
              <Info className="text-[#9E86E0] shrink-0 mt-1" size={24} />
              <p className="text-xs text-[#5B507A]/70 leading-relaxed">
                Hipotesis yang baik harus menyatakan hubungan antara dua variabel atau lebih secara deklaratif dan dapat diuji (testable).
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white p-10 rounded-[48px] border-2 border-[#E0D7F5] shadow-xl relative overflow-hidden flex-1 flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles size={120} />
              </div>
              
              <div className="mb-8">
                <span className="text-[10px] font-bold text-[#9E86E0] uppercase tracking-[0.2em] bg-[#F5F2FF] px-4 py-1 rounded-full">HASIL TEMPLATE</span>
              </div>

              <h2 className="text-3xl font-bold text-[#5B507A] leading-relaxed mb-10 max-w-sm">
                &quot;{getHypothesis()}&quot;
              </h2>

              <button 
                onClick={handleCopy}
                className="w-full bg-[#5B507A] text-white py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all active:scale-[0.98] group"
              >
                {copied ? <Check size={24} /> : <Copy size={24} className="group-hover:-translate-y-1 transition-transform" />}
                {copied ? "Berhasil Disalin!" : "Gunakan Hipotesis Ini"}
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
