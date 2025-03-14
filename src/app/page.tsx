import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";

// You can replace these with your actual project data
const projects = [
  {
    title: "Project 1",
    description: "Description of your first project",
    imageUrl: "/project1.jpg", // Add your project image
    technologies: ["Next.js", "React", "TypeScript"],
    projectUrl: "https://project1.com",
    githubUrl: "https://github.com/yourusername/project1",
  },
  // Add more projects here
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-black/10">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Hi, I'm Mohammad Alam 👋
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A passionate developer building amazing web experiences.
            </p>
            <div className="flex gap-4">
              <Link
                href="#projects"
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                View My Work
              </Link>
              <Link
                href="#contact"
                className="border border-black dark:border-white px-6 py-3 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4 bg-black/15">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-black/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-4">
                I'm a software developer passionate about creating elegant solutions to complex problems.
                With expertise in web development, I focus on building fast, responsive, and user-friendly applications.
              </p>
              <p className="text-lg mb-4">
                My technical skills include:
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 list-none p-0 mb-6">
                {[
                  "JavaScript/TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Python",
                  "SQL",
                ].map((skill) => (
                  <li
                    key={skill}
                    className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg text-center"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 bg-black/15">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="text-lg mb-6">
              I'm always open to new opportunities and collaborations.
              Feel free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:your.email@example.com"
                className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Email Me
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black dark:border-white px-6 py-3 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-center"
              >
                GitHub Profile
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black dark:border-white px-6 py-3 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-center"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-white/10 bg-black/60">
        <div className="container mx-auto max-w-4xl text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Mohammad Alam. All rights reserved.
        </div>
      </footer>
    </>
  );
}
