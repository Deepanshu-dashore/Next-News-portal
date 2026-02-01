import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import QueryProvider from "@/src/providers/QueryProvider";
import { AuthProvider } from "@/src/contexts/AuthContext";
import AppLayoutProvider from "@/src/components/layout/AppLayoutProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NewsWeb - Latest News from Around the World",
  description: "Stay informed with breaking news, in-depth analysis, and expert coverage across technology, business, sports, entertainment, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#F9FAFB]`}>
        <AuthProvider>
          <QueryProvider>
            <AppLayoutProvider >
              {children}
            </AppLayoutProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
