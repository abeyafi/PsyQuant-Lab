"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookMarked, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import glossaryData from "@/src/lib/glossary.json";

export default function GlossaryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(glossaryData.glossary.map(item => item.category)))];

  const filteredGlossary = glossaryData.glossary.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950 flex flex-col">
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
            <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center text-white">
              <BookMarked size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Kamus Psikologi</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5B507A] mb-4">Glossary Lab</h1>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Temukan definisi istilah statistik dan metodologi riset psikologi dengan cepat di sini.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Cari istilah atau definisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#F0EBE3] rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-[#E0D7F5] transition-all shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto bg-white border border-[#F0EBE3] rounded-2xl pl-12 pr-10 py-4 outline-none appearance-none cursor-pointer focus:border-[#E0D7F5] transition-all shadow-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map((item, idx) => (
              <motion.div 
                key={item.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-[32px] border border-[#F0EBE3] hover:border-[#E0D7F5] transition-all shadow-sm group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#5B507A] group-hover:text-[#9E86E0] transition-colors">
                    {item.term}
                  </h3>
                  <span className="text-[10px] font-bold text-[#9E86E0] bg-[#F5F2FF] px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.definition}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-[40px] border border-dashed border-[#F0EBE3]">
              <p className="text-gray-400 font-medium">Wah, istilah yang kamu cari belum ketemu...</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-4xl mx-auto w-full px-6 py-12 text-center">
         <p className="text-xs text-gray-400 italic">
           “Tahu artinya, paham logikanya.”
         </p>
      </footer>
    </div>
  );
}
