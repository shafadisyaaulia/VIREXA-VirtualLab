"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // MEMAKSA JEBOL AUTH: Pindah halaman menggunakan jalur murni browser
    window.location.href = "/teacher/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-virexa-bg px-6">
      <div className="w-full max-w-md rounded-xl2 bg-white p-8 shadow-sm">
        {/* Menggunakan Logo Baru VIREXA */}
        <Link href="/" className="flex items-center justify-center gap-2">
          <img 
            src="/images/virexa-logo.png" 
            alt="VIREXA Logo" 
            className="h-12 w-auto object-contain" 
          />
        </Link>

        <h1 className="mt-6 text-center font-display text-2xl font-bold text-virexa-navy">
          Masuk ke Lab Virtualmu
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Lanjutkan misi sains kamu di VIREXA.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-virexa-blue focus:outline-none"
              placeholder="Ketik apa saja bebas..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-xs font-medium text-virexa-blue hover:underline">
                Lupa password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-virexa-blue focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-virexa-blue py-2.5 font-semibold text-white transition hover:bg-virexa-blue-dark disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Log In (Bypass Mode)
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-virexa-blue hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </main>
  );
}