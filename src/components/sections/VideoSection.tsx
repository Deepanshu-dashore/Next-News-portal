import { Container } from '@/components/ui/Container';
import { NewsArticle } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface VideoSectionProps {
  articles: NewsArticle[];
}

export function VideoSection({ articles }: VideoSectionProps) {
  return (
    <section className="bg-black text-white py-16 my-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-l from-(--accent-primary) to-transparent" />
      </div>
      
      <Container>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-(--accent-primary) flex items-center justify-center rounded-full shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Video Network</h2>
              <p className="text-(--accent-primary) text-[11px] font-black uppercase tracking-[0.3em] mt-1">Live from the field</p>
            </div>
          </div>
          <Link href="/videos" className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-(--accent-primary) hover:border-(--accent-primary) transition-all">
            Browse All Videos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/article/${article.slug}`}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-900 border border-gray-800">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 bg-(--accent-primary)/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                   </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 text-[10px] font-bold rounded">
                  4:20
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-(--accent-primary) transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>3k views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
