import { NewsCard } from '@/components/news/NewsCard';
import { NewsArticle } from '@/types';

interface LatestNewsSectionProps {
  articles: NewsArticle[];
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] uppercase tracking-tight pb-3 border-b-4 border-[#111827] inline-block">
          Latest News
        </h2>
      </div>

      <div className="space-y-1">
        {articles.map((article, index) => (
          <div key={article.id} className="bg-white border-b-2 border-[#E5E7EB] last:border-b-0">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
