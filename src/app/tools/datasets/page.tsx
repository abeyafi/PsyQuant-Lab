"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Database, Download, FileJson, Search, ExternalLink, Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";

const DATASETS = [
  {
    title: "Akademik Burnout 2024",
    n: 10,
    metrics: "Motivasi, IPK, Stres",
    desc: "Dataset survey mahasiswa tingkat akhir mengenai kelelahan akademik.",
    category: "Pendidikan",
    csv: "id,motivasi,stres,ipk\n1,78,65,3.4\n2,82,50,3.6\n3,45,88,2.8\n4,60,70,3.1\n5,90,40,3.9\n6,55,75,2.9\n7,85,55,3.7\n8,40,92,2.5\n9,70,60,3.3\n10,65,72,3.0"
  },
  {
    title: "Self-Esteem & Sosmed",
    n: 10,
    metrics: "Harga diri, FoMO, Durasi",
    desc: "Hubungan antara penggunaan IG dengan tingkat harga diri remaja.",
    category: "Sosial",
    csv: "id,self_esteem,fomo,durasi_jam\n1,35,45,4\n2,42,30,2\n3,28,55,6\n4,31,48,5\n5,45,20,1\n6,25,60,7\n7,38,35,3\n8,20,72,8\n9,33,40,4\n10,29,52,5"
  },
  {
    title: "Kualitas Tidur & Cemas",
    n: 10,
    metrics: "PSQI, HARS, Kafein",
    desc: "Korelasi antara pola tidur dan kecemasan selama minggu ujian.",
    category: "Klinis",
    csv: "id,psqi_skor,hars_skor,kafein_mg\n1,8,12,200\n2,5,8,50\n3,10,18,350\n4,7,14,150\n5,4,6,0\n6,12,22,400\n7,6,10,80\n8,14,28,500\n9,9,15,250\n10,7,12,120"
  },
  {
    title: "Work-Life Balance PIO",
    n: 10,
    metrics: "WLB, Burnout, Job Sat.",
    desc: "Dataset psikologi industri mengenai keseimbangan kerja karyawan WFH.",
    category: "PIO",
    csv: "id,wlb_score,burnout,job_sat\n1,75,40,85\n2,82,30,90\n3,55,65,60\n4,68,50,75\n5,90,20,95\n6,45,80,50\n7,78,35,88\n8,40,90,45\n9,72,45,80\n10,60,70,65"
  }
];

export default function DatasetSandboxPage() {
  const router = useRouter();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const downloadCSV = (ds: typeof DATASETS[0]) => {
    const blob = new Blob([ds.csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${ds.title.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyCSV = (ds: typeof DATASETS[0], idx: number) => {
    navigator.clipboard.writeText(ds.csv);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
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
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[#5B507A]">
              <Database size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Dataset Sandbox</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-bold text-[#5B507A] mb-4">Latihan Tanpa Ribet</h1>
           <p className="text-gray-500 max-w-lg mx-auto leading-relaxed italic">
             &quot;Main statistik itu asik kalau datanya ada. Pakai dataset dummy ini buat latihan di SPSS, JASP, atau R kamu.&quot;
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {DATASETS.map((ds, idx) => (
             <motion.div 
               key={ds.title}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white border-2 border-[#F0EBE3] rounded-[40px] p-8 hover:border-[#E0D7F5] transition-all hover:shadow-xl group"
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="bg-[#F5F2FF] p-3 rounded-2xl text-[#9E86E0] group-hover:bg-[#9E86E0] group-hover:text-white transition-colors">
                      <FileJson size={24} />
                   </div>
                   <span className="text-[10px] font-bold text-[#9E86E0] bg-[#F5F2FF] px-3 py-1 rounded-full uppercase tracking-wider">
                     {ds.category}
                   </span>
                </div>

                <h3 className="text-xl font-bold text-[#5B507A] mb-2">{ds.title}</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                   {ds.desc}
                </p>

                <div className="flex items-center gap-6 mb-8 py-4 border-y border-dashed border-[#F0EBE3]">
                   <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sampel (n)</span>
                      <span className="text-lg font-bold text-[#5B507A]">{ds.n}</span>
                   </div>
                   <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Variabel</span>
                      <span className="text-lg font-bold text-[#5B507A]">{ds.metrics}</span>
                   </div>
                </div>

                <div className="flex gap-3">
                   <button 
                    onClick={() => downloadCSV(ds)}
                    className="flex-1 bg-[#5B507A] text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                   >
                      <Download size={16} /> Unduh CSV
                   </button>
                   <button 
                    onClick={() => copyCSV(ds, idx)}
                    className="w-12 h-12 border border-[#F0EBE3] rounded-2xl flex items-center justify-center text-gray-400 hover:text-[#5B507A] hover:bg-[#FDFBF9] transition-all"
                   >
                      {copiedIndex === idx ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                   </button>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="mt-20 p-12 bg-[#FFDBC5]/20 rounded-[56px] border border-[#FFDBC5]/30 text-center relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#5B507A] mb-4">Ingin Publikasi Data Kamu?</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                Open Science itu keren. Dengan membagi dataset (anonim!), kamu membantu ilmu pengetahuan psikologi berkembang lebih cepat.
              </p>
           </div>
        </div>
      </main>
    </div>
  );
}
