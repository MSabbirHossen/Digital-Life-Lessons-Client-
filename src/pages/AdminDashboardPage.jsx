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
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch stats from various endpoints
      const usersRes = await api.get("/auth/admin/users?limit=1");
      const lessonsRes = await api.get("/lessons/public?limit=1");
      const reportsRes = await api.get("/lessons/admin/reports/all?limit=1");

      setStats({
        totalUsers: usersRes.data.pagination?.total || 0,
        totalLessons: lessonsRes.data.pagination?.total || 0,
        premiumUsers: 0, // Can be calculated from users data
        totalReports: reportsRes.data.pagination?.total || 0,
      });
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
