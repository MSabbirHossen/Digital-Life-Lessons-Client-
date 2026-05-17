import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    premiumUsers: 0,
    totalReports: 0,
    publicLessons: 0,
    privateLessons: 0,
    activeContributors: 0,
    newLessons: 0,
    topCategories: [],
    userGrowth: [],
    lessonGrowth: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/auth/admin/analytics");
      setStats(response.data.analytics);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <div className="text-sm text-gray-600">
            👤 Logged in as: <span className="font-semibold">{user?.name}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-gray-600">Total Users</p>
            <p className="text-3xl font-bold text-primary">
              {stats.totalUsers}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-gray-600">Total Lessons</p>
            <p className="text-3xl font-bold text-primary">
              {stats.totalLessons}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-gray-600">Premium Users</p>
            <p className="text-3xl font-bold text-primary">
              {stats.premiumUsers}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="text-gray-600">Reports</p>
            <p className="text-3xl font-bold text-primary">
              {stats.totalReports}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Lesson Mix</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Public lessons</span>
                <span className="font-semibold">{stats.publicLessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Private lessons</span>
                <span className="font-semibold">{stats.privateLessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New in 30 days</span>
                <span className="font-semibold">{stats.newLessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active contributors</span>
                <span className="font-semibold">
                  {stats.activeContributors}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Top Categories</h2>
            <div className="space-y-3">
              {stats.topCategories?.length ? (
                stats.topCategories.map((category) => (
                  <div key={category._id} className="flex justify-between">
                    <span className="text-gray-600">{category._id}</span>
                    <span className="font-semibold">{category.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No category data yet.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">30-Day Growth</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Users</p>
                <div className="flex items-end gap-1 h-20">
                  {(stats.userGrowth || []).slice(-14).map((item) => (
                    <div
                      key={item._id}
                      title={`${item._id}: ${item.count}`}
                      className="bg-primary rounded-t flex-1 min-w-2"
                      style={{ height: `${Math.max(12, item.count * 12)}px` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Lessons</p>
                <div className="flex items-end gap-1 h-20">
                  {(stats.lessonGrowth || []).slice(-14).map((item) => (
                    <div
                      key={item._id}
                      title={`${item._id}: ${item.count}`}
                      className="bg-secondary rounded-t flex-1 min-w-2"
                      style={{ height: `${Math.max(12, item.count * 12)}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/dashboard/admin/manage-users"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">👥</div>
            <h3 className="font-bold text-lg mb-2">Manage Users</h3>
            <p className="text-gray-600 text-sm">
              View and manage user accounts
            </p>
          </Link>

          <Link
            to="/dashboard/admin/manage-lessons"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="font-bold text-lg mb-2">Manage Lessons</h3>
            <p className="text-gray-600 text-sm">Moderate all lessons</p>
          </Link>

          <Link
            to="/dashboard/admin/reported-lessons"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">🚩</div>
            <h3 className="font-bold text-lg mb-2">Reported Lessons</h3>
            <p className="text-gray-600 text-sm">Review reported content</p>
          </Link>

          <Link
            to="/dashboard/admin/profile"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="font-bold text-lg mb-2">Admin Profile</h3>
            <p className="text-gray-600 text-sm">Manage admin settings</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>API Server</span>
              <span className="text-green-600 font-semibold">✓ Running</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Database Connection</span>
              <span className="text-green-600 font-semibold">✓ Connected</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span>Payment Gateway</span>
              <span className="text-green-600 font-semibold">✓ Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
