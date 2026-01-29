'use client';

import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { NewsCard } from '@/components/news/NewsCard';
import { getLatestArticles } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [filteredArticles, setFilteredArticles] = useState(getLatestArticles(20));

  useEffect(() => {
    if (searchQuery.trim()) {
      const allArticles = getLatestArticles(20);
      const filtered = allArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(getLatestArticles(20));
    }
  }, [searchQuery]);

  return (
    <div className="pb-20">
      {/* Search Header */}
      <div className="bg-black text-white py-16 border-b-4 border-[var(--accent-primary)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
              Search News
            </h1>
            <p className="text-gray-400 mb-8 font-medium">
              Find the latest stories, breaking news, and in-depth analysis
            </p>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 text-lg bg-white border-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Results Header */}
          <div className="mb-10 flex items-center justify-between border-b-2 border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Articles'}
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>
          </div>

          {/* Results Grid */}
          {filteredArticles.length > 0 ? (
            <div className="space-y-1">
              {filteredArticles.map((article) => (
                <div key={article.id} className="bg-white border-b border-gray-100 last:border-b-0">
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or browse our categories</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
