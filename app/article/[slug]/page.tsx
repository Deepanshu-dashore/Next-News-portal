import { Container } from '@/components/ui/Container';
import { getLatestArticles, getEditorPickArticles } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { EditorPickWidget } from '@/components/widgets/EditorPickWidget';
import { HighlightCard } from '@/components/news/HighlightCard';
import Link from 'next/link';

async function getArticleBySlug(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/artical/slug/${slug}`, {
      cache: 'no-store'
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticlePage({ params }: { params : Promise<{ slug: string }> }) {
   const article = await getArticleBySlug((await params).slug);
   const latestArticles = getLatestArticles(3);
   const editorPicks = getEditorPickArticles(3);
   const highlightArticle = editorPicks[0] ?? latestArticles[0];

  if (!article) {
    notFound();
  }

  return (
      <Container>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
               <Link href="/" className="hover:text-(--accent-primary)">Home</Link>
               <span>/</span>
               <Link href="/" className="hover:text-(--accent-primary)">Articles</Link>
               <span>/</span>
               <Link href={`/category/${article.slug}`} className="hover:text-(--accent-primary)">
                  {article.category}
               </Link>
               <span>/</span>
               <span className="text-gray-900 font-medium truncate">{article.title}</span>
            </nav>

            <div className="max-w-7xl mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Main Article Content */}
                  <div className="lg:col-span-8">
                     {/* Featured Image */}
                     <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6">
                        <Image
                           src={article.image}
                           alt={article.title}
                           fill
                           className="object-cover"
                           priority
                        />
                     </div>

                     {/* Article Info */}
                     <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                           <Link
                              href={`/category/${article.slug}`}
                              className="inline-block px-3 py-1 bg-(--accent-primary) text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-900 transition-colors"
                           >
                              {article.category}
                           </Link>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                           {article.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                           <div className="flex items-center gap-2">
                              <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
                                 {article.author.name[0]}
                              </span>
                              <span className="font-medium">{article.author.name}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(article.publishedAt)}
                           </div>
                           <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {article.readTime || '5'} Min Read
                           </div>
                        </div>

                        {/* Article Summary */}
                        <p className="text-lg text-gray-700 leading-relaxed mb-6 pb-6 border-b border-gray-200">
                           {article.summary}
                        </p>
                     </div>

                     {/* Article Content */}
                     <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-(--text-primary) prose-p:text-(--text-secondary) prose-a:text-(--accent-primary)">
                        <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
                        {!article.content && (
                        <p>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        )}
                     </div>

                     <div className="mt-12 pt-8 border-t border-gray-100">
                        <h4 className="font-bold text-lg mb-4">Share this article</h4>
                        <div className="flex gap-2">
                           {['Facebook', 'Twitter', 'LinkedIn', 'WhatsApp'].map(social => (
                              <button key={social} className="px-4 py-2 border border-gray-200 rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">
                                 {social}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>

               {/* Sidebar */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="sticky top-28">
                     <Sidebar>
                           <EditorPickWidget articles={editorPicks} />
                           {highlightArticle && (
                             <div className="rounded-2xl border border-gray-200 overflow-hidden">
                               <HighlightCard article={highlightArticle} />
                             </div>
                           )}
                     </Sidebar>
                  </div>
               </div>
            </div>
         </div>
      </Container>
  );
}
