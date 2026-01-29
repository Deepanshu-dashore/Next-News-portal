import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface TrendingCardProps {
  article: NewsArticle;
  index: number;
}

export function TrendingCard({ article, index }: TrendingCardProps) {
  return (
    <Link 
      href={`/article/${article.slug}`}
      className="group flex gap-3 py-3 px-1 hover:bg-[#F9FAFB] transition-colors border-b border-[#E5E7EB] last:border-b-0"
    >

      {/* Thumbnail */}
      <div className="relative w-16 h-16 md:w-24 md:h-14 shrink-0 rounded-sm overflow-hidden bg-[#F3F4F6]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 my-auto">
        <h3 className="font-semibold text-sm text-[#111827] mb-2 line-clamp-3 leading-tight group-hover:text-[#4F46E5] transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-[#6B7280]">
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </Link>
  );
}
