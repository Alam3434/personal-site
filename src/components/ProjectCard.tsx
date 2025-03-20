"use client";

import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  technologies,
  projectUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all hover:shadow-lg" style={{ backgroundColor: 'rgba(15, 15, 1, 1)' }}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} preview`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-green-100 dark:bg-green-800"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {projectUrl && (
            <Link
              href={projectUrl}
              target="_blank"
              className="text-sm font-medium hover:underline"
            >
              View Project →
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              className="text-sm font-medium hover:underline"
            >
              GitHub →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
