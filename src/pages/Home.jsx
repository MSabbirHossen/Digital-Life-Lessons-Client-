import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { LessonCard } from "../components/LessonCard";
import { useFavorites } from "../hooks/useInteractions";

const Home = () => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite } = useFavorites();
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedLessons();
  }, []);

  const fetchFeaturedLessons = async () => {
    try {
      const response = await api.get("/lessons/public", {
        params: { limit: 6, sort: "newest" },
      });
      setFeaturedLessons(response.data.lessons);
    } catch (error) {
      console.error("Error fetching featured lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = async (lessonId) => {
    await addFavorite(lessonId);
    // Refresh lessons
    fetchFeaturedLessons();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
            Digital Life Lessons
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Preserve your wisdom, share your experiences, and grow from the
            lessons of others.
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <>
                <Link to="/lessons" className="btn-primary">
                  Browse Lessons
                </Link>
                <Link to="/dashboard/add-lesson" className="btn-secondary">
                  Share Your Story
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn-secondary">
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Learning Matters Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Learning From Life Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-bold text-lg mb-2">Preserve Wisdom</h3>
              <p className="text-gray-600">
                Document your life lessons before they fade away. Create a
                legacy of wisdom.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-lg mb-2">Share & Connect</h3>
              <p className="text-gray-600">
                Connect with others who've faced similar challenges and learned
                valuable lessons.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-bold text-lg mb-2">Personal Growth</h3>
              <p className="text-gray-600">
                Accelerate your growth by learning from the experiences of
                others in the community.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-2">Mindful Reflection</h3>
              <p className="text-gray-600">
                Take time to reflect on what matters most and share your unique
                perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lessons Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Latest Life Lessons
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="loader"></div>
            </div>
          ) : featuredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No lessons yet. Be the first to share!</p>
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Link to="/lessons" className="btn-primary">
              View All Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!user && (
        <section className="py-20 px-4 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of people preserving and sharing meaningful life
              lessons.
            </p>
            <Link
              to="/register"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
