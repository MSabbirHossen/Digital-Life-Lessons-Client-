import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLessons } from "../hooks/useLessons";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Lottie from "lottie-react";

const successAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 120,
  h: 120,
  nm: "success",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 20, s: [100, 100, 100] }] },
      },
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [90, 90] } },
        { ty: "fl", c: { a: 0, k: [0.13, 0.73, 0.45, 1] }, o: { a: 0, k: 100 } },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Health",
  "Finance",
  "Spirituality",
  "Learning",
  "Other",
];

const TONES = [
  "Inspiring",
  "Thoughtful",
  "Cautionary",
  "Joyful",
  "Reflective",
  "Humorous",
  "Profound",
];

const AddLesson = () => {
  const navigate = useNavigate();
  const { createLesson } = useLessons();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal Growth",
    emotionalTone: "Thoughtful",
    imageURL: "",
    visibility: "Public",
    accessLevel: "Free",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.accessLevel === "Premium" && !user.isPremium) {
      toast.error("Only Premium users can create Premium lessons");
      setLoading(false);
      return;
    }

    const lesson = await createLesson(formData);

    if (lesson) {
      setShowSuccess(true);
      setTimeout(() => navigate("/dashboard/my-lessons"), 900);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Share Your Life Lesson
        </h1>
        {showSuccess && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center">
            <div className="mx-auto h-24 w-24">
              <Lottie animationData={successAnimation} loop={false} />
            </div>
            <p className="font-semibold text-green-800">Lesson created successfully</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What did you learn?"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share the full story and lessons..."
              rows="6"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Emotional Tone *
              </label>
              <select
                name="emotionalTone"
                value={formData.emotionalTone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                {TONES.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Visibility
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Access Level
              </label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                disabled={!user.isPremium}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary disabled:opacity-50"
              >
                <option value="Free">Free</option>
                <option value="Premium" disabled={!user.isPremium}>
                  Premium {!user.isPremium && "(Upgrade to unlock)"}
                </option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Lesson"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
