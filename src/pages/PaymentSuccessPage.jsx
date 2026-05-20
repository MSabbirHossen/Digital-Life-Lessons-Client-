import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

const PaymentSuccessPage = () => {
  const { setIsPremium, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    pollPremiumStatus();
  }, []);

  const pollPremiumStatus = async () => {
    let attempts = 0;
    const maxAttempts = 8;

    while (attempts < maxAttempts) {
      try {
        const response = await api.get("/stripe/payment-status");
        if (response.data.isPremium) {
          const profile = await api.get("/auth/me");
          setIsPremium(true);
          setUser(profile.data.user);
          localStorage.setItem("user", JSON.stringify(profile.data.user));
          setActivated(true);
          toast.success("Premium activated successfully");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Payment status polling failed:", error);
      }

      attempts += 1;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setLoading(false);
    toast.info("Payment received. Premium activation may take a moment.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
            OK
          </div>
          <h1 className="mb-4 text-4xl font-bold text-green-700">
            Payment Successful
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            {loading
              ? "Stripe is confirming your payment. Premium will activate automatically through the secure webhook."
              : activated
                ? "Your Premium membership is active."
                : "Your payment was received, but the webhook has not finished activation yet. Refresh this page in a moment or check your dashboard."}
          </p>

          {activated && (
            <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 text-left">
              <h3 className="mb-4 text-lg font-bold text-green-800">
                Premium benefits unlocked
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>Access all premium lessons</li>
                <li>Create premium lessons</li>
                <li>Premium badge on your profile</li>
                <li>Lifetime access with one-time payment</li>
              </ul>
            </div>
          )}

          {loading && <div className="loader mx-auto mb-8"></div>}

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
            <Link to="/dashboard/add-lesson" className="btn-secondary">
              Create Lesson
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
