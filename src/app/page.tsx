import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-4 bg-black/10">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Hi, I'm Mohammad Alam 👋
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              A passionate developer building amazing web experiences.
            </p>
            <div className="flex gap-4">
              <Link
                href="/projects"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View My Work
              </Link>
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
