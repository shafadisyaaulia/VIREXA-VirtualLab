"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  HelpCircle, 
  Brain, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  User, 
  BookOpen, 
  FlaskConical, 
  Award,
  ArrowLeft,
  ChevronRight,
  Lock
} from "lucide-react";

// Struktur Tipe Data Soal dengan properti opsional imageSrc untuk menghindari error kompilasi Vercel
type Soal = {
  id: number;
  pertanyaan: string;
  opsi: string[];
  jawabanBenar: number;
  penjelasan: string;
  fallbackEmoji: string;
  imageSrc?: string; // Tanda tanya (?) berarti opsional
};

// Struktur Soal Pre-Test Interaktif Asam & Basa SMP dengan Dukungan Gambar Selektif
const DAFTAR_SOAL: Soal[] = [
  {
    id: 1,
    pertanyaan: "Larutan yang memiliki derajat keasaman (pH) di bawah angka 7.0 secara ilmiah diklasifikasikan sebagai zat...",
    opsi: ["Asam", "Basa", "Netral", "Garam"],
    jawabanBenar: 0, // Asam
    penjelasan: "Zat asam memiliki rentang skala pH antara 0 hingga kurang dari 7.",
    fallbackEmoji: "🧪"
    // Tanpa imageSrc agar tampil bersih hanya teks
  },
  {
    id: 2,
    pertanyaan: "Bahan harian manakah di bawah ini yang dikenal memiliki sifat asam kuat sehingga berbahaya bagi email gigi jika dikonsumsi berlebihan?",
    opsi: ["Susu Sapi", "Air Murni", "Minuman Cola", "Air Kelapa"],
    jawabanBenar: 2, // Minuman Cola
    penjelasan: "Minuman cola mengandung Asam Fosfat (H₃PO₄) dengan kadar pH sangat rendah (sekitar 2.5).",
    // Menggunakan gambar Cola asli dari Unsplash berkualitas tinggi
    imageSrc: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    fallbackEmoji: "🥤"
  },
  {
    id: 3,
    pertanyaan: "Jika suatu campuran memiliki nilai pH tepat di angka 7.0, maka sifat campuran tersebut adalah...",
    opsi: ["Asam Lemah", "Basa Kuat", "Sangat Korosif", "Netral Sempurna"],
    jawabanBenar: 3, // Netral Sempurna
    penjelasan: "pH 7.0 adalah titik netral, di mana kandungan ion asam (H+) dan basa (OH-) seimbang sempurna.",
    fallbackEmoji: "💧"
    // Tanpa imageSrc
  },
  {
    id: 4,
    pertanyaan: "Zat kimia pengawet berbahaya seperti Boraks yang memiliki pH sekitar 9.5 diklasifikasikan ke dalam kelompok...",
    opsi: ["Asam Kuat", "Basa", "Netral", "Asam Lemah"],
    jawabanBenar: 1, // Basa
    penjelasan: "Zat dengan pH di atas 7 hingga 14 digolongkan sebagai zat Basa.",
    fallbackEmoji: "📦"
    // Tanpa imageSrc
  }
];

