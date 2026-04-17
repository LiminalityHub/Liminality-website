import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github-dark.css';
import { usePosts } from '../hooks/usePosts';

const CODE_LANGUAGE_LABELS = {
  plaintext: 'Plain text',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  tsx: 'TSX',
  jsx: 'JSX',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  bash: 'Bash',
  python: 'Python',
  swift: 'Swift',
  sql: 'SQL',
};

hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', shell);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('sh', shell);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('sql', sql);

function normalizeCodeLanguage(value) {
  const raw = String(value || '').trim().toLowerCase();

  if (!raw) return 'plaintext';

  const aliases = {
    text: 'plaintext',
    txt: 'plaintext',
    plain: 'plaintext',
    js: 'javascript',
    ts: 'typescript',
    xml: 'html',
    sh: 'bash',
    shell: 'bash',
    zsh: 'bash',
    py: 'python',
  };

  return aliases[raw] || (CODE_LANGUAGE_LABELS[raw] ? raw : 'plaintext');
}

function getCodeLanguageLabel(value) {
  return CODE_LANGUAGE_LABELS[normalizeCodeLanguage(value)] || CODE_LANGUAGE_LABELS.plaintext;
}

function getAuthorName(author) {
  return String(author || 'Liminality').trim() || 'Liminality';
}

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
    month: 'short',
    day: 'numeric',
  });
}

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts();
  const post = posts.find((p) => String(p.id) === String(id));
  const postBodyRef = useRef(null);

  useEffect(() => {
    if (loading) { document.title = 'Loading… — Liminality'; return; }
    document.title = post ? `${post.title} — Liminality` : 'Post Not Found — Liminality';
  }, [post, loading]);

  useEffect(() => {
    if (!postBodyRef.current || !post) return;

    const codeBlocks = postBodyRef.current.querySelectorAll('pre code');

    codeBlocks.forEach((codeElement) => {
      const preElement = codeElement.parentElement;
      const explicitLanguage = preElement?.getAttribute('data-language');
      const classLanguage = Array.from(codeElement.classList)
        .find((className) => className.startsWith('language-'))
        ?.replace(/^language-/, '');
      const language = normalizeCodeLanguage(explicitLanguage || classLanguage);

      if (preElement) {
        preElement.setAttribute('data-language', language);
        preElement.setAttribute('data-language-label', getCodeLanguageLabel(language));
      }

      codeElement.className = '';
      codeElement.classList.add(`language-${language}`);
      codeElement.removeAttribute('data-highlighted');
      hljs.highlightElement(codeElement);
    });
  }, [post]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-widest text-liminal-tertiary animate-pulse">LOADING…</p>
      </div>
    );
  }

  /* ── Error state ── */
  if (error && !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-mono text-2xl font-bold text-liminal-primary mb-4 uppercase">
          Unable to load post
        </h1>
        <p className="font-grotesk text-sm text-liminal-secondary mb-8">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border border-liminal-primary px-5 py-3 hover:bg-liminal-primary hover:text-liminal-bg transition-all duration-300"
        >
          ← Back
        </Link>
      </div>
    );
  }

  /* ── Not found state ── */
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-mono text-2xl font-bold text-liminal-primary mb-4 uppercase">
          Post Not Found
        </h1>
        <p className="font-grotesk text-sm text-liminal-secondary mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border border-liminal-primary px-5 py-3 hover:bg-liminal-primary hover:text-liminal-bg transition-all duration-300"
        >
          ← Back
        </Link>
      </div>
    );
  }

  const readingTime = getReadingTime(post.content);
  const authorName = getAuthorName(post.author);
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = posts[currentIndex + 1] || null;
  const nextPost = posts[currentIndex - 1] || null;

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">

      {/* ── Back button ── */}
      <button
        onClick={() => navigate('/')}
        id="post-back-btn"
        className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-liminal-tertiary hover:text-liminal-primary transition-colors duration-200 mb-12"
      >
        <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
        Back
      </button>

      {/* ── Post header ── */}
      <header className="mb-10">
        {/* Top coordinate marker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-liminal-tertiary tracking-widest">40°49'16.0"N 14°25'34.0"E</span>
          <div className="h-px flex-1 bg-liminal-quaternary" />
        </div>

        <h1 className="font-mono text-3xl sm:text-4xl font-bold text-liminal-primary leading-tight mb-8 uppercase">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-widest text-liminal-tertiary uppercase">
          <span>{authorName}</span>
          <span className="text-liminal-quaternary">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-liminal-quaternary">·</span>
          <span>{readingTime} MIN READ</span>
        </div>
      </header>

      {/* ── Divider ── */}
      <div className="h-px w-full bg-liminal-quaternary mb-10" />

      {/* ── Post body ── */}
      <div
        ref={postBodyRef}
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* ── Post footer navigation ── */}
      <div className="mt-16 pt-8 border-t border-liminal-quaternary">
        <div className="flex flex-col sm:flex-row justify-between gap-4">

          {prevPost ? (
            <Link
              to={`/post/${prevPost.id}`}
              id={`nav-prev-post-${prevPost.id}`}
              className="group flex-1 border border-liminal-quaternary p-5 hover:border-liminal-secondary transition-colors duration-200"
            >
              <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary block mb-1">
                ← Previous
              </span>
              <p className="font-grotesk text-sm text-liminal-primary group-hover:opacity-60 transition-opacity">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextPost ? (
            <Link
              to={`/post/${nextPost.id}`}
              id={`nav-next-post-${nextPost.id}`}
              className="group flex-1 border border-liminal-quaternary p-5 hover:border-liminal-secondary transition-colors duration-200 text-right"
            >
              <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary block mb-1">
                Next →
              </span>
              <p className="font-grotesk text-sm text-liminal-primary group-hover:opacity-60 transition-opacity">
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
