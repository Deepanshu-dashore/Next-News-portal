'use client';

import { useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * Hook to track article views automatically when component mounts
 * @param articleId - The ID of the article to track
 * @param enabled - Whether tracking is enabled (default: true)
 */
export function useArticleViewTracker(articleId: string | undefined, enabled = true) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!articleId || !enabled || hasTracked.current) {
      return;
    }

    const trackView = async () => {
      try {
        await axios.post(`/api/article/${articleId}/stats`, {
          action: 'view',
        });
        hasTracked.current = true;
      } catch (error) {
        console.error('Failed to track article view:', error);
      }
    };

    // Track after a short delay to ensure user is actually reading
    const timer = setTimeout(trackView, 3000);

    return () => clearTimeout(timer);
  }, [articleId, enabled]);
}

/**
 * Hook to manually track article interactions
 * @param articleId - The ID of the article
 */
export function useArticleStats(articleId: string | undefined) {
  const trackView = async () => {
    if (!articleId) return;

    try {
      const response = await axios.post(`/api/article/${articleId}/stats`, {
        action: 'view',
      });
      return response.data;
    } catch (error) {
      console.error('Failed to track article view:', error);
      throw error;
    }
  };

  const trackLike = async () => {
    if (!articleId) return;

    try {
      const response = await axios.post(`/api/article/${articleId}/stats`, {
        action: 'like',
      });
      return response.data;
    } catch (error) {
      console.error('Failed to track article like:', error);
      throw error;
    }
  };

  const getStats = async () => {
    if (!articleId) return null;

    try {
      const response = await axios.get(`/api/article/${articleId}/stats`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch article stats:', error);
      throw error;
    }
  };

  return {
    trackView,
    trackLike,
    getStats,
  };
}
