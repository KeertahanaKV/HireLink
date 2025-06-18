import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import moment from "moment";
import JobCards from "../components/JobCards";

const ApplyJob = () => {
  const { id } = useParams();
  const [JobsData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchjob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchjob();
    }
  }, [id, jobs]);

  return JobsData ? (
    <>
      <Navbar />
      <div className="container mx-auto px-4 2xl:px-20 py-10">
        {/* Top Job Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <img
              src={JobsData.companyId.image}
              alt="Company Logo"
              className="w-20 h-20 object-contain rounded-lg"
            />
          </div>

          {/* Job Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {JobsData.title}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-gray-700 text-sm">
              <span className="flex items-center gap-1">
                <img
                  src={assets.suitcase_icon}
                  alt="Company"
                  className="w-4 h-4"
                />
                {JobsData.companyId.name}
              </span>
              <span className="flex items-center gap-1">
                <img
                  src={assets.location_icon}
                  alt="Location"
                  className="w-4 h-4"
                />
                {JobsData.location}
              </span>
              <span className="flex items-center gap-1">
                <img src={assets.person_icon} alt="Level" className="w-4 h-4" />
                {JobsData.level}
              </span>
              <span className="flex items-center gap-1">
                <img src={assets.money_icon} alt="Salary" className="w-4 h-4" />
                CTC: {JobsData.salary}
              </span>
            </div>
          </div>

          {/* Apply Button + Time */}
          <div className="flex flex-col items-center gap-2">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition">
              Apply Now
            </button>
            <p className="text-gray-600 text-sm">
              Posted {moment(JobsData.date).fromNow()}
            </p>
          </div>
        </div>

        {/* Job Description Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mt-10">
          <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Job Description
            </h2>

            <div
              className="job-description text-gray-700 leading-relaxed [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-1 [&_ul]:list-disc [&_ul]:list-inside"
              dangerouslySetInnerHTML={{ __html: JobsData.description }}
            ></div>

            <button className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
          {/* Right Section - More Jobs from the same company */}
          <div className="w-full lg:w-1/3 lg:ml-8 space-y-5 text-2xl font-bold">
            <h2>More jobs from {JobsData.companyId.name}</h2>

            {jobs
              .filter(
                (job) =>
                  job._id !== JobsData._id &&   // 1️⃣ Exclude the current job
                  job.companyId._id === JobsData.companyId._id   // 2️⃣ Include only same company
              )
              .slice(0, 4)  // 3️⃣ Limit to 4 jobs only
              .map((job, index) => (
                <JobCards key={index} job={job} />
              ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
