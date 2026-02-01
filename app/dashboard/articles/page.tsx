'use client';

import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { ArticlesTable } from '@/src/components/dashboard/ArticlesTable';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import Link from 'next/link';

export default function ArticlesPage() {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/articles/edit?id=${id}`);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting article:', id);
    // In production, call API to delete
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <div className="space-y-8">
        <AdminHeader
          title="Articles"
          description="Manage all your articles and content"
          add={
            <Link
              href="/dashboard/articles/new"
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all uppercase tracking-wide cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Article
            </Link>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Total Articles</p>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-green-600 text-xs font-semibold mt-2">+3 this week</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Published</p>
            <p className="text-3xl font-bold text-gray-900">18</p>
            <p className="text-green-600 text-xs font-semibold mt-2">+2 this week</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Drafts</p>
            <p className="text-3xl font-bold text-gray-900">6</p>
            <p className="text-orange-600 text-xs font-semibold mt-2">Waiting to publish</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">This Month Views</p>
            <p className="text-3xl font-bold text-gray-900">1.2K</p>
            <p className="text-green-600 text-xs font-semibold mt-2">↑ 5% from last month</p>
          </div>
        </div>

        {/* Articles Table */}
        <ArticlesTable onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </ProtectedRoute>
  );
}
