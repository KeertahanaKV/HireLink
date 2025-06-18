import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
   const navigate=useNavigate()
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Logo */}
      <div className="mb-4">
        <img src={assets.company_icon} alt="Company Logo" className="w-8 h-8" />
      </div>

      {/* Job Title */}
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{job.title}</h4>

      {/* Location & Level Badges */}
      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded border border-blue-200">
          {job.location}
        </span>
        <span className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded border border-red-200">
          {job.level}
        </span>
      </div>

      {/* Job Description */}
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        <span dangerouslySetInnerHTML={{ __html: job.description.slice(0, 120) + '...' }} />
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-all">
          Apply now
        </button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`);scrollTo(0,0)}} className="border border-gray-300 text-sm text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCards;
