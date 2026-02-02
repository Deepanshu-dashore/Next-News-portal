import { Container } from '@/components/ui/Container';
import { NewsCard } from '@/components/news/NewsCard';
import { FeaturedCard } from '@/components/news/FeaturedCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { EditorPickWidget } from '@/components/widgets/EditorPickWidget';
import { NewsletterWidget } from '@/components/widgets/NewsletterWidget';
import { RegionalNewsHero } from '@/components/sections/RegionalNewsHero';
import { getArticlesByRegion, getEditorPickArticles } from '@/src/lib/api/article.api';
import { notFound } from 'next/navigation';

const regionLabelMap: Record<string, string> = {
  'india': 'India',
  'world': 'World',
};

export default async function RegionalPage({ params }:{ params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const regionLabel = regionLabelMap[slug.toLowerCase()] || slug;

  // Utilize the region-specific API
  const articlesArr = await getArticlesByRegion(slug, 15).catch(() => []);
  const editorPicks = await getEditorPickArticles(3).catch(() => []);

  if (articlesArr.length === 0) {
    // If no articles found for the region, show a 404 or a "no articles" state.
    // For now, let's keep consistency with category page.
    notFound();
  }

  const featuredArticle = articlesArr[0];
  const remainingArticles = articlesArr.slice(1);

  return (
    <div className="pb-20">
      <RegionalNewsHero region={regionLabel} />

      <Container>
        <div className="py-12">
          {/* Featured Article */}
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-(--text-primary) uppercase tracking-tighter flex items-center gap-3">
                <span className="w-2 h-2 bg-(--accent-primary) rounded-full"></span>
                Regional Spotlight
              </h2>
            </div>
            <FeaturedCard article={featuredArticle} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Articles List */}
            <div className="lg:col-span-3">
              <div className="mb-10 flex items-center justify-between border-b-2 border-gray-100 pb-4">
                <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
                  Latest Updates from {regionLabel}
                </h2>
                <span className="text-sm text-gray-500 font-bold">
                  {remainingArticles.length} Stories
                </span>
              </div>

              <div className="space-y-1">
                {remainingArticles.length > 0 ? (
                    remainingArticles.map((article) => (
                        <div key={article.id} className="bg-white border-b border-gray-100 last:border-b-0">
                          <NewsCard article={article} />
                        </div>
                      ))
                ) : (
                    <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl py-20 text-center">
                        <p className="text-gray-400 font-medium italic">No further stories available for this region at this time.</p>
                    </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <Sidebar>
                  <EditorPickWidget articles={editorPicks} />
                  <NewsletterWidget />
                </Sidebar>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
