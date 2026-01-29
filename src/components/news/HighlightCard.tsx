import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface HighlightCardProps {
  article: NewsArticle;
}

export function HighlightCard({ article }: HighlightCardProps) {
  return (
    <Link 
      href={`/article/${article.slug}`}
      className="group block relative h-[200px] overflow-hidden bg-black shadow-lg"
    >
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-(--accent-primary) text-white text-[9px] font-black uppercase px-2 py-0.5 tracking-tighter">
            {article.category}
          </span>
        </div>
        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">
          {article.title}
        </h3>
        <div className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Read Story
        </div>
      </div>
    </Link>
  );
}
