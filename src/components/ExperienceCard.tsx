import React from 'react';

interface ExperienceCardProps {
  title: string;
  company: string;
  logo: string;
  location: string;
  startDate: string; // Format: 'YYYY-MM-DD'
  endDate?: string; // Format: 'YYYY-MM-DD' or 'Present'
  responsibilities: string[];
  technologies: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    title,
    company,
    logo,
    location,
    startDate,
    endDate,
    responsibilities,
    technologies,
  }) => {
    return (
    <div className="bg-black text-white p-5 rounded-lg shadow-md mb-6 w-full md:w-4/5 lg:w-3/4 xl:w-3/4 border border-green-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div className="flex items-center">
          <img src={logo} alt={`${company} logo`} className="w-12 h-12 mr-6" />
          <div>
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-gray-400">{company} - {location}</p>
            <p className="text-gray-500">
              {startDate} - {endDate ? endDate : 'Present'}
            </p>
          </div>
        </div>
        <ul className=" bg-black mt-4 list-disc list-inside p-4 mb-2">
          {responsibilities.map((item, index) => (
            <li key={index} className="text-gray-300 text-md">{item}</li>
          ))}
        </ul>
        <div className="flex justify-center items-center">
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
        </div>
        
      </div>
    );
  };
   
export default ExperienceCard; 