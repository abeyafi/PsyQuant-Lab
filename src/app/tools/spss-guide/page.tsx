"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, FileText, CheckCircle2, AlertCircle, Info, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SPSS_GUIDES = [
  {
    id: "descriptive",
    title: "Statistik Deskriptif",
    description: "Memahami tabel profil data responden.",
    content: [
      {
        header: "Tabel: Descriptive Statistics",
        fields: [
          { name: "N", meaning: "Jumlah total responden yang datanya valid." },
          { name: "Mean", meaning: "Rata-rata skor. Gunakan ini untuk menentukan kecenderungan jawaban responden." },
          { name: "Std. Deviation", meaning: "Sejauh mana data menyebar. Makin besar SD, makin beragam jawaban responden." }
        ],
        tips: "Jika SD > Mean, berarti datamu sangat bervariasi (mungkin ada outlier)."
      }
    ]
  },
  {
    id: "reliability",
    title: "Uji Reliabilitas",
    description: "Apakah skala penelitianmu konsisten?",
    content: [
      {
        header: "Tabel: Reliability Statistics",
        fields: [
          { name: "Cronbach's Alpha", meaning: "Nilai konsistensi internal. Standar minimal biasanya > 0.60 atau > 0.70." },
          { name: "N of Items", meaning: "Jumlah butir pernyataan dalam skala tersebut." }
        ],
        tips: "Jika Alpha rendah, cek tabel 'Item-Total Statistics' kolom 'Cronbach's Alpha if Item Deleted' untuk melihat item mana yang harus dibuang."
      }
    ]
  },
  {
    id: "correlation",
    title: "Korelasi Pearson",
    description: "Hubungan antara dua variabel.",
    content: [
      {
        header: "Tabel: Correlations",
        fields: [
          { name: "Pearson Correlation", meaning: "Kekuatan hubungan (-1 sampai +1). 0.1-0.3 (Lemah), 0.4-0.6 (Sedang), >0.7 (Kuat)." },
          { name: "Sig. (2-tailed)", meaning: "Signifikansi. Jika < 0.05, berarti hubungan tersebut nyata (signifikan)." }
        ],
        tips: "Tanda negatif (-) bukan berarti buruk, itu hanya menyatakan hubungan terbalik (misal: makin tinggi stres, makin rendah performa)."
      }
    ]
  },
  {
    id: "ttest",
    title: "Independent Samples T-Test",
    description: "Membandingkan rata-rata dari 2 kelompok berbeda.",
    content: [
      {
        header: "Tabel: Independent Samples Test",
        fields: [
          { name: "Levene's Test (Sig.)", meaning: "Cek homogenitas. Jika > 0.05, gunakan baris 'Equal variances assumed'." },
          { name: "t", meaning: "Nilai hitung t. Makin besar, makin besar perbedaan antar kelompok." },
          { name: "Sig. (2-tailed)", meaning: "Jika < 0.05, ada perbedaan signifikan antara kedua kelompok tersebut." }
        ],
        tips: "Selalu lihat tabel 'Group Statistics' untuk melihat kelompok mana yang memiliki rata-rata (mean) lebih tinggi."
      }
    ]
  }
];

export default function SPSSGuidePage() {
  const router = useRouter();
  const [selectedGuide, setSelectedGuide] = useState(SPSS_GUIDES[0]);

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[#5B507A] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5B507A] rounded-lg flex items-center justify-center text-white">
              <BookOpen size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Panduan Interpretasi SPSS</span>
          </div>

          <div className="w-20"></div> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#5B507A] mb-4">Cheat Sheet SPSS</h1>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Nggak usah bingung lihat angka-angka di output SPSS. Fokus pada kolom-kolom penting ini untuk narasi skripsimu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {SPSS_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                  selectedGuide.id === guide.id 
                    ? "bg-[#5B507A] text-white shadow-lg" 
                    : "bg-white text-gray-500 hover:bg-[#F5F2FF] hover:text-[#5B507A] border border-[#F0EBE3]"
                }`}
              >
                {guide.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              key={selectedGuide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#F0EBE3] rounded-[40px] p-8 md:p-10 shadow-sm"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#5B507A] mb-2">{selectedGuide.title}</h2>
                <p className="text-gray-400 italic text-sm">{selectedGuide.description}</p>
              </div>

              {selectedGuide.content.map((item, idx) => (
                <div key={idx} className="space-y-8">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#9E86E0] uppercase tracking-wider mb-4">
                      <FileText size={16} /> {item.header}
                    </h3>
                    
                    <div className="space-y-3">
                      {item.fields.map((field, fIdx) => (
                        <div key={fIdx} className="bg-[#FDFBF9] border border-[#F0EBE3] p-5 rounded-2xl flex flex-col md:flex-row md:items-start gap-4">
                          <div className="min-w-[140px]">
                            <code className="bg-[#E0D7F5] text-[#5B507A] px-3 py-1 rounded-lg text-xs font-bold">
                              {field.name}
                            </code>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {field.meaning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FFF4ED] border border-orange-100 p-6 rounded-[32px] flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-400 shadow-sm">
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Tips Kak Rara</p>
                      <p className="text-sm text-[#8B6E5F] leading-relaxed italic">
                        &quot;{item.tips}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* General Advice */}
            <div className="bg-[#E8F6FF] border border-[#D1E9F6] p-8 rounded-[40px] flex gap-6">
               <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#4A86A8] shadow-sm">
                  <Info size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-[#4A86A8] mb-2">Aturan Emas p-value</h4>
                  <p className="text-sm text-[#4A86A8]/80 leading-relaxed">
                    Hampir di semua uji statistik psikologi, kuncinya ada di <strong>Sig. (p-value)</strong>. <br /><br />
                    Jika Sig <strong> &lt; 0.05</strong> = Signifikan (H1 diterima). <br />
                    Jika Sig <strong> &gt; 0.05</strong> = Tidak Signifikan (H0 diterima).
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-border mt-12 mb-20 text-center">
         <p className="text-sm text-gray-400 mb-2">Masih bingung dengan angka-angkanya?</p>
         <Link href="/modules" className="font-bold text-primary hover:underline">Pelajari Dasar Statistika di Modul</Link>
      </footer>
    </div>
  );
}
