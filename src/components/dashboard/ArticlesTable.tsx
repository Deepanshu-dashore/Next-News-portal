'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
  slug: string;
}

interface ArticlesTableProps {
  articles?: Article[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Latest AI Developments Shape Future of Tech',
    author: 'John Smith',
    category: 'Technology',
    status: 'published',
    views: 3421,
    createdAt: '2026-01-29',
    slug: 'latest-ai-developments',
  },
  {
    id: '2',
    title: 'Global Markets Show Strong Growth',
    author: 'Sarah Johnson',
    category: 'Business',
    status: 'published',
    views: 2156,
    createdAt: '2026-01-28',
    slug: 'global-markets-growth',
  },
  {
    id: '3',
    title: 'Championship Team Wins Historic Victory',
    author: 'Mike Davis',
    category: 'Sports',
    status: 'published',
    views: 5342,
    createdAt: '2026-01-27',
    slug: 'championship-victory',
  },
  {
    id: '4',
    title: 'New Health Study Reveals Important Findings',
    author: 'Dr. Emily Wilson',
    category: 'Health',
    status: 'draft',
    views: 0,
    createdAt: '2026-01-31',
    slug: 'health-study-findings',
  },
  {
    id: '5',
    title: 'Entertainment Industry Updates for January',
    author: 'Lisa Brown',
    category: 'Entertainment',
    status: 'published',
    views: 1892,
    createdAt: '2026-01-26',
    slug: 'entertainment-updates',
  },
  {
    id: '6',
    title: 'Space Exploration: New Mission Announced',
    author: 'James Wilson',
    category: 'Science',
    status: 'published',
    views: 4126,
    createdAt: '2026-01-25',
    slug: 'space-mission-announced',
  },
];

export function ArticlesTable({ articles = defaultArticles, onEdit, onDelete }: ArticlesTableProps) {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'views'>('date');

  // Filter and sort articles
  let filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort articles
  filteredArticles.sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'views':
        return b.views - a.views;
      case 'date':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const toggleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredArticles.map(a => a.id));
    }
  };

  const toggleArticleSelect = (id: string) => {
    setSelectedArticles(prev =>
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      if (onDelete) {
        onDelete(id);
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'technology': 'bg-blue-100 text-blue-800',
      'business': 'bg-green-100 text-green-800',
      'sports': 'bg-orange-100 text-orange-800',
      'entertainment': 'bg-purple-100 text-purple-800',
      'health': 'bg-red-100 text-red-800',
      'science': 'bg-cyan-100 text-cyan-800',
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    return status === 'published'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            >
              <option value="all">All Categories</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="views">Sort by Views</option>
            </select>
          </div>

          {/* Create New */}
          <div>
            <Link
              href="/dashboard/articles/new"
              className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Article
            </Link>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Views</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(article.id)}
                        onChange={() => toggleArticleSelect(article.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{article.title}</p>
                        <p className="text-xs text-gray-500">{article.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.author}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(article.status)}`}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{article.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.createdAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/articles/edit?id=${article.id}`}
                          className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-semibold">No articles found</p>
                      <p className="text-xs mt-1">Try adjusting your filters or create a new article</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredArticles.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredArticles.length}</span> of <span className="font-semibold">{articles.length}</span> articles
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm font-semibold">Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm font-semibold">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlesTable;
