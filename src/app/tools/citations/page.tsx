"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookMarked, Copy, Check, RotateCcw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type SourceType = "journal" | "book" | "website";

export default function CitationLabPage() {
  const router = useRouter();
  const [type, setType] = useState<SourceType>("journal");
  const [data, setData] = useState({
    authors: "",
    year: "",
    title: "",
    journal: "",
    volume: "",
    issue: "",
    pages: "",
    doi: "",
    publisher: "",
    url: ""
  });
  const [copied, setCopied] = useState(false);

  const formatAuthorName = (name: string) => {
    const cleanName = name.trim().replace(/\s+/g, " ");
    if (!cleanName) return "";
    
    // Split by comma if multiple authors
    const authorList = cleanName.split(/,|\band\b|&/).map(a => a.trim()).filter(Boolean);
    
    const formattedAuthors = authorList.map(author => {
      // Remove titles like Dr., Prof., etc.
      const sanitized = author.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, "");
      const words = sanitized.split(" ");
      
      if (words.length === 1) return words[0];
      
      const lastName = words[words.length - 1];
      const initials = words.slice(0, words.length - 1).map(w => w[0].toUpperCase() + ".");
      
      return `${lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()}, ${initials.join(" ")}`;
    });

    if (formattedAuthors.length === 0) return "";
    if (formattedAuthors.length === 1) return formattedAuthors[0];
    if (formattedAuthors.length === 2) return `${formattedAuthors[0]} & ${formattedAuthors[1]}`;
    
    return `${formattedAuthors.slice(0, -1).join(", ")}, & ${formattedAuthors[formattedAuthors.length - 1]}`;
  };

  const formatAPA = () => {
    const { year, title, journal, volume, issue, pages, doi, publisher, url } = data;
    const formattedAuthors = formatAuthorName(data.authors) || "Penulis, A.";
    
    if (type === "journal") {
      let citation = `${formattedAuthors} (${year || "n.d."}). ${title || "Judul artikel"}. `;
      citation += `*${journal || "Nama Jurnal"}*`;
      if (volume) citation += `, *${volume}*`;
      if (issue) citation += `(${issue})`;
      if (pages) citation += `, ${pages}`;
      citation += ".";
      if (doi) citation += ` https://doi.org/${doi}`;
      return citation;
    }
    
    if (type === "book") {
      let citation = `${formattedAuthors} (${year || "n.d."}). *${title || "Judul buku"}*. `;
      if (publisher) citation += `${publisher}.`;
      return citation;
    }

    if (type === "website") {
      let citation = `${formattedAuthors} (${year || "n.d."}). ${title || "Judul halaman"}. `;
      if (url) citation += `Diambil dari ${url}`;
      return citation;
    }

    return "";
  };

  const handleCopy = () => {
    // Basic text copy (without markdown italics)
    const text = formatAPA().replace(/\*/g, "");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500">
              <BookMarked size={18} />
            </div>
            <span className="font-bold text-sm text-[#5B507A]">APA Citation Lab</span>
          </div>

          <div className="w-20"></div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Input Panel */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[32px] border border-[#F0EBE3] shadow-sm">
              <div className="flex gap-2 mb-8 bg-[#FDFBF9] p-1.5 rounded-2xl border border-[#F0EBE3]">
                {["journal", "book", "website"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t as SourceType)}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      type === t 
                        ? "bg-[#5B507A] text-white shadow-md scale-[1.02]" 
                        : "text-gray-400 hover:text-[#5B507A]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Penulis (Format: Surya, A.)</label>
                    <input 
                      type="text"
                      value={data.authors}
                      onChange={(e) => setData({...data, authors: e.target.value})}
                      placeholder="Surya, A., & Budi, C."
                      className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none focus:border-[#E0D7F5] transition-all text-sm text-[#5B507A]"
                    />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Tahun Terbit</label>
                    <input 
                      type="text"
                      value={data.year}
                      onChange={(e) => setData({...data, year: e.target.value})}
                      placeholder="2024"
                      className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none focus:border-[#E0D7F5] transition-all text-sm text-[#5B507A]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Judul {type === "book" ? "Buku" : "Artikel"}</label>
                  <textarea 
                    value={data.title}
                    onChange={(e) => setData({...data, title: e.target.value})}
                    placeholder="Masukkan judul lengkap..."
                    className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none focus:border-[#E0D7F5] transition-all text-sm text-[#5B507A] min-h-[80px]"
                  />
                </div>

                {type === "journal" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Nama Jurnal</label>
                      <input 
                        type="text"
                        value={data.journal}
                        onChange={(e) => setData({...data, journal: e.target.value})}
                        placeholder="Jurnal Psikologi Indonesia"
                        className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none focus:border-[#E0D7F5] transition-all text-sm text-[#5B507A]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Volume / Isu</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" placeholder="Vol" className="w-1/2 bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none text-sm text-[#5B507A]"
                          value={data.volume} onChange={(e) => setData({...data, volume: e.target.value})}
                        />
                        <input 
                          type="text" placeholder="Isu" className="w-1/2 bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none text-sm text-[#5B507A]"
                          value={data.issue} onChange={(e) => setData({...data, issue: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Halaman</label>
                      <input 
                        type="text" placeholder="102-115" className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none text-sm text-[#5B507A]"
                        value={data.pages} onChange={(e) => setData({...data, pages: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {type === "journal" && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">DOI (Opsional)</label>
                    <input 
                      type="text" placeholder="10.xxxx/xxxx" className="w-full bg-[#FDFBF9] border border-[#F0EBE3] rounded-2xl px-4 py-3 outline-none text-sm text-[#5B507A]"
                      value={data.doi} onChange={(e) => setData({...data, doi: e.target.value})}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border-2 border-[#E0D7F5] shadow-xl relative overflow-hidden flex flex-col min-h-[300px]">
               <div className="flex justify-between items-center mb-8">
                  <div className="bg-[#9E86E0] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    APA 7th Edition
                  </div>
                  <button 
                    onClick={() => setData({authors: "", year: "", title: "", journal: "", volume: "", issue: "", pages: "", doi: "", publisher: "", url: ""})}
                    className="text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <RotateCcw size={18} />
                  </button>
               </div>

               <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl text-[#5B507A] leading-relaxed italic text-center p-6 border-2 border-dashed border-[#F5F2FF] rounded-[32px] w-full"
                     dangerouslySetInnerHTML={{ __html: formatAPA().replace(/\*(.*?)\*/g, '<span class="italic font-bold">$1</span>') }}
                  />
               </div>

               <div className="mt-8 flex gap-4">
                  <button 
                    onClick={handleCopy}
                    className="flex-1 bg-[#5B507A] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    {copied ? "Berhasil Disalin!" : "Salin Teks"}
                  </button>
               </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-200 flex items-start gap-4">
               <AlertCircle className="text-amber-500 shrink-0 mt-1" size={24} />
               <div>
                  <h4 className="text-sm font-bold text-amber-900 mb-1">Penting:</h4>
                  <p className="text-xs text-amber-800/70 leading-relaxed">
                    Sistem ini membantu format dasar APA 7. Pastikan kembali kapitalisasi pada judul jurnal dan miring (italics) saat kamu memindahkannya ke Word ya!
                  </p>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
