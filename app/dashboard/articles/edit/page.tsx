'use client';

import { useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { ArticleForm } from '@/src/components/dashboard/ArticleForm';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { useArticleById } from '@/src/hooks/useArticles';

export default function EditArticlePage() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');

  // Fetch article data from API
  const { data: article, isLoading, isError } = useArticleById(articleId || '');

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading article...</p>
        </div>
      </ProtectedRoute>
    );
  }

  if (isError || !article) {
    return (
      <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
          <p className="text-gray-600">The article you're looking for doesn't exist.</p>
        </div>
      </ProtectedRoute>
    );
  }

  // Transform article data to match the form's expected format
  const initialData = {
    title: article.title,
    slug: article.slug,
    excerpt: (article as any).excerpt || '',
    content: article.content,
    category: typeof article.categoryId === 'object' ? article.categoryId._id : article.categoryId,
    author: typeof article.authorId === 'object' ? article.authorId?.name : '',
    featuredImage: article.featuredImage || '',
    featuredImagePreview: article.featuredImage || '',
    tags: article.tags || [],
    description: (article as any).summary || '',  // Map summary to description
    status: article.status,
    publishDate: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    region: (article as any).region || 'India',
    customRegion: '',
    isBreaking: (article as any).isBreaking || false,
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <div className="space-y-8">
        <AdminHeader
          title="Edit Article"
          description={`Edit: ${article.title}`}
        />
        <ArticleForm initialData={initialData} isEditing={true} articleId={article._id} />
      </div>
    </ProtectedRoute>
  );
}
