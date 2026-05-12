"use client";

import { MODULES } from "@/src/lib/data";
import { BookOpen, Clock, ChevronRight, Brain } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950">
      <nav className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Brain size={20} />
            </div>
            <span className="font-bold text-primary">PsyQuant Lab</span>
          </Link>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-cozy-lavender border border-primary/20" />
             <span className="text-sm font-medium">Study Session</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Your Learning Journey</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pilihlah modul yang ingin kamu pelajari hari ini. Jangan terburu-buru, nikmati setiap langkahnya.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MODULES.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/modules/${module.id}`} className="group block h-full">
                <div className="cozy-card bg-white dark:bg-slate-900 border border-border h-full flex flex-col hover:border-primary/40">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {module.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      module.difficulty === "Beginner" ? "border-green-200 text-green-700 bg-green-50" : 
                      module.difficulty === "Intermediate" ? "border-orange-200 text-orange-700 bg-orange-50" :
                      "border-red-200 text-red-700 bg-red-50"
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {module.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
                    {module.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>Lesson</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{module.estimatedTime}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
