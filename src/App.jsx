import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
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
const MeetDeveloperPage = lazy(() => import("./pages/MeetDeveloper"));

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="loader"></div>
  </div>
);

const AppShell = () => {
  const location = useLocation();
  const hideChrome = location.pathname === "/404";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const theme = storedTheme || systemTheme;

    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideChrome && <Navbar />}
      <main className="flex-grow">
        <div className="mx-auto w-10/12 px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/lessons" element={<PublicLessons />} />
              <Route path="/public-lessons" element={<PublicLessons />} />
              <Route
                path="/meet-the-developer"
                element={<MeetDeveloperPage />}
              />
              <Route
                path="/lessons/:id"
                element={
                  <PrivateRoute>
                    <LessonDetailsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lesson/:id"
                element={
                  <PrivateRoute>
                    <LessonDetailsPage />
                  </PrivateRoute>
                }
              />
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

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </div>
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
