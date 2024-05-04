import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoverCraft",
  description: "an app that gives you cool cover letters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`px-10 ${inter.className} min-h-screen bg-gradient-to-b from-sky-50 via-sky-50 to-sky-300 text-slate-700`}>
        <Navbar />
        <main className="pt-32">{children}</main>
      </body>
    </html>
    </ClerkProvider>
  );
}
