'use client';

import { usePathname } from "next/navigation";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

export default function AppLayoutProvider({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();

  const hideLayout =
    pathname === '/author-login' ||
    pathname.startsWith('/dashboard');

  return (
    <>
      {!hideLayout && <Header />}

      <main className="min-h-screen">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}
