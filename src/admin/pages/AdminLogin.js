import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, go to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.title = 'Admin Login — Liminality';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Accent bar */}
          <div className="gradient-bar w-12 mb-6" />

          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Enter the password to manage blog content.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password.trim()}
              className="w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Enter
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
