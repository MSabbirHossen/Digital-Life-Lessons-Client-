import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles/index.css";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PublicLessons = lazy(() => import("./pages/PublicLessons"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddLesson = lazy(() => import("./pages/AddLesson"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LessonDetailsPage = lazy(() => import("./pages/LessonDetailsPage"));
const MyLessonsPage = lazy(() => import("./pages/MyLessonsPage"));
const UpdateLessonPage = lazy(() => import("./pages/UpdateLessonPage"));
const MyFavoritesPage = lazy(() => import("./pages/MyFavoritesPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const PaymentCancelPage = lazy(() => import("./pages/PaymentCancelPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const ManageUsersPage = lazy(() => import("./pages/ManageUsersPage"));
const ManageLessonsPage = lazy(() => import("./pages/ManageLessonsPage"));
const ReportedLessonsPage = lazy(() => import("./pages/ReportedLessonsPage"));
const AdminProfilePage = lazy(() => import("./pages/AdminProfilePage"));
const AuthorProfilePage = lazy(() => import("./pages/AuthorProfilePage"));

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="loader"></div>
  </div>
);

const AppShell = () => {
  const location = useLocation();
  const hideChrome = location.pathname !== "/" && location.pathname.startsWith("/404");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideChrome && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lessons" element={<PublicLessons />} />
            <Route path="/public-lessons" element={<PublicLessons />} />
            <Route path="/lessons/:id" element={<LessonDetailsPage />} />
            <Route path="/lesson/:id" element={<LessonDetailsPage />} />
            <Route path="/profile/:userId" element={<AuthorProfilePage />} />

            {/* Private Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/add-lesson"
              element={
                <PrivateRoute>
                  <AddLesson />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/my-lessons"
              element={
                <PrivateRoute>
                  <MyLessonsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/update-lesson/:id"
              element={
                <PrivateRoute>
                  <UpdateLessonPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/my-favorites"
              element={
                <PrivateRoute>
                  <MyFavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <PrivateRoute>
                  <PricingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment/success"
              element={
                <PrivateRoute>
                  <PaymentSuccessPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment/cancel"
              element={
                <PrivateRoute>
                  <PaymentCancelPage />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/dashboard/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/admin/manage-users"
              element={
                <AdminRoute>
                  <ManageUsersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/admin/manage-lessons"
              element={
                <AdminRoute>
                  <ManageLessonsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/admin/reported-lessons"
              element={
                <AdminRoute>
                  <ReportedLessonsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/admin/profile"
              element={
                <AdminRoute>
                  <AdminProfilePage />
                </AdminRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <AppShell />
        </ErrorBoundary>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
