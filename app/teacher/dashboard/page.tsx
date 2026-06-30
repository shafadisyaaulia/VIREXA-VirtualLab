import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-virexa-bg p-10">
      <h1 className="font-display text-2xl font-bold text-virexa-navy">
        Dashboard Guru — {session?.user?.name}
      </h1>
      <p className="mt-2 text-slate-500">
        Ringkasan kelas, bank soal, dan monitoring lab akan tampil di sini.
      </p>
    </main>
  );
}
