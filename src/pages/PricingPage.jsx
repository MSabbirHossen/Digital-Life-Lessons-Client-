import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

const PricingPage = () => {
  const navigate = useNavigate();
  const { user, isPremium } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isPremium) {
      toast.info("You are already a premium member!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/stripe/create-checkout-session");
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to initiate checkout",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary">
            Unlock Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access exclusive premium lessons and create unlimited premium
            content
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-2">Free Plan</h2>
            <p className="text-gray-600 mb-6">Perfect for getting started</p>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">$0</p>
              <p className="text-gray-600">Forever free</p>
            </div>
            <button
              disabled
              className="w-full py-3 bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed"
            >
              Your Current Plan
            </button>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Browse all public lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Create free lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Save favorite lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Comment and interact</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✗</span>
                <span className="text-gray-500">Access premium lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✗</span>
                <span className="text-gray-500">Create premium lessons</span>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary rounded-lg shadow-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
              MOST POPULAR
            </div>
            <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
            <p className="text-gray-600 mb-6">
              For creators and passionate learners
            </p>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">৳1,500</p>
              <p className="text-gray-600">One-time payment, lifetime access</p>
            </div>
            <button
              onClick={handleUpgrade}
              disabled={loading || isPremium}
              className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                isPremium
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 disabled:opacity-50"
              }`}
            >
              {loading
                ? "Processing..."
                : isPremium
                  ? "Already Premium"
                  : "Upgrade Now"}
            </button>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>All free features</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Access all premium lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Create unlimited premium lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Premium badge on profile</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span>Lifetime updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-6">Feature Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-3 px-4 font-semibold">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 font-semibold">
                      Free
                    </th>
                    <th className="text-center py-3 px-4 font-semibold">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Browse lessons</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Create free lessons</td>
                    <td className="text-center py-3 px-4">✓</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Access premium lessons</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Create premium lessons</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Premium badge</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Priority support</td>
                    <td className="text-center py-3 px-4">✗</td>
                    <td className="text-center py-3 px-4">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-2">
                Is the premium upgrade a one-time payment?
              </h4>
              <p className="text-gray-600">
                Yes! Premium membership is a one-time payment of ৳1,500 that
                gives you lifetime access.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-2">Can I cancel my subscription?</h4>
              <p className="text-gray-600">
                Since it's a one-time payment, there's no subscription to
                cancel. Your premium status remains active forever.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit and debit cards through our secure
                Stripe payment gateway.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="font-bold mb-2">
                Can I upgrade later if I start with free?
              </h4>
              <p className="text-gray-600">
                Absolutely! You can upgrade from free to premium at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
