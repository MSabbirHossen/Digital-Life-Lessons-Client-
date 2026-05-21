import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive
      ? "text-primary"
      : "text-gray-700 hover:text-primary dark:text-gray-200"
  }`;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  // Apply theme class on mount
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", next);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/lessons", label: "Public Lessons" },
  ];

  const privateLinks = [
    { to: "/dashboard/add-lesson", label: "Add Lesson" },
    { to: "/dashboard/my-lessons", label: "My Lessons" },
    { to: "/dashboard/my-favorites", label: "Favorites" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-bold text-primary sm:text-2xl"
          >
            Digital Life Lessons
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {publicLinks.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
            {privateLinks.map((item) => (
              <NavLink
                key={item.to}
                to={
                  user
                    ? item.to
                    : `/login?redirect=${encodeURIComponent(item.to)}`
                }
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === "admin" && (
              <NavLink to="/dashboard/admin" className={linkClass}>
                Admin
              </NavLink>
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleTheme}
              className="mr-2 text-gray-600 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            {!user ? (
              <>
                <Link to="/login" className="btn-ghost text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Signup
                </Link>
              </>
            ) : (
              <>
                {!user.isPremium && (
                  <Link to="/pricing" className="btn-secondary text-sm">
                    Upgrade
                  </Link>
                )}
                {user.isPremium && (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
                    Premium
                  </span>
                )}
                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                  <span className="max-w-[120px] truncate">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-sm text-red-600">
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 md:hidden dark:border-gray-700"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="text-xl">{isMenuOpen ? "x" : "="}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-3">
            {publicLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
            {privateLinks.map((item) => (
              <NavLink
                key={item.to}
                to={
                  user
                    ? item.to
                    : `/login?redirect=${encodeURIComponent(item.to)}`
                }
                onClick={closeMenu}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === "admin" && (
              <NavLink
                to="/dashboard/admin"
                onClick={closeMenu}
                className={linkClass}
              >
                Admin
              </NavLink>
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="btn-ghost text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="btn-primary text-center"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard/profile"
                    onClick={closeMenu}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium"
                  >
                    {user.name} {user.isPremium ? "(Premium)" : "(Free)"}
                  </Link>
                  {!user.isPremium && (
                    <Link
                      to="/pricing"
                      onClick={closeMenu}
                      className="btn-secondary text-center"
                    >
                      Upgrade
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-50 px-4 py-2 text-left text-sm font-semibold text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
