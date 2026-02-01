'use client';

import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { ArticlesTable } from '@/src/components/dashboard/ArticlesTable';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { useArticles, useDeleteArticle } from '@/src/hooks/useArticles';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ArticlesPage() {
  const router = useRouter();
  const { data: articles = [], isLoading, error } = useArticles();
  const deleteArticle = useDeleteArticle();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/articles/edit?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      const loadingToast = toast.loading('Deleting article...');
      try {
        setDeletingId(id);
        await deleteArticle.mutateAsync(id);
        toast.success('Article deleted successfully!', { id: loadingToast });
      } catch (error: any) {
        console.error('Failed to delete article:', error);
        const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong';
        toast.error(`Failed to delete article: ${errorMessage}`, { id: loadingToast });
      } finally {
        setDeletingId(null);
      }
    }
  };

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    drafts: articles.filter(a => a.status === 'draft').length,
    views: articles.reduce((sum, a) => sum + (a.views || 0), 0),
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
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-green-600 text-xs font-semibold mt-2">+{Math.max(0, stats.published - 1)} this week</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Published</p>
            <p className="text-3xl font-bold text-gray-900">{stats.published}</p>
            <p className="text-green-600 text-xs font-semibold mt-2">{Math.round((stats.published / stats.total) * 100) || 0}% published</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Drafts</p>
            <p className="text-3xl font-bold text-gray-900">{stats.drafts}</p>
            <p className="text-gray-600 text-xs font-semibold mt-2">Pending review</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-semibold mb-1">Total Views</p>
            <p className="text-3xl font-bold text-gray-900">{(stats.views / 1000).toFixed(1)}K</p>
            <p className="text-green-600 text-xs font-semibold mt-2">All time</p>
          </div>
        </div>

        {/* Articles Table */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="animate-spin h-12 w-12 text-red-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-600 font-semibold">Loading articles...</p>
          </div>
        ) : (
          <ArticlesTable articles={articles} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </ProtectedRoute>
  );
}
