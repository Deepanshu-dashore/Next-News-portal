"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useVideoBySlug, useVideosByCategory } from '@/src/hooks/useVideos';
import { Video } from '@/src/lib/api/video.api';

// Helper function to format duration
const formatDuration = (seconds?: number): string => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to format date
const formatDate = (date?: string): string => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (videoUrl: string): string => {
  const match = videoUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80&auto=format&fit=crop';
};

export default function VideoDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: videoData, isLoading, error } = useVideoBySlug(slug);
  const video = videoData?.data;
//   console.log('Video Data:', video,slug);

  // Fetch related videos from the same category
  const { data: relatedVideosData } = useVideosByCategory(
    video?.CategoryId?._id || '',
    { enabled: !!video?.CategoryId?._id }
  );

  const relatedVideos = relatedVideosData?.data?.filter((v: Video) => v._id !== video?._id).slice(0, 3) || [];

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-2xl mb-6" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </Container>
    );
  }

  if (error || !video) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Video Not Found</h1>
          <p className="text-gray-600 mb-6">The video you're looking for doesn't exist.</p>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-(--accent-primary) hover:text-gray-900"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Videos
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="pb-24">
      <Container>
        <div className="py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-(--accent-primary)">Home</Link>
            <span>/</span>
            <Link href="/videos" className="hover:text-(--accent-primary)">Videos</Link>
            <span>/</span>
            <Link href={`/category/${video.CategoryId?.slug}`} className="hover:text-(--accent-primary)">
              {video.CategoryId?.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{video.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Link
                    href={`/category/${video.CategoryId?.slug}`}
                    className="inline-block px-3 py-1 bg-(--accent-primary) text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-900 transition-colors"
                  >
                    {video.CategoryId?.name}
                  </Link>
                  {video.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {video.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDuration(video.durationSeconds)}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(video.publishedAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {video.uploadedBy?.name}
                  </div>
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{video.description}</p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">Share this video</h3>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Videos */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">Related Videos</h2>
              <div className="space-y-6">
                {relatedVideos.map((relatedVideo: Video) => (
                  <Link
                    key={relatedVideo._id}
                    href={`/videos/${relatedVideo.slug}`}
                    className="group block"
                  >
                    <article className="flex gap-4">
                      <div className="relative w-40 aspect-video shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={getYouTubeThumbnail(relatedVideo.videoUrl)}
                          alt={relatedVideo.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="160px"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-900 shadow-md group-hover:bg-(--accent-primary) group-hover:text-white transition-colors">
                            <svg className="w-3 h-3 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {formatDuration(relatedVideo.durationSeconds)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-(--accent-primary) line-clamp-2 mb-1">
                          {relatedVideo.title}
                        </h3>
                        <p className="text-xs text-gray-500">{formatDate(relatedVideo.publishedAt)}</p>
                      </div>
                    </article>
                  </Link>
                ))}

                {relatedVideos.length === 0 && (
                  <p className="text-sm text-gray-500">No related videos found</p>
                )}
              </div>

              <Link
                href={`/category/${video.CategoryId?.slug}`}
                className="block mt-6 text-center py-3 px-4 border-2 border-gray-200 rounded-lg text-sm font-bold uppercase tracking-wider text-gray-900 hover:border-(--accent-primary) hover:text-(--accent-primary) transition-colors"
              >
                View All in {video.CategoryId?.name}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
