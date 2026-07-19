import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import PageTransition from "@/components/motion/PageTransition";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Resolves against whichever domain this deployment actually runs on:
// the production domain once one is attached, the preview URL Vercel
// assigns before that, or localhost in development. Never a hardcoded
// domain that may not be live yet.
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const SITE_TITLE = "Emryz Digital: Websites, POS Solutions, and Author Growth";
const SITE_DESCRIPTION =
  "Emryz Digital builds and rebuilds websites on Wix and Squarespace, sets up POS solutions on Toast and Square, and helps authors grow their readership.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s : Emryz Digital",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Emryz Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MotionProvider>
          <ScrollProgressBar />
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
