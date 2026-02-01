'use client';

import VideoUploadForm, { VideoUploadFormData } from "@/src/components/dashboard/VideoUploadForm";
import { useVideoBySlug, useUpdateVideo } from "@/src/hooks/useVideos";
import { CreateVideoData } from "@/src/lib/api/video.api";
import { useRouter, useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AdminHeader from "@/src/components/dashboard/AdminHeader";
import { useAuth } from "@/src/contexts/AuthContext";
import VideoPreview from "@/src/components/dashboard/VideoPreview";

export default function VideoEditPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  
  const { data: videoData, isLoading: isVideoLoading } = useVideoBySlug(slug);
  const video = videoData?.data;
  const updateMutation = useUpdateVideo();
  const [isReady, setIsReady] = useState(false);
  const { user: currentUser } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);

  // Fetch categories for preview
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const result = await response.json();
        if (result.data) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isVideoLoading && !video) {
      // Video not found after loading
      router.push('/dashboard/videos');
    } else if (!isVideoLoading && video) {
      setIsReady(true);
    }
  }, [isVideoLoading, video, router]);
    
  const handleSubmit = async (data: VideoUploadFormData) => {
    if (!video?._id) return;

    const userId = currentUser?.id;
    
    try {
      const submitData: CreateVideoData = {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        CategoryId: data.CategoryId,
        tags: data.tags,
        durationSeconds: data.durationSeconds,
        status: data.status,
        uploadedBy: userId || '',
        // Slug is auto-generated on backend, no need to send it for updates
      };
      
      await updateMutation.mutateAsync({
        id: video._id,
        data: submitData
      });
      router.push('/dashboard/videos');
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const handlePreview = (data: VideoUploadFormData) => {
    // Find category details
    const category = categories.find(cat => cat._id === data.CategoryId);
    
    // Prepare preview data
    const preview = {
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      category: category ? { name: category.name, slug: category.slug } : null,
      tags: data.tags,
      durationSeconds: data.durationSeconds,
      status: data.status,
      publishedAt: video?.publishedAt || new Date().toISOString(),
      uploadedBy: { name: currentUser?.name || 'Author' },
    };
    
    setPreviewData(preview);
    
    // Scroll to preview
    setTimeout(() => {
      document.getElementById('video-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  const handleCancel = () => {
    router.push('/dashboard/videos');
  };

  if (isVideoLoading) {
    return (
      <Container>
        <div className="py-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading video...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!isReady || !video) {
    return null;
  }

  return (
    <div>
      <div className="">
        <AdminHeader
          title="Edit Video"
          description={`Edit: ${video.title}`}
          goBackTo="/dashboard/videos"
          back="Back"
        />

        <div className="mt-8">
          <VideoUploadForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onPreview={handlePreview}
            isLoading={updateMutation.isPending}
            showPreviewButton={!previewData}
            initialData={{
              title: video.title,
              description: video.description,
              videoUrl: video.videoUrl,
              CategoryId: typeof video.CategoryId === 'string' ? video.CategoryId : video.CategoryId?._id || '',
              tags: video.tags || [],
              durationSeconds: video.durationSeconds,
              status: video.status,
            }}
          />
        </div>

        {previewData && (
          <div id="video-preview">
            <VideoPreview previewData={previewData} onClose={handleClosePreview} />
          </div>
        )}
      </div>
    </div>
  );
}
