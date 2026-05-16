import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-primary">
            📚 Digital Life Lessons
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary">
                  Home
                </Link>
                <Link
                  to="/lessons"
                  className="text-gray-700 hover:text-primary"
                >
                  Lessons
                </Link>
                <Link
                  to="/dashboard/add-lesson"
                  className="text-gray-700 hover:text-primary"
                >
                  Create
                </Link>
                <Link
                  to="/dashboard/my-lessons"
                  className="text-gray-700 hover:text-primary"
                >
                  My Lessons
                </Link>
                <Link
                  to="/dashboard/my-favorites"
                  className="text-gray-700 hover:text-primary"
                >
                  Favorites
                </Link>
                {!user.isPremium && (
                  <Link to="/pricing" className="btn-secondary text-sm">
                    Upgrade
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link to="/dashboard/admin" className="btn-primary text-sm">
                    Admin
                  </Link>
                )}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2"
                  >
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <span className="hidden sm:block">{user.name}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary">
                  Home
                </Link>
                <Link
                  to="/lessons"
                  className="text-gray-700 hover:text-primary"
                >
                  Lessons
                </Link>
                <Link to="/login" className="btn-primary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-secondary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
