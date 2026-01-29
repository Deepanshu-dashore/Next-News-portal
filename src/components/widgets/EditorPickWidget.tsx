import { NewsCard } from '@/components/news/NewsCard';
import { NewsArticle } from '@/types';

interface EditorPickWidgetProps {
  articles: NewsArticle[];
}

export function EditorPickWidget({ articles }: EditorPickWidgetProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-[#111827] mb-3 md:mb-4 pb-2 md:pb-3 border-b border-[#E5E7EB]">
        Editor's Pick
      </h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} variant="compact" />
        ))}
      </div>
    </div>
  );
}
