import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const AdminProfilePage = () => {
  const { user } = useAuth();
  const [adminStats, setAdminStats] = useState({
    lastLogin: new Date(),
    actions: 0,
    reportsHandled: 0,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">Admin Profile</h1>

        {/* Admin Overview */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                👤
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold">{user?.name}</h2>
              <p className="text-gray-600 text-lg">{user?.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span className="text-lg font-semibold text-purple-600">
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Member Since</p>
            <p className="text-2xl font-bold text-primary mt-2">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Account Status</p>
            <p className="text-2xl font-bold text-green-600 mt-2">✓ Active</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">User ID</p>
            <p className="text-xs font-mono text-primary mt-2 truncate">
              {user?._id}
            </p>
          </div>
        </div>

        {/* Admin Permissions */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Admin Permissions</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold">User Management</p>
                <p className="text-sm text-gray-600">
                  View, edit, and delete user accounts
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold">Lesson Moderation</p>
                <p className="text-sm text-gray-600">
                  Review and remove inappropriate lessons
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold">Report Management</p>
                <p className="text-sm text-gray-600">
                  Handle and resolve reported content
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold">System Monitoring</p>
                <p className="text-sm text-gray-600">
                  Access to analytics and system health
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Account Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b">
              <span className="text-gray-600">Email Address</span>
              <span className="font-semibold">{user?.email}</span>
            </div>
            <div className="flex justify-between pb-4 border-b">
              <span className="text-gray-600">Account Role</span>
              <span className="font-semibold text-purple-600">
                Administrator
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b">
              <span className="text-gray-600">Account Created</span>
              <span className="font-semibold">
                {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b">
              <span className="text-gray-600">User ID</span>
              <span className="font-mono text-sm">{user?._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Status</span>
              <span className="font-semibold text-green-600">Active</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">🔒 Security Notice</h3>
          <p className="text-blue-800 text-sm">
            As an administrator, you have elevated privileges. Please keep your
            account credentials secure and log out when finished. All admin
            actions are logged for audit purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
