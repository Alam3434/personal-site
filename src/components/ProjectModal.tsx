import React from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    projectUrl: string;
    githubUrl: string;
  } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null; // Don't render if not open or no project data

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <img src={project.imageUrl} alt={project.title} className="w-full h-auto" />
        <p>{project.description}</p>
        <h3 className="font-semibold">Technologies:</h3>
        <ul>
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Project</a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Code</a>
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ProjectModal; 