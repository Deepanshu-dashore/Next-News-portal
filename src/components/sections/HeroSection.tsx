import { FeaturedCard } from '@/components/news/FeaturedCard';
import { HighlightCard } from '@/components/news/HighlightCard';
import { NewsArticle } from '@/types';

interface HeroSectionProps {
  featuredArticle: NewsArticle;
  highlights: NewsArticle[];
}

export function HeroSection({ featuredArticle, highlights }: HeroSectionProps) {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Featured - 75% wide on large screens */}
        <div className="lg:col-span-3">
          <FeaturedCard article={featuredArticle} />
        </div>

        {/* Highlights Sidebar - 25% wide on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          {highlights.slice(0, 4).map((article) => (
            <HighlightCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
