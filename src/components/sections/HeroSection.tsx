'use client';

import { FeaturedCard } from '@/components/news/FeaturedCard';
import { HighlightCard } from '@/components/news/HighlightCard';
import { NewsArticle } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface HeroSectionProps {
  featuredArticles: NewsArticle[];
  highlights: NewsArticle[];
}

export function HeroSection({ featuredArticles, highlights }: HeroSectionProps) {
  return (
    <section className="mb-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Featured Slider - 75% wide on large screens */}
        <div className="lg:col-span-3 lg:sticky lg:top-28 self-start mb-10">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination]}
            className="h-full rounded-md overflow-hidden hero-swiper relative group"
          >
            {featuredArticles.map((article) => (
              <SwiperSlide key={article.id}>
                <FeaturedCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Highlights Sidebar - 25% wide on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          {highlights.slice(0, 4).map((article) => (
            <HighlightCard key={article.id} article={article} />
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 30px !important;
          text-align: left;
          padding-left: 40px;
          z-index: 20;
        }
        .hero-swiper .swiper-pagination-bullet {
          width: 30px;
          height: 4px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 0.3s;
          margin: 0 4px !important;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 50px;
          background: var(--accent-primary);
        }
        @media (min-width: 768px) {
           .hero-swiper .swiper-pagination {
              padding-left: 48px;
              bottom: 40px !important;
           }
        }
      `}</style>
    </section>
  );
}
