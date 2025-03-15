import ProjectCard from "@/components/ProjectCard";
import Timeline from '@/components/Timeline';

const jobs = [
  {
    title: 'Software Engineer',
    company: 'Company A',
    startDate: '2021-01-01',
    endDate: '2022-12-31',
  },
  {
    title: 'Frontend Developer',
    company: 'Company B',
    startDate: '2020-01-01',
    endDate: '2020-12-31',
  },
  {
    title: 'Intern',
    company: 'Company C',
    startDate: '2019-06-01',
    endDate: '2019-12-31',
  },
  // Add more jobs as needed
];

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
      <Timeline jobs={jobs} />
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
