"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  School, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  HelpCircle, 
  BookOpen, 
  FlaskConical, 
  Award,
  ChevronRight
} from "lucide-react";

// Custom inline SVG Icon to prevent any Lucide version mismatch issues for ID Card
const IdCardIcon = ({ className }: { className?: string }) => (
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
    <rect width="18" height="14" x="3" y="5" rx="2" />
    <path d="M7 10h4" />
    <path d="M7 14h4" />
    <circle cx="15" cy="12" r="2" />
  </svg>
);

export default function IdentityPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nama: "",
    nis: "",
    sekolah: "",
    kelas: "",
  });

  const [loading, setLoading] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  // Periksa apakah siswa sudah pernah mengisi identitas sebelumnya
  useEffect(() => {
    const session = localStorage.getItem("virexa_student_session");
    if (session) {
      setHasSession(true);
      const parsed = JSON.parse(session);
      setFormData({
        nama: parsed.nama || "",
        nis: parsed.nis || "",
        sekolah: parsed.sekolah || "",
        kelas: parsed.kelas || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.nis || !formData.sekolah || !formData.kelas) return;

    setLoading(true);

    try {
      // 1. Simpan sesi ke LocalStorage
      localStorage.setItem("virexa_student_session", JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }));

      // 2. Kirim data ke API backend jika siap
      await fetch("/api/students/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 3. Alirkan langsung ke Langkah 2 (Pre-Test)
      router.push("/student/pre-test");
    } catch (error) {
      console.error("Gagal menyimpan identitas:", error);
      // Tetap lanjutkan ke halaman berikutnya jika API gagal/belum siap, agar siswa tidak macet
      router.push("/student/pre-test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
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
        
        {/* Left Side Navigation Bar - Locked State Control */}
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

          {/* List Menu Langkah 1 - 5 */}
          <div className="flex-1 space-y-1 overflow-y-auto px-2">
            
            {/* 1. Identity (Active/Selalu Terbuka) */}
            <div className="bg-indigo-50/50 text-indigo-600 font-bold rounded-lg px-4 py-3 flex items-center gap-3 border border-indigo-100/50 transition-all cursor-default">
              <User className="h-5 w-5 text-indigo-500" />
              <span className="text-xs tracking-wider">1. Identitas</span>
            </div>

            {/* 2. Pre-Test (Terkunci jika belum isi data diri) */}
            {hasSession ? (
              <button 
                onClick={() => router.push("/student/pre-test")}
                className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
              >
                <HelpCircle className="h-5 w-5 text-slate-400" />
                <span className="text-xs tracking-wider font-semibold">2. Pre-Test</span>
              </button>
            ) : (
              <div className="text-slate-300 rounded-lg px-4 py-3 flex items-center justify-between gap-3 transition-all cursor-not-allowed select-none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-slate-200" />
                  <span className="text-xs tracking-wider font-medium">2. Pre-Test</span>
                </div>
                <Lock className="h-3.5 w-3.5 text-slate-300" />
              </div>
            )}

            {/* 3. Materials (Terkunci jika belum isi data diri) */}
            {hasSession ? (
              <button 
                onClick={() => router.push("/student/materials")}
                className="w-full text-slate-600 hover:bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-3 transition-all text-left"
              >
                <BookOpen className="h-5 w-5 text-slate-400" />
                <span className="text-xs tracking-wider font-semibold">3. Materials</span>
              </button>
            ) : (
              <div className="text-slate-300 rounded-lg px-4 py-3 flex items-center justify-between gap-3 transition-all cursor-not-allowed select-none">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-slate-200" />
                  <span className="text-xs tracking-wider font-medium">3. Materials</span>
                </div>
                <Lock className="h-3.5 w-3.5 text-slate-300" />
              </div>
            )}

            {/* 4. Virtual Lab (Terkunci jika belum isi data diri) */}
            {hasSession ? (
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

            {/* 5. Post-Test (Terkunci jika belum isi data diri) */}
            {hasSession ? (
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
        <main className="flex-1 md:ml-64 p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
          
          {/* Estetik Pastel Background Decoration Blobs */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] opacity-30 pointer-events-none" />
          
          {/* Grid Layout inside Canvas */}
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Column: Welcome Typography & Decorative Chips (No big illustration box) */}
            <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              
              <div className="flex flex-col gap-3">
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-indigo-600 leading-tight">
                  Halo, <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Saintis Muda!</span>
                </h1>
                <p className="text-base text-slate-600 max-w-sm leading-relaxed">
                  Selamat datang di platform lab virtual VIREXA. Lengkapi identitas dirimu di sisi kanan untuk memulai eksperimen yang mengesankan.
                </p>
              </div>

              {/* Decorative Tech Badges */}
              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100/50">
                  <Sparkles className="h-4 w-4 text-emerald-500 fill-emerald-100" />
                  <span className="text-xs font-bold text-emerald-700">Aman &amp; Interaktif</span>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100/50">
                  <span className="text-xs font-bold text-indigo-700">Real-time Simulation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glass Card Form Card Container */}
            <div className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/60 shadow-xl shadow-indigo-100/10 relative overflow-hidden w-full">
              
              {/* Card Decoration Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-indigo-600 rounded-full shadow-sm" />
                <h2 className="font-display text-lg font-extrabold text-slate-900 tracking-tight">
                  Formulir Data Diri
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Input Nama Lengkap */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      name="nama"
                      required
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Contoh: Ahmad Dani"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 placeholder-slate-400/70 focus:border-indigo-500/20 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none shadow-sm text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Input NIS */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                    Nomor Induk Siswa (NIS)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <IdCardIcon className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      name="nis"
                      required
                      value={formData.nis}
                      onChange={handleChange}
                      placeholder="Contoh: 240182"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 placeholder-slate-400/70 focus:border-indigo-500/20 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none shadow-sm text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Input Asal Sekolah */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                    Asal Sekolah
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <School className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      name="sekolah"
                      required
                      value={formData.sekolah}
                      onChange={handleChange}
                      placeholder="Contoh: SMP Negeri 1 Banda Aceh"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 placeholder-slate-400/70 focus:border-indigo-500/20 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none shadow-sm text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Class Dropdown */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                    Kelas
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <select
                      name="kelas"
                      required
                      value={formData.kelas}
                      onChange={handleChange}
                      className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 focus:border-indigo-500/20 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer shadow-sm text-sm font-medium"
                    >
                      <option disabled value="">Pilih Kelas Kamu</option>
                      <option value="IX-A">Kelas IX-A</option>
                      <option value="IX-B">Kelas IX-B</option>
                      <option value="IX-C">Kelas IX-C</option>
                      <option value="IX-D">Kelas IX-D</option>
                      <option value="IX-E">Kelas IX-E</option>
                      <option value="IX-F">Kelas IX-F</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Info Tip Note */}
                <div className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 text-left">
                  <span className="text-sm">💡</span>
                  <p className="text-[11px] font-medium text-slate-500 leading-tight">
                    Gunakan nama sesuai daftar hadir kelas untuk memudahkan proses rekapan nilai latihan oleh Guru.
                  </p>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.nama || !formData.nis || !formData.sekolah || !formData.kelas}
                  className="w-full mt-2 group flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Menyiapkan Lab..." : "Mulai Petualangan"}
                  {!loading && <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
                </button>

              </form>
            </div>

          </div>
        </main>
      </div>

      {/* Floating Atmosphere Elements in Background */}
      <div className="fixed top-1/4 left-10 opacity-[0.06] hidden xl:block animate-bounce" style={{ animationDuration: "6s" }}>
        <FlaskConical className="text-indigo-600 w-16 h-16" />
      </div>
      <div className="fixed bottom-1/4 right-10 opacity-[0.06] hidden xl:block animate-pulse" style={{ animationDuration: "5s" }}>
        <Sparkles className="text-emerald-600 w-20 h-20" />
      </div>

    </div>
  );
}