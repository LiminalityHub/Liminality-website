import { createContext, useState, useEffect } from 'react';
import defaultPosts from '../data/posts';

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem('blog_posts');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Corrupted data — fall back to defaults
      }
    }
    return defaultPosts;
  });

  // Auto-persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    const newPost = { ...post, id: Date.now() };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id, updates) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const importPosts = (jsonPosts) => {
    setPosts(jsonPosts);
  };

  const exportPosts = () => {
    return JSON.stringify(posts, null, 2);
  };

  const resetToDefaults = () => {
    setPosts(defaultPosts);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        importPosts,
        exportPosts,
        resetToDefaults,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
