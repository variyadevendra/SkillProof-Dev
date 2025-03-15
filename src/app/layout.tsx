import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from '@/components/Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillProof - Hire for Skills, Not Stories",
  description: "SkillProof replaces traditional resumes with skill validation challenges, live project demonstrations, and AI-enhanced assessments. Find the perfect match based on abilities, not buzzwords.",
  keywords: ["hiring", "recruitment", "skill validation", "AI assessment", "no resumes", "technical hiring"],
  authors: [{ name: "SkillProof Team" }],
  creator: "SkillProof",
  openGraph: {
    title: "SkillProof - Revolutionizing Hiring",
    description: "Replace traditional resumes with skill validation challenges and AI-enhanced assessments.",
    url: "https://www.skillproof.io",
    siteName: "SkillProof",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkillProof Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillProof - Hire for Skills, Not Stories",
    description: "Replace traditional resumes with skill validation challenges and AI-enhanced assessments.",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div id="app-content" suppressHydrationWarning>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
