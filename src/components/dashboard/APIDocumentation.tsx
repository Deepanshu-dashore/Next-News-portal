'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  auth: boolean;
  params?: Record<string, string>;
  body?: Record<string, any>;
  response?: Record<string, any>;
}

const apiEndpoints: Record<string, APIEndpoint[]> = {
  'Authentication': [
    {
      method: 'POST',
      path: '/api/user/login',
      description: 'Authenticate user with email and password',
      auth: false,
      body: {
        email: 'user@example.com',
        password: 'password123'
      },
      response: {
        success: true,
        message: 'Login successful',
        data: {
          id: '507f1f77bcf86cd799439011',
          email: 'user@example.com',
          name: 'John Doe',
          role: 'author'
        }
      }
    },
    {
      method: 'POST',
      path: '/api/user/logout',
      description: 'Logout current user and clear authentication tokens',
      auth: true,
      response: {
        success: true,
        message: 'Logout successful'
      }
    },
  ],
  'Articles': [
    {
      method: 'GET',
      path: '/api/article',
      description: 'Get all articles with optional filters',
      auth: false,
      params: {
        page: '1',
        limit: '10',
        category: 'technology',
        status: 'published'
      }
    },
    {
      method: 'POST',
      path: '/api/article',
      description: 'Create a new article',
      auth: true,
      body: {
        title: 'Article Title',
        content: 'Article content...',
        excerpt: 'Brief excerpt',
        summary: 'Article summary',
        categoryId: '507f1f77bcf86cd799439011',
        authorId: '507f1f77bcf86cd799439012',
        heroImageUrl: '/images/article.jpg',
        tags: ['tech', 'ai'],
        status: 'draft'
      }
    },
    {
      method: 'GET',
      path: '/api/article/[id]',
      description: 'Get article by ID',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/article/slug/[slug]',
      description: 'Get article by slug',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/article/search',
      description: 'Search articles with full-text search',
      auth: false,
      params: {
        q: 'search query',
        category: 'technology',
        tags: 'ai,health'
      }
    },
    {
      method: 'GET',
      path: '/api/article/breakingNews',
      description: 'Get breaking news articles',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/article/editors-pick',
      description: 'Get editor picked articles',
      auth: false,
    },
    {
      method: 'GET',
      path: '/api/article/highlights',
      description: 'Get featured/highlighted articles',
      auth: false,
    },
    {
      method: 'POST',
      path: '/api/article/[id]/stats',
      description: 'Track article views and likes',
      auth: false,
      body: {
        action: 'view',
        userId: 'optional-user-id'
      }
    },
  ],
  'Categories': [
    {
      method: 'GET',
      path: '/api/category',
      description: 'Get all categories',
      auth: false,
    },
    {
      method: 'POST',
      path: '/api/category',
      description: 'Create a new category',
      auth: true,
      body: {
        name: 'Category Name',
        slug: 'category-slug',
        description: 'Category description',
        isActive: true
      }
    },
    {
      method: 'GET',
      path: '/api/category/active',
      description: 'Get all active categories',
      auth: false,
    },
  ],
  'Videos': [
    {
      method: 'GET',
      path: '/api/video',
      description: 'Get all videos',
      auth: false,
    },
    {
      method: 'POST',
      path: '/api/video',
      description: 'Create a new video',
      auth: true,
      body: {
        title: 'Video Title',
        description: 'Video description',
        CategoryId: '507f1f77bcf86cd799439011',
        videoUrl: 'https://youtube.com/watch?v=...',
        uploadedBy: '507f1f77bcf86cd799439012'
      }
    },
    {
      method: 'GET',
      path: '/api/video/category',
      description: 'Get videos by category',
      auth: false,
      params: {
        categoryId: '507f1f77bcf86cd799439011'
      }
    },
  ],
  'Dashboard': [
    {
      method: 'GET',
      path: '/api/dashboard/stats',
      description: 'Get dashboard statistics and analytics',
      auth: true,
      response: {
        success: true,
        data: {
          stats: {
            totalArticles: 150,
            totalDrafts: 12,
            totalVideos: 45,
            totalUsers: 8
          }
        }
      }
    },
  ],
};

export default function APIDocumentation() {
  const [selectedCategory, setSelectedCategory] = useState('Authentication');
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-700';
      case 'POST': return 'bg-blue-100 text-blue-700';
      case 'PUT': case 'PATCH': return 'bg-yellow-100 text-yellow-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
          <p className="text-lg text-gray-600">
            Complete REST API reference for NewsWeb application
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                Categories
              </h3>
              <div className="space-y-1">
                {Object.keys(apiEndpoints).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === category
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-4">
            {apiEndpoints[selectedCategory]?.map((endpoint, index) => {
              const endpointKey = `${endpoint.method}-${endpoint.path}`;
              const isExpanded = expandedEndpoint === endpointKey;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedEndpoint(isExpanded ? null : endpointKey)}
                    className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition"
                  >
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${getMethodColor(
                        endpoint.method
                      )}`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="flex-1 text-left font-mono text-sm text-gray-900">
                      {endpoint.path}
                    </code>
                    {endpoint.auth && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                        <Icon icon="heroicons:lock-closed-20-solid" className="inline w-3 h-3 mr-1" />
                        Auth
                      </span>
                    )}
                    <Icon
                      icon={isExpanded ? 'heroicons:chevron-up-20-solid' : 'heroicons:chevron-down-20-solid'}
                      className="w-5 h-5 text-gray-400"
                    />
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                      <p className="text-gray-700 mb-6">{endpoint.description}</p>

                      {endpoint.params && (
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-gray-900 mb-3">Query Parameters</h4>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            {JSON.stringify(endpoint.params, null, 2)}
                          </pre>
                        </div>
                      )}

                      {endpoint.body && (
                        <div className="mb-6">
                          <h4 className="text-sm font-bold text-gray-900 mb-3">Request Body</h4>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            {JSON.stringify(endpoint.body, null, 2)}
                          </pre>
                        </div>
                      )}

                      {endpoint.response && (
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 mb-3">Response</h4>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            {JSON.stringify(endpoint.response, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
