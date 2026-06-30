"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  User, 
  BookOpen, 
  FlaskConical, 
  Award,
  ChevronRight,
  ClipboardCheck,
  TrendingUp,
  RotateCcw,
  Home
} from "lucide-react";

// Struktur Soal Post-Test Evaluasi Berdasarkan Pengalaman Lab
const DAFTAR_SOAL = [
  {
    id: 1,
    pertanyaan: "Saat mencampurkan Cuka Apel dan Minuman Cola di laboratorium virtual, apa yang terjadi pada indikator organ lambung?",
    opsi: [
      "Lapisan lambung semakin menebal dan kuat",
      "Mengalami erosi dan radang (gastritis) akibat paparan asam ekstrem",
      "Tidak ada dampak sama sekali pada mukosa lambung",
      "Lambung menjadi kebal terhadap zat korosif"
    ],
    jawabanBenar: 1, 
  },
  {
    id: 2,
    pertanyaan: "Berdasarkan simulasi, rentang derajat keasaman (pH) berapakah yang paling berisiko mengikis lapisan email kalsium pada gigi kita?",
    opsi: [
      "pH di atas 7.0",
      "pH netral persis di angka 7.0",
      "pH di bawah 4.5",
      "pH di atas 9.0"
    ],
    jawabanBenar: 2, 
  },
  {
    id: 3,
    pertanyaan: "Bahan kimia apakah yang sering disalahgunakan sebagai pengawet namun sangat beracun dan merusak saringan nefron ginjal karena nilai pH-nya mencapai 9.5?",
    opsi: [
      "Susu Sapi",
      "Boraks",
      "Baking Soda",
      "Air Kelapa"
    ],
    jawabanBenar: 1, 
  },
  {
    id: 4,
    pertanyaan: "Jika lambung memproduksi asam berlebih, di antara bahan harian berikut, manakah yang paling aman digunakan untuk membantu menetralkan asam lambung?",
    opsi: [
      "Baking Soda (Natrium Bikarbonat)",
      "Minuman Cola (Asam Fosfat)",
      "Cuka Apel (Asam Asetat)",
      "Saos Sambal (Asam Sitrat)"
    ],
    jawabanBenar: 0, 
  },
  {
    id: 5,
    pertanyaan: "Apa perbedaan klinis utama antara Air Murni (pH 7.0) dan Air Kelapa segar (pH 6.2) bagi organ ekskresi kita?",
    opsi: [
      "Keduanya sama-sama sangat korosif bagi ginjal",
      "Air kelapa mengandung mineral alkali (K⁺, Na⁺) yang menghidrasi dan sangat ramah bagi ginjal",
      "Air murni jauh lebih berbahaya daripada air kelapa",
      "Air kelapa memiliki pH di atas 10 yang merusak hati"
    ],
    jawabanBenar: 1, 
  }
];

