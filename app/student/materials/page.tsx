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
  BookOpenCheck,
  FlameKindling,
  AlertTriangle,
  Activity,
  Timer,
  Lock
} from "lucide-react";

const MATERI_ASAM = {
  judul: "Dunia Asam Korosif & Email Gigi",
  deskripsi: "Zat asam memiliki skala pH di bawah 7.0. Tingkat keasaman yang ekstrem sangat merusak jaringan organik tubuh kita.",
  poinMateri: [
    {
      nama: "Minuman Cola (pH 2.5)",
      detail: "Mengandung senyawa Asam Fosfat (H₃PO₄) tinggi. Konsumsi berlebih mengikis email kalsium pelindung gigi (demineralisasi) secara cepat.",
      img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
    },
    {
      nama: "Cuka Apel / Lemon (pH 3.2)",
      detail: "Bersifat korosif tingkat tinggi bagi dinding mukosa lambung. Jika lambung terus terpapar zat ini, akan memicu peradangan lambung akut (Gastritis/Maag).",
      img: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

const MATERI_BASA = {
  judul: "Dunia Basa Alkali & Filtrasi Ginjal",
  deskripsi: "Zat basa memiliki skala pH di atas 7.0 hingga 14.0. Ginjal bekerja ekstra menyaring ion basa berlebih untuk menjaga homeostasis tubuh.",
  poinMateri: [
    {
      nama: "Air Kelapa Alami (pH 6.2)",
      detail: "Bersifat alkali ringan yang ramah bagi tubuh. Mengandung ion kalium (K⁺) dan natrium (Na⁺) yang membantu kerja penyaringan air di ginjal.",
      img: "https://images.unsplash.com/photo-1548963763-8848dfd41177?auto=format&fit=crop&w=600&q=80"
    },
    {
      nama: "Boraks Pengawet (pH 9.5)",
      detail: "Basa kuat non-pangan yang sangat beracun. Senyawa natrium tetraborat tidak dapat disaring oleh nefron ginjal, memicu kegagalan organ permanen.",
      img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    }
  ]
};

const KUIS_ASAM = [
  {
    id: "asam_1",
    tanya: "Mengapa minuman cola harian diklasifikasikan sebagai asam kuat berbahaya dengan pH ekstrem mencapai 2.5?",
    opsi: [
      "Mengandung protein kasein susu yang padat",
      "Mengandung senyawa Asam Fosfat (H₃PO₄) dan gas CO₂",
      "Mengandung banyak garam mineral alkali pelindung",
      "Memiliki kandungan air murni H₂O yang terlalu tinggi"
    ],
    benar: 1,
    alasan: "Asam fosfat sengaja ditambahkan pada cola untuk memberikan rasa tajam, namun pH 2.5 sangat korosif bagi email gigi."
  },
  {
    id: "asam_2",
    tanya: "Apakah dampak biologis utama jika lambung kita terus-menerus terpapar cairan dengan pH di bawah 3.5 secara berlebihan?",
    opsi: [
      "Dinding mukosa lambung akan menebal dan semakin kuat",
      "Memicu erosi dinding lambung, menyebabkan peradangan (gastritis/maag)",
      "Proses metabolisme pencernaan makanan akan dipercepat",
      "Saringan glomerulus ginjal akan berhenti bekerja secara total"
    ],
    benar: 1,
    alasan: "Asam ekstrem merusak lapisan pelindung mukosa lambung, memicu luka lambung dan rasa mual perih membakar."
  }
];

const KUIS_BASA = [
  {
    id: "basa_1",
    tanya: "Zat kimia berbahaya seperti Boraks pengawet memiliki pH mencapai 9.5. Mengapa zat ini sangat dilarang masuk ke dalam tubuh manusia?",
    opsi: [
      "Karena boraks rasanya terlalu manis bagi lidah",
      "Karena boraks bersifat netral dan tidak beraksi dengan organ tubuh",
      "Karena boraks terakumulasi di ginjal & hati, memicu kegagalan organ",
      "Karena boraks dapat membantu menetralisir racun di lambung"
    ],
    benar: 2,
    alasan: "Boraks mengandung senyawa natrium tetraborat toksik yang tidak bisa disaring glomerulus ginjal, merusak jaringan seluler secara permanen."
  },
  {
    id: "basa_2",
    tanya: "Mengapa air kelapa segar (pH sekitar 6.2) sangat baik dikonsumsi tubuh dibandingkan cairan soda bikarbonat?",
    opsi: [
      "Karena air kelapa kaya akan elektrolit alami (K⁺, Na⁺) yang menghidrasi sel",
      "Karena air kelapa memiliki kadar asam korosif yang sangat tinggi",
      "Karena air kelapa dapat membekukan klorofil di dalam darah",
      "Karena air kelapa memiliki pH di atas angka 12.0 yang sangat basa"
    ],
    benar: 0,
    alasan: "Air kelapa murni bersifat alkali ringan mendekati netral, kaya mineral alami yang menjaga keseimbangan cairan tubuh."
  }
];

export default function MaterialsPage() {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState<{ nama: string; kelas: string } | null>(null);
  
  // State untuk melacak tahapan belajar: 'materi' atau 'kuis'
  const [activeTab, setActiveTab] = useState<"asam" | "basa" | null>(null);
  const [faseBelajar, setFaseBelajar] = useState<"materi" | "kuis">("materi");

  // State jawaban kuis
  const [jawabanAsam, setJawabanAsam] = useState<Record<string, number>>({});
  const [jawabanBasa, setJawabanBasa] = useState<Record<string, number>>({});

  // Status kelulusan materi
  const [materiSelesai, setMateriSelesai] = useState({
    asam: false,
    basa: false
  });

  const [errorPesan, setErrorPesan] = useState<{ tipe: "asam" | "basa"; teks: string } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("virexa_student_session");
    if (session) {
      setStudentInfo(JSON.parse(session));
      const parsed = JSON.parse(session);
      if (parsed.materiSelesai) {
        setMateriSelesai(parsed.materiSelesai);
      }
    } else {
      router.push("/student/identity");
    }
  }, [router]);

  const handlePilihOpsi = (kategori: "asam" | "basa", soalId: string, opsiIdx: number) => {
    setErrorPesan(null);
    if (kategori === "asam") {
      setJawabanAsam(prev => ({ ...prev, [soalId]: opsiIdx }));
    } else {
      setJawabanBasa(prev => ({ ...prev, [soalId]: opsiIdx }));
    }
  };

  const handleKunciJawaban = (kategori: "asam" | "basa") => {
    const soalList = kategori === "asam" ? KUIS_ASAM : KUIS_BASA;
    const jawabanCurrent = kategori === "asam" ? jawabanAsam : jawabanBasa;

    if (Object.keys(jawabanCurrent).length < soalList.length) {
      setErrorPesan({
        tipe: kategori,
        teks: "Harap jawab seluruh pertanyaan kuis terlebih dahulu!"
      });
      return;
    }

    // Validasi Jawaban
    let semuaBenar = true;
    soalList.forEach((soal) => {
      if (jawabanCurrent[soal.id] !== soal.benar) {
        semuaBenar = false;
      }
    });

    if (semuaBenar) {
      const updatedSelesai = { ...materiSelesai, [kategori]: true };
      setMateriSelesai(updatedSelesai);
      setActiveTab(null);
      setFaseBelajar("materi");
      setErrorPesan(null);

      // Simpan status progres materi ke localStorage
      const session = localStorage.getItem("virexa_student_session");
      if (session) {
        const parsed = JSON.parse(session);
        localStorage.setItem("virexa_student_session", JSON.stringify({
          ...parsed,
          materiSelesai: updatedSelesai
        }));
      }
    } else {
      setErrorPesan({
        tipe: kategori,
        teks: "Oops! Ada jawabanmu yang kurang tepat. Silakan tinjau kembali penjelasan di kuis dan coba lagi!"
      });
    }
  };

  const handleLanjutKeLab = () => {
    if (materiSelesai.asam && materiSelesai.basa) {
      router.push("/student/virtual-lab");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f0ff] text-[#0b1c30] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center w-full px-6 py-4 z-50 sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-indigo-600 tracking-tight">VIREXA</span>
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
            
            {/* 1. Identity */}
            <button 
              onClick={() => router.push("/student/identity")}
              className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
            >
              <User className="h-5 w-5 text-slate-400" />
              <span className="text-xs tracking-wider font-semibold">1. Identitas</span>
            </button>

            {/* 2. Pre-Test */}
            <button 
              onClick={() => router.push("/student/pre-test")}
              className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
            >
              <HelpCircle className="h-5 w-5 text-slate-400" />
              <span className="text-xs tracking-wider font-semibold">2. Pre-Test</span>
            </button>

            {/* 3. Materials (Sesi Aktif) */}
            <div className="bg-indigo-50/50 text-indigo-600 font-bold rounded-lg px-4 py-3 flex items-center gap-3 border border-indigo-100/50 transition-all cursor-default">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <span className="text-xs tracking-wider">3. Materials</span>
            </div>

            {/* 4. Virtual Lab */}
            {materiSelesai.asam && materiSelesai.basa ? (
              <button 
                onClick={() => router.push("/student/virtual-lab")}
                className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
              >
                <FlaskConical className="h-5 w-5 text-slate-400" />
                <span className="text-xs tracking-wider font-semibold">4. Virtual Lab</span>
              </button>
            ) : (
              <div className="text-slate-300 rounded-lg px-4 py-3 flex items-center justify-between gap-3 transition-all cursor-not-allowed select-none">
                <div className="flex items-center gap-3">
                  <FlaskConical className="h-5 w-5 text-slate-200" />
                  <span className="text-xs tracking-wider font-medium">4. Virtual Lab</span>
                </div>
                <Lock className="h-3.5 w-3.5 text-slate-300" />
              </div>
            )}

            {/* 5. Post-Test */}
            {materiSelesai.asam && materiSelesai.basa ? (
              <button 
                onClick={() => router.push("/student/post-test")}
                className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
              >
                <Award className="h-5 w-5 text-slate-400" />
                <span className="text-xs tracking-wider font-semibold">5. Post-Test</span>
              </button>
            ) : (
              <div className="text-slate-300 rounded-lg px-4 py-3 flex items-center justify-between gap-3 transition-all cursor-not-allowed select-none">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-slate-200" />
                  <span className="text-xs tracking-wider font-medium">5. Post-Test</span>
                </div>
                <Lock className="h-3.5 w-3.5 text-slate-300" />
              </div>
            )}

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
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#E8E5FF]/40 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#E2F9F3]/30 rounded-full blur-[100px] opacity-30 pointer-events-none" />

          <div className="w-full max-w-5xl flex flex-col gap-8 relative z-10">
            
            {/* Header Deskripsi */}
            <div className="text-left">
              <h2 className="text-3xl font-extrabold text-indigo-600 font-display">Langkah 3: Jalur Belajar Asam &amp; Basa</h2>
              <p className="text-base text-slate-600 mt-2 max-w-3xl leading-relaxed font-medium">
                Halo {studentInfo?.nama || "Kadet"}! Silakan pelajari karakteristik biokimia dari cairan harian di bawah ini secara mandiri, kemudian tuntaskan kuis parsialnya untuk membuka kunci gerbang Meja Praktikum Utama.
              </p>
            </div>

            {/* SEKTOR SEBELUM DIPILIH / LAYAR UTAMA PEMILIHAN SEKTOR */}
            {!activeTab ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Sektor Kiri: Asam */}
                <div className={`p-8 rounded-[2.5rem] border transition-all duration-300 flex flex-col text-left ${
                  materiSelesai.asam 
                    ? "bg-emerald-50/40 border-emerald-100" 
                    : "bg-[#FFEFE8]/70 border-rose-100 hover:shadow-xl hover:shadow-rose-100/20"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-rose-600">
                      <FlameKindling className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-wider font-display">Kategori Asam</span>
                    </div>
                    {materiSelesai.asam && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        ✓ Lulus Kuis
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-800 mb-2">
                    {MATERI_ASAM.judul}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {MATERI_ASAM.deskripsi}
                  </p>

                  <button
                    onClick={() => { setActiveTab("asam"); setFaseBelajar("materi"); setErrorPesan(null); }}
                    className="w-full py-4 bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-bold rounded-2xl text-xs tracking-wider transition-all"
                  >
                    {materiSelesai.asam ? "Tinjau Ulang Modul Asam" : "Pelajari Modul Asam & Mulai Kuis"}
                  </button>
                </div>

                {/* Sektor Kanan: Basa */}
                <div className={`p-8 rounded-[2.5rem] border transition-all duration-300 flex flex-col text-left ${
                  materiSelesai.basa 
                    ? "bg-emerald-50/40 border-emerald-100" 
                    : "bg-[#E3F2FD]/70 border-blue-100 hover:shadow-xl hover:shadow-blue-100/20"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-blue-600">
                      <BookOpenCheck className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-wider font-display">Kategori Basa &amp; Netral</span>
                    </div>
                    {materiSelesai.basa && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        ✓ Lulus Kuis
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-800 mb-2">
                    {MATERI_BASA.judul}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {MATERI_BASA.deskripsi}
                  </p>

                  <button
                    onClick={() => { setActiveTab("basa"); setFaseBelajar("materi"); setErrorPesan(null); }}
                    className="w-full py-4 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-2xl text-xs tracking-wider transition-all"
                  >
                    {materiSelesai.basa ? "Tinjau Ulang Modul Basa" : "Pelajari Modul Basa & Mulai Kuis"}
                  </button>
                </div>

              </div>
            ) : (
              /* PANEL AKTIF SEKTOR BELAJAR (FOKUS GAYA INTERAKTIF) */
              <div className="w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 text-left animate-[fadeIn_0.3s_ease-out]">
                
                {/* Header Sub-Menu */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setActiveTab(null); setFaseBelajar("materi"); }}
                      className="p-2.5 rounded-full hover:bg-slate-50 text-slate-500 transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                        {activeTab === "asam" ? "Kategori Asam" : "Kategori Basa & Netral"}
                      </span>
                      <h3 className="font-display text-xl font-bold text-slate-900 mt-0.5">
                        {activeTab === "asam" ? MATERI_ASAM.judul : MATERI_BASA.judul}
                      </h3>
                    </div>
                  </div>

                  {/* Navigasi Tahapan Sektor Belajar */}
                  <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button
                      onClick={() => setFaseBelajar("materi")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        faseBelajar === "materi" 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      📖 Membaca Materi
                    </button>
                    <button
                      onClick={() => setFaseBelajar("kuis")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        faseBelajar === "kuis" 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      ✍️ Uji Kuis Parsial
                    </button>
                  </div>
                </div>

                {/* TAMPILAN 1: MEMBACA MATERI TERLEBIH DAHULU */}
                {faseBelajar === "materi" ? (
                  <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                    
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      {activeTab === "asam" ? MATERI_ASAM.deskripsi : MATERI_BASA.deskripsi}
                    </p>

                    {/* Diubah menjadi baris horisontal lebar penuh agar teks pH & materi berukuran besar & gambar proporsional kecil */}
                    <div className="grid grid-cols-1 gap-6">
                      {(activeTab === "asam" ? MATERI_ASAM.poinMateri : MATERI_BASA.poinMateri).map((item, idx) => (
                        <div key={idx} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-all group text-left">
                          
                          {/* Gambar Proporsional Kecil (Square Rounded) */}
                          <div className="w-full sm:w-36 h-36 shrink-0 rounded-2xl overflow-hidden bg-slate-100 relative shadow-inner">
                            <img
                              src={item.img}
                              alt={item.nama}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                          </div>
                          
                          {/* Tulisan Informasi Materi pH Gede & Jelas */}
                          <div className="flex-1 space-y-3">
                            <h4 className="font-display font-extrabold text-slate-900 text-xl flex items-center gap-2">
                              <span className="text-lg">{idx === 0 ? "🔹" : "🔸"}</span>
                              {item.nama}
                            </h4>
                            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA to trigger Quiz */}
                    <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-indigo-700">
                        <Activity className="h-5 w-5 text-indigo-500" />
                        <span className="text-xs font-bold leading-tight">Saya sudah memahami seluruh poin materi pembelajaran di atas.</span>
                      </div>
                      <button
                        onClick={() => setFaseBelajar("kuis")}
                        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10"
                      >
                        Mulai Kuis Sektor
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                  </div>
                ) : (
                  /* TAMPILAN 2: SELESAI MATERI, AKTIFKAN KUIS PARSIAL */
                  <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
                    
                    {/* Header Deskripsi Kuis */}
                    <div className="flex items-start gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/40 text-left">
                      <Timer className="h-6 w-6 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-1">Panduan Kuis</h4>
                        <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                          Tuntaskan semua pertanyaan dengan benar agar status kelulusan kuis kualifikasi materi Anda valid disimpan di database Guru.
                        </p>
                      </div>
                    </div>

                    {/* Lembar Soal Pilihan Ganda */}
                    <div className="space-y-8">
                      {(activeTab === "asam" ? KUIS_ASAM : KUIS_BASA).map((soal, sIdx) => (
                        <div key={soal.id} className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/40 hover:bg-slate-50/70 transition-all space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="inline-flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 font-bold px-2.5 py-1 text-xs mt-0.5">
                              Pertanyaan {sIdx + 1}
                            </span>
                            <h4 className="font-semibold text-slate-800 text-sm leading-relaxed">
                              {soal.tanya}
                            </h4>
                          </div>

                          {/* Render Opsi Pilihan A, B, C, D */}
                          <div className="grid grid-cols-1 gap-3 pl-11">
                            {soal.opsi.map((opsi, oIdx) => {
                              const isSel = (activeTab === "asam" ? jawabanAsam[soal.id] : jawabanBasa[soal.id]) === oIdx;
                              const labelLetter = String.fromCharCode(65 + oIdx);

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => handlePilihOpsi(activeTab!, soal.id, oIdx)}
                                  className={`flex items-center justify-between p-4 bg-white border-2 rounded-xl transition-all duration-200 text-left group ${
                                    isSel 
                                      ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                                      : "border-transparent border-slate-200/60 hover:border-slate-300 shadow-sm"
                                  }`}
                                >
                                  <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                                      isSel 
                                        ? "bg-indigo-600 text-white" 
                                        : "bg-slate-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                                    }`}>
                                      {labelLetter}
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 leading-tight">{opsi}</span>
                                  </div>

                                  <CheckCircle2 className={`h-5 w-5 text-indigo-600 transition-opacity ${
                                    isSel ? "opacity-100" : "opacity-0"
                                  }`} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Handling Errors */}
                    {errorPesan?.tipe === activeTab && (
                      <div className="p-4 bg-rose-50 text-rose-800 text-xs font-semibold rounded-2xl border border-rose-100 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                        <span>{errorPesan.teks}</span>
                      </div>
                    )}

                    {/* Kunci Jawaban Actions */}
                    <div className="flex gap-4 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setFaseBelajar("materi")}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl text-xs hover:bg-slate-200 transition-colors"
                      >
                        Kembali Baca Materi
                      </button>
                      <button
                        onClick={() => handleKunciJawaban(activeTab!)}
                        className="flex-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl text-xs tracking-wider shadow-md hover:bg-indigo-700 transition-colors"
                      >
                        Kunci Jawaban &amp; Selesaikan Kuis
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* Action Footer Navigation Bar */}
            <footer className="w-full flex flex-col sm:flex-row items-center justify-between py-6 border-t border-slate-200/50 mt-6 gap-4">
              <button 
                type="button"
                onClick={() => {
                  if (activeTab) {
                    setActiveTab(null);
                    setFaseBelajar("materi");
                  } else {
                    router.push("/student/pre-test");
                  }
                }}
                className="flex items-center gap-2 text-slate-600 font-bold hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>{activeTab ? "Kembali ke Menu Sektor" : "Kembali ke Pre-Test"}</span>
              </button>

              <button
                type="button"
                onClick={handleLanjutKeLab}
                disabled={!materiSelesai.asam || !materiSelesai.basa}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-600/15 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-all"
              >
                <span>Masuk ke Meja Praktikum</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}