'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const router = useRouter();
  const [results, setResults] = useState<{
    articles: any[];
    videos: any[];
    categories: any[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchResults = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/dashboard/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.success && isMounted) {
          setResults(data.data);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchResults();

    return () => {
      isMounted = false;
    };
  }, [query]);

  if (!query) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Icon icon="heroicons:magnifying-glass" className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium">Enter a search term to get started</h3>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
            {/* Articles Section */}
            {results?.articles && results.articles.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                             <Icon icon="heroicons:document-text-20-solid" className="w-5 h-5 text-blue-500" />
                             Articles ({results.articles.length})
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {results.articles.map((article: any) => (
                            <Link href={`/dashboard/articles/edit/${article.id}`} key={article.id} className="block p-4 hover:bg-gray-50 transition-colors group">
                                <div className="flex gap-4">
                                     <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                                         {article.heroImageUrl && <img src={article.heroImageUrl} alt="" className="w-full h-full object-cover" />}
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{article.title}</h4>
                                         <p className="text-sm text-gray-500 line-clamp-2 mt-1">{article.summary}</p>
                                         <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                             <span className="flex items-center gap-1"><Icon icon="heroicons:user" /> {article.authorId?.name}</span>
                                             <span className="flex items-center gap-1"><Icon icon="heroicons:folder" /> {article.categoryId?.name}</span>
                                         </div>
                                     </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Videos Section */}
             {results?.videos && results.videos.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                             <Icon icon="heroicons:video-camera-20-solid" className="w-5 h-5 text-red-500" />
                             Videos ({results.videos.length})
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {results.videos.map((video: any) => (
                            <Link href={`/dashboard/videos/edit/${video.id}`} key={video.id} className="block p-4 hover:bg-gray-50 transition-colors group">
                                <div className="flex gap-4">
                                    <div className="w-24 h-16 rounded-lg bg-gray-900 overflow-hidden shrink-0 relative flex items-center justify-center">
                                         <Icon icon="heroicons:play" className="w-8 h-8 text-white opacity-50 absolute" />
                                         {/* If video has thumbnail, show it here */}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                         <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">{video.title}</h4>
                                         <p className="text-sm text-gray-500 line-clamp-1 mt-1">{video.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories Section */}
             {results?.categories && results.categories.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                             <Icon icon="heroicons:tag-20-solid" className="w-5 h-5 text-green-500" />
                             Categories ({results.categories.length})
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {results.categories.map((cat: any) => (
                            <Link href={`/dashboard/categories/edit/${cat.id}`} key={cat.id} className="block p-4 hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 font-bold text-xl shrink-0">
                                         {cat.name.charAt(0)}
                                     </div>
                                     <div className="flex-1 min-w-0">
                                         <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{cat.name}</h4>
                                         <p className="text-sm text-gray-500">{cat.description}</p>
                                     </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* No Results State */}
            {results && 
             results.articles.length === 0 && 
             results.videos.length === 0 && 
             results.categories.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
                    <Icon icon="heroicons:face-frown" className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-bold text-gray-900 text-lg">No matches found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your search terms</p>
                </div>
            )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;

    // 3 word max limit validation
    const wordCount = q.split(/\s+/).length;
    if (wordCount > 3) {
      toast.error('Search allows a maximum of 3 words');
      return;
    }

    router.push(`/dashboard/search?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container className="py-8 max-w-[1200px]">
        <AdminHeader 
            title={`Search Results: ${query}`}
            description="Global search across articles, videos, and categories"
            back="Dashboard" 
            add={
               <div className="relative flex items-center gap-2">
                 <div className="relative">
                   <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Search (max 3 words)..." 
                     className="pl-4 pr-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all backdrop-blur-sm"
                   />
                 </div>
                 <button
                    onClick={handleSearch}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm cursor-pointer flex items-center justify-center"
                    title="Search"
                 >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                 </button>
               </div>
            }
        />
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
        <Toaster position="top-right" />
    </Container>
  );
}
