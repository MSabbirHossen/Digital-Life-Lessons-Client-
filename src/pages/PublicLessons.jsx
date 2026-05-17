import { useState, useEffect } from "react";
import { useLessons } from "../hooks/useLessons";
import { useFavorites } from "../hooks/useInteractions";
import { LessonCard } from "../components/LessonCard";
import { EMOTIONAL_TONES, LESSON_CATEGORIES } from "../constants/lessons";

const PublicLessons = () => {
  const { lessons, loading, pagination, getPublicLessons } = useLessons();
  const { addFavorite } = useFavorites();

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    tone: "",
    sort: "newest",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPublicLessons(
      currentPage,
      filters.search,
      filters.category,
      filters.tone,
      filters.sort,
    );
  }, [currentPage, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleFavoriteClick = async (lessonId) => {
    await addFavorite(lessonId);
    getPublicLessons(
      currentPage,
      filters.search,
      filters.category,
      filters.tone,
      filters.sort,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Explore Life Lessons
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                name="search"
                placeholder="Search lessons..."
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {LESSON_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tone</label>
              <select
                name="tone"
                value={filters.tone}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">All Tones</option>
                {EMOTIONAL_TONES.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest</option>
                <option value="mostSaved">Most Saved</option>
                <option value="mostLiked">Most Liked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="loader"></div>
          </div>
        ) : lessons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from(
                    { length: pagination.pages },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "border hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(pagination.pages, currentPage + 1))
                  }
                  disabled={currentPage === pagination.pages}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p className="text-lg">No lessons found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
