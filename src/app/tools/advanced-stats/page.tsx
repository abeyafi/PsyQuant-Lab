"use client";

import { motion } from "framer-motion";
import { AdvancedStats } from "@/src/components/AdvancedStats";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

export default function AdvancedStatsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Header Area */}
      <div className="bg-[#5B507A] pt-20 pb-32 px-4 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/70 font-bold text-sm mb-8 hover:translate-x-[-4px] transition-transform hover:text-white"
          >
            <ArrowLeft size={18} /> Balik ke Dashboard
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                  <FileSpreadsheet size={28} />
               </div>
               <h1 className="text-4xl md:text-5xl font-bold text-white">
                 Advanced Stats
               </h1>
            </div>
            <p className="text-white/70 text-lg max-w-xl font-light">
              Punya banyak data di Excel? Upload saja ke sini. Kak Rara bantu hitung korelasi dan analisis metrik risetmu secara otomatis.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-16">
        <AdvancedStats />
      </div>
    </div>
  );
}
