import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'React Blog',
    description: 'A modern, minimalist blog built with React and Tailwind CSS.',
    url: 'https://github.com/Lucalangella/react-blog',
    tag: 'WEBSITE',
    year: '2024',
  },
  {
    title: 'Object Detection App',
    description: 'An iOS app for real-time object detection using machine learning.',
    url: 'https://github.com/Lucalangella',
    tag: 'APP',
    year: '2024',
  },
  {
    title: 'Tennis Court Classifier',
    description: 'A deep learning model that classifies tennis court surfaces.',
    url: 'https://github.com/Lucalangella',
    tag: 'AI / ML',
    year: '2023',
  },
  {
    title: 'Portfolio',
    description: 'Personal portfolio website showcasing projects and work.',
    url: 'https://github.com/Lucalangella',
    tag: 'WEBSITE',
    year: '2023',
  },
];

function Projects() {
  useEffect(() => {
    document.title = 'Projects — Liminality';
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      {/* Section header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary">03</span>
        <div className="h-px flex-1 bg-liminal-quaternary" />
        <span className="font-mono text-xs tracking-widest uppercase text-liminal-secondary">Projects</span>
      </div>

      {/* Title block */}
      <div className="mb-16 pt-8 border-b border-liminal-quaternary pb-10">
        <h1 className="font-mono text-5xl sm:text-6xl font-bold text-liminal-primary leading-none tracking-tighter uppercase mb-4">
          PROJECTS
        </h1>
        <p className="font-grotesk text-sm text-liminal-secondary max-w-md leading-relaxed">
          A collection of apps, websites, and experiments I've built.
        </p>
      </div>

      {/* Project list */}
      <div className="divide-y divide-liminal-quaternary">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-${i + 1}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-7 hover:opacity-60 transition-opacity duration-200"
          >
            {/* Left: index + title + description */}
            <div className="flex items-start gap-6">
              <span className="font-mono text-xs text-liminal-tertiary mt-1 tracking-wider w-6 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="font-mono text-base font-bold text-liminal-primary leading-snug mb-1">
                  {project.title}
                </h2>
                <p className="font-grotesk text-sm text-liminal-secondary leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Right: tag + year + arrow */}
            <div className="flex items-center gap-6 shrink-0 pl-12 sm:pl-0">
              <span className="font-mono text-xs tracking-widest uppercase text-liminal-tertiary">
                {project.tag}
              </span>
              <span className="font-mono text-xs text-liminal-tertiary">{project.year}</span>
              <span className="font-mono text-xs tracking-widest text-liminal-secondary group-hover:translate-x-1 transition-transform duration-200 inline-block">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;
