/** Inserts HTML tag at cursor position in a textarea */
function insertTag(textarea, before, after, onChange) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end) || 'text';
  const replacement = before + selected + after;
  const newValue =
    textarea.value.substring(0, start) +
    replacement +
    textarea.value.substring(end);

  // Update the value through React's onChange
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLTextAreaElement.prototype,
    'value'
  ).set;
  nativeInputValueSetter.call(textarea, newValue);
  textarea.dispatchEvent(new Event('input', { bubbles: true }));

  // Restore focus and select the inserted text
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(
      start + before.length,
      start + before.length + selected.length
    );
  }, 0);
}

const tools = [
  { label: 'B', title: 'Bold', before: '<strong>', after: '</strong>' },
  { label: 'I', title: 'Italic', before: '<em>', after: '</em>' },
  { label: 'H2', title: 'Heading 2', before: '<h2>', after: '</h2>' },
  { label: 'H3', title: 'Heading 3', before: '<h3>', after: '</h3>' },
  { label: '"', title: 'Blockquote', before: '<blockquote>', after: '</blockquote>' },
  { label: '<>', title: 'Inline Code', before: '<code>', after: '</code>' },
  {
    label: 'Pre',
    title: 'Code Block',
    before: '<pre><code>',
    after: '</code></pre>',
  },
  { label: 'Link', title: 'Link', before: '<a href="#">', after: '</a>' },
  { label: 'UL', title: 'Unordered List', before: '<ul>\n<li>', after: '</li>\n</ul>' },
  { label: 'P', title: 'Paragraph', before: '<p>', after: '</p>' },
];

function HtmlToolbar({ textareaRef }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {tools.map((tool) => (
        <button
          key={tool.label}
          type="button"
          title={tool.title}
          onClick={() => {
            if (textareaRef.current) {
              insertTag(textareaRef.current, tool.before, tool.after);
            }
          }}
          className="px-2.5 py-1 text-xs font-mono font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-lg hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-colors"
        >
          {tool.label}
        </button>
      ))}
    </div>
  );
}

export default HtmlToolbar;
