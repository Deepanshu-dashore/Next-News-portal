'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Videos', href: '/dashboard/videos', icon: '🎥' },
    { name: 'Articles', href: '/dashboard/articles', icon: '📝' },
    { name: 'Categories', href: '/dashboard/categories', icon: '📁' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 px-4">
        <Container>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="font-medium">{user?.name}</span>
              </span>
              <span className="px-2 py-1 bg-white/10 rounded text-xs uppercase font-bold">
                {user?.role}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-red-400 transition-colors">
                View Site
              </Link>
              <button
                onClick={logout}
                className="hover:text-red-400 transition-colors font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Header Navigation */}
      <header className="bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-40">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                News Portal CMS
              </h1>
              <p className="text-xs text-gray-500 mt-1">Content Management System</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex gap-1 -mb-px">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                              (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wide
                    border-b-4 transition-all
                    ${isActive
                      ? 'border-red-600 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <Container>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2026 News Portal CMS. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <span>Version 1.0.0</span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
