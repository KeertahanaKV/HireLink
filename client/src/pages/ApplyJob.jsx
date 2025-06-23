import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import moment from "moment";
import JobCards from "../components/JobCards";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [JobsData, setJobsData] = useState(null);
  const { jobs, backendUrl, userData, fetchjobs, fectchUserData } = useContext(AppContext);
  const { getToken } = useAuth();

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobsData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch job");
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) return toast.error("Login to apply for jobs");
      if (!userData.resume){
        navigate('/applications')
          return toast.error("Upload resume to apply");
      }

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        {jobId:JobsData._id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Application submitted!");
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  return JobsData ? (
    <>
      <Navbar />
      <div className="container mx-auto px-4 2xl:px-20 py-10">
        {/* Top Job Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow">
          <div className="flex-shrink-0">
            <img
              src={JobsData.companyId.image}
              alt="Company Logo"
              className="w-20 h-20 object-contain rounded-lg"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{JobsData.title}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-gray-700 text-sm">
              <span className="flex items-center gap-1">
                <img src={assets.suitcase_icon} className="w-4 h-4" />
                {JobsData.companyId.name}
              </span>
              <span className="flex items-center gap-1">
                <img src={assets.location_icon} className="w-4 h-4" />
                {JobsData.location}
              </span>
              <span className="flex items-center gap-1">
                <img src={assets.person_icon} className="w-4 h-4" />
                {JobsData.level}
              </span>
              <span className="flex items-center gap-1">
                <img src={assets.money_icon} className="w-4 h-4" />
                CTC: {JobsData.salary}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={applyHandler}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
            <p className="text-gray-600 text-sm">
              Posted {moment(JobsData.date).fromNow()}
            </p>
          </div>
        </div>

        {/* Job Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mt-10">
          <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>

            <div
              className="job-description text-gray-700 leading-relaxed [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-1 [&_ul]:list-disc [&_ul]:list-inside"
              dangerouslySetInnerHTML={{ __html: JobsData.description }}
            ></div>

            <button
              onClick={applyHandler}
              className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          </div>

          {/* More jobs from same company */}
          <div className="w-full lg:w-1/3 lg:ml-8 space-y-5 text-2xl font-bold">
            <h2>More jobs from {JobsData.companyId.name}</h2>

            {Array.isArray(jobs) &&
              jobs
                .filter((job) => {
                  if (job._id === JobsData._id) return false;
                  if (typeof job.companyId === "object") {
                    return job.companyId._id === JobsData.companyId._id;
                  } else {
                    return job.companyId === JobsData.companyId._id;
                  }
                })
                .slice(0, 4)
                .map((job, index) => <JobCards key={index} job={job} />)}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
