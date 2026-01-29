import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/types';
import { formatDate } from '@/lib/utils';

interface CategoryBlockProps {
  title: string;
  viewAllHref: string;
  featuredArticle: NewsArticle;
  articles: NewsArticle[];
  variant?: 'default' | 'magazine';
}

export function CategoryBlock({ title, viewAllHref, featuredArticle, articles, variant = 'default' }: CategoryBlockProps) {
  return (
    <section className="py-8 border-t border-gray-100 first:border-t-0">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 border-b-4 border-black pb-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-(--accent-primary) leading-none mb-2">Category</span>
          <h2 className="text-3xl font-black text-(--text-primary) uppercase tracking-tighter leading-none">{title}</h2>
        </div>
        <Link 
          href={viewAllHref}
          className="text-xs font-black uppercase tracking-widest text-(--text-muted) hover:text-(--accent-primary) transition-colors flex items-center gap-2 group"
        >
          Explore All
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Main Featured in Category - 7/12 */}
        <div className="md:col-span-7">
          <Link href={`/article/${featuredArticle.slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-6">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <h3 className="text-2xl font-black text-(--text-primary) leading-tight mb-3 group-hover:text-(--accent-primary) transition-colors">
              {featuredArticle.title}
            </h3>
            <p className="text-sm text-(--text-secondary) font-medium leading-relaxed line-clamp-3 mb-4">
              {featuredArticle.summary}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-(--text-muted)">{formatDate(featuredArticle.publishedAt)}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-(--accent-primary)">Featured</span>
            </div>
          </Link>
        </div>

        {/* Small List - 5/12 */}
        <div className="md:col-span-5 space-y-6">
          {articles.map((article) => (
            <Link 
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex gap-5 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-(--text-primary) mb-2 line-clamp-2 leading-snug group-hover:text-(--accent-primary) transition-colors">
                  {article.title}
                </h4>
                <div className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest">
                  {formatDate(article.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
