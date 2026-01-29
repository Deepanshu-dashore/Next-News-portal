import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface HighlightCardProps {
  article: NewsArticle;
  tone?: 'dark' | 'light';
  showMeta?: boolean;
}

export function HighlightCard({ article, tone = 'dark', showMeta = false }: HighlightCardProps) {
  const isLight = tone === 'light';
  const containerClasses = isLight
    ? 'bg-white shadow-sm border border-gray-100'
    : 'bg-black shadow-lg';
  const titleClasses = isLight
    ? 'text-gray-900'
    : 'text-white';
  const metaClasses = isLight ? 'text-[11px] text-gray-500' : 'text-[10px] text-gray-400';

  return (
    <Link 
      href={`/article/${article.slug}`}
      className={`group block relative h-[200px] overflow-hidden ${containerClasses}`}
    >
      <Image
        src={article.image}
        alt={article.title}
        fill
        className={`object-cover transition-all duration-700 ${
          isLight
            ? 'opacity-90 group-hover:scale-105 group-hover:opacity-100'
            : 'opacity-60 group-hover:scale-110 group-hover:opacity-100'
        }`}
      />
      <div className={`absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 group-hover:-translate-y-2 ${
        isLight ? 'bg-gradient-to-t from-white via-white/90 to-transparent text-gray-900' : ''
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[9px] font-black uppercase px-2 py-0.5 tracking-tighter ${
            isLight ? 'bg-gray-900 text-white' : 'bg-(--accent-primary) text-white'
          }`}>
            {article.category}
          </span>
        </div>
        <h3 className={`${titleClasses} font-bold text-sm leading-tight line-clamp-2`}>
          {article.title}
        </h3>
        {showMeta ? (
          <div className={`${metaClasses} font-bold uppercase tracking-widest flex items-center gap-2 mt-2`}>
            <span>{article.category}</span>
            <span className="w-1 h-1 rounded-full bg-current/40" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        ) : (
          <div className={`${metaClasses} font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
            Read Story
          </div>
        )}
      </div>
    </Link>
  );
}
