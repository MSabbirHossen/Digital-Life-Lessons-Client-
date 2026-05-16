import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

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
