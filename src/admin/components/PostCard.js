import { Link } from 'react-router-dom';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function PostCard({ post, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Post info */}
        <div className="flex-1 min-w-0">
          <div className="gradient-bar w-8 mb-3" />
          <h3 className="text-lg font-serif font-bold text-gray-900 mb-1 truncate">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 text-[10px] font-semibold">
                {post.author.charAt(0)}
              </div>
              <span>{post.author}</span>
            </div>
            <span className="text-gray-300">&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:flex-shrink-0">
          <Link
            to={`/post/${post.id}`}
            className="px-4 py-2 text-xs font-medium text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            View
          </Link>
          <Link
            to={`/admin/posts/edit/${post.id}`}
            className="px-4 py-2 text-xs font-medium text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(post)}
            className="px-4 py-2 text-xs font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
