'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import AdminHeader from '@/src/components/dashboard/AdminHeader';

interface ArticlePreview {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  publishDate: string;
  region?: string;
  customRegion?: string;
  isBreaking?: boolean;
  tags?: string[];
}

export default function ArticlePreviewPage() {
  const searchParams = useSearchParams();
  const [article, setArticle] = useState<ArticlePreview | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get article data from query params
    const articleData = searchParams.get('data');
    
    if (articleData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(articleData));
        setArticle(parsed);
      } catch (error) {
        console.error('Failed to parse article data:', error);
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading preview...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="space-y-8">
        <AdminHeader
          title="Article Preview"
          description="Preview how your article will appear"
          back="Back"
        />
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No article data to preview. Please fill in the article form and try again.</p>
          <Link
            href="/dashboard/articles/new"
            className="inline-block mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Create Article
          </Link>
        </div>
      </div>
    );
  }

  const displayRegion = article.region === 'Custom' ? article.customRegion : article.region || 'News';

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Article Preview"
        description="This is how your article will appear to readers"
        back="Back"
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="max-w-4xl mx-auto p-8 md:p-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-red-600 transition-colors">
              Articles
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{article.title}</span>
          </nav>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-8">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              {article.isBreaking && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
                  Breaking News
                </div>
              )}
            </div>
          )}

          {/* Article Header */}
          <div className="mb-8">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                {article.category}
              </span>
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-full">
                {displayRegion}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
                  {article.author.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-medium text-gray-900">{article.author}</p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatDate(article.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>5 Min Read</span>
              </div>
            </div>
          </div>

          {/* Excerpt/Summary */}
          {article.description && (
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {article.description}
              </p>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-ul:marker:text-red-600 prose-ol:marker:text-red-600 prose-blockquote:border-red-600 prose-blockquote:text-gray-700">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="text-gray-500 italic">No content added yet</p>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm font-bold text-gray-700 mb-3 uppercase">Tags</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="font-bold text-lg mb-4 text-gray-900">Share this article</h4>
            <div className="flex gap-2 flex-wrap">
              {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map((social) => (
                <button
                  key={social}
                  className="px-4 py-2 border border-gray-200 rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/dashboard/articles/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Editor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
