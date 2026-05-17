import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ReportedLessonsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [page]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/lessons/admin/reports/all?page=${page}&limit=10`,
      );
      setReports(response.data.reports);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const handleResolveReport = async (reportId) => {
    try {
      await api.post(`/lessons/admin/reports/${reportId}/resolve`);
      toast.success("Report resolved");
      fetchReports();
    } catch (error) {
      toast.error("Failed to resolve report");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    const result = await Swal.fire({
      title: "Delete this lesson?",
      text: "All reports related to this lesson will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/lessons/admin/reports/${lessonId}/delete`);
        toast.success("Lesson deleted successfully");
        fetchReports();
      } catch (error) {
        toast.error("Failed to delete lesson");
      }
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Reported Lessons
        </h1>

        {reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No reported lessons</p>
            <p className="text-gray-500">
              All lessons are following community guidelines
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {report.lessonId?.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {report.lessonId?.description}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                    {report.reason}
                  </span>
                </div>

                <div className="bg-gray-50 rounded p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Report Details:</p>
                  <p className="text-gray-700">{report.description}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Reported by: {report.reporterUserId?.name} (
                    {report.reporterUserId?.email})
                  </p>
                  <p className="text-xs text-gray-600">
                    Date: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleResolveReport(report._id)}
                    className="px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200 font-semibold"
                  >
                    Mark as Resolved
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(report.lessonId?._id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 font-semibold"
                  >
                    Delete Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-between items-center mt-8 p-4 bg-white rounded-lg">
            <p className="text-gray-600">
              Showing {reports.length} of {pagination.total} reports
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                disabled={page === pagination.pages}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedLessonsPage;
