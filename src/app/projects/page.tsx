import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import StarBackground from "@/components/StarBackground";
import Timeline from '@/components/Timeline';
import ExperienceCard from '@/components/ExperienceCard';

const projects = [
  {
    title: "Project 1",
    description: "Description of your first project",
    imageUrl: "/project1.jpg",
    technologies: ["Next.js", "React", "TypeScript"],
    projectUrl: "https://project1.com",
    githubUrl: "https://github.com/yourusername/project1",
  },
  {
    title: "Project 2",
    description: "Description of your first project",
    imageUrl: "/project1.jpg",
    technologies: ["Next.js", "React", "TypeScript"],
    projectUrl: "https://project1.com",
    githubUrl: "https://github.com/yourusername/project1",
  },
  // Add more projects here
];

const experiences = [
  {
    title: 'Software Engineer',
    company: 'NASA ',
    logo: '/assets/Work/nasa_logo.jpeg', 
    location: 'Berkeley, CA',
    startDate: 'May 2024',
    endDate: 'Aug 2024',
    responsibilities: [
      "Designed and built a React-based Grafana plug-in for NASA\’s Themis mission, allowing engineers to better visualize incoming spacecraft data and integrate the panel within their Grafana workflow.",
      "Implemented an alert page that compiles all alarming telemetry as cards, visualizing their time-series data for investigation",
      'Wrote a Python program to automatically log orbital passes of Themis spacecrafts in InfluxDB using Systemd units.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Space Science Lab',
    logo: '/assets/Work/spacescienceslaboratory_logo.jpeg', 
    location: 'Berkeley, CA',
    startDate: 'May 2024',
    endDate: 'Aug 2024',
    responsibilities: [
      'Enhanced data collection efficiency by transitioning synchronous loop structures to asynchronous coroutines using Asyncio.',
      'Developed interactive 3D animations of spacecraft trajectories with NASA\’s Spice-enhanced Cosmographia, enhancing real-time visualizations, precise mission simulations for aerospace evaluations and external education',
    ],
  },
  // Add more experiences as needed
];


export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20 relative">
      <div className="fixed inset-0 z-0">
        <StarBackground matrixMode={true} />
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-full"> {/* Increased max-width */}
          <h1 className="text-4xl font-bold mb-8">My Experience</h1>
          <div className="space-y-4 ">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-8 mt-8">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-opacity-50">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


