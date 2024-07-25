import type { Metadata } from "next";
import { Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";

const frl = Frank_Ruhl_Libre({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={frl.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
