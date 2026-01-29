"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface VideoItem {
  title: string;
  thumbnail: string;
  views: string;
  published: string;
  duration: string;
}

interface VideoSectionData {
  title: string;
  subtitle?: string;
  filters?: string[];
  videos: VideoItem[];
}

const videoSections: VideoSectionData[] = [
  {
    title: 'Sports',
    subtitle: 'Pulse of the pitch, court, and track',
    filters: ['Cricket', 'Featured', 'Football', 'Formula E', 'Tennis'],
    videos: [
      {
        title: 'Sanju Samson or Ishan Kishan? Pick the ideal finisher for the T20 World Cup',
        thumbnail: 'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?w=1200&q=80&auto=format&fit=crop',
        views: '4.2K views',
        published: '3 hours ago',
        duration: '12:42',
      },
      {
        title: 'Shivam Dube on mindset shifts, reading bowlers, and dominating the middle overs',
        thumbnail: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&q=80&auto=format&fit=crop',
        views: '3.0K views',
        published: '4 hours ago',
        duration: '08:51',
      },
      {
        title: 'Inside details of Washington Sundar: Why India trusts their calm finisher',
        thumbnail: 'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?w=1200&q=80&auto=format&fit=crop',
        views: '53.7K views',
        published: '19 hours ago',
        duration: '06:37',
      },
    ],
  },
  {
    title: 'Education',
    subtitle: 'Guides to global classrooms and new skills',
    videos: [
      {
        title: 'How to plan your study abroad finance in 6 steps',
        thumbnail: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=80&auto=format&fit=crop',
        views: '12.4K views',
        published: '1 day ago',
        duration: '09:12',
      },
      {
        title: 'Why choosing an international foundation year can fast-track success',
        thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80&auto=format&fit=crop',
        views: '8.9K views',
        published: '20 hours ago',
        duration: '07:05',
      },
      {
        title: 'Top 10 scholarships every Indian student should bookmark',
        thumbnail: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=1200&q=80&auto=format&fit=crop',
        views: '21.3K views',
        published: '2 days ago',
        duration: '11:48',
      },
    ],
  },
  {
    title: 'Lifestyle',
    subtitle: 'Quick takeaways for a better everyday',
    videos: [
      {
        title: 'Five minute mindfulness routine for busy mornings',
        thumbnail: 'https://images.unsplash.com/photo-1484981184820-2e84ea0b1d88?w=1200&q=80&auto=format&fit=crop',
        views: '6.5K views',
        published: '5 hours ago',
        duration: '05:07',
      },
      {
        title: 'Kitchen to table: easy weekday dinners under 20 minutes',
        thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop',
        views: '14.8K views',
        published: '8 hours ago',
        duration: '04:55',
      },
      {
        title: 'Metropolitan fitness hacks you can do at your desk',
        thumbnail: 'https://images.unsplash.com/photo-1518611012118-f0c5c859ccc0?w=1200&q=80&auto=format&fit=crop',
        views: '9.6K views',
        published: '10 hours ago',
        duration: '06:10',
      },
    ],
  },
];

export default function VideosPage() {
  return (
    <div className="pb-24">
        <header className="py-16 border-b border-gray-200 bg-linear-to-b from-black via-black to-red-900 relative">
            <div style={{backgroundImage:`url('/design.svg')`}} className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.07]" aria-hidden />
      <Container className='relative z-20'>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rounded-full bg-(--accent-primary)"></span>
            <span className="text-xs font-black uppercase tracking-[0.35em] text-gray-200">Video Hub</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-100">Watch &amp; Learn</h1>
              <p className="text-sm md:text-base text-gray-400 mt-3 max-w-2xl">
                Curated explainers, pressers, and lifestyle snippets streaming straight from the NewsWeb studio. Catch the latest breakdowns without endless scrolling.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-(--accent-primary) hover:text-gray-200"
            >
              Request a video topic
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          </Container>
        </header>

      <Container>

        <main className="divide-y divide-gray-200">
          {videoSections.map((section) => {
            const sliderId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <section key={section.title} className="py-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">{section.title}</h2>
                    {section.subtitle && (
                      <p className="text-sm text-gray-500 mt-1">{section.subtitle}</p>
                    )}
                  </div>
                  <Link
                    href="#"
                    className="text-xs font-black uppercase tracking-widest text-(--accent-primary) hover:text-gray-900"
                  >
                    See All
                  </Link>
                </div>

                {/* {section.filters && (
                  <div className="flex gap-4 overflow-x-auto pb-2 text-sm text-gray-600">
                    {section.filters.map((filter, index) => (
                      <button
                        key={filter}
                        className={`whitespace-nowrap border-b-2 pb-2 transition-colors ${
                          index === 0
                            ? 'border-(--accent-primary) text-(--accent-primary) font-semibold'
                            : 'border-transparent hover:border-(--accent-primary)/50 hover:text-(--accent-primary)'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )} */}

                <div className="mt-8">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1.1}
                    breakpoints={{
                      640: { slidesPerView: 1.5 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                    }}
                    navigation={{
                      nextEl: `.video-${sliderId}-next`,
                      prevEl: `.video-${sliderId}-prev`,
                    }}
                    pagination={{
                      clickable: true,
                      el: `.video-${sliderId}-pagination`,
                    }}
                    className={`video-swiper video-swiper--${sliderId}`}
                  >
                    {section.videos.map((video) => (
                      <SwiperSlide key={video.title}>
                        <article className="group flex h-full flex-col gap-4">
                          <Link href="#" className="block">
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
                              <Image
                                src={video.thumbnail}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-900 shadow-lg group-hover:bg-(--accent-primary) group-hover:text-white transition-colors">
                                  <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded">
                                {video.duration}
                              </span>
                            </div>
                          </Link>
                          <div>
                            <h3 className="text-base font-semibold leading-tight text-gray-900 group-hover:text-(--accent-primary)">
                              {video.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-2 font-medium">
                              {video.views} | {video.published}
                            </p>
                          </div>
                        </article>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="mt-6 flex items-center justify-between">
                    <div className={`video-pagination video-${sliderId}-pagination`}></div>
                    <div className="flex gap-3">
                      <button
                        className={`video-nav-btn video-${sliderId}-prev border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-(--accent-primary) hover:border-(--accent-primary) transition-colors`}
                        type="button"
                        aria-label="Previous videos"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className={`video-nav-btn video-${sliderId}-next border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-(--accent-primary) hover:border-(--accent-primary) transition-colors`}
                        type="button"
                        aria-label="Next videos"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </main>
      </Container>
      <style jsx global>{`
        .video-swiper {
          padding-bottom: 12px;
        }
        .video-swiper .swiper-slide {
          height: auto;
        }
        .video-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 4px;
        }
        .video-swiper .swiper-pagination-bullet-active {
          width: 24px;
          background: var(--accent-primary);
        }
        .video-pagination {
          display: flex;
          align-items: center;
        }
        .video-nav-btn.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
