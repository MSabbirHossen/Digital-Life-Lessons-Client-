import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLessons } from "../hooks/useLessons";
import { useInteractions, useFavorites } from "../hooks/useInteractions";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { REPORT_REASONS } from "../constants/lessons";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { LessonCard } from "../components/LessonCard";

const LessonDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getLessonById } = useLessons();
  const { toggleLike, addComment, reportLesson } = useInteractions();
  const { addFavorite, removeFavorite } = useFavorites();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({ reason: "", description: "" });
  const [isPremiumBlocked, setIsPremiumBlocked] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);

  useEffect(() => {
    fetchLesson();
    checkIfFavorited();
  }, [id]);

  const fetchLesson = async () => {
    setLoading(true);
    try {
      const lessonData = await getLessonById(id);
      if (lessonData) {
        setLesson(lessonData.lesson);
        setComments(lessonData.comments || []);
        setIsPremiumBlocked(Boolean(lessonData.isPremiumBlocked));
        fetchSimilarLessons();
      }
    } catch (error) {
      toast.error("Failed to load lesson");
      navigate("/lessons");
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarLessons = async () => {
    try {
      const response = await api.get(`/lessons/${id}/similar`);
      setSimilarLessons(response.data.lessons || []);
    } catch (error) {
      console.error("Error fetching similar lessons:", error);
    }
  };

  const checkIfFavorited = async () => {
    if (user) {
      try {
        const response = await api.get(`/lessons/favorites/check/${id}`);
        setIsFavorited(response.data.isFavorited);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like lessons");
      return;
    }
    const updated = await toggleLike(id);
    if (updated) {
      setLesson(updated);
    }
  };

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error("Please login to save lessons");
      return;
    }

    if (isFavorited) {
      const success = await removeFavorite(id);
      if (success) {
        setIsFavorited(false);
      }
    } else {
      const success = await addFavorite(id);
      if (success) {
        setIsFavorited(true);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setSubmittingComment(true);
    const newComment = await addComment(id, commentText);
    if (newComment) {
      setComments([newComment, ...comments]);
      setCommentText("");
    }
    setSubmittingComment(false);
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!reportData.reason) {
      toast.error("Please select a reason");
      return;
    }

    const success = await reportLesson(
      id,
      reportData.reason,
      reportData.description,
    );
    if (success) {
      setShowReportModal(false);
      setReportData({ reason: "", description: "" });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/lessons/${id}/comment/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600">Lesson not found</h1>
        </div>
      </div>
    );
  }

  const isOwner = user?._id === lesson.userId?._id;
  const canModerate = user?.role === "admin" || isOwner;
  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          {lesson.imageURL && (
            <img
              src={lesson.imageURL}
              alt={lesson.title}
              className="w-full h-80 object-cover rounded-lg mb-8"
            />
          )}

          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-primary">
                {lesson.title}
              </h1>
              <p className="text-gray-600">
                Category: {lesson.category} • Tone: {lesson.emotionalTone}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFavoriteClick}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isFavorited
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isFavorited ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleLike}
                className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 flex items-center gap-2"
              >
                Like {lesson.likesCount || 0}
              </button>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            {lesson.userId?.photoURL && (
              <img
                src={lesson.userId.photoURL}
                alt={lesson.userId.name}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div>
              <Link
                to={`/profile/${lesson.userId?._id}`}
                className="font-semibold hover:text-primary"
              >
                {lesson.userId?.name}
              </Link>
              <p className="text-gray-600 text-sm">
                {new Date(lesson.createdAt).toLocaleDateString()} |{" "}
                {lesson.views || 0} views
              </p>
            </div>
          </div>

          {/* Lesson Content */}
          {isPremiumBlocked ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">Lock</div>
              <h2 className="text-2xl font-bold text-yellow-900 mb-2">
                Premium lesson
              </h2>
              <p className="text-yellow-800 mb-6">
                Upgrade to Premium to read the full lesson and support deeper
                community reflections.
              </p>
              {user ? (
                <Link to="/pricing" className="btn-secondary">
                  Upgrade to Premium
                </Link>
              ) : (
                <Link to="/login" className="btn-primary">
                  Login to Upgrade
                </Link>
              )}
            </div>
          ) : (
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                {lesson.description}
              </p>
            </div>
          )}

          {lesson.accessLevel === "Premium" && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">Premium Content</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <span className="font-semibold">Visibility:</span>{" "}
              {lesson.visibility}
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <span className="font-semibold">Updated:</span>{" "}
              {new Date(lesson.updatedAt).toLocaleDateString()}
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <span className="font-semibold">Saves:</span>{" "}
              {lesson.favoritesCount || 0}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            {canModerate ? (
              <>
                <button
                  onClick={() => navigate(`/dashboard/update-lesson/${id}`)}
                  className="btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: "Delete this lesson?",
                      text: "This action cannot be undone.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Delete",
                      confirmButtonColor: "#dc2626",
                    });

                    if (result.isConfirmed) {
                      try {
                        await api.delete(`/lessons/${id}`);
                        toast.success("Lesson deleted");
                        navigate("/lessons");
                      } catch (error) {
                        toast.error("Failed to delete lesson");
                      }
                    }
                  }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  Delete
                </button>
              </>
            ) : null}
            <button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              Report
            </button>
            <FacebookShareButton url={shareUrl} quote={lesson.title}>
              <span className="inline-block rounded-lg bg-blue-50 px-4 py-2 text-blue-700">
                Facebook
              </span>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={lesson.title}>
              <span className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-gray-700">
                X
              </span>
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={lesson.title}>
              <span className="inline-block rounded-lg bg-sky-50 px-4 py-2 text-sky-700">
                LinkedIn
              </span>
            </LinkedinShareButton>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>

          {user && !isPremiumBlocked ? (
            <form onSubmit={handleAddComment} className="mb-8 pb-8 border-b">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary mb-4"
              />
              <button
                type="submit"
                disabled={submittingComment}
                className="btn-primary disabled:opacity-50"
              >
                {submittingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className="mb-8 pb-8 border-b text-center">
              <p className="text-gray-600 mb-4">
                {isPremiumBlocked
                  ? "Upgrade to Premium to join this discussion."
                  : "Please login to comment on this lesson"}
              </p>
              <a href="/login" className="btn-primary">
                Login
              </a>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {comment.userId?.photoURL && (
                        <img
                          src={comment.userId.photoURL}
                          alt={comment.userId.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{comment.userId?.name}</p>
                        <p className="text-gray-600 text-xs">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {user?._id === comment.userId?._id && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {similarLessons.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-6 text-2xl font-bold">Similar Lessons</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {similarLessons.map((similar) => (
                <LessonCard key={similar._id} lesson={similar} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Report Lesson</h3>
            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason *
                </label>
                <select
                  value={reportData.reason}
                  onChange={(e) =>
                    setReportData({ ...reportData, reason: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a reason</option>
                  {REPORT_REASONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={reportData.description}
                  onChange={(e) =>
                    setReportData({
                      ...reportData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Provide additional details..."
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 btn-primary">
                  Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetailsPage;
