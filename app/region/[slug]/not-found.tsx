import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function RegionalNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-green-50 rounded-full blur-3xl opacity-60" />
      
      <Container>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Main Icon/Graphic */}
          <div className="mb-10 inline-flex items-center justify-center">
            <div className="relative">
              <div className="text-[120px] md:text-[180px] font-black text-gray-100 leading-none select-none tracking-tighter">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-orange-600 rounded-2xl -rotate-12 flex items-center justify-center shadow-2xl">
                    <svg className="w-10 h-10 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
                Region <span className="text-orange-600">Uncharted</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              We couldn't find any stories for this specific region yet. Our correspondents are working hard to bring you the latest from every corner of the globe.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" passHref className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-black uppercase tracking-widest bg-orange-600 hover:bg-orange-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                Back to News Hub
              </Button>
            </Link>
            <Link href="/category/world" passHref className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-black uppercase tracking-widest border-2 hover:bg-gray-50 transition-all border-orange-100">
                Browse World News
              </Button>
            </Link>
          </div>
          
          {/* Quote */}
          <div className="mt-20 pt-10 border-t border-gray-100 italic text-gray-400">
            "The world is a book and those who do not travel read only one page."
          </div>
        </div>
      </Container>
    </div>
  );
}
