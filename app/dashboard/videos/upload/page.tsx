'use client';

import VideoUploadForm, { VideoUploadFormData } from "@/src/components/dashboard/VideoUploadForm";
import { useCreateVideo } from "@/src/hooks/useVideos";
import { CreateVideoData } from "@/src/lib/api/video.api";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import Cookies from "js-cookie";
import AdminHeader from "@/src/components/dashboard/AdminHeader";
import { useAuth } from "@/src/contexts/AuthContext";
import { useState, useEffect } from "react";
import VideoPreview from "@/src/components/dashboard/VideoPreview";

export default function VideoUploadPage() {
  const router = useRouter();
  const createMutation = useCreateVideo();
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

  const handleSubmit = async (data: VideoUploadFormData) => {
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
        // Slug is auto-generated on the backend, no need to send it
      };
      
      await createMutation.mutateAsync(submitData);
      router.push('/dashboard/videos');
    } catch (error) {
      console.error('Error uploading video:', error);
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
      publishedAt: new Date().toISOString(),
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

  return (
    <div>
      <div className="">
        <AdminHeader
          title="Upload Video"
          description="Add a new video to your content library"
        />

        <div className="mt-8">
          <VideoUploadForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onPreview={handlePreview}
            isLoading={createMutation.isPending}
            showPreviewButton={!previewData}
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

