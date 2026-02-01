'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { Container } from '@/components/ui/Container';
import { EditorSidebar } from '@/src/components/dashboard/EditorSidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Protect the entire dashboard layout
  useEffect(() => {
    if (!isLoading && !user) {
      console.log('Dashboard Layout - No user found, redirecting to login');
      router.push(`/author-login?redirect=${pathname}`);
    }
  }, [user, isLoading, router, pathname]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <EditorSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white py-3 px-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className='relative'>
                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                  <g fill="none" fillRule="evenodd">
                    <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                    <path fill="#fff" d="M11.762 7.445A1 1 0 0 0 10.93 7H6a1 1 0 1 1 0-2h4.93a3 3 0 0 1 2.496 1.336L14.536 8H15a3 3 0 0 1 3 3v.21l1.713-1.056A1.5 1.5 0 0 1 22 11.43v5.138a1.5 1.5 0 0 1-2.287 1.277L18 16.79V17a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h7.132z"></path>
                  </g>
                </svg>
                <span className="w-2 h-2 absolute top-4 left-3 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full animate-pulse"></span>
                </span>
                <span className="font-medium">{user?.name}</span>
              </span>
              <span className="px-2 py-1 bg-white/10 rounded text-xs uppercase font-bold">
                {user?.role}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="hover:text-red-400 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Site
              </Link>
              <button
                onClick={logout}
                className="hover:bg-red-700 bg-red-400 cursor-pointer p-1 px-3 rounded-sm transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto h-[80dvh]">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-8 mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <p>© 2026 News Portal CMS. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <span>v1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
