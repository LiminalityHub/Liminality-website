import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import AdminLayout from '../components/AdminLayout';
import PostForm from '../components/PostForm';

function AdminPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, addPost, updatePost } = usePosts();
  const isEditing = !!id;

  const post = isEditing ? posts.find((p) => p.id === Number(id)) : null;

  useEffect(() => {
    document.title = isEditing
      ? `Edit Post — ${post?.title || 'Loading...'}`
      : 'New Post — Liminality';
  }, [isEditing, post]);

  const handleSubmit = (formData) => {
    if (isEditing) {
      updatePost(Number(id), formData);
    } else {
      addPost(formData);
    }
    navigate('/admin/dashboard', { replace: true });
  };

  if (isEditing && !post) {
    return (
      <AdminLayout>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <p className="text-gray-400 mb-8 italic">Post not found.</p>
          <Link
            to="/admin/dashboard"
            className="text-gray-900 font-medium hover:underline"
          >
            &larr; Back to dashboard
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              {isEditing ? 'Edit Post' : 'New Post'}
            </h1>
            <p className="text-gray-500">
              Create and manage your blog content.
            </p>
          </div>
          <Link
            to="/admin/dashboard"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            &larr; Back to dashboard
          </Link>
        </div>

        <PostForm
          initialData={post}
          onSubmit={handleSubmit}
          submitLabel={isEditing ? 'Save changes' : 'Publish post'}
        />
      </div>
    </AdminLayout>
  );
}

export default AdminPostEditor;
