import { Link } from 'react-router-dom';

function getAuthorName(author) {
  return String(author || 'Liminality').trim() || 'Liminality';
}

function getAuthorInitial(author) {
  return getAuthorName(author).charAt(0).toUpperCase();
}

/** Estimates reading time from HTML content (avg 238 wpm) */
function getReadingTime(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 238));
}

/** Formats ISO date string to a readable format */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostPreview({ post }) {
  const readingTime = getReadingTime(post.content);
  const authorName = getAuthorName(post.author);

  return (
    <Link to={`/post/${post.id}`} className="group block">
      <article className="card-hover bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
        {/* Top accent bar */}
        <div className="gradient-bar w-12 mb-6 group-hover:w-20 transition-all duration-300" />

        {/* Title */}
        <h2 className="text-xl font-sans font-bold text-gray-900 mb-3 group-hover:text-gray-900 transition-colors leading-snug">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 leading-relaxed mb-6 flex-1">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {/* Author avatar placeholder */}
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 text-xs font-semibold">
              {getAuthorInitial(post.author)}
            </div>
            <span className="text-gray-600 font-medium">{authorName}</span>
          </div>
          <div className="flex items-center gap-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-gray-300">&middot;</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostPreview;
