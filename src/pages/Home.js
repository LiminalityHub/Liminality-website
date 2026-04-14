import { useEffect } from 'react';
import PostPreview from '../components/PostPreview';
import { usePosts } from '../hooks/usePosts';

function Home() {
  const { posts, loading, error } = usePosts();

  useEffect(() => {
    document.title = 'Liminality — Threshold Space';
  }, []);

  const featuredPost = posts[0] || null;
  const recentPosts = posts.slice(1);

  return (
    <div className="min-h-screen">

      {/* ── Hero Section ── */}
      <section className="relative border-b border-liminal-quaternary overflow-hidden" aria-label="Hero">
        {/* Grid background */}
        <div className="absolute inset-0 liminal-grid opacity-50 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
          {/* Top markers row */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs text-liminal-tertiary tracking-widest">00°00′00″N</span>
            <div className="w-12 h-px bg-liminal-tertiary" />
            <span className="font-mono text-xs text-liminal-tertiary tracking-widest uppercase">Threshold Space</span>
          </div>

          {/* Main title */}
          <div className="relative mb-10">
            <h1
              className="font-mono text-6xl sm:text-8xl md:text-9xl font-bold text-liminal-primary leading-none tracking-tighter select-none"
              id="hero-title"
            >
              LIMINALITY
            </h1>
          </div>

          {/* Subtitle row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <p className="font-grotesk text-sm text-liminal-secondary max-w-sm leading-relaxed">
              Exploring the craft of software — from design systems and developer
              tools to the psychology of great user experiences.
            </p>

            {/* ENTER button + scroll indicator */}
            <div className="flex flex-col items-end gap-6">
              <a
                href="#featured"
                id="hero-enter-btn"
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase border border-liminal-primary px-5 py-3 hover:bg-liminal-primary hover:text-liminal-bg transition-all duration-300"
              >
                ENTER
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Section ── */}
      <section id="featured" className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary">01</span>
          <div className="h-px flex-1 bg-liminal-quaternary" />
          <span className="font-mono text-xs tracking-widest uppercase text-liminal-secondary">Featured</span>
        </div>

        {loading && (
          <p className="font-mono text-xs text-liminal-tertiary tracking-widest animate-pulse">
            LOADING…
          </p>
        )}
        {error && (
          <p className="font-mono text-xs text-red-500 tracking-widest">{error}</p>
        )}

        {!loading && featuredPost && (
          <PostPreview post={featuredPost} featured />
        )}
      </section>

      {/* ── Recent Section ── */}
      {!loading && recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary">02</span>
            <div className="h-px flex-1 bg-liminal-quaternary" />
            <span className="font-mono text-xs tracking-widest uppercase text-liminal-secondary">Recent</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {recentPosts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