const PostTestPage = () => {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState<{ nama: string; kelas: string; skorPretest?: number } | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [jawabanSiswa, setJawabanSiswa] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [testSelesai, setTestSelesai] = useState(false);
  
  // States untuk Hasil Evaluasi
  const [skorPostTest, setSkorPostTest] = useState(0);
  const [skorPreTest, setSkorPreTest] = useState(0);
  const [learningGain, setLearningGain] = useState(0);
  const [gainKategori, setGainKategori] = useState("Rendah");

  // Load sesi dari LocalStorage
  useEffect(() => {
    const session = localStorage.getItem("virexa_student_session");
    if (session) {
      const parsed = JSON.parse(session);
      setStudentInfo(parsed);
      setSkorPreTest(parsed.skorPretest || 0); // Ambil skor pre-test jika ada, default 0
    } else {
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
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(jawabanSiswa).length < DAFTAR_SOAL.length) return;

    setLoading(true);

    // 1. Kalkulasi Skor Post-Test
    let jumlahBenar = 0;
    DAFTAR_SOAL.forEach((soal) => {
      if (jawabanSiswa[soal.id] === soal.jawabanBenar) {
        jumlahBenar += 1;
      }
    });

    const skorAkhir = Math.round((jumlahBenar / DAFTAR_SOAL.length) * 100);
    setSkorPostTest(skorAkhir);

    // 2. Kalkulasi Hake's Normalized Learning Gain
    // Rumus: (Post - Pre) / (100 - Pre)
    let gain = 0;
    let kategori = "Tetap/Menurun";

    if (skorAkhir > skorPreTest) {
      if (skorPreTest === 100) {
        gain = 0; // Prevent division by zero
        kategori = "Sempurna";
      } else {
        gain = (skorAkhir - skorPreTest) / (100 - skorPreTest);
        if (gain > 0.7) kategori = "Tinggi 🚀";
        else if (gain >= 0.3) kategori = "Sedang ⭐";
        else kategori = "Rendah 📈";
      }
    } else if (skorAkhir === skorPreTest && skorAkhir === 100) {
        kategori = "Konsisten Sempurna 🏆";
    }
    
    setLearningGain(gain);
    setGainKategori(kategori);

    try {
      // Simpan skor post-test & learning gain ke localStorage
      const session = localStorage.getItem("virexa_student_session");
      if (session) {
        const parsed = JSON.parse(session);
        localStorage.setItem("virexa_student_session", JSON.stringify({
          ...parsed,
          skorPosttest: skorAkhir,
          learningGain: gain.toFixed(2),
          gainKategori: kategori,
          status: "Lulus"
        }));
      }

      // Mock API call to save final data
      await fetch("/api/tests/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nis: studentInfo?.nama,
          skorPosttest: skorAkhir,
          learningGain: gain,
        }),
      });

    } catch (error) {
      console.error("Gagal menyimpan hasil akhir:", error);
    } finally {
      setLoading(false);
      setTestSelesai(true);
    }
  };

  const handleSelesaiTotal = () => {
    router.push("/");
  };

  const handleUlangiSesi = () => {
    localStorage.removeItem("virexa_student_session");
    router.push("/student/identity");
  };

  const currentSoal = DAFTAR_SOAL[currentIdx];
  const progressPercent = ((currentIdx + 1) / DAFTAR_SOAL.length) * 100;
  const isOptionSelected = jawabanSiswa[currentSoal.id] !== undefined;

  return (
    <div className="min-h-screen bg-[#f3f0ff] text-[#0b1c30] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center w-full px-4 py-2.5 z-50 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-indigo-600 tracking-tight">VIREXA</span>
          <div className="hidden md:flex gap-4 ml-6 items-center text-xs font-bold text-slate-400">
            <span className="text-indigo-600 border-b-2 border-indigo-600 pb-0.5">📝 Evaluasi Post-Test</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        
        {/* Left Side Navigation Bar */}
        <nav className="h-[calc(100vh-60px)] flex flex-col py-3 z-40 bg-white border-r border-slate-100 w-56 hidden xl:flex shrink-0 sticky top-[60px]">
          <div className="px-3 mb-3">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                SL
              </div>
              <div>
                <h3 className="font-display text-xs text-indigo-600 leading-tight font-bold">Science Lab</h3>
                <p className="text-[10px] text-slate-500 font-medium">Junior High School</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto px-2">
            <button className="w-full text-slate-400 rounded-lg px-3 py-2 flex items-center gap-3 text-left cursor-not-allowed">
              <User className="h-4 w-4" />
              <span className="text-[11px] tracking-wider font-semibold">1. Identitas</span>
            </button>
            <button className="w-full text-slate-400 rounded-lg px-3 py-2 flex items-center gap-3 text-left cursor-not-allowed">
              <HelpCircle className="h-4 w-4" />
              <span className="text-[11px] tracking-wider font-semibold">2. Pre-Test</span>
            </button>
            <button className="w-full text-slate-400 rounded-lg px-3 py-2 flex items-center gap-3 text-left cursor-not-allowed">
              <BookOpen className="h-4 w-4" />
              <span className="text-[11px] tracking-wider font-semibold">3. Materi & Kuis</span>
            </button>
            <button className="w-full text-slate-400 rounded-lg px-3 py-2 flex items-center gap-3 text-left cursor-not-allowed">
              <FlaskConical className="h-4 w-4" />
              <span className="text-[11px] tracking-wider font-semibold">4. Virtual Lab</span>
            </button>
            <div className="bg-indigo-50/50 text-indigo-600 font-bold rounded-lg px-3 py-2 flex items-center gap-3 border border-indigo-100/50 cursor-default">
              <Award className="h-4 w-4 text-indigo-500" />
              <span className="text-[11px] tracking-wider">5. Post-Test</span>
            </div>
          </div>
        </nav>

        {/* Main Workspace */}
        <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center relative w-full overflow-y-auto min-h-[calc(100vh-60px)]">
          
          {/* Background Decorations */}
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] opacity-60 pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-[100px] opacity-50 pointer-events-none" />

          {testSelesai ? (
            
            /* ======================================================== */
            /* DASHBOARD KELULUSAN & HASIL AKHIR (SELESAI)              */
            /* ======================================================== */
            <div className="w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-[scaleIn_0.4s_ease-out]">
              
              {/* Confetti Background Simulation (CSS) */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxjaXJjbGUgY3g9IjEwJSIgY3k9IjIwJSIgcj0iNCIgZmlsbD0iI0E3RjNEMCIvPjxjaXJjbGUgY3g9IjMwJSIgY3k9IjgwJSIgcj0iNiIgZmlsbD0iI0ZFRDdBQSIvPjxjaXJjbGUgY3g9IjgwJSIgY3k9IjEwJSIgcj0iNSIgZmlsbD0iI0JBRTZGRCIvPjxjaXJjbGUgY3g9IjkwJSIgY3k9IjcwJSIgcj0iMyIgZmlsbD0iI0ZFRDdBQSIvPjxjaXJjbGUgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNyIgZmlsbD0iI0E3RjNEMCIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] opacity-40 pointer-events-none" />

              <div className="bg-indigo-600 p-8 sm:p-10 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <Award className="h-20 w-20 mx-auto text-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)] animate-bounce" style={{ animationDuration: '3s' }} />
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Eksperimen Selesai!</h1>
                <p className="text-indigo-100 text-sm sm:text-base font-medium max-w-lg mx-auto">
                  Selamat <span className="font-bold text-white">{studentInfo?.nama}</span>! Kamu telah berhasil menyelesaikan seluruh rangkaian praktikum laboratorium virtual Asam & Basa.
                </p>
              </div>

              <div className="p-8 sm:p-10 text-center">
                
                {/* Score Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  
                  {/* Pre-Test Score */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Skor Awal</span>
                    <span className="text-3xl font-extrabold text-slate-800">{skorPreTest}</span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">Pre-Test</span>
                  </div>

                  {/* Post-Test Score */}
                  <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100 flex flex-col items-center relative transform sm:-translate-y-4 shadow-lg shadow-indigo-500/10">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Skor Akhir</span>
                    <span className="text-5xl font-extrabold text-indigo-600">{skorPostTest}</span>
                    <span className="text-[10px] font-bold text-indigo-400 mt-1">Post-Test</span>
                  </div>

                  {/* Learning Gain */}
                  <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 flex flex-col items-center">
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Efektivitas (N-Gain)</span>
                    <span className="text-3xl font-extrabold text-emerald-600">{learningGain.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-emerald-500 mt-1 bg-emerald-100 px-2.5 py-0.5 rounded-full">{gainKategori}</span>
                  </div>

                </div>

                {/* Important Reminder Card */}
                <div className="bg-amber-50 border border-amber-200/60 p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-5 text-left mb-10 shadow-sm">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                    <ClipboardCheck className="h-8 w-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-amber-900 text-lg">Jangan Lupa LKPD Fisik!</h3>
                    <p className="text-sm text-amber-800/80 font-medium mt-1">
                      Sistem telah merekam nilai digitalmu. Pastikan kamu <strong className="text-amber-700">mengumpulkan lembar kertas Laporan Kerja (LKPD)</strong> kepada Guru di meja depan sebagai bukti analisis eksperimenmu.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={handleUlangiSesi}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-600 border border-slate-200 font-bold rounded-2xl text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" /> Ulangi Simulasi Kelas
                  </button>
                  <button 
                    onClick={handleSelesaiTotal}
                    className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Home className="h-4 w-4" /> Kembali ke Beranda
                  </button>
                </div>

              </div>
            </div>

          ) : (

            /* ======================================================== */
            /* WIZARD KUIS POST-TEST (BELUM SELESAI)                    */
            /* ======================================================== */
            <div className="w-full max-w-4xl flex flex-col gap-6 relative z-10">
              
              <div className="text-center md:text-left w-full mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-emerald-200">
                  <TrendingUp className="h-3 w-3" /> Uji Pemahaman Akhir
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">Post-Test Evaluasi</h2>
                <p className="text-sm text-slate-500 max-w-2xl mt-2 mx-auto md:mx-0">
                  Mari kita lihat seberapa jauh pemahamanmu meningkat setelah bereksperimen di meja laboratorium. Kerjakan kuis ini dengan cermat!
                </p>
              </div>

              {/* Progress Tracking Card */}
              <div className="bg-white/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Penyelesaian</span>
                  <span className="text-sm font-bold text-slate-600">Pertanyaan {currentIdx + 1} dari {DAFTAR_SOAL.length}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Area */}
              <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden flex flex-col text-left">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
                
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-800 leading-relaxed mb-8">
                  {currentSoal.pertanyaan}
                </h3>

                {/* Options Selection Grid (A, B, C, D) */}
                <div className="grid grid-cols-1 gap-4">
                  {currentSoal.opsi.map((opsi, oIdx) => {
                    const isSelected = jawabanSiswa[currentSoal.id] === oIdx;
                    const labelLetter = String.fromCharCode(65 + oIdx); 
                    
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handlePilihOpsi(currentSoal.id, oIdx)}
                        className={`flex items-center justify-between p-4 sm:p-5 bg-white border-2 rounded-2xl transition-all duration-200 text-left group ${
                          isSelected 
                            ? "border-emerald-500 bg-emerald-50/50 shadow-sm"
                            : "border-slate-100 hover:border-slate-300 hover:-translate-y-0.5 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-colors shrink-0 ${
                            isSelected 
                              ? "bg-emerald-500 text-white" 
                              : "bg-slate-50 text-slate-500 group-hover:bg-slate-200"
                          }`}>
                            {labelLetter}
                          </div>
                          <span className={`text-sm sm:text-base font-bold leading-tight ${isSelected ? "text-emerald-900" : "text-slate-700"}`}>
                            {opsi}
                          </span>
                        </div>
                        
                        <CheckCircle2 className={`h-6 w-6 text-emerald-500 transition-opacity shrink-0 ${
                          isSelected ? "opacity-100" : "opacity-0"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Footer Controls */}
              <div className="w-full flex items-center justify-end py-2 mt-2">
                <button 
                  type="button"
                  onClick={handleNext}
                  disabled={!isOptionSelected || loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all group w-full sm:w-auto"
                >
                  {loading ? (
                    <span className="animate-pulse">Memproses...</span>
                  ) : (
                    <>
                      <span>{currentIdx === DAFTAR_SOAL.length - 1 ? "Selesaikan & Hitung Skor" : "Simpan & Lanjut"}</span>
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default PostTestPage;