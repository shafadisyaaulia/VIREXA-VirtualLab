import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "VIREXA — Virtual Interactive Reaction Experiment Laboratory",
  description:
    "Laboratorium virtual interaktif untuk belajar Asam & Basa dengan AI, computer vision, dan eksperimen 3D yang aman.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
