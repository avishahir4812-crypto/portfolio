import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avishboricha.vercel.app"),
  title: {
    default: "Avish Boricha — Python Full Stack Developer",
    template: "%s — Avish Boricha",
  },
  description:
    "Portfolio of Avish Boricha, a Python Full Stack Developer from Ahmedabad, India — building premium web products with Django, FastAPI, React.js, Next.js and AI integrations.",
  keywords: [
    "Avish Boricha",
    "Python Full Stack Developer",
    "Django Developer",
    "FastAPI",
    "React Developer",
    "Ahmedabad",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Avish Boricha" }],
  openGraph: {
    title: "Avish Boricha — Python Full Stack Developer",
    description:
      "Full stack products engineered with Python, Django, FastAPI & React. 5+ live projects, AI integrations, premium UI.",
    images: ["/images/hero-abstract.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://skillicons.dev"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://skillicons.dev" />
      </head>
      <body className="grain bg-paper font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
