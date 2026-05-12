"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, CheckSquare, Plus, Trash2, Clock, Map } from "lucide-react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Milestone = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function PlannerPage() {
  const router = useRouter();
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "Proposal (Bab 1-3)",
      tasks: [
        { id: "t1", text: "Mencari Fenomena Sosial/Gap", completed: true },
        { id: "t2", text: "Studi Literatur Awal", completed: false },
        { id: "t3", text: "Drafting Bab 1 (Pendahuluan)", completed: false }
      ]
    },
    {
      id: "2",
      title: "Pengambilan Data",
      tasks: [
        { id: "t4", text: "Izin Penelitian / Ethical Clearance", completed: false },
        { id: "t5", text: "Try Out Alat Ukur (Uji Validitas/Reliabilitas)", completed: false },
        { id: "t6", text: "Sebar Kuesioner Final", completed: false }
      ]
    }
  ]);

  const toggleTask = (mId: string, tId: string) => {
    setMilestones(milestones.map(m => {
      if (m.id === mId) {
        return {
          ...m,
          tasks: m.tasks.map(t => t.id === tId ? { ...t, completed: !t.completed } : t)
        };
      }
      return m;
    }));
  };

  const addTask = (mId: string) => {
    setMilestones(milestones.map(m => {
      if (m.id === mId) {
        return {
          ...m,
          tasks: [...m.tasks, { id: Math.random().toString(), text: "Tugas baru...", completed: false }]
        };
      }
      return m;
    }));
  };

  const totalTasks = milestones.reduce((acc, m) => acc + m.tasks.length, 0);
  const completedTasks = milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.completed).length, 0);
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
            <div className="w-8 h-8 bg-[#E8F6FF] rounded-lg flex items-center justify-center text-[#4A86A8]">
              <Calendar size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Skripsi Roadmap</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm">
           <div>
              <h1 className="text-3xl font-bold text-[#5B507A] mb-1">Timeline Planner</h1>
              <p className="text-gray-400 text-sm">Target mingguan dan progres skripsimu.</p>
           </div>
           <div className="text-center">
              <div className="text-4xl font-black text-[#9E86E0] mb-1">{Math.round(progress)}%</div>
              <div className="w-40 h-2 bg-[#F5F2FF] rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-[#9E86E0]" 
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   transition={{ duration: 1 }}
                 />
              </div>
           </div>
        </div>

        <div className="space-y-8">
           {milestones.map((milestone, mIdx) => (
             <div key={milestone.id} className="relative pl-8 border-l-2 border-[#F0EBE3] pb-4">
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white border-4 border-[#9E86E0] shadow-sm" />
                
                <div className="bg-white p-8 rounded-[32px] border border-[#F0EBE3] shadow-sm hover:shadow-md transition-all">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-[#5B507A]">{milestone.title}</h3>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Phase {mIdx + 1}</span>
                   </div>

                   <div className="space-y-4">
                      {milestone.tasks.map((task) => (
                        <div 
                          key={task.id}
                          onClick={() => toggleTask(milestone.id, task.id)}
                          className="flex items-center gap-4 group cursor-pointer"
                        >
                           <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-[#9E86E0] border-[#9E86E0]' : 'border-[#F0EBE3] group-hover:border-[#E0D7F5]'}`}>
                              {task.completed && <CheckSquare size={14} className="text-white" />}
                           </div>
                           <span className={`text-sm transition-all ${task.completed ? 'text-gray-300 line-through' : 'text-[#7D739E] font-medium'}`}>
                              {task.text}
                           </span>
                        </div>
                      ))}
                      <button 
                        onClick={() => addTask(milestone.id)}
                        className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#9E86E0] hover:text-[#5B507A] transition-colors"
                      >
                        <Plus size={14} /> TAMBAH CHECKLIST
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white px-6 py-3 rounded-full border border-[#F0EBE3]">
               <Clock size={14} /> &quot;Pelan-pelan asal konsisten ya...&quot;
            </div>
        </div>
      </main>
    </div>
  );
}
