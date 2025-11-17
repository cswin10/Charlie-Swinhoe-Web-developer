import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Charlie Swinhoe | Founder & Builder",
  description: "Elite personal portfolio showcasing premium builds and innovative products. A founder who ships.",
  keywords: ["Charlie Swinhoe", "Founder", "Builder", "Developer", "Entrepreneur", "AI Consultant", "SaaS", "Next.js Developer", "Full Stack Developer", "Product Builder"],
  authors: [{ name: "Charlie Swinhoe" }],
  creator: "Charlie Swinhoe",
  publisher: "Charlie Swinhoe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Charlie Swinhoe | Founder & Builder",
    description: "Elite personal portfolio showcasing premium builds and innovative products. A founder who ships.",
    type: "website",
    url: "https://charlieswinhoe.com",
    siteName: "Charlie Swinhoe",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charlie Swinhoe - Founder & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Swinhoe | Founder & Builder",
    description: "Elite personal portfolio showcasing premium builds and innovative products. A founder who ships.",
    creator: "@charlieswinhoe",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#32FAC7",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ClientLayout>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
