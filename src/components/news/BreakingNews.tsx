'use client';

import { NewsArticle } from '@/types';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

interface BreakingNewsProps {
  articles: NewsArticle[];
}

export function BreakingNews({ articles }: BreakingNewsProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <Container>
        <div className="flex items-center h-10 overflow-hidden">
          <div className="flex-shrink-0 bg-[var(--accent-primary)] text-white px-3 h-full flex items-center text-[11px] font-black uppercase tracking-tighter mr-4 relative">
            Breaking News
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[var(--accent-primary)]"></div>
          </div>
          
          <div className="relative flex-1 overflow-hidden h-full flex items-center">
            <div className="animate-marquee whitespace-nowrap">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="inline-flex items-center gap-2 mr-8 text-xs font-semibold text-gray-800 hover:text-[var(--accent-primary)] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  {article.title}
                </Link>
              ))}
              {/* Duplicate for seamless loop */}
              {articles.map((article) => (
                <Link
                  key={`${article.id}-clone`}
                  href={`/article/${article.slug}`}
                  className="inline-flex items-center gap-2 mr-8 text-xs font-semibold text-gray-800 hover:text-[var(--accent-primary)] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  {article.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
