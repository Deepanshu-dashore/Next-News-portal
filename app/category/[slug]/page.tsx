import { Container } from '@/components/ui/Container';
import { NewsCard } from '@/components/news/NewsCard';
import { FeaturedCard } from '@/components/news/FeaturedCard';
import { Sidebar } from '@/components/layout/Sidebar';
import { EditorPickWidget } from '@/components/widgets/EditorPickWidget';
import { NewsletterWidget } from '@/components/widgets/NewsletterWidget';
import { getArticlesByCategory, getEditorPickArticles } from '@/lib/mockData';
import { notFound } from 'next/navigation';

// interface CategoryPageProps {
//   params: {
//     slug: string;
//   };
// }

const categoryMap: Record<string, string> = {
  'tech': 'Technology',
  'business': 'Business',
  'sports': 'Sports',
  'world': 'World',
  'politics': 'Politics',
  'health': 'Health',
  'science': 'Science',
  'entertainment': 'Entertainment',
};

export default async function CategoryPage({ params }:{ params: Promise<{ slug: string }> }) {
  const categoryName = categoryMap[(await params).slug];
  if (!categoryName) {
    notFound();
  }

  const articles = getArticlesByCategory(categoryName, 15);
  const editorPicks = getEditorPickArticles(3);

  if (articles.length === 0) {
    notFound();
  }

  const featuredArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="pb-20">
      {/* Category Header */}
      <div className="bg-linear-to-r from-black to-gray-900 text-white py-16 border-b-4 border-[var(--accent-primary)]">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 bg-(--accent-primary) rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Category</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-400 font-medium">
              Latest news and updates from the {categoryName.toLowerCase()} world
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Featured Article */}
          <div className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-(--text-primary) uppercase tracking-tighter flex items-center gap-3">
                <span className="w-2 h-2 bg-(--accent-primary) rounded-full"></span>
                Featured Story
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
                  Latest in {categoryName}
                </h2>
                <span className="text-sm text-gray-500 font-bold">
                  {remainingArticles.length} Articles
                </span>
              </div>

              <div className="space-y-1">
                {remainingArticles.map((article) => (
                  <div key={article.id} className="bg-white border-b border-gray-100 last:border-b-0">
                    <NewsCard article={article} />
                  </div>
                ))}
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
