import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname.startsWith('/post/');
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-liminal-bg/90 backdrop-blur-md border-b border-liminal-quaternary'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3" id="header-logo">
          {/* Square icon with dot */}
          <div className="w-7 h-7 border border-liminal-primary flex items-center justify-center group-hover:bg-liminal-primary transition-colors duration-300">
            <div className="w-1.5 h-1.5 rounded-full bg-liminal-primary group-hover:bg-liminal-bg transition-colors duration-300" />
          </div>
          <span className="font-mono text-sm font-bold tracking-widest uppercase text-liminal-primary">
            Liminality
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8" aria-label="Main navigation">
          {[
            { path: '/', label: 'Articles' },
            { path: '/projects', label: 'Projects' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              id={`nav-${label.toLowerCase()}`}
              className={`font-mono text-xs tracking-widest uppercase transition-all duration-200 relative group ${
                isActive(path)
                  ? 'text-liminal-primary'
                  : 'text-liminal-secondary hover:text-liminal-primary'
              }`}
            >
              {label}
              {/* active underline */}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-liminal-primary transition-all duration-300 ${
                  isActive(path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
