import type { Metadata } from "next";
import { Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { TicketProvider } from "@/context/TicketContext";
import { APP_CONFIG } from "@/config/app";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} — AI IT Support Assistant (ISPM)`,
  description: APP_CONFIG.description,
  icons: {
    icon: APP_CONFIG.logoPath,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${workSans.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100">
        <LenisProvider>
          <TicketProvider>
            <AppShell>{children}</AppShell>
          </TicketProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
