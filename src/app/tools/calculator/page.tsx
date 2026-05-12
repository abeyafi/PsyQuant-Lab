"use client";

import { motion } from "framer-motion";
import { StatsCalculator } from "@/src/components/StatsCalculator";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Header Area */}
      <div className="bg-gradient-to-tr from-[#E0D7F5] to-[#FFDBC5] pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#5B507A] font-bold text-sm mb-8 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={18} /> Balik ke Dashboard
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#5B507A] mb-4 flex items-center gap-3">
              Kalkulator Riset <Sparkles className="text-[#9E86E0]" />
            </h1>
            <p className="text-[#5B507A]/70 text-lg max-w-xl font-light">
              Masukkan data penelitianmu di sini, dan biarkan Kak Rara hitung nilai tipikal dan penyebarannya secara instan.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-16">
        <StatsCalculator />
      </div>
    </div>
  );
}
