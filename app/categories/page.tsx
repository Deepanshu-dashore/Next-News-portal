import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { getAllCategories } from '@/src/lib/api/category.api';

export default async function AllCategoriesPage() {
  const categoriesData = await getAllCategories().catch(() => ({ data: [] }));
  const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);
  const iconBadges = [
    'fluent:news-16-filled',
    'mdi:trending-up',
    'mdi:flash',
    'mdi:compass-outline',
    'mdi:chart-areaspline',
    'mdi:star-four-points',
    'mdi:spotlight',
    'mdi:bookmark-check',
  ];

  return (
    <div className="pb-20">
      {/* Page Header */}
      <div className="bg-linear-to-b from-black via-black to-red-900 text-white py-16 border-b-4 border-gray-200 relative">
        <div style={{backgroundImage:`url('/design.svg')`}} className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.07]" aria-hidden />
        <Container>
          <div className="max-w-4xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 bg-(--accent-primary) rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-300">Browse</span>
            </div>
            <h1 className="text-5xl text-white md:text-6xl font-black mb-4 uppercase tracking-tighter">
              All Categories
            </h1>
            <p className="text-xl text-gray-400 font-medium">
              Explore news by categories
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category: any, index: number) => {
              const iconName = iconBadges[index % iconBadges.length];

              return (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-(--accent-primary) hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex flex-col gap-4">
                  {/* Icon Circle */}
                  <div className="relative w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <span className="text-xl font-black text-white">
                        <Icon icon={iconName} className="w-6.5 h-6.5" />
                    </span>
                  </div>
                  
                  {/* Category Name */}
                  <div>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-(--accent-primary) transition-colors mb-2">
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    {category.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-(--accent-primary) opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
            })}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">No Categories Found</h2>
              <p className="text-gray-600">Categories will appear here once they are created.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
