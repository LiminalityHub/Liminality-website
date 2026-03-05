function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="flex items-center">
            <span className="font-serif font-bold text-gray-900">
              Liminality
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-500 text-center">
            Thoughts on design, development, and building things that matter.
          </p>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Liminality
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
