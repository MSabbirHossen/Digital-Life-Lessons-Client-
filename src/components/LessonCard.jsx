import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LessonCard = ({ lesson, onFavoriteClick }) => {
  const { user } = useAuth();

  const isLocked = lesson.accessLevel === "Premium" && user && !user.isPremium;

  return (
    <Link to={`/lessons/${lesson._id}`}>
      <div className="card p-4 h-full flex flex-col overflow-hidden">
        {/* Image Container */}
        <div className="mb-4 relative">
          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {lesson.imageURL ? (
              <img
                src={lesson.imageURL}
                alt={lesson.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">📖</span>
            )}
          </div>

          {/* Premium Badge */}
          {lesson.accessLevel === "Premium" && (
            <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded text-xs font-bold">
              Premium
            </div>
          )}

          {/* Blurred Overlay for Locked Content */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-3xl mb-2">🔒</div>
                <p className="text-sm font-semibold">Premium Only</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-bold text-lg line-clamp-2 mb-2">
            {lesson.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {lesson.description}
          </p>

          {/* Category and Tone */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {lesson.category}
            </span>
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
              {lesson.emotionalTone}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t">
          <div className="flex space-x-4">
            <span>❤️ {lesson.likesCount}</span>
            <span>💾 {lesson.favoritesCount}</span>
          </div>
          {user && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavoriteClick?.(lesson._id);
              }}
              className="text-secondary hover:text-secondary/80"
            >
              ★
            </button>
          )}
        </div>

        {/* Author */}
        <div className="mt-3 pt-3 border-t text-sm text-gray-600">
          <p>By {lesson.userId?.name || "Unknown"}</p>
        </div>
      </div>
    </Link>
  );
};
