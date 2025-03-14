import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-white/10 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
        >
          MA
        </Link>
        <div className="flex gap-6">
          {[
            { href: '#projects', label: 'Projects' },
            { href: '#about', label: 'About' },
            { href: '#contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
