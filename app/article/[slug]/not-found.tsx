import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function ArticleNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-red-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
      
      <Container>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Main Icon/Graphic */}
          <div className="mb-10 inline-flex items-center justify-center">
            <div className="relative">
              <div className="text-[120px] md:text-[180px] font-black text-gray-100 leading-none select-none tracking-tighter">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-(--accent-primary) rounded-2xl rotate-12 flex items-center justify-center shadow-2xl">
                    <svg className="w-10 h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                 </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
                Story Missing in <span className="text-(--accent-primary)">Action</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              We couldn't find the article you were looking for. It might have been moved, deleted, or perhaps the link is just having a bad day.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" passHref className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-black uppercase tracking-widest shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                Back to News Hub
              </Button>
            </Link>
            <Link href="/dashboard" passHref className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-black uppercase tracking-widest border-2 hover:bg-gray-50 transition-all">
                Search Articles
              </Button>
            </Link>
          </div>
          
          {/* Newsletter Suggestion */}
          <div className="mt-20 pt-10 border-t border-gray-100 italic text-gray-400">
            "Journalism is what people want to keep out of the paper. Everything else is advertising."
          </div>
        </div>
      </Container>
    </div>
  );
}
