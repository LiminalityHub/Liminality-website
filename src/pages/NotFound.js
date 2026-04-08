import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  useEffect(() => {
    document.title = '404 — Liminality';
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        {/* Large 404 */}
        <h1 className="text-8xl sm:text-9xl font-sans font-bold gradient-text mb-4">
          404
        </h1>

        <h2 className="text-2xl font-sans font-bold text-gray-900 mb-3">
          Page not found
        </h2>

        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 hover:shadow-md transition-all"
        >
          <span>&larr;</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
