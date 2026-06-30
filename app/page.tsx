"use client";

import Link from "next/link";
import {
  Zap,
  PlayCircle,
  ArrowRight,
  GraduationCap,
  Sparkles,
  FlaskConical,
  HeartPulse
} from "lucide-react";
import Navbar from "@/components/Navbar";

const steps = [
  {
    no: "Langkah 1",
    title: "Persiapan & Identitas",
    desc: "Kenakan jas lab virtualmu, isi data diri singkat, dan mulailah bersiap.",
    imgSrc: "/images/step1.png",
  },
  {
    no: "Langkah 2",
    title: "Pre-Test Diagnostik",
    desc: "Uji pengetahuan awalmu secara singkat lewat kuis interaktif yang seru.",
    imgSrc: "/images/step2.png",
  },
  {
    no: "Langkah 3",
    title: "Materi Asam-Basa",
    desc: "Dengarkan arahan modul teori tentang karakteristik berbagai cairan harian.",
    imgSrc: "/images/step3.png",
  },
  {
    no: "Langkah 4",
    title: "Eksperimen Imersif",
    desc: "Campurkan berbagai bahan secara real-time dan isi lembar kerja LKPD fisikmu.",
    imgSrc: "/images/step4.png",
  },
  {
    no: "Langkah 5",
    title: "Post-Test & Evaluasi",
    desc: "Tuntaskan uji sumatif akhir untuk melihat grafik peningkatan indeks belajarmu.",
    imgSrc: "/images/step5.png",
  },
  {
    no: "Langkah 6",
    title: "Master Kimia Organ",
    desc: "Klaim dasbor prestasimu dan kumpulkan laporan LKPD fisik kepada Guru.",
    imgSrc: "/images/step6.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Shapes (Estetik Pastel Blobs matching the reference) */}
      <div className="absolute inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#E8E5FF]/40 rounded-full blur-[100px] animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E2F9F3]/40 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_2s]" />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-[#FFEFE8]/30 rounded-full blur-[100px] animate-[pulse_15s_ease-in-out_infinite_5s]" />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-12 px-6 sm:px-16 max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative py-12">
          
          {/* Left Column Text Content */}
          <div className="flex flex-col gap-6 z-10 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-md text-indigo-600 rounded-full w-fit border border-white/50 shadow-sm">
              <Sparkles className="h-4.5 w-4.5 text-indigo-500 fill-indigo-100" />
              <span className="text-xs uppercase tracking-wider font-bold">Misi Spesial: Asam &amp; Basa</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Ungkap Rahasia <br />
              <span className="text-indigo-600 italic font-serif">Dunia Molekuler</span> <br />
              Bersama Virexa!
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg">
              Laboratorium virtual paling estetik untuk kadet ilmuwan. Pelajari skala pH dengan eksperimen interaktif yang memukau, edukatif, dan 100% aman.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link 
                href="/student/identity"
                className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2"
              >
                Mulai Eksperimen
                <Zap className="h-5 w-5 fill-indigo-100" />
              </Link>
              <a 
                href="#alur-belajar"
                className="bg-white/40 backdrop-blur-md text-slate-800 font-semibold px-8 py-4 rounded-2xl border border-white/60 hover:bg-white/60 transition-all flex items-center gap-2 shadow-sm"
              >
                Tonton Trailer
                <PlayCircle className="h-5 w-5 text-slate-500" />
              </a>
            </div>

            {/* Social Proof Card */}
            <div className="mt-8 flex items-center gap-4 p-4 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm rounded-3xl w-fit">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-100 overflow-hidden shadow-sm flex items-center justify-center text-xs font-bold text-indigo-600">
                  👦
                </div>
                <div className="w-10 h-10 rounded-full border-4 border-white bg-emerald-100 overflow-hidden shadow-sm flex items-center justify-center text-xs font-bold text-emerald-600">
                  👧
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Bergabung dengan <span className="font-bold text-indigo-600">1,240+ Kadet</span> hari ini!
              </p>
            </div>
          </div>

          {/* Right Column: Beautiful Interactive Science Scene with Custom Mascot Image */}
          <div className="relative flex justify-center items-center h-[450px] lg:h-[600px] w-full">
            
            {/* Parallax Background Science Shapes */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-[#E8E5FF] rounded-full filter blur-xl opacity-70 animate-bounce" style={{ animationDuration: "8s" }} />
            <div className="absolute bottom-12 right-12 w-32 h-32 bg-[#E2F9F3] rounded-full filter blur-xl opacity-70 animate-bounce" style={{ animationDuration: "6s" }} />

            {/* DI-UPDATE: Memanggil Gambar Maskot Kustom */}
            <div className="relative z-20 w-full max-w-[480px] p-4 flex flex-col items-center justify-center">
              <img 
                src="/images/mascot.png" 
                alt="Virexa Mascot" 
                className="w-full max-w-[420px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)] animate-[float_6s_ease-in-out_infinite]"
                onError={(e) => {
                  // Fallback jika gambar mascot.png belum dimasukkan di public/images
                  e.currentTarget.style.display = 'none';
                  const fb = document.getElementById('mascot-fallback');
                  if (fb) fb.classList.remove('hidden');
                }}
              />
              
              {/* Fallback Beaker SVG jika gambar mascot belum dimasukkan oleh pengguna */}
              <div id="mascot-fallback" className="hidden relative z-20 w-full max-w-[380px] p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">
                    <FlaskConical className="h-12 w-12 text-indigo-500 animate-pulse" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-bold text-slate-900">Virexa Virtual Bench</h3>
                  <p className="text-xs text-slate-500 mt-1">Ganti gambar ini dengan menaruh berkas di public/images/mascot.png</p>
                </div>
              </div>
            </div>

            {/* Floating Mission Badge */}
            <div className="absolute bottom-6 left-6 lg:left-0 z-30 bg-white/80 backdrop-blur-md border border-white/60 p-6 rounded-[2rem] flex flex-col gap-2 shadow-xl animate-bounce" style={{ animationDuration: "4s" }}>
              <span className="text-xs font-bold text-emerald-600 uppercase">Misi Aktif</span>
              <h4 className="font-display font-bold text-slate-800 text-sm">Skala pH Ungu</h4>
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-3/4 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                </div>
                <span className="text-xs font-bold text-slate-700">75%</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ALUR PERJALANAN MISI SECTION */}
      <section id="alur-belajar" className="py-24 px-6 sm:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Alur Perjalanan Misi
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Ikuti langkah seru dari persiapan laboratorium hingga klaim sertifikat ahli kimia!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            
            {/* DI-UPDATE: Menggunakan render dinamis gambar untuk langkah 1 - 6 */}
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white/40 backdrop-blur-md border border-white/50 p-8 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 group shadow-sm flex flex-col text-left"
              >
                <div className="w-full aspect-square mb-6 overflow-hidden rounded-[1.5rem] bg-slate-50 flex items-center justify-center p-4 relative">
                  {/* Tampilkan gambar dari public/images/stepX.png */}
                  <img 
                    src={step.imgSrc} 
                    alt={step.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = document.getElementById(`step-fallback-${idx}`);
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback layout jika gambar fisik PNG belum ditaruh di folder public */}
                  <div id={`step-fallback-${idx}`} className="hidden flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-2">🧪</span>
                    <span className="text-xs font-bold text-slate-400">Gambar Belum Siap</span>
                  </div>
                </div>
                <span className="font-label-md text-label-md text-indigo-600 font-bold uppercase mb-xs block">
                  {step.no}
                </span>
                <h3 className="font-headline-sm text-headline-sm mb-sm text-slate-900">
                  {step.title}
                </h3>
                <p className="font-body-md text-body-md text-slate-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REACTION PREVIEW EXPOSURE */}
      <section className="py-24 px-6 sm:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-xl text-left">
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
                Eksplorasi Lab Virtual
              </h2>
              <p className="mt-4 text-slate-500">
                Belajar interaktif dengan pengalaman visual yang elegan dan aman bagi pemula.
              </p>
            </div>
            <Link
              href="/student/identity"
              className="rounded-full bg-indigo-50 px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              Jelajahi Semua Lab
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 text-left">
              <div className="max-w-md relative z-10">
                <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-6">
                  Misi Utama
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Lab Kimia: <br />
                  <span className="text-indigo-600">Reaksi Warna Indikator</span>
                </h3>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                  Pelajari bagaimana indikator alami dan buatan berubah warna saat bertemu zat asam dan basa dalam simulasi interaktif yang mendalam.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-indigo-100/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span>Kurikulum Nasional:</span>
                <span className="text-indigo-600 font-bold">Kelas 7 & 8 SMP</span>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white border border-slate-200 p-8 flex flex-col justify-between hover:bg-slate-50/50 transition-all text-left group">
              <div>
                <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-600 mb-6">
                  Fisiologi Klinis
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Erosi Organ 3D
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Lihat kerusakan jaringan lambung, email gigi, dan penyaringan urin ginjal akibat paparan pH yang ekstrem.
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FlaskConical className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 sm:px-16 py-12">
        <div className="max-w-7xl mx-auto bg-indigo-600 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-10 -right-10 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-20 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30 shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white max-w-xl leading-tight">
              Siap Menjadi Ilmuwan Hebat Berikutnya?
            </h2>
            <p className="text-indigo-100 max-w-md text-sm sm:text-base">
              Bergabunglah dengan siswa lainnya dalam petualangan sains VIREXA yang menyenangkan.
            </p>
            <div className="mt-4">
              <Link
                href="/student/identity"
                className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                Mulai Sekarang Gratis!
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-6 sm:px-16 py-12 mt-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          
          <div className="flex flex-col gap-4 max-w-xs text-left">
            <span className="text-xl font-bold text-indigo-600 tracking-tight">VIREXA</span>
            <p className="text-sm text-slate-500 leading-relaxed">
              Laboratorium virtual interaktif untuk generasi ilmuwan masa depan Indonesia dengan visual terbaik.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full md:w-auto text-left">
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">Misi</h4>
              <a className="text-sm text-slate-500 hover:text-indigo-600 transition-all" href="#">Asam Basa</a>
              <a className="text-sm text-slate-500 hover:text-indigo-600 transition-all" href="#">Zat Aditif</a>
              <a className="text-sm text-slate-500 hover:text-indigo-600 transition-all" href="#">Tata Surya</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">Bantuan</h4>
              <a className="text-sm text-slate-500 hover:text-indigo-600 transition-all" href="#">Pusat Bantuan</a>
              <a className="text-sm text-slate-500 hover:text-indigo-600 transition-all" href="#">Panduan Guru</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-2">Tentang</h4>
              <a className="text-sm text-slate-500 hover:text-indigo-600 transition-all" href="#">Tim Virexa</a>
              <a className="text-sm text-slate-500 hover:text-indigo-600 transition-all" href="#">Privasi</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 VIREXA Virtual Labs. Didesain dengan penuh eksperimen.</p>
          <div className="flex items-center gap-2">
            <span>Didukung oleh</span>
            <div className="h-6 w-16 bg-indigo-50 rounded" />
          </div>
        </div>
      </footer>

    </main>
  );
}