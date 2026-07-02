import Link from "next/link";
import { FlaskConical } from "lucide-react";

const navLinks = [
  { label: "Missions", href: "#missions" },
  { label: "Lab Bench", href: "#lab-bench" },
  { label: "Classroom", href: "#classroom" },
  { label: "Store", href: "#store" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Di bagian Link ini kita ganti total isinya */}
        <Link href="/" className="flex items-center gap-2">
          {/* Ikon FlaskConical dan teks VIREXA lama dihapus, diganti logo baru */}
          <img 
            src="/images/virexa-logo.png" 
            alt="VIREXA Logo" 
            className="h-12 w-auto object-contain" 
          />
        </Link>

        <ul className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-virexa-blue">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
        <Link
          href="/teacher/dashboard"
          className="text-sm font-semibold text-virexa-blue hover:underline"
        >
          Cek Dashboard Guru (Bypass)
        </Link>
          <Link
            href="/register"
            className="rounded-full bg-virexa-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-virexa-blue-dark"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}