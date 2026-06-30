"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FlaskConical, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    school: "",
    grade: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Terjadi kesalahan");
      return;
    }

    setSuccess(data.message);
    setTimeout(() => router.push("/login"), 1800);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-virexa-bg px-6 py-12">
      <div className="w-full max-w-md rounded-xl2 bg-white p-8 shadow-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-display text-xl font-bold text-virexa-blue">
          <FlaskConical className="h-6 w-6" /> VIREXA
        </Link>

        <h1 className="mt-6 text-center font-display text-2xl font-bold text-virexa-navy">
          Bergabung Jadi Kadet Ilmuwan
        </h1>

        {/* Role switch */}
        <div className="mt-6 flex rounded-full bg-virexa-bg-soft p-1">
          {(["student", "teacher"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                role === r ? "bg-virexa-blue text-white shadow" : "text-slate-500"
              }`}
            >
              {r === "student" ? "Siswa" : "Guru"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Field label="Nama Lengkap">
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input"
              placeholder="Nama kamu"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="input"
              placeholder="kamu@email.com"
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="input"
              placeholder="Minimal 6 karakter"
            />
          </Field>

          <Field label="Sekolah">
            <input
              value={form.school}
              onChange={(e) => update("school", e.target.value)}
              className="input"
              placeholder="Nama sekolah"
            />
          </Field>

          {role === "student" && (
            <Field label="Kelas">
              <input
                value={form.grade}
                onChange={(e) => update("grade", e.target.value)}
                className="input"
                placeholder="Contoh: 8A"
              />
            </Field>
          )}

          {role === "teacher" && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Akun guru perlu disetujui admin sebelum bisa login.
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}
          {success && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-virexa-blue py-2.5 font-semibold text-white transition hover:bg-virexa-blue-dark disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Daftar Sekarang
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-virexa-blue hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #e2e8f0;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #2563eb;
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
