import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { LessonCard } from "../components/LessonCard";

const slides = [
  {
    title: "Digital Life Lessons",
    copy: "Preserve the moments that taught you something worth keeping.",
    action: "Explore Lessons",
    to: "/lessons",
  },
  {
    title: "Share hard-won wisdom",
    copy: "Turn experiences into useful reflections for your future self and the community.",
    action: "Add a Lesson",
    to: "/dashboard/add-lesson",
  },
  {
    title: "Go deeper with Premium",
    copy: "Unlock premium reflections and publish advanced lessons with lifetime access.",
    action: "View Pricing",
    to: "/pricing",
  },
];

const Home = () => {
  const { user } = useAuth();
  const [featuredLessons, setFeaturedLessons] = useState([]);
  const [mostSavedLessons, setMostSavedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetchFeaturedLessons();
    fetchMostSaved();
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveSlide((index) => (index + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  const fetchFeaturedLessons = async () => {
    try {
      const response = await api.get("/lessons/featured", {
        params: { limit: 6 },
      });
      if (response.data.lessons?.length) {
        setFeaturedLessons(response.data.lessons);
        return;
      }

      const fallback = await api.get("/lessons/public", {
        params: { limit: 6, sort: "mostSaved" },
      });
      setFeaturedLessons(fallback.data.lessons || []);
    } catch (error) {
      console.error("Error fetching featured lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMostSaved = async () => {
    try {
      const res = await api.get("/lessons/public", {
        params: { sort: "mostSaved", limit: 6 },
      });
      setMostSavedLessons(res.data.lessons || []);
    } catch (err) {
      console.error("Error fetching most saved lessons:", err);
    }
  };

  const topContributors = useMemo(() => {
    const authors = new Map();
    featuredLessons.forEach((lesson) => {
      const author = lesson.userId;
      if (!author?._id) return;
      const current = authors.get(author._id) || {
        ...author,
        count: 0,
      };
      current.count += 1;
      authors.set(author._id, current);
    });
    return Array.from(authors.values()).slice(0, 4);
  }, [featuredLessons]);

  const handleFavoriteClick = async () => {
    fetchFeaturedLessons();
    fetchMostSaved();
  };

  const slide = slides[activeSlide];
  const slideTarget =
    !user && slide.to.startsWith("/dashboard") ? "/login" : slide.to;

  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-16 sm:py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-secondary">
              Reflect. Share. Grow.
            </p>
            <h1 className="mb-5 max-w-3xl text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-gray-700 dark:text-slate-300">
              {slide.copy}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to={slideTarget} className="btn-primary">
                {slide.action}
              </Link>
              <Link
                to={user ? "/dashboard" : "/register"}
                className="btn-ghost"
              >
                {user ? "Open Dashboard" : "Create Free Account"}
              </Link>
            </div>
            <div className="mt-8 flex gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeSlide === index
                      ? "w-10 bg-primary"
                      : "w-2.5 bg-gray-300 dark:bg-slate-600"
                  }`}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white bg-white/80 p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-primary p-5 text-white">
                <p className="text-3xl font-bold">
                  {featuredLessons.length || 0}
                </p>
                <p className="text-sm opacity-90">Featured lessons</p>
              </div>
              <div className="rounded-xl bg-secondary p-5 text-white">
                <p className="text-3xl font-bold">
                  {topContributors.length || 0}
                </p>
                <p className="text-sm opacity-90">Active voices</p>
              </div>
              <div className="col-span-2 rounded-xl bg-gray-900 p-5 text-white">
                <p className="mb-2 text-sm text-gray-300">Community focus</p>
                <p className="text-xl font-semibold">
                  Public, private, free, and premium lessons with secure access
                  rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Why Learning From Life Matters
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Preserve Wisdom",
                "Document meaningful lessons before they fade.",
              ],
              [
                "Share Context",
                "Help others learn from real lived experience.",
              ],
              ["Track Growth", "See patterns in your reflections over time."],
              [
                "Learn Mindfully",
                "Browse grounded insights from the community.",
              ],
            ].map(([title, copy]) => (
              <div key={title} className="card p-6">
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-slate-300">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold">Featured Life Lessons</h2>
              <p className="mt-2 text-gray-600 dark:text-slate-300">
                Admin-curated lessons and high-value community reflections.
              </p>
            </div>
            <Link to="/lessons" className="btn-primary self-start sm:self-auto">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-72 animate-pulse rounded-lg bg-white shadow dark:bg-slate-800"
                />
              ))}
            </div>
          ) : featuredLessons.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-10 text-center shadow dark:bg-slate-900">
              <h3 className="text-xl font-bold">No featured lessons yet</h3>
              <p className="mt-2 text-gray-600 dark:text-slate-300">
                Admins can feature strong lessons from the moderation dashboard.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white px-4 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold">
            Top Contributors of the Week
          </h2>
          {topContributors.length ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {topContributors.map((author) => (
                <Link
                  key={author._id}
                  to={`/profile/${author._id}`}
                  className="rounded-lg border border-gray-200 p-5 transition hover:border-primary dark:border-slate-800 dark:hover:border-primary"
                >
                  <p className="font-semibold">{author.name}</p>
                  <p className="text-sm text-gray-600 dark:text-slate-300">
                    {author.lessonsCreated || author.count} lessons shared
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-slate-300">
              Contributor stats will appear after lessons are shared.
            </p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Most Saved Lessons</h2>
            <Link to="/lessons" className="text-sm text-primary underline">
              View all
            </Link>
          </div>

          {mostSavedLessons.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mostSavedLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  onFavoriteClick={handleFavoriteClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-slate-300">
              No popular lessons yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
