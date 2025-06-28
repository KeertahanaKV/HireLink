import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const { getToken } = useAuth();

  const {
    backendUrl,
    userData,
    userApplication,
    fetchUserData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData(); // refresh userData after upload
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        {/* Resume Upload Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Resume</h2>
        <div className="flex flex-wrap gap-4 items-center mb-10">
          {isEdit || !userData?.resume ? (
            <>
              <label
                htmlFor="resumeupload"
                className="flex items-center gap-3 bg-blue-50 border border-blue-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                <p className="text-blue-700 font-medium">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeupload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  className="hidden"
                />
                <img
                  src={assets.profile_upload_icon}
                  alt="upload-icon"
                  className="w-5 h-5"
                />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-100 text-green-700 border border-green-400 rounded-lg px-4 py-2 hover:bg-green-200"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200"
                href={userData.resume}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
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
              {userApplication.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-center text-gray-500" colSpan="5">
                    You haven't applied for any jobs yet.
                  </td>
                </tr>
              ) : (
                userApplication.map((app, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={app.companyId?.image || assets.company_icon}
                        alt="logo"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-gray-700">{app.companyId?.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{app.jobId?.title}</td>
                    <td className="px-6 py-4 text-gray-700">{app.jobId?.location}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {moment(app.createdAt).format("ll")}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
