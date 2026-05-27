import { AlertCircle, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const LoginPage = ({ setCurrentScreen, setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '', // Only for registration
  });

  // Backend API URL - Update this to your backend URL
  const API_URL = 'http://127.0.0.1:5000/api/auth';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user data to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setSuccess('Login successful! Redirecting...');

        // Redirect to dashboard after 1 second
        setTimeout(() => {
          setIsLoggedIn(true);
          setCurrentScreen("dashboard");
        }, 1000);

      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user data to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setSuccess('Registration successful! Redirecting...');

        // Redirect to dashboard after 1 second
        setTimeout(() => {
          setIsLoggedIn(true);
          setCurrentScreen("dashboard");
        }, 1000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({ email: '', password: '', username: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">EasySell</h1>
        <p className="text-gray-600 mt-2">
          {isLogin ? 'Seller Dashboard Login' : 'Create Seller Account'}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}

      <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
        {/* Username field (only for registration) */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={!isLogin}
            />
          </div>
        )}

        {/* Email field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {!isLogin && (
            <p className="text-xs text-gray-500 mt-1">
              Minimum 6 characters required
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            isLogin ? 'Login' : 'Create Account'
          )}
        </button>

        {/* Toggle between login and register */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-600 hover:underline font-semibold"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        {/* Forgot Password (only show on login) */}
        {isLogin && (
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}
      </form>

      {/* Demo Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          🔧 <strong>Backend Setup Required:</strong> Update API_URL in the code to your backend server address
        </p>
      </div>
    </div>
  );
};

export default LoginPage;