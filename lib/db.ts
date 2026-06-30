import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI belum diset di .env.local");
}

// Cache koneksi di global object supaya tidak membuat koneksi baru
// setiap kali hot-reload / serverless function dipanggil.
let cached = (global as any).mongooseConn;

if (!cached) {
  cached = (global as any).mongooseConn = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
