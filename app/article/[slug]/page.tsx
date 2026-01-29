import { Container } from '@/components/ui/Container';
import { getArticleBySlug, getLatestArticles, getEditorPickArticles, mockArticles } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { EditorPickWidget } from '@/components/widgets/EditorPickWidget';
import { HighlightCard } from '@/components/news/HighlightCard';
import Link from 'next/link';


export default async function ArticlePage({ params }: { params : Promise<{ slug: string }> }) {
   const article = getArticleBySlug((await params).slug);
   const latestArticles = getLatestArticles(3);
   const editorPicks = getEditorPickArticles(3);
   const highlightArticle = editorPicks[0] ?? latestArticles[0];

  if (!article) {
    notFound();
  }

  return (
    <div className="pb-20">
      {/* Article Header */}
      <div className="bg-black/80 text-white pt-20 pb-24 relative overflow-hidden">
      <div style={{backgroundImage:`url('/design.svg')`}} className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.07]" aria-hidden />
        
        <div className="absolute inset-0 opacity-20">
          <Image
             src={article.image}
             alt={article.title}
             fill
             className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-red-800/40 via-black/20 to-transparent" />
        
        <Container>
           <div className="relative z-10 max-w-4xl mx-auto text-center">
              <span className="bg-(--accent-primary) text-white text-xs font-black uppercase px-3 py-1 tracking-widest inline-block mb-6">
                 {article.category}
              </span>
              <h1 className="text-3xl text-white md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tighter">
                 {article.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm font-medium text-gray-300">
                 <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                       {article.author.name[0]}
                    </span>
                    <span>{article.author.name}</span>
                 </div>
                 <span className="w-1 h-1 rounded-full bg-gray-500" />
                 <span>{formatDate(article.publishedAt)}</span>
                 <span className="w-1 h-1 rounded-full bg-gray-500" />
                 <span>{article.readTime || '5'} Min Read</span>
              </div>
           </div>
        </Container>
      </div>

      <Container>
         <div className="max-w-7xl mx-auto -mt-16 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Main Article Content */}
               <div className="lg:col-span-8">
                  <div className="bg-white p-6 md:p-10 shadow-lg rounded-t-xl overflow-hidden mb-8">
                     <div className="relative aspect-video mb-10 rounded-lg overflow-hidden">
                        <Image
                           src={article.image}
                           alt={article.title}
                           fill
                           className="object-cover"
                           priority
                        />
                     </div>
                     
                     <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-(--text-primary) prose-p:text-(--text-secondary) prose-a:text-(--accent-primary)">
                        <p className="lead text-xl md:text-2xl font-medium text-gray-900 mb-8 border-l-4 border-(--accent-primary) pl-6 italic">
                           {article.summary}
                        </p>
                        <p>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <h3>Key Takeaways</h3>
                        <ul>
                           <li>Comprehensive analysis of the situation</li>
                           <li>Expert opinions and future projections</li>
                           <li>Impact on global markets and local economies</li>
                        </ul>
                        <p>
                           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <blockquote>
                           "This is a defining moment for the industry, and we must act with urgency and precision."
                        </blockquote>
                        <p>
                           Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
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
               </div>

               {/* Sidebar */}
               <div className="lg:col-span-4 space-y-8 mt-10 lg:mt-0">
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
    </div>
  );
}

export function generateStaticParams() {
   return mockArticles.map((article) => ({ slug: article.slug }));
}
