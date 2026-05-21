import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaSave, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useInteractions, useFavorites } from "../hooks/useInteractions";

export const LessonCard = ({ lesson, onFavoriteClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toggleLike } = useInteractions();
  const { addFavorite, removeFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsFavorited(Boolean(lesson.isFavorited));
    setIsLiked(Boolean(lesson.isLiked));
  }, [lesson.isFavorited, lesson.isLiked]);

  const isOwner = user?._id === lesson.userId?._id;
  const isLocked =
    lesson.accessLevel === "Premium" &&
    !user?.isPremium &&
    user?.role !== "admin" &&
    !isOwner;

  const handleLikeClick = async (event) => {
    event.stopPropagation();
    if (!user) {
      toast.error("Please login to like lessons");
      return;
    }
    const updated = await toggleLike(lesson._id);
    if (updated) {
      setIsLiked((current) => !current);
    }
  };

  const handleSaveClick = async (event) => {
    event.stopPropagation();
    if (!user) {
      toast.error("Please login to save lessons");
      return;
    }
    const saved = isFavorited
      ? await removeFavorite(lesson._id)
      : await addFavorite(lesson._id);
    if (saved) {
      setIsFavorited(!isFavorited);
      onFavoriteClick?.(lesson._id);
    }
  };

  return (
    <article className="card flex h-full flex-col overflow-hidden p-4">
      <div className="relative mb-4">
        <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
          {lesson.imageURL ? (
            <img
              src={lesson.imageURL}
              alt={lesson.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-sm font-semibold text-gray-500">
              No image
            </span>
          )}
        </div>

        {lesson.accessLevel === "Premium" && (
          <div className="absolute right-2 top-2 rounded bg-secondary px-2 py-1 text-xs font-bold text-white">
            Premium
          </div>
        )}

        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="mb-1 text-2xl">Lock</div>
              <p className="text-sm font-semibold">Premium Only</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold">{lesson.title}</h3>
        <p className="mb-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {isLocked
            ? "Premium lesson. Upgrade to read the full reflection."
            : lesson.description}
        </p>

        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">
            {lesson.category}
          </span>
          <span className="rounded bg-secondary/10 px-2 py-1 text-xs text-secondary">
            {lesson.emotionalTone}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-3 text-sm text-gray-500">
        <button
          type="button"
          onClick={handleLikeClick}
          className={`inline-flex items-center gap-2 rounded px-3 py-2 transition ${
            isLiked
              ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300"
              : "hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          Like {lesson.likesCount || 0}
        </button>
        <button
          type="button"
          onClick={handleSaveClick}
          className={`inline-flex items-center gap-2 rounded px-3 py-2 transition ${
            isFavorited
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "hover:bg-gray-100 dark:hover:bg-slate-800"
          }`}
        >
          {isFavorited ? <FaSave /> : <FaRegBookmark />}
          {isFavorited ? "Saved" : "Save"}
        </button>
      </div>

      <div className="mt-3 border-t pt-3 text-sm text-gray-600 flex items-center justify-between">
        {lesson.userId?._id ? (
          <Link
            to={`/profile/${lesson.userId._id}`}
            onClick={(event) => event.stopPropagation()}
            className="hover:text-primary"
          >
            By {lesson.userId?.name || "Unknown"}
          </Link>
        ) : (
          <p>By Unknown</p>
        )}
        <button
          onClick={() => navigate(`/lessons/${lesson._id}`)}
          className="ml-4 btn-primary text-sm"
          aria-label={`See details for ${lesson.title}`}
        >
          See Details
        </button>
      </div>
    </article>
  );
};
