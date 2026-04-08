import { createContext, useState, useEffect, useCallback } from 'react';
import defaultPosts from '../data/posts';
import { fetchPosts } from '../api/posts';

export const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPosts();
      const list = Array.isArray(data) ? data : [];
      const published = list.filter((post) => (post.status || 'published') === 'published');
      
      if (published.length === 0) {
        setPosts(defaultPosts);
      } else {
        setPosts(published);
      }
    } catch (err) {
      setError(err?.message || 'Unable to load posts.');
      setPosts(defaultPosts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        refreshPosts: loadPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
