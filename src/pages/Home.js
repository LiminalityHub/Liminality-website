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

        <div className="relative max-w-6xl mx-auto px-6 pt-4 pb-4">
          {/* Top markers row */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-liminal-tertiary tracking-widest">40°49'16.0"N 14°25'34.0"E</span>
          </div>

          {/* Main title */}
          <div className="relative mb-4">
            <h1
              className="font-mono text-6xl sm:text-8xl md:text-9xl font-bold text-liminal-primary leading-none tracking-tighter select-none"
              id="hero-title"
            >
              LIMINALITY
            </h1>
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