export default function PreTestPage() {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState<{ nama: string; kelas: string } | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [jawabanSiswa, setJawabanSiswa] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [testSelesai, setTestSelesai] = useState(false);
  const [skorAkhir, setSkorAkhir] = useState(0);

  // Ambil data identitas siswa dari localStorage untuk mempersonalisasi sapaan
  useEffect(() => {
    const session = localStorage.getItem("virexa_student_session");
    if (session) {
      setStudentInfo(JSON.parse(session));
    } else {
      // Jika siswa melompat langsung ke halaman ini tanpa isi identitas, kembalikan ke Langkah 1
      router.push("/student/identity");
    }
  }, [router]);

  const handlePilihOpsi = (soalId: number, opsiIdx: number) => {
    if (testSelesai) return;
    setJawabanSiswa((prev) => ({ ...prev, [soalId]: opsiIdx }));
  };

  const handleNext = () => {
    if (currentIdx < DAFTAR_SOAL.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Jika di soal terakhir, pemicu submit
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      // Kembali ke identitas jika di nomor pertama
      router.push("/student/identity");
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(jawabanSiswa).length < DAFTAR_SOAL.length) return;

    setLoading(true);

    // Hitung Skor
    let jumlahBenar = 0;
    DAFTAR_SOAL.forEach((soal) => {
      if (jawabanSiswa[soal.id] === soal.jawabanBenar) {
        jumlahBenar += 1;
      }
    });

    // MEMPERBAIKI ERROR TYPE: Menghapus sisa-sisa fungsi panah ("dashBenar => ...") agar murni berupa perhitungan aritmatika numerik yang valid
    const skor = Math.round((jumlahBenar / DAFTAR_SOAL.length) * 100);
    setSkorAkhir(skor);

    try {
      // Simpan skor pre-test ke localStorage
      const session = localStorage.getItem("virexa_student_session");
      if (session) {
        const parsed = JSON.parse(session);
        localStorage.setItem("virexa_student_session", JSON.stringify({
          ...parsed,
          skorPretest: skor,
        }));
      }

      // Kirim hasil pre-test ke server
      await fetch("/api/tests/pre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nis: studentInfo?.nama,
          skorPretest: skor,
        }),
      });
    } catch (error) {
      console.error("Gagal menyimpan hasil pre-test:", error);
    } finally {
      setLoading(false);
      setTestSelesai(true);
    }
  };

  const handleLanjutKeMateri = () => {
    router.push("/student/materials");
  };

  const currentSoal = DAFTAR_SOAL[currentIdx];
  const progressPercent = ((currentIdx + 1) / DAFTAR_SOAL.length) * 100;
  const isOptionSelected = jawabanSiswa[currentSoal.id] !== undefined;

  return (
    <div className="min-h-screen bg-[#f3f0ff] text-[#0b1c30] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Navigation Bar */}
<header className="flex justify-between items-center w-full px-6 py-4 z-50 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
  <div className="flex items-center gap-2">
    {/* Teks VIREXA lama sudah dihapus, diganti panggil logo gambar di bawah ini */}
    <img 
      src="/images/virexa-logo.png" 
      alt="VIREXA Logo" 
      className="h-12 w-auto object-contain" 
    />
  </div>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
      <User className="h-5 w-5" />
    </div>
  </div>
</header>

      <div className="flex flex-1 relative">
        
        {/* Left Side Navigation Bar - Unlocked/Locked Sesi */}
        <nav className="fixed left-0 top-16 h-[calc(100vh-64px)] flex flex-col pt-6 pb-6 z-40 bg-white border-r border-slate-100 w-64 hidden md:flex">
          <div className="px-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                SL
              </div>
              <div>
                <h3 className="font-display text-sm text-indigo-600 leading-tight font-bold">Science Lab</h3>
                <p className="text-[11px] text-slate-500 font-medium">Junior High School</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto px-2">
            
            {/* 1. Identity (Dapat diakses kembali) */}
            <button 
              onClick={() => router.push("/student/identity")}
              className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
            >
              <User className="h-5 w-5 text-slate-400" />
              <span className="text-xs tracking-wider font-semibold">1. Identitas</span>
            </button>

            {/* 2. Pre-Test (Sesi Aktif) */}
            <div className="bg-indigo-50/50 text-indigo-600 font-bold rounded-lg px-4 py-3 flex items-center gap-3 border border-indigo-100/50 transition-all cursor-default">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              <span className="text-xs tracking-wider">2. Pre-Test</span>
            </div>

            {/* 3. Materials (Kunci Terbuka / Pengisian Kondisional) */}
            <button 
              onClick={() => router.push("/student/materials")}
              className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
            >
              <BookOpen className="h-5 w-5 text-slate-400" />
              <span className="text-xs tracking-wider font-semibold">3. Materials</span>
            </button>

            {/* 4. Virtual Lab (Terbuka setelah materi) */}
            <button 
              onClick={() => router.push("/student/virtual-lab")}
              className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
            >
              <FlaskConical className="h-5 w-5 text-slate-400" />
              <span className="text-xs tracking-wider font-semibold">4. Virtual Lab</span>
            </button>

            {/* 5. Post-Test */}
            <button 
              onClick={() => router.push("/student/post-test")}
              className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
            >
              <Award className="h-5 w-5 text-slate-400" />
              <span className="text-xs tracking-wider font-semibold">5. Post-Test</span>
            </button>

          </div>

          <div className="px-4 pt-4 mt-auto">
            <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-semibold flex items-center gap-2 border border-emerald-100">
              <Sparkles className="h-4 w-4 text-emerald-500 fill-emerald-100" />
              <span>LKPD Fisik disiapkan di meja</span>
            </div>
          </div>
        </nav>

        {/* Main Work Bench Canvas */}
        <main className="flex-1 md:ml-64 p-6 md:p-12 flex flex-col items-center relative overflow-hidden">
          
          {/* Estetik Pastel Background Decoration Blobs */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-[100px] opacity-30 pointer-events-none" />

          {testSelesai ? (
            /* HASIL EVALUASI SELESAI */
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-indigo-100/10 border border-slate-100 overflow-hidden relative z-10 p-8 text-center space-y-6">
              <div className="inline-flex rounded-full bg-emerald-50 p-4 border border-emerald-100 mb-2">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-pulse" />
              </div>
              
              <h2 className="font-display text-2xl font-extrabold text-slate-900">
                Hasil Pre-Test Diagnostik Berhasil Disimpan!
              </h2>
              
              <div className="max-w-sm mx-auto bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-4">
                <div className="flex justify-between border-b border-slate-200/50 pb-2 text-sm">
                  <span className="text-slate-500 font-medium">Nama Kadet:</span>
                  <span className="text-slate-800 font-bold">{studentInfo?.nama}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/50 pb-2 text-sm">
                  <span className="text-slate-500 font-medium">Skor Awal Kognitif:</span>
                  <span className="text-indigo-600 font-extrabold">{skorAkhir} / 100 Pt</span>
                </div>
                <p className="text-[11px] text-slate-400 italic text-center pt-2 leading-tight">
                  *Nilai ini akan dibandingkan dengan skor Post-Test setelah praktikum untuk mengukur tingkat indeks belajarmu.
                </p>
              </div>

              <button
                onClick={handleLanjutKeMateri}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-700"
              >
                Lanjut ke Langkah 3 (Materi)
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            /* KUIS DIAKTIFKAN */
            <div className="w-full max-w-4xl flex flex-col gap-6 relative z-10">
              
              {/* Header Informasi */}
              <div className="text-left w-full">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-extrabold text-indigo-600 font-display">Langkah 2: Pre-Test Diagnostik</h2>
                  <span className="bg-emerald-50 text-emerald-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100 shadow-sm">Aktif</span>
                </div>
                <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                  Uji pengetahuan awalmu sebelum memulai petualangan sains! Diagnostik ini membantu kami menyesuaikan level praktikum virtualmu.
                </p>
              </div>

              {/* Progress Tracking Card */}
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Progress Penilaian</span>
                  <span className="text-sm font-bold text-slate-600">Pertanyaan {currentIdx + 1} dari {DAFTAR_SOAL.length}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Area (Grid Layout matching reference) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Card: Question and Conditionally Rendered Image */}
                <div className="md:col-span-8 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden flex flex-col text-left">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <LightbulbIcon className="h-5 w-5 text-indigo-500" />
                      <span className="text-xs font-bold uppercase tracking-wider">Misi Analisis Molekuler</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-slate-800 leading-relaxed">
                      {currentSoal.pertanyaan}
                    </h3>

                    {/* Rendering Soal Image ONLY if imageSrc exists in dataset */}
                    {currentSoal.imageSrc && (
                      <div className="w-full aspect-video md:aspect-[2/1] rounded-2xl bg-slate-50 flex items-center justify-center relative overflow-hidden border border-slate-100 mt-2">
                        <img 
                          src={currentSoal.imageSrc} 
                          alt="Visualisasi Soal" 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fb = document.getElementById(`q-fallback-${currentSoal.id}`);
                            if (fb) fb.classList.remove('hidden');
                          }}
                        />
                        <div id={`q-fallback-${currentSoal.id}`} className="hidden flex flex-col items-center justify-center text-center p-4">
                          <span className="text-5xl mb-2">{currentSoal.fallbackEmoji}</span>
                          <span className="text-xs font-bold text-slate-400">Visualisasi Praktikum SMP</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Card: Status Info Panel */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100/50 flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <TimerIcon className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">Durasi Santai</span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                      Kerjakan kuis dengan tenang, tidak ada batasan waktu. Kami mengukur pemahaman murnimu!
                    </p>
                  </div>

                  <div className="bg-[#e8fff3] p-6 rounded-[2rem] border border-[#b2f0cf] flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">Fokus Sesi</span>
                    </div>
                    <p className="text-xs font-medium text-emerald-800 leading-relaxed">
                      Fokus pada idenfikasi cairan, konsep pH, dan pemahaman biologis organ.
                    </p>
                  </div>
                </div>

              </div>

              {/* Options Selection Grid (A, B, C, D) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSoal.opsi.map((opsi, oIdx) => {
                  const isSelected = jawabanSiswa[currentSoal.id] === oIdx;
                  const labelLetter = String.fromCharCode(65 + oIdx); // A, B, C, D
                  
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handlePilihOpsi(currentSoal.id, oIdx)}
                      className={`flex items-center justify-between p-5 bg-white border-2 rounded-2xl transition-all duration-200 text-left group ${
                        isSelected 
                          ? "border-indigo-600 bg-indigo-50/50 shadow-sm animate-[scaleIn_0.2s_ease-out]"
                          : "border-transparent border-slate-100 hover:border-slate-200 hover:-translate-y-1 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-colors ${
                          isSelected 
                            ? "bg-indigo-600 text-white" 
                            : "bg-slate-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                        }`}>
                          {labelLetter}
                        </div>
                        <span className="text-sm sm:text-base font-bold text-slate-700">{opsi}</span>
                      </div>
                      
                      <CheckCircle2 className={`h-5 w-5 text-indigo-600 transition-opacity ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer Controls */}
              <footer className="w-full flex items-center justify-between py-6 border-t border-slate-200/50 mt-4">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-600 font-bold hover:text-indigo-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Kembali</span>
                </button>
                
                <button 
                  type="button"
                  onClick={handleNext}
                  disabled={!isOptionSelected || loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
                >
                  <span>{currentIdx === DAFTAR_SOAL.length - 1 ? "Selesai & Kunci" : "Simpan & Lanjut"}</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </footer>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// Custom inline Icons for consistent visual rendering without external library mismatches
const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const TimerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="10" x2="14" y1="2" y2="2" />
    <line x1="12" x2="15" y1="14" y2="11" />
    <circle cx="12" cy="14" r="8" />
  </svg>
);