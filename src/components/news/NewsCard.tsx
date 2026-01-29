import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'compact';
}

export function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  if (variant === 'compact') {
    return (
      <Link 
        href={`/article/${article.slug}`}
        className="group flex gap-3 md:gap-4 py-3 px-2 hover:bg-[#F9FAFB] transition-colors border-b border-[#E5E7EB] last:border-b-0"
      >
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden bg-[#F3F4F6]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm md:text-base text-[#111827] mb-1 line-clamp-2 leading-tight group-hover:text-[#4F46E5] transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-[#6B7280] font-normal">
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      href={`/article/${article.slug}`}
      className="group block hover:bg-[#F9FAFB] transition-colors"
    >
      <article className="flex flex-col sm:flex-row gap-4 p-4 md:p-5">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-56 h-40 sm:h-36 flex-shrink-0 overflow-hidden bg-[#F3F4F6]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="mb-2">
            <Badge variant="accent">{article.category}</Badge>
          </div>
          
          <h3 className="font-bold text-lg md:text-xl text-[#111827] mb-2 line-clamp-2 leading-tight group-hover:text-[#4F46E5] transition-colors">
            {article.title}
          </h3>
          
          <p className="text-[#6B7280] mb-3 line-clamp-2 leading-relaxed text-sm md:text-base">
            {article.summary}
          </p>
          
          <div className="mt-auto flex items-center gap-2 text-xs md:text-sm text-[#6B7280] pt-2 border-t border-[#E5E7EB]">
            <span className="font-semibold text-[#111827]">{article.author.name}</span>
            <span className="text-[#D1D5DB]">|</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
