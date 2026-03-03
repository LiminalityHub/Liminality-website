import { useEffect } from 'react';
import PostPreview from '../components/PostPreview';
import { usePosts } from '../hooks/usePosts';

function Home() {
  const { posts } = usePosts();

  // Set page title
  useEffect(() => {
    document.title = 'The Craft — A Modern Blog';
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
          Ideas worth
          <span className="gradient-text"> building.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Exploring the craft of software — from design systems and developer
          tools to the psychology of great user experiences.
        </p>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="gradient-bar flex-1 opacity-30" />
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Latest Posts
        </span>
        <div className="gradient-bar flex-1 opacity-30" />
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
