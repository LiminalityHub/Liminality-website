import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-liminal-quaternary bg-liminal-bg relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 liminal-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Left — Branding */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border border-liminal-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-liminal-primary" />
              </div>
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-liminal-primary">
                Liminality
              </span>
            </div>
            <p className="font-grotesk text-sm text-liminal-secondary leading-relaxed max-w-xs">
              Thoughts on design, development, and building things that matter.
              Exploring the threshold between idea and execution.
            </p>
          </div>

          {/* Center — Quote with vertical markers */}
          <div className="relative flex flex-col items-center text-center">
            {/* top coordinate marker */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-liminal-tertiary tracking-wider">00°00′00″N</span>
              <div className="w-8 h-px bg-liminal-tertiary" />
              <span className="font-mono text-xs text-liminal-tertiary tracking-wider">THRESHOLD</span>
            </div>

            {/* Vertical line */}
            <div className="w-px h-6 bg-liminal-tertiary mb-4" />

            <blockquote className="font-mono text-xs tracking-widest uppercase text-liminal-secondary leading-loose">
              "HELLO PEOPLE<br />BY LUCA"
            </blockquote>

            {/* Vertical line */}
            <div className="w-px h-6 bg-liminal-tertiary mt-4 mb-4" />

            {/* bottom marker */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-liminal-tertiary tracking-wider">SPACE</span>
              <div className="w-8 h-px bg-liminal-tertiary" />
              <span className="font-mono text-xs text-liminal-tertiary tracking-wider">00°00′00″S</span>
            </div>
          </div>

          {/* Right — Navigation + copyright */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {[
                { path: '/', label: 'Articles' },
                { path: '/projects', label: 'Projects' },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className="font-mono text-xs tracking-widest uppercase text-liminal-secondary hover:text-liminal-primary transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="h-px w-16 bg-liminal-quaternary" />
            <p className="font-mono text-xs text-liminal-tertiary tracking-wider">
              {year} Liminality
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
