import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AdminLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
                TC
              </div>
              <span className="font-serif font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                The Craft
              </span>
            </Link>
            <span className="bg-brand-100 text-brand-700 rounded-full px-3 py-1 text-xs font-medium">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              View Blog
            </Link>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin content */}
      <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}

export default AdminLayout;
