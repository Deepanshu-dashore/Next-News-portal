import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { NewsArticle } from '@/types';

interface FeaturedCardProps {
  article: NewsArticle;
}

export function FeaturedCard({ article }: FeaturedCardProps) {
  return (
    <Link 
      href={`/article/${article.slug}`}
      className="group block relative h-[424px] overflow-hidden bg-black shadow-2xl"
    >
      <Image
        src={article.image}
        alt={article.title}
        fill
        className="object-cover opacity-80 group-hover:scale-[1.05] transition-transform duration-1000"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-(--accent-primary) text-white text-xs font-black uppercase px-3 py-1 tracking-widest shadow-lg">
            {article.category}
          </span>
          <span className="text-gray-300 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Spotlight
          </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter group-hover:text-(--accent-primary) transition-colors">
          {article.title}
        </h2>
        
        <p className="hidden md:block text-gray-300 text-lg max-w-2xl mb-8 font-medium leading-relaxed line-clamp-2">
          {article.summary}
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-white overflow-hidden shadow-xl">
            {article.author.avatar ? (
               <Image src={article.author.avatar} alt={article.author.name} width={40} height={40} className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                {article.author.name[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xs font-black uppercase tracking-widest">{article.author.name}</span>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
