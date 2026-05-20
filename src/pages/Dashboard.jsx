import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [recentLessons, setRecentLessons] = useState([]);
  const [weeklyCounts, setWeeklyCounts] = useState([]);

  useEffect(() => {
    fetchRecentLessons();
  }, []);

  const fetchRecentLessons = async () => {
    try {
      const res = await api.get("/lessons/user/my-lessons", {
        params: { limit: 10 },
      });
      setRecentLessons(res.data.lessons || []);
      computeWeeklyCounts(res.data.lessons || []);
    } catch (err) {
      console.error("Error fetching recent lessons:", err);
    }
  };

  const computeWeeklyCounts = (lessons) => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });
    const counts = days.map(
      (day) => lessons.filter((l) => l.createdAt?.slice(0, 10) === day).length,
    );
    setWeeklyCounts(counts);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-6">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-gray-600">Lessons Created</p>
            <p className="text-2xl font-bold">{user?.lessonsCreated || 0}</p>
          </div>
          <div className="card p-6">
            <div className="text-3xl mb-2">💾</div>
            <p className="text-gray-600">Lessons Saved</p>
            <p className="text-2xl font-bold">{user?.lessonsSaved || 0}</p>
          </div>
          <div className="card p-6">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-gray-600">Premium Status</p>
            <p className="text-2xl font-bold">
              {user?.isPremium ? "✓ Premium" : "Free"}
            </p>
          </div>
          <div className="card p-6">
            <div className="text-3xl mb-2">👤</div>
            <p className="text-gray-600">Member Since</p>
            <p className="text-lg font-bold">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/dashboard/my-lessons" className="card p-6 hover:shadow-lg">
            <h3 className="font-bold text-lg mb-2">📚 My Lessons</h3>
            <p className="text-gray-600">View and manage your lessons</p>
          </Link>
          <Link
            to="/dashboard/my-favorites"
            className="card p-6 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg mb-2">💾 My Favorites</h3>
            <p className="text-gray-600">View your saved lessons</p>
          </Link>
          <Link to="/dashboard/profile" className="card p-6 hover:shadow-lg">
            <h3 className="font-bold text-lg mb-2">👤 Profile</h3>
            <p className="text-gray-600">Update your profile</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card p-6 col-span-2">
            <h3 className="font-bold text-lg mb-4">Recently Added Lessons</h3>
            {recentLessons.length ? (
              <ul className="space-y-2">
                {recentLessons.slice(0, 5).map((l) => (
                  <li key={l._id} className="flex justify-between">
                    <span className="truncate">{l.title}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No recent lessons.</p>
            )}
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Weekly Lessons</h3>
            {weeklyCounts.length ? (
              <svg
                width="100%"
                height="50"
                viewBox="0 0 140 50"
                preserveAspectRatio="none"
              >
                {weeklyCounts.map((count, i) => {
                  const x = i * 20 + 5;
                  const h = Math.max(1, count * 10);
                  return (
                    <rect
                      key={i}
                      x={x}
                      y={50 - h}
                      width={14}
                      height={h}
                      fill="#6366f1"
                    />
                  );
                })}
              </svg>
            ) : (
              <p className="text-gray-600">No data yet.</p>
            )}
          </div>
        </div>

        {!user?.isPremium && (
          <div className="mt-8 bg-gradient-to-r from-secondary/20 to-primary/20 border border-primary rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Unlock Premium Features</h2>
            <p className="mb-4">
              Get access to premium lessons and create unlimited premium
              content.
            </p>
            <Link to="/pricing" className="btn-secondary">
              Upgrade to Premium
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
