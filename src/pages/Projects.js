import { useEffect } from 'react';

const projects = [
  {
    title: 'React Blog',
    description: 'A modern, minimalist blog built with React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    url: 'https://github.com/Lucalangella/react-blog',
    tag: 'Website',
  },
  {
    title: 'Object Detection App',
    description: 'An iOS app for real-time object detection using machine learning.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    url: 'https://github.com/Lucalangella',
    tag: 'App',
  },
  {
    title: 'Tennis Court Classifier',
    description: 'A deep learning model that classifies tennis court surfaces.',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop',
    url: 'https://github.com/Lucalangella',
    tag: 'AI / ML',
  },
  {
    title: 'Portfolio',
    description: 'Personal portfolio website showcasing projects and work.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    url: 'https://github.com/Lucalangella',
    tag: 'Website',
  },
];

function Projects() {
  useEffect(() => {
    document.title = 'Projects — Liminality';
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-sans font-bold text-gray-900 mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          A collection of apps, websites, and experiments I've built.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="aspect-[3/2] overflow-hidden bg-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="p-6">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {project.tag}
              </span>
              <h2 className="text-xl font-sans font-bold text-gray-900 mt-1 mb-2 group-hover:text-gray-700 transition-colors">
                {project.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;
