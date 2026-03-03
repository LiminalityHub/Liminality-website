import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Add background blur on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Don't render main header on admin pages (they have their own)
  if (isAdminRoute) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo / Site name */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-brand-200 group-hover:shadow-lg group-hover:shadow-brand-300 transition-shadow">
            TC
          </div>
          <span className="text-xl font-serif font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
            The Craft
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-brand-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <a
            href="https://github.com/Lucalangella/react-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden sm:inline"
          >
            GitHub
          </a>
          <Link
            to="/admin"
            className="px-5 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-brand-600 transition-colors shadow-sm"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
