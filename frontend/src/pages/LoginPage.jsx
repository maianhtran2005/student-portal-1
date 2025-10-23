import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student' // 'student' hoặc 'admin'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call - trong thực tế sẽ gọi API backend
      const response = await simulateLogin(formData);
      
      if (response.success) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        
        // Redirect dựa trên loại user
        if (formData.userType === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(response.message);
      }
    } catch {
      setError('Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  // Hàm simulate login - trong thực tế sẽ gọi API
  const simulateLogin = async (data) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data dựa trên database
    const mockUsers = {
      student: [
        { id: 1, code: 1001, email: '22001497@hus.edu', name: 'Alice Nguyen', password: '123456', year: 1, majorId: 1 },
        { id: 2, code: 1002, email: '22001496@hus.edu', name: 'Bob Tran', password: '123456', year: 2, majorId: 1 },
        { id: 3, code: 1003, email: '22001495@student.edu', name: 'Carol Le', password: '123456', year: 1, majorId: 2 }
      ],
      admin: [
        { id: 1, email: '23001497@hus.edu', username: 'admin1', password: '123456' },
        { id: 2, email: '23001565@hus.edu', username: 'admin2', password: '1234567' }
      ]
    };

    const users = mockUsers[data.userType];
    const user = users.find(u => u.email === data.email && u.password === data.password);
    
    if (user) {
      return {
        success: true,
        user: user,
        token: `token_${Date.now()}`
      };
    } else {
      return {
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      };
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập vào hệ thống
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Chọn loại tài khoản để đăng nhập
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* User Type Selection */}
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={formData.userType === 'student'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Sinh viên
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={formData.userType === 'admin'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Quản trị viên
              </label>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="text-sm text-gray-600">
            <p className="font-semibold">Tài khoản demo:</p>
            <p><strong>Sinh viên:</strong> 22001497@hus.edu / 123456</p>
            <p><strong>Admin:</strong> 23001497@hus.edu / 123456</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
