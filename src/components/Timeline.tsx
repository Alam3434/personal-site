import React from 'react';

interface Job {
  title: string;
  company: string;
  startDate: string; // Format: 'YYYY-MM-DD'
  endDate?: string; // Format: 'YYYY-MM-DD' or 'Present'
}

interface TimelineProps {
  jobs: Job[];
}

const Timeline: React.FC<TimelineProps> = ({ jobs }) => {
  return (
    <div className="relative">
      <div className="border-l-2 border-gray-300">
        {jobs.map((job, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="absolute -left-3 w-6 h-6 bg-blue-500 rounded-full border-2 border-white" />
            <div className="ml-4">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">
                {job.startDate} - {job.endDate ? job.endDate : 'Present'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 