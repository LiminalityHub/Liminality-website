import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';

/** Estimates reading time from HTML content */
function getReadingTime(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 238));
}

/** Formats ISO date string */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts();
  const post = posts.find((p) => p.id === Number(id));

  // Update page title when post loads
  useEffect(() => {
    if (loading) {
      document.title = 'Loading… — Liminality';
      return;
    }
    if (post) {
      document.title = `${post.title} — Liminality`;
    } else {
      document.title = 'Post Not Found — Liminality';
    }
  }, [post, loading]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-gray-500">Loading post…</p>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Unable to load post
        </h1>
        <p className="text-gray-500 mb-8">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          &larr; Back to blog
        </Link>
      </div>
    );
  }

  // Post not found — redirect to 404
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Post not found
        </h1>
        <p className="text-gray-500 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          &larr; Back to blog
        </Link>
      </div>
    );
  }

  const readingTime = getReadingTime(post.content);

  // Find adjacent posts for navigation
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = posts[currentIndex + 1] || null;
  const nextPost = posts[currentIndex - 1] || null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors mb-10"
      >
        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
        Back to blog
      </button>

      {/* Post header */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 text-xs font-semibold">
              {post.author.charAt(0)}
            </div>
            <span className="font-medium text-gray-700">{post.author}</span>
          </div>

          <span className="text-gray-300">&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-gray-300">&middot;</span>
          <span>{readingTime} min read</span>
        </div>
      </header>

      {/* Divider */}
      <div className="gradient-bar w-24 mb-10" />

      {/* Post body */}
      <div
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Post footer navigation */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {prevPost ? (
            <Link
              to={`/post/${prevPost.id}`}
              className="group flex-1 p-5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                &larr; Previous
              </span>
              <p className="text-sm font-medium text-gray-900 mt-1 group-hover:text-gray-900 transition-colors">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextPost ? (
            <Link
              to={`/post/${nextPost.id}`}
              className="group flex-1 p-5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-right"
            >
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Next &rarr;
              </span>
              <p className="text-sm font-medium text-gray-900 mt-1 group-hover:text-gray-900 transition-colors">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </article>
  );
}

export default PostDetail;
