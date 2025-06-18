import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Resume</h2>

        {/* Resume Upload Section */}
        <div className="flex flex-wrap gap-4 items-center mb-10">
          {isEdit ? (
            <>
              <label
                className="flex items-center gap-3 bg-blue-50 border border-blue-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-100"
                htmlFor="resumeupload"
              >
                <p className="text-blue-700 font-medium">Select Resume</p>
                <input
                  id="resumeupload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  className="hidden"
                />
                <img src={assets.profile_upload_icon} alt="upload-icon" className="w-5 h-5" />
              </label>
              <button
                onClick={(e) => setIsEdit(false)}
                className="bg-green-100 text-green-700 border border-green-400 rounded-lg px-4 py-2 hover:bg-green-200"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200"
                href=""
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-600 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Jobs Applied Table */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Company</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Job Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobsApplied.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={job.logo} alt="logo" className="w-8 h-8 object-contain" />
                    <span className="text-gray-700">{job.company}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{job.title}</td>
                  <td className="px-6 py-4 text-gray-700">{job.location}</td>
                  <td className="px-6 py-4 text-gray-700">{moment(job.date).format("ll")}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        job.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : job.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
