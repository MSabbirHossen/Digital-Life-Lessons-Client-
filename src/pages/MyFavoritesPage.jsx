import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useInteractions";
import { toast } from "react-toastify";

const MyFavoritesPage = () => {
  const { favorites, loading, getUserFavorites, removeFavorite } =
    useFavorites();

  useEffect(() => {
    getUserFavorites();
  }, []);

  const handleRemove = async (lessonId) => {
    const success = await removeFavorite(lessonId);
    if (success) {
      await getUserFavorites();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">My Favorites</h1>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="loader"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              You haven't saved any lessons yet.
            </p>
            <Link to="/lessons" className="btn-primary">
              Browse Lessons
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {fav.lessonId?.imageURL && (
                  <img
                    src={fav.lessonId.imageURL}
                    alt={fav.lessonId.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {fav.lessonId?.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {fav.lessonId?.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {fav.lessonId?.category}
                    </span>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                      {fav.lessonId?.emotionalTone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span>By: {fav.lessonId?.userId?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/lessons/${fav.lessonId?._id}`}
                      className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-center"
                    >
                      Read
                    </Link>
                    <button
                      onClick={() => handleRemove(fav.lessonId?._id)}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavoritesPage;
