export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  category: string;
  content: string;
  quizzes: Question[];
}

export const MODULES: Module[] = [
  {
    id: "mod-vars",
    title: "Variabel & Operasionalisasi: Kerangka Dasar Riset",
    description: "Memahami bagaimana fenomena psikologis yang abstrak diubah menjadi data yang bisa dihitung.",
    difficulty: "Beginner",
    estimatedTime: "20 min",
    category: "Methodology",
    content: `# 🧠 Variabel & Operasionalisasi Variabel

## 👋 1. Pengantar Human-Friendly
Pernahkah kamu merasa bingung bagaimana caranya **"mengukur"** Rasa Sayang, Kecemasan, atau Kebahagiaan? Sebagai mahasiswa psikologi, kita tidak bisa sekadar bilang *"Subjek merasa sangat sedih"*. Kita butuh angka.

Bayangkan variabel sebagai sebuah **"wadah"** yang bisa diisi dengan nilai yang berbeda-beda. Sama seperti ukuran baju (S, M, L, XL) atau skor baterai HP (0-100%). Mengetahui variabel adalah langkah awal agar kita tidak tersesat saat mulai mengolah data di SPSS nanti. Tanpa variabel yang jelas, statistik hanyalah tumpukan angka tanpa makna.

---

## 🤔 2. Mengapa Mahasiswa Sering Bingung di Bagian Ini?
Kebingungan paling umum adalah membedakan antara **Konsep** dan **Variabel**.

> **Konsep vs Variabel:**
> - *"Depresi"* itu konsep (abstrak).
> - *"Skor pada skala BDI-II"* itu variabel (terukur).

Banyak mahasiswa terjebak karena menganggap definisi kamus adalah definisi operasional. Padahal, statistik butuh sesuatu yang **"eksekusi-able"**. Selain itu, salah menentukan skala **NOIR** (Nominal, Ordinal, Interval, Ratio) adalah sumber utama kesalahan dalam memilih uji statistik di semester akhir!

---

## 🪜 3. Konsep Dasar Step-by-Step
Mari kita bedah secara perlahan:

### A. Apa itu Variabel?
Sesuatu yang nilainya bisa **berubah-ubah** (bervariasi). Jika nilainya tetap (misal: Semua subjek adalah 'Manusia'), itu disebut **Konstanta**.

### B. Jenis Berdasarkan Peran (The Family Tree)
- **Variabel Independen (IV):** Si "Pemberi Pengaruh" (Sebab).
- **Variabel Dependen (DV):** Si "Penerima Akibat" (Hasil).
- **Variabel Moderator:** Si "Penguat atau Pelembut" hubungan.

### C. Skala Pengukuran (NOIR) - Kunci Utama
| Skala | Penjelasan Sederhana | Contoh Nyata |
| :--- | :--- | :--- |
| **Nominal** | Hanya Label/Nama (Tidak ada urutan) | Jenis Kelamin, Agama, Suku |
| **Ordinal** | Ada Urutan (Tapi jaraknya tidak pasti) | Juara 1, 2, 3; Tingkat Pendidikan |
| **Interval** | Jarak Sama (Tapi Nol tidak sejati) | Suhu Celsius, Skor IQ |
| **Ratio** | Jarak Sama + Nol Sejati (0 = Tidak ada) | Berat Badan, Pendapatan, Durasi |

---

## 💡 4. Visualisasi dan Analogi
Bayangkan kamu sedang mengukur **"Kecanduan Kopi"**:
- **Analogi Timbangan:** Konsep adalah *"Keinginan minum kopi"* (di pikiranmu). Variabel adalah *"Jumlah gelas kopi per hari"* (di meja).
- **Analogi Penggaris:** Skala Nominal itu seperti warna penggaris, sedangkan Skala Ratio itu adalah angka centimeter pada penggaris tersebut.

---

## 🔧 5. Operasionalisasi: Jembatan Menuju Data
Definisi Operasional (DO) adalah **"Cara main"** risetmu.

**Contoh Kasus:**
- **Variabel:** *"Kecemasan Akademik"*
- **Definisi Konseptual:** Perasaan tegang saat menghadapi ujian.
- **Definisi Operasional:** Total skor yang diperoleh dari 10 butir pertanyaan skala kecemasan (Skala 1-4).

---

## 🏫 6. Contoh Kasus Mahasiswa Psikologi
Riset tentang **Burnout Mahasiswa saat Skripsi**.
- **IV:** Dukungan Sosial dari Dosen Pembimbing.
- **DV:** Tingkat Burnout (Diukur dengan MASLACH Burnout Inventory).
- **Control:** Semester mahasiswa.

---

## 📊 7. Simulasi Data dan Interpretasi
Jika kamu punya data Jenis Kelamin (Nominal):
- \`1\` = Laki-laki
- \`2\` = Perempuan

> **Insight:** "Angka 1 dan 2 di sini BUKAN berarti perempuan lebih tinggi dari laki-laki. Itu hanya barcode untuk memudahkan komputer menghitung frekuensi."

---

## ⚠️ 8. Kesalahan Umum dan Cara Menghindarinya
- **Salah Skala:** Menganggap skor Likert (Sangat Setuju - Sangat Tidak Setuju) sebagai data Ratio murni. Secara teknis, itu sering diperlakukan sebagai Interval dalam psikologi, tapi hati-hati!
- **Ambigu:** Membuat Definisi Operasional yang tidak bisa diukur orang lain. DO harus **"Plak-Plek"** jelas.

---

## 📝 9. Mini Practice
Coba tentukan: Apa skala pengukuran dari **"Waktu yang dihabiskan untuk scrolling TikTok (dalam menit)"**?
*(Jawaban: Ratio, karena ada nol sejati dan jarak antar menit selalu sama).*

---

## 🏁 10. Ringkasan Super Sederhana
1. Cari tahu apa yang mau diukur.
2. Tentukan posisinya (IV atau DV).
3. Cek skalanya (NOIR).
4. Buat Definisi Operasionalnya.
5. Kamu siap masuk ke SPSS!`,
    quizzes: [
      {
        id: "q_vars_1",
        text: "Manakah yang merupakan variabel dengan skala Ratio?",
        options: ["Peringkat Kelas", "Nomor Urut Peserta", "Berat Badan", "Pilihan Warna Favorit"],
        correctAnswer: 2,
        explanation: "Berat badan memiliki nol sejati (0 kg berarti tidak ada massa) dan jarak antar kg adalah konstan."
      }
    ]
  },
  {
    id: "mod-central",
    title: "Tendensi Sentral: Mencari 'Wajah' dari Datamu",
    description: "Mean, Median, dan Modus. Cara sederhana menemukan titik pusat di tengah badai angka.",
    difficulty: "Beginner",
    estimatedTime: "25 min",
    category: "Statistics",
    content: `# 🎯 Tendensi Sentral: Mean, Median, & Modus

## 👋 1. Pengantar Human-Friendly
Pernahkah kamu bertanya, *"Berapa sih rata-rata nilai IPK di kelasku?"* atau *"Biasanya mahasiswa psikologi tidur jam berapa?"*. 

Tendensi Sentral adalah cara kita mencari satu angka yang paling bisa mewakili seluruh kelompok. Tanpa ini, kita akan pusing melihat ribuan baris data. Ini seperti mencari **"Satu wakil kelas"** untuk bicara di depan dosen—satu orang yang paling menggambarkan suasana hati seluruh kelas.

---

## 🤔 2. Mengapa Mahasiswa Sering Bingung di Bagian Ini?
Miskonsepsi terbesar adalah menganggap Rata-rata (**Mean**) selalu merupakan angka terbaik. 

> **Hati-hati dengan Outlier:**
> Jika ada satu orang yang sangat kaya di antara sekumpulan orang miskin, "Mean" kekayaan mereka akan terlihat tinggi, padahal mayoritas orang sebenarnya miskin. Inilah pengaruh **Outlier** (Nilai Ekstrem).

---

## 🪜 3. Konsep Dasar Step-by-Step
Ada tiga pahlawan di sini:

### A. Mean (Rata-rata Arimetika)
- **Logika:** Kumpulkan semua, bagi rata ke semua orang.
- **Kapan pakai?** Data normal/simetris, skala Interval/Ratio.

### B. Median (Nilai Tengah)
- **Logika:** Bariskan semua dari kecil ke besar, ambil yang berdiri persis di tengah.
- **Kapan pakai?** Ada data ekstrem (outlier) atau data miring (skewed).

### C. Modus (Nilai Paling Sering: The Popular Kid)
- **Logika:** Siapa yang paling sering muncul?
- **Kapan pakai?** Data Nominal (misal: "Warna apa yang paling disukai?").

---

## 💡 4. Visualisasi dan Analogi
- **Mean:** Seperti membagi kue ulang tahun secara adil ke semua tamu.
- **Median:** Seperti barisan upacara bendera; kita ambil orang yang di tengah barisan.
- **Modus:** Seperti hasil voting pemilu; siapa yang paling banyak suaranya.

---

## 🔧 5. Penjelasan Formula Tanpa Menakutkan
**Rumus Mean:** $$M = \frac{\sum X}{N}$$

- **M:** Hasil rata-rata.
- **$\sum X$:** Simbol "Sigma" (Artinya: Tambahkan semua angkanya!).
- **N:** Jumlah orang/sampel.

*Contoh:* Nilai kuis (8, 7, 9). Mean = (8+7+9) / 3 = 8. Gampang kan?

---

## 🏫 6. Contoh Kasus Mahasiswa Psikologi
Skor Depresi pada 5 Mahasiswa: **10, 12, 10, 15, 80** (Outlier!).
- **Mean:** (10+12+10+15+80)/5 = **25.4** (Terlihat tinggi gara-gara skor 80).
- **Median:** Bariskan (10, 10, 12, 15, 80) -> Tengahnya adalah **12**.
- **Modus:** Angka yang muncul 2 kali adalah **10**.

> **Insight:** Median (12) lebih jujur menggambarkan kondisi kelas daripada Mean (25.4).

---

## 📊 7. Simulasi Data dan Interpretasi
Jika di SPSS outputmu menunjukkan Mean IPK = **3.4**.

**Interpretasi Manusiawi:** *"Secara umum, kemampuan akademik mahasiswa di angkatan ini berada di tingkat yang sangat baik, dengan nilai tipikal berada di angka 3.4."*

---

## ⚠️ 8. Kesalahan Umum dan Cara Menghindarinya
- **Memaksakan Mean pada Data Nominal:** Menghitung rata-rata 'Jenis Kelamin' (1=Pria, 2=Wanita) -> Hasil 1.5. *Apa artinya manusia setengah pria setengah wanita? Tidak ada! Jangan hitung rata-rata data kategori.*
- **Abai terhadap Outlier:** Selalu cek histogram dulu sebelum percaya pada Mean.

---

## 📝 9. Mini Practice
Data: **2, 4, 4, 10**.
- Mean = ? (5)
- Median = ? (4)
- Modus = ? (4)

---

## 🏁 10. Ringkasan Super Sederhana
- **Mean:** Adil tapi sensitif (mudah goyah oleh angka aneh).
- **Median:** Stabil (nggak peduli angka ekstrem).
- **Modus:** Untuk mencari siapa yang paling populer.`,
    quizzes: [
      {
        id: "q_central_1",
        text: "Manakah ukuran tendensi sentral yang paling tahan terhadap pengaruh nilai ekstrem (outlier)?",
        options: ["Mean", "Median", "Modus", "Z-Score"],
        correctAnswer: 1,
        explanation: "Median hanya mengambil nilai di posisi tengah setelah diurutkan, sehingga nilai yang sangat besar atau kecil di ujung tidak akan mengubah posisinya secara signifikan."
      }
    ]
  },
  {
    id: "mod-dispersion",
    title: "Dispersi: Seberapa Beragam Kelompokmu?",
    description: "Standard Deviation & Variance. Memahami kenapa rata-rata saja tidak cukup.",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    category: "Statistics",
    content: `# 📏 Dispersi: Varians & Standar Deviasi

## 👋 1. Pengantar Human-Friendly
Standar Deviasi (SD) memberi tahu kita apakah kelompok tersebut **"Kompak"** atau **"Berantakan"**. 

Bayangkan dua kelas dengan rata-rata nilai yang sama, tapi di satu kelas semua orang nilainya mirip (SD rendah), sementara di kelas lain ada yang sangat pintar dan ada yang sangat kesulitan (SD tinggi). Mean saja tidak cukup untuk menceritakan kisah lengkap tentang datamu!

---

## 🤔 2. Mengapa Mahasiswa Sering Bingung di Bagian Ini?
Anxiety muncul saat melihat rumus akar kuadrat yang rumit. 

> **Quick Intuition:**
> Rumus ini sebenarnya cuma cara agar nilai negatif tidak menghapus nilai positif saat we menghitung jarak tiap angka ke rata-rata. Kita menguadratkannya dulu, lalu mengakarkannya kembali agar satuannya normal.

---

## 🪜 3. Konsep Dasar Step-by-Step
- **Range:** Jarak dari nilai paling tinggi ke paling rendah. (Paling simpel tapi kasar).
- **Varians:** Rata-rata dari kuadrat jarak setiap data ke rata-ratanya.
- **Standar Deviasi:** Akar dari Varians. Ini yang paling sering dilaporkan karena satuannya kembali normal (tidak kuadrat lagi).

---

## 💡 4. Visualisasi dan Analogi
- **SD Rendah = Kelompok Homogen (Mirip).** Ibarat barisan tentara yang tingginya seragam.
- **SD Tinggi = Kelompok Heterogen (Beragam).** Ibarat pengunjung mall yang tingginya sangat bervariasi dari anak kecil sampai atlet basket.

---

## 🏁 10. Ringkasan Super Sederhana
- **SD Besar:** Datamu menyebar luas (Beragam).
- **SD Kecil:** Datamu berkumpul rapat (Mirip).`,
    quizzes: [
      {
        id: "q_disp_1",
        text: "Apa arti SD yang besar?",
        options: ["Data seragam", "Data sangat bervariasi", "Data salah hitung", "Mean = 0"],
        correctAnswer: 1,
        explanation: "SD besar berarti jarak antar data dengan rata-ratanya jauh/bervariasi."
      }
    ]
  },
  {
    id: "mod-correlation",
    title: "Korelasi: Mencari Hubungan di Antara Dua Variabel",
    description: "Pearson & Spearman. Apakah jumlah belajar benar-benar berhubungan dengan nilai ujian?",
    difficulty: "Intermediate",
    estimatedTime: "35 min",
    category: "Statistics",
    content: `# 🤝 Korelasi: "Together Ever After?"

## 👋 1. Pengantar Human-Friendly
Pernahkah kamu memperhatikan bahwa saat cuaca makin panas, penjualan es krim meningkat? Atau saat mahasiswa makin sering begadang, konsentrasi di kelas makin menurun?

Korelasi adalah cara kita mengukur **seberapa kuat dua hal saling berkaitan**. Tapi ingat, korelasi **bukan** berarti sebab-akibat. Jika A dan B berhubungan, belum tentu A yang menyebabkan B!

---

## 🤔 2. Mengapa Mahasiswa Sering Bingung di Bagian Ini?
Kesalahan paling legendaris dalam statistik: **Correlation is NOT Causation**. 

> **Analogi:** 
> Hanya karena orang yang depresi sering merokok, bukan berarti merokok menyebabkan depresi. Bisa jadi depresi yang membuat orang merokok, atau ada hal lain (seperti tekanan hidup) yang menyebabkan keduanya.

---

## 🪜 3. Konsep Dasar Step-by-Step
Kita mengenal angka ajaib bernama **Koefisien Korelasi (r)**:
- **Korelasi Positif (+):** A naik, B ikut naik. (Contoh: Jam belajar & Nilai).
- **Korelasi Negatif (-):** A naik, B malah turun. (Contoh: Jam main game & Waktu tidur).
- **Korelasi Nol (0):** Tidak ada hubungan. (Contoh: Ukuran sepatu & Kecerdasan).

---

## 💡 4. Visualisasi dan Analogi
Bayangkan korelasi seperti dua orang yang berjalan di trotoar:
- **Korelasi Positif Kuat:** Mereka jalan gandengan tangan, sangat kompak.
- **Korelasi Negatif Kuat:** Mereka jalan berlawanan arah dengan kecepatan yang sama.
- **Korelasi Nol:** Mereka dua orang asing yang tidak saling kenal di tengah ribuan orang.

---

## 📊 7. Interpretasi Kekuatan (Guideline Cohen)
| Nilai Korelasi (r) | Kekuatan Hubungan |
| :--- | :--- |
| .10 to .29 | **Lemah** |
| .30 to .49 | **Sedang** |
| .50 to 1.00 | **Kuat** |

---

## 🏁 10. Ringkasan Super Sederhana
- Korelasi = Hubungan, bukan paksaan (sebab-akibat)!
- Nilai **r** berkisar dari **-1** sampai **+1**.
- **0** berarti mereka tidak saling kenal.`,
    quizzes: [
      {
        id: "q_corr_1",
        text: "Apa arti korelasi -0.85?",
        options: ["Hubungan positif kuat", "Hubungan negatif kuat", "Hubungan negatif lemah", "Tidak ada hubungan"],
        correctAnswer: 1,
        explanation: "Angka mendekati -1 berarti hubungan negatif yang sangat kuat."
      }
    ]
  },
  {
    id: "mod-psychometrics",
    title: "Psikometri: Seberapa Akurat Alat Ukurmu?",
    description: "Reliabilitas & Validitas. Memastikan timbanganmu tidak bohong dan penggarismu konsisten.",
    difficulty: "Intermediate",
    estimatedTime: "40 min",
    category: "Psychometrics",
    content: `# 🎯 Psikometri: Seni Mengukur Jiwa

## 👋 1. Pengantar Human-Friendly
Pernahkah kamu menimbang badan di timbangan yang 'ngaco'? Kamu tahu beratmu 50kg, tapi timbangan bilang 60kg. Besoknya kamu timbang lagi, dia bilang 55kg. Timbangan itu tidak bisa dipercaya!

Dalam psikologi, kita mengukur hal-hal yang tidak terlihat (seperti Kecerdasan atau Kepribadian). Psikometri adalah ilmu yang memastikan bahwa **"alat ukur"** kita (kuesioner/test) itu **Valid** (tepat sasaran) dan **Reliabel** (konsisten).

---

## 🤔 2. Mengapa Mahasiswa Sering Bingung?
Kebingungan paling umum: *"Kalo udah reliabel, pasti valid kan?"*. 

> **Jawabannya: TIDAK.** 
> Timbangan yang selalu nambahin 10kg dari berat aslimu itu **Reliabel** (selalu sama ngaconya/konsisten), tapi **TIDAK Valid** (karena tidak mengukur berat yang sebenarnya).

---

## 🪜 3. Konsep Dasar Step-by-Step

### A. Reliabilitas (Konsistensi)
Seberapa stabil alat ukurmu? 
- **Cronbach's Alpha:** Angka sakti di skripsi. Harus **> 0.70** agar dianggap reliabel.
- **Test-Retest:** Uji sekarang, uji minggu depan, hasilnya harus mirip (stabil).

### B. Validitas (Ketepatan)
Apakah kamu benar-benar mengukur apa yang ingin kamu ukur?
- **Validitas Isi:** Apakah pertanyaannya sudah mewakili semua aspek teori?
- **Validitas Konstruk:** Apakah alat ukur ini benar-benar mengukur "Depresi", bukan cuma "Kesedihan sesaat"?

---

## 💡 4. Visualisasi dan Analogi Target Memanah
Bayangkan kamu sedang memanah:
1. **Titik kumpul di pojok (tapi nggak di tengah):** Reliabel tapi Tidak Valid.
2. **Titik menyebar ke mana-mana:** Tidak Reliabel & Tidak Valid.
3. **Titik kumpul tepat di tengah (bullseye):** **Reliabel & Valid!**

---

## ⚠️ 8. Kesalahan Umum
- Hanya melaporkan Alpha tanpa cek Validitas Isi.
- Menghapus item sembarangan di SPSS agar Alpha naik. **Hati-hati, ini bisa merusak teori!**

---

## 🏁 10. Ringkasan Super Sederhana
- **Reliabel** = Konsisten (Sama terus).
- **Valid** = Akurat (Tepat sasaran).
- Kuesioner keren harus punya keduanya!`,
    quizzes: [
      {
        id: "q_psych_1",
        text: "Apa nama uji reliabilitas yang paling sering digunakan untuk melihat konsistensi internal item?",
        options: ["Uji T", "Korelasi Pearson", "Cronbach's Alpha", "Analisis Faktor"],
        correctAnswer: 2,
        explanation: "Cronbach's Alpha adalah standar emas untuk mengukur konsistensi internal dalam psikometri."
      }
    ]
  },
  {
    id: "mod-ethics",
    title: "Etika Penelitian & IRB: Kompas Moral Peneliti",
    description: "Pedoman Nuremberg, Belmont Report, dan bagaimana melindungi martabat partisipan manusia.",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    category: "Methodology",
    content: `# ⚖️ Etika Penelitian: Kenapa Kita Tidak Boleh Sembarangan?

## 👋 1. Pengantar Human-Friendly
Bayangkan kamu punya ide eksperimen keren: *"Apakah stres membuat orang lebih mudah berbohong?"*. Kamu terpikir untuk mengurung partisipan di ruangan gelap dan menakuti mereka dengan suara ledakan. **Tunggu!** Di sinilah Etika masuk.

Etika bukan untuk menghambat ilmu pengetahuan, tapi untuk memastikan bahwa di balik angka-angka statistik, ada **manusia** yang harus kita hargai martabatnya. Penelitian tanpa etika adalah kekejaman yang dibungkus sains.

---

## 🤔 2. Mengapa Mahasiswa Sering Bingung di Bagian Ini?
Banyak mahasiswa menganggap etika cuma sekadar tanda tangan *informed consent*. 

> **Cakupan Etika:**
> - Cara memilih partisipan (apakah adil?).
> - Cara menjaga data (apakah rahasia?).
> - Kapan butuh izin **IRB** (Institutional Review Board)?

---

## 🪜 3. Konsep Dasar Step-by-Step

### 📜 KODE NUREMBERG (1947): 10 Pilar Etika Medis Modern
Lahir setelah pengadilan kejahatan perang Nazi, kode ini menetapkan batas tegas:
1. **Informed Consent Mutlak:** Partisipan harus setuju secara sadar dan sukarela.
2. **Manfaat Bagi Masyarakat:** Riset harus berguna, bukan sekadar iseng.
3. **Dasar Eksperimen Hewan:** Harus ada bukti keamanan awal.
4. **Hindari Penderitaan:** Hilangkan rasa sakit fisik & stres mental yang tidak perlu.
5. **Larangan Risiko Kematian:** Dilarang keras jika ada potensi cacat atau mati.
6. **Risiko < Manfaat:** Nilai kemanusiaan harus lebih besar dari risiko.
7. **Fasilitas Perlindungan:** Peneliti wajib menjamin keamanan teknis.
8. **Ilmuwan Kompeten:** Hanya orang ahli yang boleh memimpin riset.
9. **Hak Menghentikan Partisipasi:** Partisipan bebas keluar kapan saja.
10. **Kewajiban Menghentikan Studi:** Peneliti wajib stop jika ditemukan bahaya.

---

## 💡 4. Visualisasi dan Analogi: 3 Pilar Belmont Report (1979)
Bayangkan etika sebagai sebuah kursi berkaki tiga. Jika satu kaki patah, kursinya jatuh:
- **Respect for Persons (Hormat pada Individu):** Seperti memberi tamu pilihan mau minum apa (Otonomi). Kita hargai pilihan mereka.
- **Beneficence (Kemanfaatan):** Seperti dokter yang memberi obat; tujuannya menyembuhkan (Minimalkan risiko, maksimalkan manfaat).
- **Justice (Keadilan):** Seperti membagi kue secara rata; jangan cuma orang miskin yang jadi kelinci percobaan sementara orang kaya menikmati hasilnya.

---

## 🏫 6. Contoh Kasus Mahasiswa Psikologi
Kamu meneliti tentang *"Dampak Bullying di Media Sosial"*.
- **Respect:** Kamu jelaskan risikonya dan mereka tanda tangan izin.
- **Beneficence:** Kamu sediakan layanan konseling singkat jika mereka merasa sedih setelah diwawancara.
- **Justice:** Kamu tidak hanya mengambil data dari teman dekatmu saja, tapi secara adil dari berbagai latar belakang.

---

## ⚠️ 8. Kesalahan Umum dan Cara Menghindarinya
- **Deception (Penipuan):** Melakukan eksperimen tanpa memberi tahu tujuan asli boleh **HANYA JIKA** sangat diperlukan dan wajib ada *Debriefing* (penjelasan jujur) di akhir.
- **Data Privacy:** Jangan pernah tulis nama asli di file Excel. Gunakan kode (Subjek 01, Subjek 02).

---

## 🏁 10. Ringkasan Super Sederhana
- Hargai partisipanmu sebagai manusia.
- Jangan buat mereka menderita.
- Adil dalam memilih sampel.
- Izin dulu sebelum ambil data!`,
    quizzes: [
      {
        id: "q_ethics_1",
        text: "Kapan Kode Nuremberg dirumuskan?",
        options: ["1945", "1947", "1960", "1979"],
        correctAnswer: 1,
        explanation: "Kode Nuremberg lahir tahun 1947 sebagai respon atas eksperimen tidak manusiawi selama Perang Dunia II."
      }
    ]
  }
];

