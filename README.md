# VIREXA — Setup Guide

## 1. Install dependencies
```bash
npm install
```

## 2. Setup environment
```bash
cp .env.example .env.local
```
Isi `.env.local`:
- `MONGODB_URI` — connection string dari MongoDB Atlas (buat cluster gratis di mongodb.com/cloud/atlas)
- `NEXTAUTH_SECRET` — generate dengan `openssl rand -base64 32`
- `GROQ_API_KEY` — ambil gratis di https://console.groq.com/keys

## 3. Buat akun admin pertama
```bash
npm run seed
```
Ini akan membuat 1 akun admin dari `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` di `.env.local`.
Login lewat akun ini untuk approve guru & kelola sistem.

## 4. Jalankan dev server
```bash
npm run dev
```
Buka http://localhost:3000

## Status implementasi saat ini
✅ Landing page (sesuai desain referensi)
✅ Auth: Register (siswa langsung aktif, guru pending approval) + Login (role-based redirect)
✅ Middleware proteksi route per role (`/student`, `/teacher`, `/admin`)
✅ Model User + koneksi MongoDB
✅ Seed admin pertama
🔲 Dashboard siswa/guru/admin masih placeholder — dibangun di tahap berikutnya
🔲 Pre-Test/Post-Test, Virtual Lab, Chatbot Groq, dll — lihat `VIREXA_Blueprint_Sitemap.md`

## Alur yang sudah bisa dites sekarang
1. Buka `/` → klik **Sign Up** → daftar sebagai siswa → otomatis aktif → login → redirect ke `/student/identity`
2. Daftar sebagai guru → status pending → coba login → akan ditolak sampai admin approve (approve manual lewat MongoDB Atlas dulu untuk saat ini, UI approve guru menyusul di tahap admin)
3. Login sebagai admin (hasil `npm run seed`) → redirect ke `/admin/dashboard`
