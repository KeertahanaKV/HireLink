import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewsApllication = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-100 text-gray-800 font-semibold">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Job Title</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Resume</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{index + 1}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={applicant.imgSrc} alt="user" className="w-8 h-8 rounded-full object-cover" />
                  <span>{applicant.name}</span>
                </td>
                <td className="px-6 py-4">{applicant.jobTitle}</td>
                <td className="px-6 py-4">{applicant.location}</td>
                <td className="px-6 py-4">
                  <a href={applicant.resumeUrl} target='_blank' rel='noreferrer' className="flex items-center gap-2 text-blue-600 hover:underline">
                    Resume <img src={assets.resume_download_icon} alt="Download" className="w-4 h-4" />
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs">Accept</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewsApllication;
