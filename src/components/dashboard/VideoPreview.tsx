'use client';

import Image from 'next/image';

// Helper function to format duration
const formatDuration = (seconds?: number): string => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to format date
const formatDate = (date?: string): string => {
  if (!date) return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return new Date(date).toDateString();
};

// Normalize videoUrl to embed format
const normalizeYouTubeUrl = (url: string): string => {
  if (url.includes('youtube.com/embed/')) return url;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return url;
};

interface VideoPreviewProps {
  previewData: {
    title: string;
    description: string;
    videoUrl: string;
    category: { name: string; slug: string } | null;
    tags: string[];
    durationSeconds?: number;
    status: string;
    publishedAt: string;
    uploadedBy: { name: string };
  };
  onClose: () => void;
}

export default function VideoPreview({ previewData, onClose }: VideoPreviewProps) {
  return (
    <div className="mt-8 border-t border-yellow-400 pt-8">
      {/* Preview Banner */}
      <div className="bg-yellow-50 border border-yellow-400 rounded-lg mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 flex gap-1 bg-yellow-400 text-gray-700 text-xs font-bold uppercase rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16">
                    <path fill="currentColor" d="M3 4.5a.5.5 0 0 1 .5-.5h9.001a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5zM4 5v1h8.001V5zm5.5 3a.5.5 0 0 0-.5.5v3.005a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V8.5a.5.5 0 0 0-.5-.5zm.5 3.005V9h2v2.005zM3 9a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 3 9m.5 1.5a.5.5 0 0 0 0 1h4a.5.5 0 1 0 0-1zm-2.502-6a2.5 2.5 0 0 1 2.5-2.5h9.005a2.5 2.5 0 0 1 2.5 2.5v7.002a2.5 2.5 0 0 1-2.5 2.5H3.498a2.5 2.5 0 0 1-2.5-2.5zm2.5-1.5a1.5 1.5 0 0 0-1.5 1.5v7.002a1.5 1.5 0 0 0 1.5 1.5h9.005a1.5 1.5 0 0 0 1.5-1.5V4.5a1.5 1.5 0 0 0-1.5-1.5z" stroke='currentColor' strokeWidth={0.3}></path>
                </svg>
              Preview Mode
            </span>
            <span className="text-sm text-yellow-800 font-medium">
              This is how your video will appear on the site
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 cursor-pointer py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close Preview
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span>Home</span>
            <span>/</span>
            <span>Videos</span>
            <span>/</span>
            <span>{previewData.category?.name || 'Category'}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{previewData.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6">
                <iframe
                  src={normalizeYouTubeUrl(previewData.videoUrl)}
                  title={previewData.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    {previewData.category?.name || 'Category'}
                  </span>
                  {previewData.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {previewData.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDuration(previewData.durationSeconds)}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(previewData.publishedAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {previewData.uploadedBy?.name || 'Author'}
                  </div>
                </div>

                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{previewData.description}</p>
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

            {/* Sidebar - Related Videos Preview */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">Related Videos</h2>
              <div className="space-y-6">
                <div className="text-sm text-gray-500 italic">
                  Related videos will appear here when published
                </div>
              </div>

              <div className="block mt-6 text-center py-3 px-4 border-2 border-gray-200 rounded-lg text-sm font-bold uppercase tracking-wider text-gray-900">
                View All in {previewData.category?.name || 'Category'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
