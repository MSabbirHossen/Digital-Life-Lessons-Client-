import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    visibility: "",
    accessLevel: "",
    featured: "",
  });

  useEffect(() => {
    fetchLessons();
  }, [page, filters]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const response = await api.get("/lessons/admin/all", {
        params: { page, limit: 10, ...filters },
      });
      setLessons(response.data.lessons);
      setPagination(response.data.pagination);
      setStats(response.data.stats);
    } catch (error) {
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((previous) => ({ ...previous, [name]: value }));
    setPage(1);
  };

  const handleToggleFeatured = async (lesson) => {
    try {
      await api.patch(`/lessons/admin/${lesson._id}/featured`, {
        isFeatured: !lesson.isFeatured,
      });
      toast.success(
        lesson.isFeatured
          ? "Lesson removed from featured"
          : "Lesson marked as featured",
      );
      fetchLessons();
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    const result = await Swal.fire({
      title: "Delete this lesson?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
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

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Public</p>
              <p className="text-2xl font-bold">{stats.publicLessons}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Private</p>
              <p className="text-2xl font-bold">{stats.privateLessons}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Premium</p>
              <p className="text-2xl font-bold">{stats.premiumLessons}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600 text-sm">Featured</p>
              <p className="text-2xl font-bold">{stats.featuredLessons}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search lessons"
              className="px-4 py-2 border rounded-lg"
            />
            <select
              name="visibility"
              value={filters.visibility}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All visibility</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            <select
              name="accessLevel"
              value={filters.accessLevel}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All access levels</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
            <select
              name="featured"
              value={filters.featured}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Featured and regular</option>
              <option value="true">Featured only</option>
              <option value="false">Not featured</option>
            </select>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Author</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Visibility</th>
                  <th className="text-left p-4">Access Level</th>
                  <th className="text-left p-4">Featured</th>
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
                    <td className="p-4">{lesson.visibility}</td>
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
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleFeatured(lesson)}
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          lesson.isFeatured
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {lesson.isFeatured ? "Featured" : "Feature"}
                      </button>
                    </td>
                    <td className="p-4">{lesson.views || 0}</td>
                    <td className="p-4 text-sm">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <a
                          href={`/lessons/${lesson._id}`}
                          className="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 text-sm"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDeleteLesson(lesson._id)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                        >
                          Delete
                        </button>
                      </div>
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