export const GLOSSARY = [
  { term: "Mean", definition: "Nilai rata-rata dari sekumpulan data.", category: "Descriptive" },
  { term: "Median", definition: "Nilai tengah setelah data diurutkan.", category: "Descriptive" },
  { term: "Modus", definition: "Nilai yang paling sering muncul dalam dataset.", category: "Descriptive" },
  { term: "Standard Deviation", definition: "Ukuran sebaran data terhadap rata-ratanya.", category: "Descriptive" },
  { term: "p-value", definition: "Probabilitas hasil muncul secara kebetulan jika hipotesis nol benar.", category: "Inferential" },
  { term: "Ho (Hipotesis Nol)", definition: "Pernyataan tidak ada pengaruh atau hubungan antar variabel.", category: "Methodology" },
  { term: "Ha (Hipotesis Alternatif)", definition: "Pernyataan adanya pengaruh atau hubungan antar variabel.", category: "Methodology" },
  { term: "Type I Error", definition: "Kesalahan menolak hipotesis nol padahal sebenarnya benar (False Positive).", category: "Inferential" },
  { term: "Type II Error", definition: "Kesalahan gagal menolak hipotesis nol padahal sebenarnya salah (False Negative).", category: "Inferential" },
  { term: "Validity", definition: "Sejauh mana alat ukur benar-benar mengukur apa yang ingin diukur.", category: "Psychometrics" },
  { term: "Reliability", definition: "Konsistensi alat ukur saat digunakan berulang kali.", category: "Psychometrics" },
  { term: "Outlier", definition: "Nilai yang sangat jauh berbeda dari nilai lainnya dalam dataset.", category: "Descriptive" },
  { term: "Likert Scale", definition: "Skala psikometri yang digunakan untuk mengukur sikap atau pendapat (biasanya 1-5).", category: "Psychometrics" },
  { term: "Signifikansi", definition: "Keyakinan bahwa hasil bukan disebabkan oleh kebetulan (biasanya p < 0.05).", category: "Inferential" },
];
