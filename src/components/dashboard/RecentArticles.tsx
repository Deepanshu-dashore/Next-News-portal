'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  date: string;
  image?: string;
}

export default function RecentArticles({ articles, isLoading }: { articles?: Article[], isLoading?: boolean }) {
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tech': return 'bg-blue-100 text-blue-700';
      case 'health': return 'bg-emerald-100 text-emerald-700';
      case 'business': return 'bg-purple-100 text-purple-700';
      case 'science': return 'bg-indigo-100 text-indigo-700';
      case 'entertainment': return 'bg-pink-100 text-pink-700';
      case 'india': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published': return 'bg-green-50 text-green-700 border-green-200';
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'archived': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (isLoading) {
     return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-96 flex items-center justify-center">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
     );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <h3 className="text-lg font-bold text-gray-900">Recent Articles</h3>
        </div>
        <Link 
          href="/dashboard/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <Icon icon="heroicons:plus-20-solid" className="w-4 h-4" />
          New Article
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles && articles.length > 0 ? (
              articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative border border-gray-200">
                       {article.image ? (
                          <img src={article.image} alt="" className="w-full h-full object-cover" />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                             <Icon icon="heroicons:photo" className="w-5 h-5" />
                          </div>
                       )}
                    </div>
                    <span className="font-bold text-gray-900 line-clamp-1">{article.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {article.author}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(article.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${article.status === 'published' ? 'bg-green-500' : 'bg-gray-500'}`} />
                    {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-bold">
                  {article.date}
                </td>
              </tr>
            ))
            ) : (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 text-sm">
                        No articles found. Start by creating one!
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
