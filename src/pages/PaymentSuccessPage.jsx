import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { setIsPremium } = useAuth();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        toast.error("Invalid session");
        setLoading(false);
        return;
      }

      const response = await api.post("/stripe/verify-payment", { sessionId });
      if (response.data.user) {
        setIsPremium(response.data.user.isPremium);
        setVerified(true);
        toast.success("Payment verified successfully!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment verification failed",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-bold mb-4 text-green-600">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {verified
              ? "Thank you for upgrading to Premium. Your account has been activated with all premium features."
              : "Your payment is being processed. Please wait while we verify your transaction."}
          </p>

          {verified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-lg mb-4 text-green-800">
                🎉 You're now a Premium Member!
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Access all premium lessons</li>
                <li>✓ Create unlimited premium lessons</li>
                <li>✓ Premium badge on your profile</li>
                <li>✓ Priority support</li>
                <li>✓ Lifetime access (one-time payment)</li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
            <Link to="/dashboard/add-lesson" className="btn-secondary">
              Create Premium Lesson
            </Link>
          </div>

          <p className="text-gray-600 mt-8 text-sm">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
