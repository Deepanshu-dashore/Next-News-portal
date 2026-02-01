"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { usePublishedVideos } from '@/src/hooks/useVideos';
import { Video } from '@/lib/api/video.api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Helper function to format duration
const formatDuration = (seconds?: number): string => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to format relative time
const formatRelativeTime = (date?: string): string => {
  if (!date) return 'Recently';
  const now = new Date();
  const published = new Date(date);
  const diffMs = now.getTime() - published.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return published.toLocaleDateString();
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (videoUrl: string): string => {
  // Extract video ID from embed URL
  const match = videoUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80&auto=format&fit=crop';
};

// Group videos by category
const groupVideosByCategory = (videos: Video[]) => {
  const grouped: { [key: string]: Video[] } = {};
  videos.forEach((video) => {
    const categoryName = video.CategoryId?.name || 'Uncategorized';
    if (!grouped[categoryName]) {
      grouped[categoryName] = [];
    }
    grouped[categoryName].push(video);
  });
  return grouped;
};

// Video Card Component
const VideoCard = ({ video }: { video: Video }) => {
  return (
    <article className="group flex h-full flex-col gap-4">
      <Link href={`/videos/${video.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={getYouTubeThumbnail(video.videoUrl)}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-900 shadow-lg group-hover:bg-(--accent-primary) group-hover:text-white transition-colors">
              <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded">
            {formatDuration(video.durationSeconds)}
          </span>
        </div>
      </Link>
      <div>
        <h3 className="text-base font-semibold leading-tight text-gray-900 group-hover:text-(--accent-primary) line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-gray-500 mt-2 font-medium">
          {formatRelativeTime(video.publishedAt)}
        </p>
        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {video.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

// Loading Skeleton
const VideoSkeleton = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-200" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);


export default function VideosPage() {
  const { data: videoData, isLoading, error } = usePublishedVideos();

  const groupedVideos = videoData?.data ? groupVideosByCategory(videoData.data) : {};

  return (
    <div className="pb-24">
      <header className="py-16 border-b border-gray-200 bg-linear-to-b from-black via-black to-red-900 relative">
        <div style={{ backgroundImage: `url('/design.svg')` }} className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.07]" aria-hidden />
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
          {/* Loading State */}
          {isLoading && (
            <section className="py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <VideoSkeleton key={i} />
                ))}
              </div>
            </section>
          )}

          {/* Error State */}
          {error && (
            <section className="py-12">
              <div className="text-center py-12">
                <p className="text-red-600 font-semibold">Failed to load videos</p>
                <p className="text-gray-500 text-sm mt-2">Please try again later</p>
              </div>
            </section>
          )}

          {/* Empty State */}
          {!isLoading && !error && videoData?.data?.length === 0 && (
            <section className="py-12">
              <div className="text-center py-12">
                <p className="text-gray-600 font-semibold">No videos available</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon for new content</p>
              </div>
            </section>
          )}

          {/* Videos by Category */}
          {!isLoading && !error && Object.entries(groupedVideos).map(([category, videos]) => {
            const sliderId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <section key={category} className="py-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">{category}</h2>
                    <p className="text-sm text-gray-500 mt-1">{videos.length} video{videos.length > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="mt-8">
                  {videos.length <= 3 ? (
                    // Grid layout for 3 or fewer videos
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                      ))}
                    </div>
                  ) : (
                    // Swiper for more than 3 videos
                    <>
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
                        {videos.map((video) => (
                          <SwiperSlide key={video._id}>
                            <VideoCard video={video} />
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
                    </>
                  )}
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
