"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileUp, FileSpreadsheet, AlertCircle, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";
import * as XLSX from "xlsx";

interface DataRow {
  [key: string]: any;
}

export function AdvancedStats() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError("");

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws) as DataRow[];

        if (jsonData.length === 0) {
          setError("File kosong atau tidak valid.");
          return;
        }

        setData(jsonData);
        setColumns(Object.keys(jsonData[0]));
      } catch (err) {
        setError("Gagal membaca file. Pastikan formatnya .xlsx atau .csv");
      }
    };
    reader.readAsBinaryString(file);
  };

  const [selectedX, setSelectedX] = useState("");
  const [selectedY, setSelectedY] = useState("");

  const calculateCorrelation = (x: string, y: string) => {
    const pairs = data.map(d => ({
      x: parseFloat(d[x]),
      y: parseFloat(d[y])
    })).filter(p => !isNaN(p.x) && !isNaN(p.y));

    if (pairs.length < 2) return null;

    const n = pairs.length;
    const xData = pairs.map(p => p.x);
    const yData = pairs.map(p => p.y);
    
    const sumX = xData.reduce((a, b) => a + b, 0);
    const sumY = yData.reduce((a, b) => a + b, 0);
    const sumXY = pairs.reduce((a, p) => a + (p.x * p.y), 0);
    const sumX2 = xData.reduce((a, b) => a + (b * b), 0);
    const sumY2 = yData.reduce((a, b) => a + (b * b), 0);

    const numerator = (n * sumXY) - (sumX * sumY);
    const xPart = n * sumX2 - sumX * sumX;
    const yPart = n * sumY2 - sumY * sumY;
    const denominator = Math.sqrt(Math.max(0, xPart) * Math.max(0, yPart));

    if (denominator === 0 || isNaN(denominator)) return 0;
    const result = numerator / denominator;
    return isNaN(result) ? 0 : result;
  };

  const correlation = selectedX && selectedY ? calculateCorrelation(selectedX, selectedY) : null;

  return (
    <div className="space-y-8 pb-20">
      {/* Upload Section */}
      <section className="bg-white rounded-[32px] p-8 shadow-sm border border-[#F0EBE3]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-[#5B507A]">
            <div className="w-10 h-10 bg-[#F5F2FF] rounded-xl flex items-center justify-center">
              <FileUp size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Upload Data Riset</h2>
              <p className="text-xs text-gray-400">Dukung file .xlsx, .xls, .csv</p>
            </div>
          </div>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-[#5B507A] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#483F61] transition-all"
          >
            Pilih File <FileSpreadsheet size={16} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx, .xls, .csv"
            className="hidden" 
          />
        </div>

        {fileName && (
          <div className="flex items-center gap-2 p-4 bg-[#F9F8FF] rounded-2xl border border-[#F0EEFF] text-[#5B507A] text-sm">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="font-bold">{fileName}</span>
            <span className="text-gray-400">({data.length} baris terdeteksi)</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </section>

      {data.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Analysis Config */}
          <div className="bg-white rounded-[32px] p-8 border border-[#F0EBE3] shadow-sm">
            <h3 className="text-sm font-bold text-[#5B507A] mb-8 uppercase tracking-widest border-b border-gray-50 pb-4">
              Pilih Variabel Uji
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Variabel X (Independen)</label>
                <select 
                  value={selectedX}
                  onChange={(e) => setSelectedX(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#F0EBE3] rounded-2xl px-4 py-3 text-sm text-[#5B507A] outline-none"
                >
                  <option value="">Pilih Kolom...</option>
                  {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Variabel Y (Dependen)</label>
                <select 
                  value={selectedY}
                  onChange={(e) => setSelectedY(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#F0EBE3] rounded-2xl px-4 py-3 text-sm text-[#5B507A] outline-none"
                >
                  <option value="">Pilih Kolom...</option>
                  {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="bg-white rounded-[32px] p-8 border border-[#F0EBE3] shadow-sm flex flex-col items-center justify-center text-center">
            {correlation !== null ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#F5F2FF] text-[#9E86E0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart2 size={32} />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Korelasi Pearson (r)</p>
                <h4 className="text-5xl font-bold text-[#5B507A]">{correlation.toFixed(3)}</h4>
                <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
                  Math.abs(correlation) > 0.7 ? "bg-green-100 text-green-700" :
                  Math.abs(correlation) > 0.4 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                }`}>
                  {Math.abs(correlation) > 0.7 ? "Hubungan Kuat" :
                   Math.abs(correlation) > 0.4 ? "Hubungan Sedang" : "Hubungan Lemah"}
                </div>
                <p className="max-w-[200px] text-xs text-gray-400 italic mt-4">
                  &quot;Kak Rara melihat ada hubungan {correlation > 0 ? 'positif' : 'negatif'} di datamu!&quot;
                </p>
              </div>
            ) : (
              <div className="text-gray-300">
                <BarChart2 size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">Pilih dua variabel numerik<br/>untuk melihat hasil korelasi.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Quick Preview Table */}
      {data.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-[32px] p-8 border border-[#F0EBE3] shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-[#5B507A] uppercase tracking-widest">Preview Data (10 Baris Pertama)</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-100" />
              <div className="w-3 h-3 rounded-full bg-yellow-100" />
              <div className="w-3 h-3 rounded-full bg-green-100" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  {columns.map(col => (
                    <th key={col} className="p-4 font-bold text-gray-400 uppercase tracking-wider">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-[#F9F8FF] transition-colors">
                    {columns.map(col => (
                      <td key={col} className="p-4 text-[#5B507A]">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
