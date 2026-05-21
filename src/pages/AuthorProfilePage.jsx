import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { LessonCard } from "../components/LessonCard";

const AuthorProfilePage = () => {
  const { userId } = useParams();
  const [author, setAuthor] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthor();
  }, [userId, page, sort]);

  const fetchAuthor = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/auth/profile/${userId}`, {
        params: { page, limit: 9, sort },
      });
      setAuthor(response.data.user);
      setLessons(response.data.lessons || []);
      setStats(response.data.stats || null);
      setPagination(response.data.pagination || null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load author");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = async (lessonId) => {
    fetchAuthor();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-10 text-center">
          <h1 className="text-2xl font-bold text-primary mb-3">
            Author not found
          </h1>
          <Link to="/lessons" className="btn-primary">
            Browse Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img
              src={author.photoURL || "https://ui-avatars.com/api/?name=Author"}
              alt={author.name}
              className="w-28 h-28 rounded-full object-cover border"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-primary">
                  {author.name}
                </h1>
                {author.isPremium && (
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                    Premium Author
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                Member since {new Date(author.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Public Lessons</p>
              <p className="text-2xl font-bold">{stats?.publicLessons || 0}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Likes</p>
              <p className="text-2xl font-bold">{stats?.likes || 0}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Saves</p>
              <p className="text-2xl font-bold">{stats?.favorites || 0}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Views</p>
              <p className="text-2xl font-bold">{stats?.views || 0}</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Lessons by {author.name}</h2>
          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="newest">Newest first</option>
            <option value="popular">Most saved</option>
          </select>
        </div>

        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                onFavoriteClick={handleFavoriteClick}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-600">
            This author has not published any public lessons yet.
          </div>
        )}

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
      </div>
    </div>
  );
};

export default AuthorProfilePage;
