import React from 'react';

interface ExperienceCardProps {
  title: string;
  company: string;
  logo: string;
  location: string;
  startDate: string; // Format: 'YYYY-MM-DD'
  endDate?: string; // Format: 'YYYY-MM-DD' or 'Present'
  responsibilities: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    title,
    company,
    logo,
    location,
    startDate,
    endDate,
    responsibilities,
  }) => {
    return (
    <div className="bg-black text-white p-8 rounded-lg shadow-md mb-6 w-full md:w-4/5 lg:w-3/4 xl:w-3/4 border border-green-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
        <ul className=" bg-black mt-4 list-disc list-inside p-4">
          {responsibilities.map((item, index) => (
            <li key={index} className="text-gray-300 text-lg">{item}</li>
          ))}
        </ul>
      </div>
    );
  };
   
export default ExperienceCard; 