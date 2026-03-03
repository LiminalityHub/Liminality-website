import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import AdminLayout from '../components/AdminLayout';
import PostCard from '../components/PostCard';
import DeleteModal from '../components/DeleteModal';

function AdminDashboard() {
  const { posts, deletePost, exportPosts, importPosts } = usePosts();
  const [deleteId, setDeleteId] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    document.title = 'Admin Dashboard — The Craft';
  }, []);

  const handleDelete = (id) => {
    deletePost(id);
    setDeleteId(null);
  };

  const handleExport = () => {
    exportPosts();
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImporting(true);
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
          importPosts(data);
          alert(`Successfully imported ${data.length} posts!`);
        } else {
          alert('Invalid file format. Please upload a JSON array of posts.');
        }
      } catch (err) {
        alert('Error parsing file: ' + err.message);
      }
      setIsImporting(false);
      e.target.value = ''; // Reset input
    }
  };

  const postToDelete = posts.find((p) => p.id === deleteId);

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-500">
              Manage your blog content and collaborate with others.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:border-brand-400 hover:text-brand-600 transition-all text-sm flex items-center gap-2">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              {isImporting ? 'Importing...' : 'Import JSON'}
            </label>
            <button
              onClick={handleExport}
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:border-brand-400 hover:text-brand-600 transition-all text-sm"
            >
              Export JSON
            </button>
            <Link
              to="/admin/posts/new"
              className="px-6 py-2.5 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-colors text-sm shadow-sm"
            >
              + New Post
            </Link>
          </div>
        </div>

        {/* Posts list */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={() => setDeleteId(post.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-gray-400 mb-6 italic">No posts yet.</p>
            <Link
              to="/admin/posts/new"
              className="text-brand-600 font-medium hover:underline"
            >
              Create your first post &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <DeleteModal
          post={postToDelete}
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;
