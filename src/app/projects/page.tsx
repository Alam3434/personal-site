import ProjectCard from "@/components/ProjectCard";
import StarBackground from "@/components/StarBackground";
import ExperienceCard from '@/components/ExperienceCard';
// import React, { useState } from 'react';


const projects = [
  {
    title: "Shcoota App",
    description: "Developed a feature-rich iOS app for renting electric scooters, utilizing SwiftUI, MapKit, and CoreLocation.Implemented real-time location tracking, enabling users to find and book scooters through a dynamic map interface. Integrated Firebase for backend services, user authentication, real-time database, and cloud functions for logic. Managed payment processing with Stripe integration, ensuring secure and efficient transaction management.",
    imageUrl: "/assets/Projects/SchootaApp.png",
    technologies: ["Swift", "Firebase", "MapKit", "CoreLocation", "Stripe"],
    githubUrl: "https://github.com/Alam3434/Shcoota",
  },
  {
    title: "Pintos Operating System",
    description: "Constructed the Pintos OS using C and x86, implementing thread management, user programs and virtual memory.Implemented priority scheduling and synchronization algos to boost system performance and resource management.Designed and integrated a virtual memory system for efficient user process handling and memory allocation.Enhanced the file system, adding extensible files, subdirectories, and buffer caching to optimize I/O operations.",
    imageUrl: "/assets/Projects/pintos.eecda492.png",
    technologies: ["C", "x86"],
    githubUrl: "https://github.com/yourusername/project1",
  },
  {
    title: "NASA mission simulations",
    description: "Developed interactive 3D animations of spacecraft trajectories with NASA’s Spice-enhanced Cosmographia, enhancing real-time visualizations, precise mission simulations for aerospace evaluations and external education.",
    imageUrl: "/assets/Projects/Cosmographia.png",
    technologies: ["Cosmographia", "Python"],
    projectUrl: "https://www.youtube.com/watch?v=4SwkXqHudc8"
  },
  {
    title: "Secure File Sharing",
    description: "Developed secure file sharing service in Golang, utilizing encryption, hashing, MACs, etc. Designed stateless system that ensures confidentiality and integrity of data in unsecured data stores.",
    imageUrl: "/assets/Projects/logo.png",
    technologies: ["Go Programming Language"],
    githubUrl: "https://github.com/cs161-students/sp24-proj2-chow-mein",
  },
  {
    title: "X-Wing vs Death Star - 3D Space Shooter",
    description: "A 3D space shooter game where players pilot an X-Wing fighter to destroy the Death Star, inspired by Star Wars: Episode IV. Built using Three.js, the game features smooth flight mechanics, laser combat, and a dynamic 3D environment. Engage in thrilling space battles with realistic physics and basic explosions.",
    imageUrl: "/assets/Projects/3dSpaceGame.png",
    technologies: ["Three.js", "JavaScript", "HTML5",  "CSS3"],
    githubUrl: "https://github.com/Alam3434/3D-SpaceGame",
  },
  
  // Add more projects here
];

const experiences = [
  {
    title: 'Software Engineer Intern',
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
    technologies: ['React', 'Grafana', 'MongoDB', 'Docker'],
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
      'Developed interactive 3D animations of spacecraft trajectories with NASA\’s Spice-enhanced Cosmographia, enhancing real-time visualizations, precise mission simulations for aerospace evaluations and external education.',
    ],
    technologies: ['React', 'InfluxDB', 'SystemD'],
  },
  {
    title: 'Contract Software Engineer',
    company: 'SongTradr',
    logo: '/assets/Work/songtradr_inc_logo.jpeg', 
    location: 'Berkeley, CA',
    startDate: 'Jan 2023',
    endDate: 'May 2023',
    responsibilities: [
      'Implemented a dynamic dashboard that visualizes AI-generated song data for 260 tags into color-coordinated stacked charts.',
      'Developed an algorithm to determine the “Interesting” tags throughout the song using time-series data from Musicube.',
      'Converted and normalized the data to fit the graph components in Typescript React, along with auto tag suggest algorithm.',
    ],
    technologies: ['React', 'Grafana'],
  },
  {
    title: 'Contract Project Manager',
    company: 'Industrial Business',
    logo: '/assets/Work/bin95-logo-2024.webp', 
    location: 'Berkeley, CA',
    startDate: 'January 2024',
    endDate: 'June 2024',
    responsibilities: [
      'Led a team of 6 to develop a web-based electrical circuit simulation platform using React-Flow and Django.',
      'Designed and implemented current flow logic for different electrical components like capacitors, resistors, etc.',
      'Built a backend infrastructure to securely handle user authentication, registration, and efficient storage and retrieval of circuit files and custom components, optimizing database interactions for performance and scalability.',
    ],
    technologies: ['React', 'Python','Django','ReactFlow', 'Auth0' ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Entertainment 360',
    logo: '/assets/Work/Entertainment360.jpeg', 
    location: 'Berkeley, CA',
    startDate: 'Jun 2022',
    endDate: 'Aug 2022',
    responsibilities: [
      'Built a Python web-scrapping bot to automate data entry from IMDB Pro using Selenium and BeautifulSoup. Given actor\’s name it would directly scrap their data from IMDB Pro website in a coherent manner, optimizing the process by 500%.',
      'Built an Instagram bot using Selenium to retrieve data on client followers and consulted content based on the data.',
    ],
    technologies: ['Python', 'Selenium', 'BeautifulSoup', 'SMPTP'],
  },
  
  // Add more experiences as needed
];


// Assuming you have a projects array defined
// const [selectedProject, setSelectedProject] = useState(null);
// const [isModalOpen, setIsModalOpen] = useState(false);

// const openModal = (project: any) => {
//   setSelectedProject(project);
//   setIsModalOpen(true);
// };

// const closeModal = () => {
//   setIsModalOpen(false);
//   setSelectedProject(null);
// };


export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20 relative">
      <div className="fixed inset-0 z-0">
        <StarBackground matrixMode={true} />
      </div>
      
      {/* New container to center content */}
      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div className="w-full max-w-7xl px-4 py-8"> {/* Adjusted content container */}
          <h1 className="text-4xl font-bold mb-8 text-center">Work Experience</h1>
          
          {/* Center the ExperienceCards */}
          <div className="space-y-4 flex flex-col items-center">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-8 mt-8 text-center">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-opacity-50">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}



