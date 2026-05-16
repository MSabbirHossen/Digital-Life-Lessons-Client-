const Stub = ({ title, description }) => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-primary">{title}</h1>
      <p className="text-gray-600 text-lg">{description}</p>
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">⏳ This page is under development</p>
      </div>
    </div>
  </div>
);

// Export stubs for all remaining pages
export const LessonDetails = () => (
  <Stub
    title="Lesson Details"
    description="Full lesson view with comments and interactions"
  />
);
export const MyLessons = () => (
  <Stub title="My Lessons" description="Manage your published lessons" />
);
export const UpdateLesson = () => (
  <Stub title="Update Lesson" description="Edit your lesson content" />
);
export const MyFavorites = () => (
  <Stub title="My Favorites" description="View your saved favorite lessons" />
);
export const UserProfile = () => (
  <Stub
    title="User Profile"
    description="Manage your profile and view your contributions"
  />
);
export const Pricing = () => (
  <Stub title="Pricing & Upgrade" description="Upgrade to Premium membership" />
);
export const PaymentSuccess = () => (
  <Stub
    title="Payment Successful"
    description="Your upgrade was completed successfully"
  />
);
export const PaymentCancel = () => (
  <Stub title="Payment Cancelled" description="Payment was cancelled" />
);

// Admin pages
export const AdminDashboard = () => (
  <Stub
    title="Admin Dashboard"
    description="Platform analytics and management"
  />
);
export const ManageUsers = () => (
  <Stub title="Manage Users" description="Manage user accounts and roles" />
);
export const ManageLessons = () => (
  <Stub
    title="Manage Lessons"
    description="Moderate all lessons on the platform"
  />
);
export const ReportedLessons = () => (
  <Stub
    title="Reported Lessons"
    description="Review and handle reported content"
  />
);
export const AdminProfile = () => (
  <Stub title="Admin Profile" description="Admin profile and settings" />
);

export default Stub;
