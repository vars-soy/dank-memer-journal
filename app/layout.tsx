import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const bricoladeGrotesque = Bricolage_Grotesque({
  axes: ["wdth"],
  weight: "variable",
  variable: "--font-bricolade-grotesque",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dank Memer Journal",
  description:
    "A personal tool for keeping track of Dank Memer market transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricoladeGrotesque.variable} ${geistMono.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
          storageKey="DankMemerJournal_appTheme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
