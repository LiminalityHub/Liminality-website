import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-liminal-quaternary bg-liminal-bg relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 liminal-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* Left — Branding */}
          <div className="flex justify-start">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-liminal-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-liminal-primary" />
              </div>
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-liminal-primary">
                Liminality
              </span>
            </div>
          </div>

          {/* Center — Navigation */}
          <div className="flex justify-center">
            <nav className="flex items-center gap-6" aria-label="Footer navigation">
              <Link
                to="/"
                className="font-mono text-xs tracking-widest uppercase text-liminal-secondary hover:text-liminal-primary transition-colors duration-200"
              >
                Articles
              </Link>
              <div className="w-1.5 h-1.5 bg-liminal-primary" />
              <Link
                to="/projects"
                className="font-mono text-xs tracking-widest uppercase text-liminal-secondary hover:text-liminal-primary transition-colors duration-200"
              >
                Projects
              </Link>
            </nav>
          </div>

          {/* Right — Copyright */}
          <div className="flex justify-end">
            <p className="font-mono text-xs text-liminal-tertiary tracking-wider uppercase">
            Liminality™ {year} 
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
