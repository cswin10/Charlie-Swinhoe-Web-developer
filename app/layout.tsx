import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Charlie Swinhoe | Founder & Builder",
  description: "Elite personal portfolio showcasing premium builds and innovative products. A founder who ships.",
  keywords: ["Charlie Swinhoe", "Founder", "Builder", "Developer", "Entrepreneur"],
  authors: [{ name: "Charlie Swinhoe" }],
  openGraph: {
    title: "Charlie Swinhoe | Founder & Builder",
    description: "Elite personal portfolio showcasing premium builds and innovative products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
