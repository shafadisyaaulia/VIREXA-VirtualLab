import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    const roleHome: Record<string, string> = {
      teacher: "/teacher/dashboard",
      admin: "/admin/dashboard",
    };

    // Proteksi untuk Guru
    if (pathname.startsWith("/teacher") && role !== "teacher") {
      return NextResponse.redirect(new URL(roleHome[role as string] ?? "/login", req.url));
    }
    
    // Proteksi untuk Admin
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(roleHome[role as string] ?? "/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Jika rute adalah untuk student, tidak perlu token auth (selalu authorized)
        if (pathname.startsWith("/student")) {
          return true;
        }
        return !!token;
      },
    },
    pages: { signIn: "/login" },
  }
);

export const config = {
  // Hanya masukkan rute internal guru dan admin ke dalam matcher proteksi auth
  matcher: ["/teacher/:path*", "/admin/:path*"],
};