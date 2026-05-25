import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LA DECADES — Écoles chrétiennes au Sénégal",
    template: "%s | LA DECADES",
  },
  description:
    "LA DECADES — Direction d'écoles chrétiennes au Sénégal. Découvrez notre réseau d'établissements, nos actualités et nos valeurs.",
  keywords: [
    "LA DECADES",
    "écoles chrétiennes",
    "Sénégal",
    "éducation",
    "direction scolaire",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
