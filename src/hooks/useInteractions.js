import { useState, useCallback } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  const getUserFavorites = useCallback(async (page = 1, limit = 9, filters = {}) => {
    setLoading(true);
    try {
      const response = await api.get("/lessons/favorites/my-favorites", {
        params: { page, limit, ...filters },
      });
      setFavorites(response.data.favorites || []);
      setPagination(response.data.pagination || null);
    } catch (error) {
      toast.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (lessonId) => {
    try {
      await api.post("/lessons/favorites/add", { lessonId });
      toast.success("Added to favorites");
      return true;
    } catch (error) {
      if (![400, 409].includes(error.response?.status)) {
        toast.error(error.response?.data?.message || "Failed to add favorite");
      }
      return false;
    }
  }, []);

  const removeFavorite = useCallback(async (lessonId) => {
    try {
      await api.post("/lessons/favorites/remove", { lessonId });
      toast.success("Removed from favorites");
      setFavorites((prev) =>
        prev.filter((fav) => fav.lessonId?._id !== lessonId),
      );
      return true;
    } catch (error) {
      toast.error("Failed to remove favorite");
      return false;
    }
  }, []);

  return {
    favorites,
    loading,
    pagination,
    getUserFavorites,
    addFavorite,
    removeFavorite,
  };
};

export const useInteractions = () => {
  const [loading, setLoading] = useState(false);

  const toggleLike = useCallback(async (lessonId) => {
    setLoading(true);
    try {
      const response = await api.post(`/lessons/${lessonId}/like`);
      return response.data.lesson;
    } catch (error) {
      toast.error("Failed to like lesson");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addComment = useCallback(async (lessonId, comment) => {
    setLoading(true);
    try {
      const response = await api.post(`/lessons/${lessonId}/comment`, {
        comment,
      });
      toast.success("Comment added");
      return response.data.comment;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reportLesson = useCallback(
    async (lessonId, reason, description = "") => {
      setLoading(true);
      try {
        await api.post(`/lessons/${lessonId}/report`, { reason, description });
        toast.success("Lesson reported successfully");
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to report lesson");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { loading, toggleLike, addComment, reportLesson };
};
