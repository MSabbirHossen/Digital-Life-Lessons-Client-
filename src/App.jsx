import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./styles/index.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicLessons from "./pages/PublicLessons";
import Dashboard from "./pages/Dashboard";
import AddLesson from "./pages/AddLesson";
import NotFound from "./pages/NotFound";
import LessonDetailsPage from "./pages/LessonDetailsPage";
import MyLessonsPage from "./pages/MyLessonsPage";
import UpdateLessonPage from "./pages/UpdateLessonPage";
import MyFavoritesPage from "./pages/MyFavoritesPage";
import UserProfilePage from "./pages/UserProfilePage";
import PricingPage from "./pages/PricingPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import ManageLessonsPage from "./pages/ManageLessonsPage";
import ReportedLessonsPage from "./pages/ReportedLessonsPage";
import AdminProfilePage from "./pages/AdminProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/lessons" element={<PublicLessons />} />
              <Route path="/lessons/:id" element={<LessonDetailsPage />} />

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

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
