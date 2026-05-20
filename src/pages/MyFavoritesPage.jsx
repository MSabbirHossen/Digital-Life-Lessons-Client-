import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useInteractions";
import { EMOTIONAL_TONES, LESSON_CATEGORIES } from "../constants/lessons";

const MyFavoritesPage = () => {
  const { favorites, loading, pagination, getUserFavorites, removeFavorite } =
    useFavorites();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    tone: "",
    accessLevel: "",
  });

  useEffect(() => {
    getUserFavorites(page, 9, filters);
  }, [page, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  const handleRemove = async (lessonId) => {
    const success = await removeFavorite(lessonId);
    if (success) {
      await getUserFavorites(page, 9, filters);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-primary">My Favorites</h1>
          {pagination && (
            <p className="text-gray-600">
              {pagination.total} saved lesson{pagination.total === 1 ? "" : "s"}
            </p>
          )}
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="rounded-lg border px-4 py-2"
            >
              <option value="">All Categories</option>
              {LESSON_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              name="tone"
              value={filters.tone}
              onChange={handleFilterChange}
              className="rounded-lg border px-4 py-2"
            >
              <option value="">All Tones</option>
              {EMOTIONAL_TONES.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
            <select
              name="accessLevel"
              value={filters.accessLevel}
              onChange={handleFilterChange}
              className="rounded-lg border px-4 py-2"
            >
              <option value="">All Access Levels</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loader"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              You haven't saved any lessons yet.
            </p>
            <Link to="/lessons" className="btn-primary">
              Browse Lessons
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites
                .filter((fav) => fav.lessonId)
                .map((fav) => (
                  <div
                    key={fav._id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    {fav.lessonId?.imageURL && (
                      <img
                        src={fav.lessonId.imageURL}
                        alt={fav.lessonId.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {fav.lessonId?.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {fav.lessonId?.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {fav.lessonId?.category}
                        </span>
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                          {fav.lessonId?.emotionalTone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <span>By: {fav.lessonId?.userId?.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/lessons/${fav.lessonId?._id}`}
                          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-center"
                        >
                          Read
                        </Link>
                        <button
                          onClick={() => handleRemove(fav.lessonId?._id)}
                          className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {pagination?.pages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10">
                <button
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {page} of {pagination.pages}
                </span>
                <button
                  onClick={() =>
                    setPage((value) => Math.min(pagination.pages, value + 1))
                  }
                  disabled={page === pagination.pages}
                  className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyFavoritesPage;
