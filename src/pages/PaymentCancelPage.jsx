import { Link } from "react-router-dom";

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-4xl font-bold mb-4 text-red-600">
            Payment Cancelled
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your payment has been cancelled. You can try again whenever you're
            ready.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-3 text-yellow-800">
              💡 Why upgrade to Premium?
            </h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• Access exclusive premium lessons</li>
              <li>• Create unlimited premium content</li>
              <li>• Get a premium badge on your profile</li>
              <li>• Priority support and updates</li>
              <li>• One-time payment, lifetime access</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/pricing" className="btn-primary">
              Try Premium Again
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              Back to Dashboard
            </Link>
          </div>

          <p className="text-gray-600 mt-8 text-sm">
            If you have any questions or issues, please contact our support
            team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
