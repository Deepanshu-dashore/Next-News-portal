import { NewsCard } from '@/components/news/NewsCard';
import { NewsArticle } from '@/types';

interface LatestNewsSectionProps {
  articles: NewsArticle[];
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  return (
    <section>
      <div className="mb-10 flex items-center justify-between border-b-2 border-gray-100 pb-4">
        <h2 className="text-3xl font-black text-(--text-primary) uppercase tracking-tighter">
          Latest Bulletins
        </h2>
        <div className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
      </div>

      <div className="space-y-1">
        {articles.map((article, index) => (
          <div key={article.id} className="bg-white border-b border-gray-100 last:border-b-0">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
