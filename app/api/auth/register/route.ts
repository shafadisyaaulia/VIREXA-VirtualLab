import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["student", "teacher"]).default("student"),
  school: z.string().optional(),
  grade: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, role, school, grade } = parsed.data;

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    // Siswa langsung aktif. Guru perlu disetujui admin dulu (pending).
    const status = role === "teacher" ? "pending" : "active";

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role,
      status,
      school,
      grade,
    });

    return NextResponse.json(
      {
        message:
          role === "teacher"
            ? "Akun guru berhasil dibuat. Menunggu persetujuan admin sebelum bisa login."
            : "Akun berhasil dibuat. Silakan login.",
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
