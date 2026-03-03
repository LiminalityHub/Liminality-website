import { useState, useRef, useEffect } from 'react';
import HtmlToolbar from './HtmlToolbar';

function PostForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().slice(0, 10),
    ...initialData,
  });
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setIsDirty(false);
  };

  const isValid =
    form.title.trim() &&
    form.excerpt.trim() &&
    form.content.trim() &&
    form.author.trim() &&
    form.date;

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all bg-white';

  return (
    <form onSubmit={handleSubmit}>
      {/* Top fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Your post title"
            maxLength={200}
            required
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author name"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          placeholder="A short summary of the post (shown on the home page)"
          maxLength={300}
          rows={2}
          required
          className={inputClass + ' resize-none'}
        />
        <p className="text-xs text-gray-400 mt-1">
          {form.excerpt.length}/300 characters
        </p>
      </div>

      {/* Content editor + preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Content (HTML)
        </label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Editor */}
          <div>
            <HtmlToolbar textareaRef={textareaRef} />
            <textarea
              ref={textareaRef}
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="<p>Write your post content here using HTML...</p>"
              rows={20}
              required
              className={inputClass + ' font-mono text-xs resize-y min-h-[400px]'}
            />
          </div>

          {/* Live preview */}
          <div>
            <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              Preview
            </div>
            <div className="border border-gray-200 rounded-xl p-6 bg-white min-h-[400px] overflow-y-auto">
              {form.content.trim() ? (
                <div
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: form.content }}
                />
              ) : (
                <p className="text-gray-300 text-sm italic">
                  Your preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={!isValid}
          className="px-8 py-3 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitLabel || 'Save Post'}
        </button>
        {isDirty && (
          <span className="text-sm text-amber-600">Unsaved changes</span>
        )}
      </div>
    </form>
  );
}

export default PostForm;
