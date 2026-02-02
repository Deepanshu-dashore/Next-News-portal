'use client';

import { usePathname } from "next/navigation";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

export default function AppLayoutProvider({ children }: { children: React.ReactNode }) {

  const currentPath = usePathname();
  // console.log('AppLayoutProvider - Current Path:', currentPath);
  return (
    <>
    {(currentPath === '/author-login' || !currentPath.includes("dashboard")) && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
     {(currentPath === '/author-login' || !currentPath.includes("dashboard")) && <Footer />}
    </>
  )
}
