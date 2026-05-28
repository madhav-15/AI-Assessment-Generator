import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Assessment Creator",
  description: "Create AI generated assessments",
};

import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${inter.variable} antialiased`} style={{ fontFamily: 'var(--font-bricolage)' }}>
        <ResponsiveLayout>
          {children}
        </ResponsiveLayout>
        <Toaster />
      </body>
    </html>
  );
}
