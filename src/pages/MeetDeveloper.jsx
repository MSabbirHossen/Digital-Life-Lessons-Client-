import { useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { toast } from "react-toastify";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/MSabbirHossen",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ms-hossen/",
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/parttimecoder/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/parttimecoder/",
    icon: FaFacebookF,
  },
];

const MeetDeveloper = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    featureRequest: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.feedback.trim()
    ) {
      toast.error("Please complete the required fields");
      return;
    }

    toast.success(
      "Thanks for the feedback. Message prepared for your team workflow.",
    );
    setFormData({ name: "", email: "", feedback: "", featureRequest: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto w-10/12 max-w-5xl space-y-8">
        <section className="card p-8">
          {/* 🖼️ IMAGE (updated to match theme) */}
          <div className="flex justify-center">
            <div className="relative group">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-xl group-hover:blur-2xl transition"></div>

              <img
                src="/Developer.png"
                alt="Developer"
                className="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-2xl border border-cyan-400/40 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition duration-300"
              />
            </div>
          </div>

          {/* 🧠 CONTENT */}
          <div className="text-center md:text-left">
            {/* Heading (match Banner style) */}
            <p className="text-gray-600 text-sm md:text-lg mb-2">Meet the</p>

            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              <span className="text-gray-900">Developer</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-6">
              Hi! I'm{" "}
              <h2 className="inline-block text-primary">
                <a
                href="https://www.linkedin.com/in/ms-hossen/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-blue-500 cursor-pointer transition"
              >
                MS Hossen
              </a>
              </h2>
              , the developer behind this project. This{" "}
              <a
                href="https://github.com/MSabbirHossen/Digital-Life-Lessons.git"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-900 underline hover:text-gray-700 transition"
              >
                Digital Life Lessons project
              </a>{" "}
              is part of my journey to improve frontend skills and build
              real-world applications using React and modern UI systems.
            </p>

            {/* 🔗 SOCIALS (now aligned with banner buttons) */}
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900">Projects Info</h2>
            <div className="mt-5 space-y-4 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Project:</span>{" "}
                Digital Life Lessons
              </p>
              <p className="mt-4 max-w-3xl text-gray-600 leading-7 text-justify">
                This project is built to preserve practical life lessons in a
                clean, reliable, and beginner-friendly MERN stack experience.
                Share feedback, request a feature, or connect socially using the
                links below.
              </p>
              <p>
                <span className="font-semibold text-gray-900">Stack:</span>{" "}
                React, Express, MongoDB, Firebase, Stripe
              </p>
              <p>
                <span className="font-semibold text-gray-900">Focus:</span>{" "}
                Clear UX, reusable components, and secure role-based flows
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Developer's Social Links
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900">Feedback</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Feedback *
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="5"
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary"
                  placeholder="Tell us what you think about the project"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Feature Request
                </label>
                <input
                  name="featureRequest"
                  value={formData.featureRequest}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary"
                  placeholder="What would you like to see next?"
                />
              </div>
              <button type="submit" className="btn-primary">
                Send Feedback
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MeetDeveloper;
