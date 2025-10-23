import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      // Simulate API calls
      await Promise.all([loadAnnouncements(), loadEnrollments()]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnnouncements = async () => {
    // Mock data dựa trên database
    const mockAnnouncements = [
      {
        id: 1,
        title: "Welcome Back to Semester 1!",
        content:
          "The new semester starts on March 1, 2025. Please check your course schedules.",
        postedAt: "2025-10-23 09:25:51",
      },
      {
        id: 2,
        title: "Exam Schedule Released",
        content: "Final exam dates are now available in the portal.",
        postedAt: "2025-10-23 09:25:51",
      },
    ];
    setAnnouncements(mockAnnouncements);
  };

  const loadEnrollments = async () => {
    // Mock data dựa trên database
    const mockEnrollments = [
      {
        id: 1,
        classCode: "CS101-1",
        courseName: "Introduction to Programming",
        credits: 3,
        semester: 1,
        year: 2025,
        dayOfWeek: 2,
        startPeriod: 1,
        endPeriod: 3,
        location: "A101",
        status: "active",
      },
      {
        id: 2,
        classCode: "CS201-1",
        courseName: "Data Structures",
        credits: 3,
        semester: 1,
        year: 2025,
        dayOfWeek: 3,
        startPeriod: 2,
        endPeriod: 4,
        location: "A102",
        status: "active",
      },
    ];
    setEnrollments(mockEnrollments);
  };

  const getDayName = (dayOfWeek) => {
    const days = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    return days[dayOfWeek] || "";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Chào mừng, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">MSSV: {user?.code}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông báo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Thông báo mới
              </h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border-l-4 border-indigo-500 pl-4"
                  >
                    <h3 className="font-medium text-gray-900">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(announcement.postedAt).toLocaleDateString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thông tin cá nhân */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Thông tin cá nhân
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Họ tên:</span>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">MSSV:</span>
                  <p className="font-medium">{user?.code}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Email:</span>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Năm học:</span>
                  <p className="font-medium">Năm {user?.year}</p>
                </div>
              </div>
            </div>

            {/* Thống kê nhanh */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Thống kê
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số môn đã đăng ký:</span>
                  <span className="font-semibold">{enrollments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng số tín chỉ:</span>
                  <span className="font-semibold">
                    {enrollments.reduce(
                      (total, enrollment) => total + enrollment.credits,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách môn học đã đăng ký */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Môn học đã đăng ký
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã lớp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên môn học
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tín chỉ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phòng học
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {enrollment.classCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enrollment.courseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enrollment.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getDayName(enrollment.dayOfWeek)} - Tiết{" "}
                        {enrollment.startPeriod}-{enrollment.endPeriod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enrollment.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            enrollment.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {enrollment.status === "active"
                            ? "Đang học"
                            : "Đã hủy"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
