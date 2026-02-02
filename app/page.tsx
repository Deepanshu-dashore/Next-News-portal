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
  getEditorPickArticles,
  getArticlesByCategorySlug,
  getAllCategoryWiseArticles,
  getTopHighlights,
} from '@/src/lib/api/article.api';

export default async function Home() {
  // Fetch data from API
  const trendingArticlesRaw = await getTrendingArticles(10).catch(() => []); // Fetch more to allow for filtering
  const latestArticlesRaw = await getLatestArticles(10).catch(() => []);
  const editorPicksRaw = await getEditorPickArticles(5).catch(() => []);
  const topHighlightsRaw = await getTopHighlights().catch(() => []);

  // Deduplication Logic
  const shownIds = new Set<string>();

  // 1. Top Highlights (Hero Slider) - High Priority
  const topHighlights = topHighlightsRaw.slice(0, 5); 
  topHighlights.forEach((a: any) => shownIds.add(a.id));

  // 2. Highlights (Sidebar) - Trending articles not in Hero
  const highlights = trendingArticlesRaw
    .filter((a: any) => !shownIds.has(a.id))
    .slice(0, 4);
  highlights.forEach((a: any) => shownIds.add(a.id));

  // 3. Latest News
  const latestArticles = latestArticlesRaw
    .filter((a: any) => !shownIds.has(a.id))
    .slice(0, 5);
  latestArticles.forEach((a: any) => shownIds.add(a.id));

  // 4. Editor's Picks
  const editorPicks = editorPicksRaw
    .filter((a: any) => !shownIds.has(a.id))
    .slice(0, 3);
  
  const breakingSpotlight = latestArticles[0];

  // Fetch dynamic category articles
  // The API now returns grouped data: { categoryName, articles: [...] }[]
  const allCategoryArticles = await getAllCategoryWiseArticles().catch(() => []);

  return (
    <div className="pb-20">
      {/* Breaking News Ticker */}
      <BreakingNews articles={latestArticles} />

      <Container>
        <div className="py-8 md:py-12">
          {/* Hero Section */}
          <HeroSection 
            featuredArticles={topHighlights}
            highlights={highlights}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content - 75% */}
            <div className="lg:col-span-3 space-y-16">
              {/* Latest News */}
              <LatestNewsSection articles={latestArticles} />

              {/* Dynamic Categories */}
              {allCategoryArticles.length > 0 ? (
                allCategoryArticles.map((categoryGroup: any) => {
                    const articles = categoryGroup.articles;
                    if (!articles || articles.length === 0) return null;
                    
                    const catName = categoryGroup.categoryName;
                    // Fallback slug generation since service doesn't return it yet
                    const catSlug = catName.toLowerCase().replace(/\s+/g, '-');
                    
                    return (
                        <CategoryBlock
                            key={categoryGroup._id}
                            title={catName}
                            viewAllHref={`/category/${catSlug}`}
                            featuredArticle={articles[0]}
                            articles={articles.slice(1, 4)}
                        />
                    );
                })
              ) : (
                 <div className="text-gray-500 italic">No category news available at the moment.</div>
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
      <VideoSection />
    </div>
  );
}
