import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLessons } from "../hooks/useLessons";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../services/api";

const MyLessonsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLessons();
  }, []);

  const fetchMyLessons = async () => {
    setLoading(true);
    try {
      const response = await api.get("/lessons/user/my-lessons");
      setLessons(response.data);
    } catch (error) {
      toast.error("Failed to fetch your lessons");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await api.delete(`/lessons/${lessonId}`);
        setLessons(lessons.filter((l) => l._id !== lessonId));
        toast.success("Lesson deleted successfully");
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">My Lessons</h1>
          <Link to="/dashboard/add-lesson" className="btn-primary">
            + New Lesson
          </Link>
        </div>

        {lessons.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              You haven't created any lessons yet.
            </p>
            <Link to="/dashboard/add-lesson" className="btn-primary">
              Create Your First Lesson
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {lesson.imageURL && (
                  <img
                    src={lesson.imageURL}
                    alt={lesson.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {lesson.category}
                    </span>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                      {lesson.emotionalTone}
                    </span>
                    {lesson.accessLevel === "Premium" && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        ⭐ Premium
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>👁️ {lesson.views || 0}</span>
                    <span>👍 {lesson.likesCount || 0}</span>
                    <span>💾 {lesson.favoritesCount || 0}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/update-lesson/${lesson._id}`)
                      }
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLessonsPage;
