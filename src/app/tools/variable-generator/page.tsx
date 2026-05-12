"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Download, Copy, FileText, Check } from "lucide-react";
import { useRouter } from "next/navigation";

type VariableRow = {
  id: string;
  variable: string;
  definition: string;
  dimensions: string;
  indicators: string;
  scale: string;
};

export default function VariableGeneratorPage() {
  const router = useRouter();
  const [rows, setRows] = useState<VariableRow[]>([
    {
      id: "1",
      variable: "Self-Esteem",
      definition: "Evaluasi subjektif individu terhadap keberhargaan dirinya sendiri.",
      dimensions: "Self-worth, Self-competence",
      indicators: "Merasa berguna, Percaya diri, Menghargai diri",
      scale: "Likert (Ordinal)"
    }
  ]);
  const [copied, setCopied] = useState(false);

  const addRow = () => {
    const newRow = {
      id: Math.random().toString(36).substr(2, 9),
      variable: "",
      definition: "",
      dimensions: "",
      indicators: "",
      scale: ""
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    if (rows.length > 1) {
      setRows(rows.filter(r => r.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof VariableRow, value: string) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const copyAsMarkdown = () => {
    if (rows.every(r => !r.variable)) {
      alert("Isi data dulu ya!");
      return;
    }
    let text = "| Variabel | Definisi Operasional | Dimensi | Indikator | Skala |\n";
    text += "| --- | --- | --- | --- | --- |\n";
    rows.forEach(r => {
      text += `| ${r.variable || "-"} | ${r.definition || "-"} | ${r.dimensions || "-"} | ${r.indicators || "-"} | ${r.scale || "-"} |\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyToExcel = () => {
    // Generate TSV for Excel/Word
    let tsv = "Variabel\tDefinisi Operasional\tDimensi\tIndikator\tSkala\n";
    rows.forEach(r => {
      tsv += `${r.variable}\t${r.definition}\t${r.dimensions}\t${r.indicators}\t${r.scale}\n`;
    });
    navigator.clipboard.writeText(tsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearTable = () => {
    if (confirm("Hapus semua data di tabel?")) {
      setRows([
        {
          id: "1",
          variable: "",
          definition: "",
          dimensions: "",
          indicators: "",
          scale: ""
        }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-slate-950 flex flex-col">
      <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-[#5B507A] transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
              <FileText size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Variable Builder Lab</span>
          </div>

          <div className="flex items-center gap-3">
             <button 
                onClick={clearTable}
                className="flex items-center gap-2 text-rose-400 hover:text-rose-500 px-3 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <Trash2 size={14} /> Clear
              </button>
             <button 
                onClick={copyToExcel}
                className="flex items-center gap-2 bg-[#F0FDF4] text-green-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-100 transition-all border border-green-100"
              >
                <FileText size={14} /> Excel Copy
              </button>
             <button 
                onClick={copyAsMarkdown}
                className="flex items-center gap-2 bg-[#F5F2FF] text-[#9E86E0] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#E0D7F5] transition-all"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "MD Table"}
              </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="mb-12 text-center">
           <h1 className="text-3xl font-bold text-[#5B507A] mb-2">Tabel Operasional Variabel</h1>
           <p className="text-gray-500 text-sm italic">“Rancang struktur variabel skripsimu dengan rapi di sini.”</p>
        </div>

        <div className="bg-white rounded-[40px] border border-[#F0EBE3] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#FDFBF9] border-b border-[#F0EBE3]">
                  <th className="p-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[20%]">Variabel</th>
                  <th className="p-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[25%]">Definisi Operasional</th>
                  <th className="p-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[15%]">Dimensi</th>
                  <th className="p-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[20%]">Indikator</th>
                  <th className="p-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[10%]">Skala</th>
                  <th className="p-6 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[10%]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F2FF]">
                <AnimatePresence>
                  {rows.map((row) => (
                    <motion.tr 
                      key={row.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group hover:bg-[#FDFBF9] transition-colors"
                    >
                      <td className="p-4">
                        <textarea 
                          value={row.variable}
                          onChange={(e) => updateRow(row.id, "variable", e.target.value)}
                          placeholder="Nama Variabel..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold text-[#5B507A] placeholder:text-gray-300 min-h-[60px] resize-none"
                        />
                      </td>
                      <td className="p-4 border-l border-[#F5F2FF]">
                        <textarea 
                          value={row.definition}
                          onChange={(e) => updateRow(row.id, "definition", e.target.value)}
                          placeholder="Menurut (X)..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#7D739E] placeholder:text-gray-300 min-h-[60px] resize-none"
                        />
                      </td>
                      <td className="p-4 border-l border-[#F5F2FF]">
                        <textarea 
                          value={row.dimensions}
                          onChange={(e) => updateRow(row.id, "dimensions", e.target.value)}
                          placeholder="Dimensi yang dicakup..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#7D739E] placeholder:text-gray-300 min-h-[60px] resize-none"
                        />
                      </td>
                      <td className="p-4 border-l border-[#F5F2FF]">
                        <textarea 
                          value={row.indicators}
                          onChange={(e) => updateRow(row.id, "indicators", e.target.value)}
                          placeholder="Contoh perilaku/item..."
                          className="w-full bg-transparent border-none focus:ring-0 text-sm text-[#7D739E] placeholder:text-gray-300 min-h-[60px] resize-none"
                        />
                      </td>
                      <td className="p-4 border-l border-[#F5F2FF]">
                        <input 
                          type="text"
                          value={row.scale}
                          onChange={(e) => updateRow(row.id, "scale", e.target.value)}
                          placeholder="e.g. Likert"
                          className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-[#9E86E0] placeholder:text-gray-300"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => deleteRow(row.id)}
                          className="p-2 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-[#FDFBF9] border-t border-[#F0EBE3] flex justify-center">
            <button 
              onClick={addRow}
              className="flex items-center gap-2 bg-white border border-[#E0D7F5] text-[#9E86E0] px-6 py-3 rounded-2xl text-sm font-bold hover:shadow-md transition-all active:scale-95"
            >
              <Plus size={18} /> Tambah Variabel
            </button>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-[#5B507A] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Download size={80} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Export ke Skripsi</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Tabel di atas sudah mengikuti struktur standar penulisan skripsi psikologi di Indonesia. Kamu bisa copy sebagai table markdown untuk dipindah ke dokumen kamu.
              </p>
            </div>
            <button className="bg-white text-[#5B507A] px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 whitespace-nowrap">
              Coming Soon: Berkas .rtf
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
