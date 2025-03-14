"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StarBackground from "@/components/StarBackground";

export default function Home() {
  const [matrixMode, setMatrixMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div className="fixed inset-0">
        <StarBackground matrixMode={isHovering} />
      </div>
      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Hi, I'm Mohammad Alam 👋
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              A software engineer passionate about building scalable and efficient web applications.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/projects"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View My Work
              </Link>
              <div 
                className="relative w-12 h-12 mx-4 cursor-pointer transition-transform duration-300 hover:scale-110"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Image
                  src="/circle.svg"
                  alt="Matrix trigger"
                  fill
                  className={`transition-all duration-300 ${isHovering ? 'opacity-100 rotate-180' : 'opacity-70'}`}
                />
              </div>
              <Link
                href="/contact"
                className="border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-white/10 bg-black/60">
        <div className="container mx-auto max-w-4xl text-center text-gray-400">
          © {new Date().getFullYear()} Mohammad Alam. All rights reserved.
        </div>
      </footer>
    </>
  );
}
