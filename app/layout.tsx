import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { BotanicalParticles } from "@/components/layout/BotanicalParticles";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/components/layout/I18nProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteControls } from "@/components/layout/SiteControls";
import { RoutineRibbon } from "@/components/sections/RoutineRibbon";
import { SiteJourney } from "@/components/sections/SiteJourney";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPIRALIS - Routine naturelle anti-imperfections",
  description:
    "Decouvrez SPIRALIS, une routine skincare minimaliste pour peaux mixtes a grasses : gel nettoyant, serum, creme hydratante et recharge.",
  icons: {
    icon: "/assets/spiralis/brand/mark-dark-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${heading.variable} ${body.variable} antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider>
          <ScrollProgress />
          <BotanicalParticles />
          <Navbar />
          <main>{children}</main>
          <RoutineRibbon />
          <SiteJourney />
          <Footer />
          <SiteControls />
        </I18nProvider>
      </body>
    </html>
  );
}
