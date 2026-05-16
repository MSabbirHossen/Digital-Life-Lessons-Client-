import { useState, useCallback } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const useLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  const getPublicLessons = useCallback(
    async (
      page = 1,
      search = "",
      category = "",
      tone = "",
      sort = "newest",
    ) => {
      setLoading(true);
      try {
        const response = await api.get("/lessons/public", {
          params: { page, limit: 10, search, category, tone, sort },
        });
        setLessons(response.data.lessons);
        setPagination(response.data.pagination);
      } catch (error) {
        toast.error("Failed to fetch lessons");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getLessonById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/lessons/${id}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch lesson");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createLesson = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/lessons", data);
      toast.success("Lesson created successfully");
      return response.data.lesson;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create lesson");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLesson = useCallback(async (id, data) => {
    setLoading(true);
    try {
      const response = await api.put(`/lessons/${id}`, data);
      toast.success("Lesson updated successfully");
      return response.data.lesson;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update lesson");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLesson = useCallback(async (id) => {
    try {
      await api.delete(`/lessons/${id}`);
      toast.success("Lesson deleted successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete lesson");
      return false;
    }
  }, []);

  return {
    lessons,
    loading,
    pagination,
    getPublicLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
  };
};
