import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const ViewsApplication = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState([]);

  // ✅ Fetch company job applications
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

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
            {applicants.length === 0 ? (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="6">
                  No applications found.
                </td>
              </tr>
            ) : (
              applicants.map((applicant, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <span>{applicant.userId.name}</span>
                  </td>
                  <td className="px-6 py-4">{applicant.jobId?.title}</td>
                  <td className="px-6 py-4">{applicant.jobId?.location}</td>
                  <td className="px-6 py-4">
                    <a
                      href={applicant.userId?.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      Resume <img src={assets.resume_download_icon} alt="Download" className="w-4 h-4" />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs">
                        Accept
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewsApplication;
