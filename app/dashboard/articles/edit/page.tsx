'use client';

import { useSearchParams } from 'next/navigation';
import ProtectedRoute from '@/src/components/auth/ProtectedRoute';
import { ArticleForm } from '@/src/components/dashboard/ArticleForm';
import AdminHeader from '@/src/components/dashboard/AdminHeader';

// Mock article data - in production this would come from an API
const mockArticles: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'Latest AI Developments Shape Future of Tech',
    slug: 'latest-ai-developments-shape-future-of-tech',
    content: 'Artificial Intelligence is revolutionizing the tech industry with breakthroughs in machine learning, natural language processing, and computer vision.\n\nThe latest developments in AI are creating new opportunities for businesses across all sectors...',
    category: 'technology',
    author: 'John Smith',
    featuredImage: 'https://images.unsplash.com/photo-1677442d019e0c3b7e4f4c7e0c0c0c0c0c0?w=800&h=400&fit=crop',
    tags: 'AI, Technology, Innovation, Machine Learning',
    description: 'Explore the latest developments in AI and how they are shaping the future of technology.',
    status: 'published',
    publishDate: '2026-01-29',
  },
  '2': {
    id: '2',
    title: 'Global Markets Show Strong Growth',
    slug: 'global-markets-show-strong-growth',
    content: 'The global markets have shown remarkable growth this quarter, driven by strong earnings and investor confidence...\n\nEconomic indicators suggest continued expansion into the next quarter.',
    category: 'business',
    author: 'Sarah Johnson',
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    tags: 'Business, Markets, Economy, Finance',
    description: 'A comprehensive analysis of global market trends and economic growth.',
    status: 'published',
    publishDate: '2026-01-28',
  },
  '3': {
    id: '3',
    title: 'Championship Team Wins Historic Victory',
    slug: 'championship-team-wins-historic-victory',
    content: 'In an incredible display of teamwork and skill, the championship team emerged victorious...\n\nThe team demonstrated exceptional performance throughout the match.',
    category: 'sports',
    author: 'Mike Davis',
    featuredImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop',
    tags: 'Sports, Championship, Victory, Team',
    description: 'A thrilling account of the championship team winning match.',
    status: 'published',
    publishDate: '2026-01-27',
  },
};

export default function EditArticlePage() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');

  // Get article data (mock for now)
  const article = articleId ? mockArticles[articleId] : null;

  if (!article && articleId) {
    return (
      <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
          <p className="text-gray-600">The article you're looking for doesn't exist.</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['admin', 'author', 'editor']}>
      <div className="space-y-8">
        <AdminHeader
          title="Edit Article"
          description={article ? `Edit: ${article.title}` : 'Edit Article'}
        />
        <ArticleForm initialData={article} isEditing={true} />
      </div>
    </ProtectedRoute>
  );
}
