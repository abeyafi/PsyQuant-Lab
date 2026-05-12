"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, ScatterChart as ScatterChartIcon, Upload, FileBarChart, Download, Trash2, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis
} from "recharts";

type ChartType = "bar" | "line" | "pie" | "scatter" | "histogram";

const COLORS = ["#5B507A", "#9E86E0", "#E0D7F5", "#FFDBC5", "#4A86A8", "#8884d8", "#82ca9d", "#ffc658"];

export default function VisualPlaygroundPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            setData(results.data);
            const keys = Object.keys(results.data[0]);
            setHeaders(keys);
            setXAxis(keys[0]);
            if (keys.length > 1) setYAxis(keys[1]);
          }
        },
        error: (err) => setError("Gagal membaca CSV: " + err.message)
      });
    } else {
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const jsonData = XLSX.utils.sheet_to_json(ws);
          
          if (jsonData && jsonData.length > 0) {
            setData(jsonData);
            const keys = Object.keys(jsonData[0] as object);
            setHeaders(keys);
            setXAxis(keys[0]);
            if (keys.length > 1) setYAxis(keys[1]);
          }
        } catch (err) {
          setError("Gagal membaca Excel. Pastikan formatnya benar.");
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const chartData = useMemo(() => {
    if (chartType === "histogram" && xAxis) {
      // Create bins for histogram
      const values = data.map(d => Number(d[xAxis])).filter(n => !isNaN(n));
      if (values.length === 0) return [];
      
      const min = Math.min(...values);
      const max = Math.max(...values);
      const binCount = 10;
      const binSize = (max - min) / binCount;
      
      const bins = Array.from({ length: binCount }, (_, i) => ({
        name: `${(min + i * binSize).toFixed(1)} - ${(min + (i + 1) * binSize).toFixed(1)}`,
        value: 0
      }));
      
      values.forEach(v => {
        let binIdx = Math.floor((v - min) / binSize);
        if (binIdx === binCount) binIdx--;
        if (bins[binIdx]) bins[binIdx].value++;
      });
      
      return bins;
    }
    
    return data.slice(0, 50); // limit to 50 for preview
  }, [data, xAxis, chartType]);

  const renderChart = () => {
    if (data.length === 0) return null;

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE3" />
              <XAxis dataKey={xAxis} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
              <Legend />
              <Bar dataKey={yAxis} fill="#5B507A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE3" />
              <XAxis dataKey={xAxis} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke="#9E86E0" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey={yAxis}
                nameKey={xAxis}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "16px", border: "none" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE3" />
              <XAxis type="number" dataKey={xAxis} name={xAxis} />
              <YAxis type="number" dataKey={yAxis} name={yAxis} />
              <ZAxis range={[60, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name={`${xAxis} vs ${yAxis}`} data={chartData} fill="#9E86E0" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      case "histogram":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EBE3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#5B507A" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        );
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
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
              <BarChart3 size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">Visual Playground</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-[32px] border border-[#F0EBE3] shadow-sm space-y-6">
              <h3 className="font-bold text-[#5B507A] px-2">Data Source</h3>
              
              <label className="block">
                <div className="border-2 border-dashed border-[#F0EBE3] hover:border-[#9E86E0] transition-colors rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer group">
                  <Upload className="text-gray-300 group-hover:text-[#9E86E0] mb-2" size={32} />
                  <span className="text-xs font-bold text-gray-400 group-hover:text-[#5B507A]">Upload Excel / CSV</span>
                  <input type="file" className="hidden" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} />
                </div>
              </label>

              {data.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-[#F5F2FF]">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Chart Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["bar", "line", "pie", "scatter", "histogram"] as ChartType[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setChartType(t)}
                          className={`p-3 rounded-xl flex items-center justify-center transition-all ${chartType === t ? "bg-[#5B507A] text-white" : "bg-[#FDFBF9] border border-[#F0EBE3] text-gray-400 hover:text-[#5B507A]"}`}
                        >
                          {t === "bar" && <FileBarChart size={18} />}
                          {t === "line" && <LineChartIcon size={18} />}
                          {t === "pie" && <PieChartIcon size={18} />}
                          {t === "scatter" && <ScatterChartIcon size={18} />}
                          {t === "histogram" && <BarChart3 size={18} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">X-Axis (Label)</label>
                    <select 
                      value={xAxis} onChange={(e) => setXAxis(e.target.value)}
                      className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-xl px-4 py-2 text-sm outline-none"
                    >
                      {headers.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>

                  {chartType !== "histogram" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Y-Axis (Value)</label>
                      <select 
                        value={yAxis} onChange={(e) => setYAxis(e.target.value)}
                        className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-xl px-4 py-2 text-sm outline-none"
                      >
                        {headers.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  )}

                  <button 
                    onClick={() => { setData([]); setHeaders([]); }}
                    className="w-full py-3 text-rose-500 text-xs font-bold flex items-center justify-center gap-2 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={14} /> Clear Data
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#F5F2FF] p-6 rounded-[24px] border border-[#E0D7F5] flex items-start gap-3">
              <Info className="text-[#9E86E0] shrink-0" size={20} />
              <p className="text-[10px] text-[#5B507A] leading-relaxed">
                <strong>Tips:</strong> Untuk Histogram, pilih kolom berisi angka (e.g. Skor IQ). Untuk Pie, gunakan kolom kategori (Label) dan kolom frekuensi (Value).
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-[40px] border border-[#F0EBE3] shadow-sm min-h-[500px] flex flex-col">
              {data.length > 0 ? (
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-[#5B507A]">
                      {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Visual
                    </h2>
                    <div className="flex gap-2">
                       <span className="text-[10px] font-bold text-gray-400 uppercase bg-[#FDFBF9] px-3 py-1 rounded-full border border-[#F0EBE3]">
                         Rows: {data.length}
                       </span>
                    </div>
                  </div>
                  
                  <div className="bg-[#FDFBF9] rounded-[32px] p-6 border border-[#F5F2FF]">
                    {renderChart()}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="flex items-center gap-2 bg-[#5B507A] text-white px-6 py-3 rounded-2xl text-sm font-bold hover:shadow-lg transition-all active:scale-95">
                      <Download size={18} /> Export Chart (PNG)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
                      <FileBarChart size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-300 mb-2">Belum Ada Data</h3>
                   <p className="text-sm text-gray-300 max-w-xs">Upload file Excel atau CSV kamu untuk mulai memvisualisasikan data psikologi.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
