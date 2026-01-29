import { NewsCard } from '@/components/news/NewsCard';
import { NewsArticle } from '@/types';

interface EditorPickWidgetProps {
  articles: NewsArticle[];
}

export function EditorPickWidget({ articles }: EditorPickWidgetProps) {
  return (
    <div className="bg-gray-50 p-6">
      <div className="mb-6 flex items-center gap-3">
        <h3 className="text-lg font-black text-(--text-primary) uppercase tracking-tighter">
          Editor's Choice
        </h3>
        <div className="flex-1 h-1 bg-gray-200"></div>
      </div>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={article.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
             <div className="flex gap-4 group cursor-pointer">
                <div className="text-3xl font-black text-gray-200 leading-none group-hover:text-(--accent-primary) transition-colors">
                  0{index + 1}
                </div>
                <div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-(--accent-primary) mb-1 block">
                      {article.category}
                   </span>
                   <h4 className="font-bold text-sm leading-snug group-hover:text-(--accent-primary) transition-colors">
                      {article.title}
                   </h4>
                   <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Read Article
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
