"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-md border-b border-white/10 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className={`text-xl font-bold transition-colors ${isActive('/') 
            ? 'text-green-400' 
            : 'text-white hover:text-green-400'}`}
        >
          MA
        </Link>
        <div className="flex gap-6">
          {[
            { href: '/projects', label: 'Technical'},
            { href: '/creative', label: 'Creative'},
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label,}) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors ${isActive(href) 
                ? 'text-green-400' 
                : 'text-gray-300 hover:text-green-400'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
