'use client';

import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useAuth } from '@/src/contexts/AuthContext';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div>
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">Welcome back, {user?.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 uppercase">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </Container>
        </header>

        {/* Content */}
        <Container className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 hover:border-(--accent-primary) transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Total Articles</h3>
                <div className="w-12 h-12 bg-(--accent-primary)/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-(--accent-primary)" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-black text-gray-900">24</p>
              <p className="text-sm text-gray-600 mt-1">+3 this week</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 hover:border-(--accent-primary) transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Total Videos</h3>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-black text-gray-900">12</p>
              <p className="text-sm text-gray-600 mt-1">+1 this week</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-200 hover:border-(--accent-primary) transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Categories</h3>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-black text-gray-900">8</p>
              <p className="text-sm text-gray-600 mt-1">Active categories</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/dashboard/articles/new"
                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-(--accent-primary) hover:shadow-lg transition-all text-center group"
              >
                <div className="w-12 h-12 bg-(--accent-primary)/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-(--accent-primary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">New Article</h3>
              </Link>

              <Link
                href="/dashboard/videos/new"
                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-(--accent-primary) hover:shadow-lg transition-all text-center group"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Upload Video</h3>
              </Link>

              <Link
                href="/dashboard/categories"
                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-(--accent-primary) hover:shadow-lg transition-all text-center group"
              >
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Manage Categories</h3>
              </Link>

              <Link
                href="/"
                className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-(--accent-primary) hover:shadow-lg transition-all text-center group"
              >
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">View Site</h3>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </ProtectedRoute>
  );
}
