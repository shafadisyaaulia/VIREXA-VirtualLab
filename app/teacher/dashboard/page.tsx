"use main";

import React, { useState } from "react";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  ClipboardSignature, 
  Search, 
  SlidersHorizontal, 
  ArrowUpRight,
  UserCheck
} from "lucide-on-react";

// Data simulasi siswa biar dashboard-nya langsung kelihatan isinya
const initialStudentsData = [
  { id: 1, nis: "24001", nama: "Ahmad Fauzi", kelas: "9-A", preTest: 80, postTest: 100, nilaiLkpd: 90, status: "Selesai" },
  { id: 2, nis: "24002", nama: "Citra Lestari", kelas: "9-A", preTest: 60, postTest: 85, nilaiLkpd: 80, status: "Selesai" },
  { id: 3, nis: "24003", nama: "Budi Setiawan", kelas: "9-A", preTest: 40, postTest: 80, nilaiLkpd: 0, status: "Belum Input LKPD" },
  { id: 4, nis: "24004", nama: "Dewi Rahmawati", kelas: "9-B", preTest: 75, postTest: 90, nilaiLkpd: 95, status: "Selesai" },
];

export default function TeacherDashboard() {
  const [students, setStudents] = useState(initialStudentsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [inputNilai, setInputNilai] = useState("");

  // Fungsi buat simpan nilai LKPD fisik dari guru
  const handleSaveNilaiLkpd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !inputNilai) return;

    setStudents(prev => prev.map(student => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          nilaiLkpd: parseInt(inputNilai),
          status: "Selesai"
        };
      }
      return student;
    }));

    // Reset form modal
    setSelectedStudent(null);
    setInputNilai("");
  };

  // Filter pencarian nama siswa
  const filteredStudents = students.filter(s => 
    s.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. TOP NAVBAR (Pakai Logo Baru) */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo VIREXA Kebanggaan Kita */}
          <img 
            src="/images/virexa-logo.png" 
            alt="VIREXA Logo" 
            className="h-11 w-auto object-contain" 
          />
          <span className="ml-2 px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
            Portal Guru
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-slate-400">Selamat Datang,</p>
            <p className="text-sm font-semibold text-slate-700">Profil Guru VIREXA</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
            G
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* BANNER JUDUL */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">Ringkasan Analisis Kelas</h1>
          <p className="text-slate-500 text-sm md:text-base mt-1">Pantau perkembangan eksperimen asam basa siswa secara real-time.</p>
        </div>

        {/* 3. KARTU STATISTIK UTAMA (Rangkuman Cepat) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Total Siswa</p>
              <h3 className="text-2xl font-bold">{students.length} Anak</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><UserCheck className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Selesai Lab</p>
              <h3 className="text-2xl font-bold">3 Anak</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-violet-50 text-violet-600 rounded-xl"><BarChart3 className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Rata-rata Post-Test</p>
              <h3 className="text-2xl font-bold">88.7 %</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><ClipboardSignature className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-slate-400 font-medium">Butuh Input LKPD</p>
              <h3 className="text-2xl font-bold text-amber-600">1 Anak</h3>
            </div>
          </div>
        </div>

        {/* 4. TABEL DATA SISWA & FITUR SEARCH */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Header Tabel + Kolom Cari */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama siswa..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Kelas
            </button>
          </div>

          {/* Area Tabel Data */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-100">
                  <th className="px-6 py-4">Siswa</th>
                  <th className="px-6 py-4">Kelas</th>
                  <th className="px-6 py-4 text-center">Pre-Test</th>
                  <th className="px-6 py-4 text-center">Post-Test</th>
                  <th className="px-6 py-4 text-center">Nilai LKPD (Fisik)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{student.nama}</p>
                        <p className="text-xs text-slate-400">NIS: {student.nis}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">{student.kelas}</td>
                    <td className="px-6 py-4 text-center font-medium text-blue-600 bg-blue-50/20">{student.preTest}</td>
                    <td className="px-6 py-4 text-center font-medium text-emerald-600 bg-emerald-50/20">{student.postTest}</td>
                    <td className="px-6 py-4 text-center font-medium">
                      {student.nilaiLkpd > 0 ? (
                        <span className="text-slate-800 font-semibold">{student.nilaiLkpd}</span>
                      ) : (
                        <span className="text-slate-300 italic text-xs">Belum Diisi</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === "Selesai" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-xl transition-colors"
                      >
                        Input LKPD <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* 5. MODAL POPUP BUAT INPUT NILAI MANUAL (Muncul pas tombol diklik) */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Input Nilai LKPD Fisika</h3>
              <p className="text-slate-400 text-xs">Masukkan nilai lembar kerja manual untuk: <strong className="text-slate-700">{selectedStudent.nama}</strong></p>
            </div>
            
            <form onSubmit={handleSaveNilaiLkpd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skor Nilai (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  placeholder="Contoh: 85"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  value={inputNilai}
                  onChange={(e) => setInputNilai(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100 transition-colors"
                >
                  Simpan Nilai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}