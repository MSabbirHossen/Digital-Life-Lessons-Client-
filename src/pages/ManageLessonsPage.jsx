import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const ManageLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, [page]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/lessons/public?page=${page}&limit=10`);
      setLessons(response.data.lessons);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (window.confirm("Delete this lesson? This action cannot be undone.")) {
      try {
        await api.delete(`/lessons/${lessonId}`);
        toast.success("Lesson deleted successfully");
        fetchLessons();
      } catch (error) {
        toast.error("Failed to delete lesson");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">Manage Lessons</h1>

        {/* Lessons Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Author</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Access Level</th>
                  <th className="text-left p-4">Views</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="max-w-xs">
                        <p className="font-semibold truncate">{lesson.title}</p>
                      </div>
                    </td>
                    <td className="p-4">{lesson.userId?.name}</td>
                    <td className="p-4">{lesson.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          lesson.accessLevel === "Premium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {lesson.accessLevel}
                      </span>
                    </td>
                    <td className="p-4">{lesson.views || 0}</td>
                    <td className="p-4 text-sm">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteLesson(lesson._id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-between items-center p-4 border-t">
              <p className="text-gray-600">
                Showing {lessons.length} of {pagination.total} lessons
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLessonsPage;
