import { Container } from '@/components/ui/Container';
import { HeroSection } from '@/components/sections/HeroSection';
import { LatestNewsSection } from '@/components/sections/LatestNewsSection';
import { CategoryBlock } from '@/components/news/CategoryBlock';
import { VideoSection } from '@/components/sections/VideoSection';
import { BreakingNews } from '@/components/news/BreakingNews';
import { Sidebar } from '@/components/layout/Sidebar';
import { EditorPickWidget } from '@/components/widgets/EditorPickWidget';
import { NewsletterWidget } from '@/components/widgets/NewsletterWidget';
import { HighlightCard } from '@/components/news/HighlightCard';
import {
  getFeaturedArticles,
  getTrendingArticles,
  getLatestArticles,
  getArticlesByCategory,
  getEditorPickArticles,
  getArticleBySlug,
} from '@/lib/mockData';

export default function Home() {
  const featuredArticles = getFeaturedArticles(3);
  const trendingArticles = getTrendingArticles(5);
  const latestArticles = getLatestArticles(5);
  const techArticles = getArticlesByCategory('Technology', 4);
  const businessArticles = getArticlesByCategory('Business', 4);
  const worldArticles = getArticlesByCategory('World', 4);
  const editorPicks = getEditorPickArticles(3);
  const breakingSpotlight = latestArticles[0];

  return (
    <div className="pb-20">
      {/* Breaking News Ticker */}
      <BreakingNews articles={latestArticles} />

      <Container>
        <div className="py-8 md:py-12">
          {/* Hero Section */}
          <HeroSection 
            featuredArticles={featuredArticles}
            highlights={trendingArticles.slice(0, 4)}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content - 75% */}
            <div className="lg:col-span-3 space-y-16">
              {/* Latest News */}
              <LatestNewsSection articles={latestArticles} />

              {/* Technology Category */}
              {techArticles.length > 0 && (
                <CategoryBlock
                  title="Technology"
                  viewAllHref="/category/tech"
                  featuredArticle={techArticles[0]}
                  articles={techArticles.slice(1, 4)}
                />
              )}

              {/* Business Category */}
              {businessArticles.length > 0 && (
                <CategoryBlock
                  title="Business"
                  viewAllHref="/category/business"
                  featuredArticle={businessArticles[0]}
                  articles={businessArticles.slice(1, 4)}
                />
              )}
            </div>

            {/* Sidebar - 25% (Desktop only) */}
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                <Sidebar>
                  <EditorPickWidget articles={editorPicks} />
                  <NewsletterWidget />
                  {breakingSpotlight && (
                    <div className="border border-gray-200 rounded-2xl overflow-hidden">
                      <HighlightCard article={breakingSpotlight} tone="light" showMeta />
                    </div>
                  )}
                </Sidebar>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Video Network - Full Width Section */}
      <VideoSection articles={latestArticles.slice(0, 3)} />

      <Container>
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
               {/* World Category */}
              {worldArticles.length > 0 && (
                <CategoryBlock
                  title="World News"
                  viewAllHref="/category/world"
                  featuredArticle={worldArticles[0]}
                  articles={worldArticles.slice(1, 4)}
                />
              )}
            </div>
            <div className="hidden lg:block">
                 {latestArticles.slice(1, 4).map((article) => (
                   <div key={article.id} className="mb-6 border border-gray-200 rounded-2xl overflow-hidden">
                     <HighlightCard article={article} tone="light" showMeta />
                   </div>
                 ))}
            </div>
         </div>
      </Container>
    </div>
  );
}
