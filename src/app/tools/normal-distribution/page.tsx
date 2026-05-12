"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Info, MousePointer2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const generateNormalData = (mean: number, sd: number) => {
  const data = [];
  const start = mean - 4 * sd;
  const end = mean + 4 * sd;
  const steps = 100;
  const stepSize = (end - start) / steps;

  for (let i = 0; i <= steps; i++) {
    const x = start + i * stepSize;
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(sd, 2));
    const y = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    data.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(4)) });
  }
  return data;
};

export default function NormalDistributionPage() {
  const router = useRouter();
  const [mean, setMean] = useState(100);
  const [sd, setSd] = useState(15);

  const data = useMemo(() => generateNormalData(mean, sd), [mean, sd]);

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
              <Zap size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Bell Curve Lab</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Controls */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-[#F0EBE3] shadow-sm space-y-8">
              <h1 className="text-2xl font-bold text-[#5B507A] flex items-center gap-2">
                Eksplorasi Kurva
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Mean (μ)</label>
                    <span className="text-sm font-mono text-[#9E86E0] bg-[#F5F2FF] px-2 py-1 rounded-md">{mean}</span>
                  </div>
                  <input 
                    type="range" min="0" max="200" step="1" 
                    value={mean} onChange={(e) => setMean(Number(e.target.value))}
                    className="w-full accent-[#9E86E0]"
                  />
                  <p className="text-[10px] text-gray-400">Pusat dari kurva normal.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Standard Deviation (σ)</label>
                    <span className="text-sm font-mono text-[#9E86E0] bg-[#F5F2FF] px-2 py-1 rounded-md">{sd}</span>
                  </div>
                  <input 
                    type="range" min="1" max="50" step="1" 
                    value={sd} onChange={(e) => setSd(Number(e.target.value))}
                    className="w-full accent-[#9E86E0]"
                  />
                  <p className="text-[10px] text-gray-400">Seberapa lebar sebaran datanya.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-[#F0EBE3]">
                <div className="bg-[#FDFBF9] p-4 rounded-2xl flex items-start gap-3">
                  <Info className="text-[#9E86E0] shrink-0" size={18} />
                  <p className="text-xs text-[#7D739E] leading-relaxed">
                    Perhatikan: Saat SD <strong>mengecil</strong>, kurva jadi makin tinggi & lancip (Leptokurtik). Saat SD <strong>membesar</strong>, kurva jadi makin lebar & datar (Platikurtik).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#5B507A] p-8 rounded-[32px] text-white shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                Kenapa Ini Penting?
              </h3>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                Dunia psikologi sangat mengandalkan asumsi normalitas. Jika data kita normal, kita bisa menggunakan uji parametrik yang lebih &quot;powerfull&quot;.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFDBC5]">
                <MousePointer2 size={14} /> Geser slider untuk melihat efeknya!
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm flex-1 min-h-[400px] flex flex-col">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Visualisasi Real-time</h3>
              </div>
              
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9E86E0" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9E86E0" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE3" />
                    <XAxis 
                      dataKey="x" 
                      type="number" 
                      domain={['auto', 'auto']} 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ fontWeight: 'bold', color: '#5B507A' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="y" 
                      stroke="#9E86E0" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorY)" 
                      animationDuration={500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-[#F0EBE3] p-6 rounded-[32px] text-center">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Max Height</span>
                <span className="text-2xl font-bold text-[#5B507A]">
                  {sd > 0 ? (1 / (sd * Math.sqrt(2 * Math.PI))).toFixed(4) : "0.0000"}
                </span>
              </div>
              <div className="bg-white border border-[#F0EBE3] p-6 rounded-[32px] text-center">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Symmetry</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
