import { Container } from '@/components/ui/Container';
import { HeroSection } from '@/components/sections/HeroSection';
import { LatestNewsSection } from '@/components/sections/LatestNewsSection';
import { CategoryBlock } from '@/components/news/CategoryBlock';
import { Sidebar } from '@/components/layout/Sidebar';
import { EditorPickWidget } from '@/components/widgets/EditorPickWidget';
import { NewsletterWidget } from '@/components/widgets/NewsletterWidget';
import {
  getFeaturedArticle,
  getTrendingArticles,
  getLatestArticles,
  getArticlesByCategory,
  getEditorPickArticles,
} from '@/lib/mockData';

export default function Home() {
  const featuredArticle = getFeaturedArticle();
  const trendingArticles = getTrendingArticles(3);
  const latestArticles = getLatestArticles(5);
  const techArticles = getArticlesByCategory('Technology', 4);
  const businessArticles = getArticlesByCategory('Business', 4);
  const sportsArticles = getArticlesByCategory('Sports', 4);
  const editorPicks = getEditorPickArticles(3);

  return (
    <Container>
      <div className="py-8 md:py-12">
        {/* Hero Section */}
        <HeroSection 
            featuredArticle={featuredArticle}
            trendingArticles={trendingArticles}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content - 75% */}
            <div className="lg:col-span-3 space-y-8 md:space-y-12">
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

              {/* Sports Category */}
              {sportsArticles.length > 0 && (
                <CategoryBlock
                  title="Sports"
                  viewAllHref="/category/sports"
                  featuredArticle={sportsArticles[0]}
                  articles={sportsArticles.slice(1, 4)}
                />
              )}
            </div>

            {/* Sidebar - 25% (Desktop only) */}
            <div className="hidden lg:block">
              <div className="sticky top-20 space-y-6">
                <Sidebar>
                  <EditorPickWidget articles={editorPicks} />
                  <NewsletterWidget />
                </Sidebar>
              </div>
            </div>
          </div>
        </div>
    </Container>
  );
}
