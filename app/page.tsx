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
  const trendingArticlesRaw = await getTrendingArticles(20).catch(() => []); 
  const latestArticlesRaw = await getLatestArticles(20).catch(() => []);
  const editorPicksRaw = await getEditorPickArticles(10).catch(() => []);
  const topHighlightsRaw = await getTopHighlights().catch(() => []);

  // Deduplication Logic
  const shownIds = new Set<string>();

  // 1. Top Highlights (Hero Slider)
  const topHighlights = topHighlightsRaw.slice(0, 5); 
  topHighlights.forEach((a: any) => shownIds.add(a.id));

  // 2. Highlights (Sidebar)
  const highlights = trendingArticlesRaw
    .filter((a: any) => !shownIds.has(a.id))
    .slice(0, 4);
  highlights.forEach((a: any) => shownIds.add(a.id));

  // 3. Latest News
  let latestArticles = latestArticlesRaw
    .filter((a: any) => !shownIds.has(a.id))
    .slice(0, 5);
  
  if (latestArticles.length === 0 && latestArticlesRaw.length > 0) {
    latestArticles = latestArticlesRaw.slice(0, 5);
  }
  
  latestArticles.forEach((a: any) => shownIds.add(a.id));

  // 4. Editor's Picks
  let editorPicks = editorPicksRaw
    .filter((a: any) => !shownIds.has(a.id))
    .slice(0, 4);
    
  if (editorPicks.length === 0 && editorPicksRaw.length > 0) {
    editorPicks = editorPicksRaw.slice(0, 4);
  }
  
  const breakingSpotlight = latestArticles[0];

  // Fetch dynamic category articles
  const allCategoryArticles = await getAllCategoryWiseArticles().catch(() => []);
  const firstSixCategories = allCategoryArticles.slice(0, 6);
  const remainingCategories = allCategoryArticles.slice(6);

  return (
    <div className="pb-20">
      {/* Breaking News Ticker */}
      <BreakingNews />

      <Container>
        <div className="py-8 md:py-12">
          {/* Hero Section */}
          <HeroSection 
            featuredArticles={topHighlights}
            highlights={highlights}
          />

          {/* Main Content Grid (Top) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content - 75% */}
            <div className="lg:col-span-3 space-y-16">
              {/* Latest News */}
              <LatestNewsSection articles={latestArticles} />

              {/* Dynamic Categories - First 6 */}
              {firstSixCategories.length > 0 ? (
                firstSixCategories.map((categoryGroup: any) => {
                    const articles = categoryGroup.articles;
                    if (!articles || articles.length === 0) return null;
                    
                    const catName = categoryGroup.categoryName;
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

            {/* Sidebar - 25% */}
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                <Sidebar>
                  <EditorPickWidget articles={editorPicks} />
                </Sidebar>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Video Network - Full Width Section */}
      <VideoSection />

      {/* Content after Video - Structured for Full Width categories */}
      {remainingCategories.length > 0 && (
        <Container>
          <div className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content - Categories take 75% width */}
              <div className="lg:col-span-3 space-y-16">
                {remainingCategories.map((categoryGroup: any) => {
                    const articles = categoryGroup.articles;
                    if (!articles || articles.length === 0) return null;
                    
                    const catName = categoryGroup.categoryName;
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
                })}
              </div>

              {/* Sidebar - Restored matching upper side */}
              <div className="hidden lg:block">
                <div className="sticky top-28 space-y-10">
                  <Sidebar>
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
      )}
    </div>
  );
}
