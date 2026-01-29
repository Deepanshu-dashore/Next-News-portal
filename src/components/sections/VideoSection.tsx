import { Container } from '@/components/ui/Container';
import { NewsArticle } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface VideoSectionProps {
  articles: NewsArticle[];
}

export function VideoSection({ articles }: VideoSectionProps) {
  return (
    <section className="bg-linear-to-b from-black via-black to-red-900 text-white py-16 my-12 overflow-hidden relative">
      <div style={{backgroundImage:`url('/design.svg')`}} className="pointer-events-none text-white absolute inset-0 bg-repeat opacity-[0.1]" aria-hidden />
      {/* <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-l from-[var(--accent-primary)] to-transparent" />
      </div> */}
      
      <Container>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--accent-primary)] flex items-center justify-center rounded-full shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none text-white">Featured Video</h2>
              <p className="text-[var(--accent-primary)] text-[11px] font-black uppercase tracking-[0.3em] mt-1">video news from the field</p>
            </div>
          </div>
          <Link href="/videos" className="text-xs font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all text-white">
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
                   <div className="w-16 h-16 bg-[var(--accent-primary)]/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                   </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 text-[10px] font-bold rounded">
                  4:20
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight line-clamp-2 text-white group-hover:text-[var(--accent-primary)] transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
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
