'use client';

import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { ArticleForm } from '@/src/components/dashboard/ArticleForm';

export default function CreateArticlePage() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <div className="space-y-8">
        <ArticleForm />
      </div>
    </ProtectedRoute>
  );
}
