"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { Calculator, Info, RotateCcw, TrendingUp, Hash, Layers } from "lucide-react";

export function StatsCalculator() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<number[]>([]);

  const stats = useMemo(() => {
    if (data.length === 0) return null;

    const sorted = [...data].sort((a, b) => a - b);
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;

    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 
      ? sorted[mid] 
      : (sorted[mid - 1] + sorted[mid]) / 2;

    const counts: Record<number, number> = {};
    data.forEach(n => counts[n] = (counts[n] || 0) + 1);
    let maxCount = 0;
    let modes: number[] = [];
    Object.entries(counts).forEach(([val, count]) => {
      if (count > maxCount) {
        maxCount = count;
        modes = [Number(val)];
      } else if (count === maxCount) {
        modes.push(Number(val));
      }
    });

    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    const stdDev = Math.sqrt(variance);

    // Chart data (Frequency)
    const frequencyData = Object.entries(counts)
      .map(([value, count]) => ({ value: Number(value), count }))
      .sort((a, b) => a.value - b.value);

    return { mean, median, modes, stdDev, frequencyData, count: data.length };
  }, [data]);

  const handleProcess = () => {
    const numbers = input
      .split(/[\s,]+/)
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));
    setData(numbers);
  };

  const handleReset = () => {
    setInput("");
    setData([]);
  };

  return (
    <div className="space-y-8">
      {/* Input Area */}
      <section className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-[#F0EBE3]">
        <div className="flex items-center gap-3 mb-6 text-[#5B507A]">
          <div className="w-10 h-10 bg-[#F5F2FF] rounded-xl flex items-center justify-center">
            <Calculator size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Input Data</h2>
            <p className="text-xs text-gray-400">Masukkan angka dipisahkan spasi atau koma</p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="E.g. 70, 85, 90, 70, 65, 100..."
          className="w-full h-32 bg-[#FDFBF7] border-2 border-[#F0EBE3] focus:border-[#E0D7F5] rounded-[24px] p-6 text-sm resize-none outline-none transition-all placeholder:text-gray-300"
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleProcess}
            className="bg-[#5B507A] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-[#483F61] transition-all"
          >
            Hitung Sekarang
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 border border-[#F0EBE3] px-6 py-3 rounded-full font-bold text-[#5B507A] hover:bg-gray-50 transition-all text-sm"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </section>

      {stats && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Results Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                icon={<TrendingUp size={18} />} 
                label="Mean" 
                value={stats.mean.toFixed(2)} 
                color="bg-[#F5F2FF] text-[#9E86E0]" 
              />
              <StatCard 
                icon={<Layers size={18} />} 
                label="Median" 
                value={stats.median.toString()} 
                color="bg-[#E8F6FF] text-[#4A86A8]" 
              />
              <StatCard 
                icon={<Hash size={18} />} 
                label="Modus" 
                value={stats.modes.join(", ")} 
                color="bg-[#FFF4ED] text-orange-400" 
              />
              <StatCard 
                icon={<Info size={18} />} 
                label="Std. Deviasi" 
                value={stats.stdDev.toFixed(2)} 
                color="bg-[#F0FDF4] text-green-600" 
              />
            </div>

            {/* Explanation Box */}
            <div className="p-6 bg-white border border-[#F0EBE3] rounded-[32px] shadow-sm italic text-sm text-gray-500 leading-relaxed">
              <p>
                <span className="font-bold text-[#5B507A] block mb-2 not-italic">Interpretasi Kak Rara:</span>
                &quot;Dari {stats.count} data yang kamu masukkan, rata-ratanya ({stats.mean.toFixed(2)}) menunjukkan skor tipikal riset kamu. 
                Penyebarannya (SD: {stats.stdDev.toFixed(2)}) bilang kalau data kamu {stats.stdDev > 10 ? 'cukup bervariasi ya' : 'cukup seragam'}.&quot;
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-slate-900 border border-[#F0EBE3] rounded-[32px] p-8 shadow-sm">
             <h3 className="text-sm font-bold text-[#5B507A] mb-6 uppercase tracking-wider">Distribusi Frekuensi</h3>
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.frequencyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE3" />
                    <XAxis dataKey="value" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} />
                    <Tooltip 
                      cursor={{fill: '#F9F8FF'}}
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {stats.frequencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value === stats.mean ? '#9E86E0' : '#E0D7F5'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-[#F0EBE3] shadow-sm">
      <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#5B507A]">{value}</p>
    </div>
  );
}
