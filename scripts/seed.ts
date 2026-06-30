import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";

async function main() {
  const uri = process.env.MONGODB_URI as string;
  const email = (process.env.SEED_ADMIN_EMAIL as string) || "admin@virexa.app";
  const password = (process.env.SEED_ADMIN_PASSWORD as string) || "ChangeMe123!";

  if (!uri) throw new Error("MONGODB_URI belum diset");

  await mongoose.connect(uri);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin dengan email ${email} sudah ada. Lewati seeding.`);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    name: "Admin VIREXA",
    email,
    password: hashed,
    role: "admin",
    status: "active",
  });

  console.log(`Admin berhasil dibuat: ${email} / ${password}`);
  console.log("Segera login dan ganti password lewat halaman profil.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
