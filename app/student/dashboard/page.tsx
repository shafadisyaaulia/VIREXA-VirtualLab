import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-virexa-bg p-10">
      <h1 className="font-display text-2xl font-bold text-virexa-navy">
        Halo, {session?.user?.name} 👋
      </h1>
      <p className="mt-2 text-slate-500">
        Dashboard siswa — progres misi, sertifikat, dan riwayat lab akan tampil di sini.
      </p>
      <p className="mt-6 text-sm text-slate-400">
        (Placeholder — tahap selanjutnya: Identity → Pre-Test → Materials → Virtual Lab)
      </p>
    </main>
  );
}
