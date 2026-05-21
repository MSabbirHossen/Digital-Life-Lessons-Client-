import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">Digital Life Lessons</h3>
            <p className="text-gray-400 text-sm">
              Preserve your wisdom, share your stories, grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/lessons" className="hover:text-white transition">
                  Browse Lessons
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@digitallifelessons.com"
                  className="hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/meet-the-developer"
                  className="hover:text-white transition"
                >
                  Meet the Developer
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-3">
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/5 text-white hover:bg-white/10 transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.facebook.com/parttimecoder/"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/5 text-white hover:bg-white/10 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/in/ms-hossen/"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded bg-white/5 text-white hover:bg-white/10 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Digital Life Lessons. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
