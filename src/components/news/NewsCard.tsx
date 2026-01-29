import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'compact';
}

export function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  return (
    <Link 
      href={`/article/${article.slug}`}
      className="group block py-8 transition-colors"
    >
      <article className="flex flex-col sm:flex-row gap-8">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-64 h-48 sm:h-40 shrink-0 overflow-hidden bg-gray-100 shadow-sm transition-transform duration-500 group-hover:shadow-md">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-0 left-0">
             <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest">
               {article.category}
             </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--text-muted)">
               {formatDate(article.publishedAt)}
             </span>
             <span className="w-1 h-1 rounded-full bg-gray-300" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--accent-primary)">
               {article.readTime || '5'} Min Read
             </span>
          </div>
          
          <h3 className="font-black text-xl md:text-2xl text-(--text-primary) mb-3 leading-tight group-hover:text-(--accent-primary) transition-colors tracking-tighter">
            {article.title}
          </h3>
          
          <p className="text-(--text-secondary) mb-4 line-clamp-2 leading-relaxed text-sm font-medium">
            {article.summary}
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-(--text-primary)">
              By {article.author.name}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
