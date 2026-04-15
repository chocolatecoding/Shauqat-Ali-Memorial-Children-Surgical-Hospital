import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Shaukat Ali Memorial Hospital | Smart Report System",
  description: "Quality healthcare with modern technology and AI-powered report system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pt-0">
        <Navbar/>
        
        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}