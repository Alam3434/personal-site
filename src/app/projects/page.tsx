import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Project 1",
    description: "Description of your first project",
    imageUrl: "/project1.jpg",
    technologies: ["Next.js", "React", "TypeScript"],
    projectUrl: "https://project1.com",
    githubUrl: "https://github.com/yourusername/project1",
  },
  // Add more projects here
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </main>
  );
}
