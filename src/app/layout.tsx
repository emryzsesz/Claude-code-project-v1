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

export const metadata: Metadata = {
  title: {
    default: "Emryz Digital: Websites, POS Solutions, and Author Growth",
    template: "%s : Emryz Digital",
  },
  description:
    "Emryz Digital builds and rebuilds websites on Wix and Squarespace, sets up POS solutions on Toast and Square, and helps authors grow their readership.",
  metadataBase: new URL("https://www.emryzdigital.com"),
  openGraph: {
    title: "Emryz Digital: Websites, POS Solutions, and Author Growth",
    description:
      "Emryz Digital builds and rebuilds websites on Wix and Squarespace, sets up POS solutions on Toast and Square, and helps authors grow their readership.",
    images: ["/brand/emryz-digital-logo-lockup.webp"],
    siteName: "Emryz Digital",
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
