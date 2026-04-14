import { Link } from 'react-router-dom';

function getAuthorName(author) {
  return String(author || 'Liminality').trim() || 'Liminality';
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
    month: 'short',
    day: 'numeric',
  });
}

/** Derives a category tag from the post */
function getCategory(post) {
  const title = (post.title || '').toLowerCase();
  const excerpt = (post.excerpt || '').toLowerCase();
  const content = (post.content || '').toLowerCase();
  const combined = `${title} ${excerpt} ${content}`;
  if (/design|ui|ux|css|style/.test(combined)) return 'DESIGN';
  if (/code|dev|engineer|software|build|react|js|python/.test(combined)) return 'CODE';
  return 'THEORY';
}

function PostPreview({ post, featured = false }) {
  const readingTime = getReadingTime(post.content);
  const authorName = getAuthorName(post.author);
  const category = getCategory(post);

  if (featured) {
    return (
      <Link to={`/post/${post.id}`} className="group block" id={`post-featured-${post.id}`}>
        <article className="relative border border-liminal-quaternary p-8 md:p-10 transition-colors duration-300 hover:border-liminal-secondary">
          {/* L-shaped corner accents */}
          <span className="corner-mark-tl" />
          <span className="corner-mark-tr" />
          <span className="corner-mark-bl" />
          <span className="corner-mark-br" />

          {/* Category + meta row */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary">
              {category}
            </span>
            <div className="flex items-center gap-4 font-mono text-xs text-liminal-tertiary">
              <span>{readingTime} MIN READ</span>
              <span className="text-liminal-quaternary">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-liminal-primary leading-tight mb-4 group-hover:opacity-70 transition-opacity duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="font-grotesk text-sm text-liminal-secondary leading-relaxed mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between border-t border-liminal-quaternary pt-5">
            <span className="font-grotesk text-xs text-liminal-tertiary">{authorName}</span>
            <span className="font-mono text-xs tracking-widest text-liminal-primary group-hover:translate-x-1 transition-transform duration-200 inline-block">
              READ →
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/post/${post.id}`} className="group block" id={`post-preview-${post.id}`}>
      <article className="border-t border-liminal-quaternary pt-6 pb-7 transition-colors duration-200 hover:border-liminal-secondary">
        {/* Top row: category + date */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary">
            {category}
          </span>
          <time dateTime={post.date} className="font-mono text-xs text-liminal-tertiary">
            {formatDate(post.date)}
          </time>
        </div>

        {/* Title */}
        <h2 className="font-mono text-base font-bold text-liminal-primary mb-2 leading-snug group-hover:opacity-60 transition-opacity duration-200">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="font-grotesk text-sm text-liminal-secondary leading-relaxed mb-4">
          {post.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <span className="font-grotesk text-xs text-liminal-tertiary">
            {readingTime} min · {authorName}
          </span>
          <span className="font-mono text-xs tracking-widest text-liminal-secondary group-hover:text-liminal-primary group-hover:translate-x-1 transition-all duration-200 inline-block">
            READ →
          </span>
        </div>
      </article>
    </Link>
  );
}

export default PostPreview;
