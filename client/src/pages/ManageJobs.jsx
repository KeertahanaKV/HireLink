// import React, { useContext, useEffect, useState } from 'react';
// import { manageJobsData } from '../assets/assets';
// import moment from 'moment';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ManageJobs = () => {
//   const navigate =useNavigate()

//   const [jobs,setJobs] =useState(false)
//   const {backendUrl,companyToken} =useContext(AppContext)
//   //Function to fetch company job application data
//   const fetchCompanyJobs =async()=>{
//         try {
//             const {data} = await axios.get( `${backendUrl}/api/company/list-jobs`,
//               {headers:{token:companyToken}})
//               if(data.success){
//                 setJobs(data.jobsData,reverse())
//                 console.log(data.jobsData)
//               }
//             else{
//               toast.error(data.message)
//             }
//         } catch (error) {
//           toast.error(data.message)
          
//         }

//         useEffect (()=>{
//           if(companyToken){
//             fetchCompanyJobs()
//             console.log(data.jobsData)
//           }
//         },[companyToken])
//   }
//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Jobs</h2>
//       <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
//         <table className="min-w-full bg-white">
//           <thead className="bg-blue-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Applicants</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Visible</th>
//             </tr>
//           </thead>
//           <tbody>
//             {manageJobsData.map((job, index) => (
//               <tr key={index} className="border-t border-gray-200 hover:bg-blue-50">
//                 <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
//                 <td className="px-6 py-4 text-sm text-gray-700">{moment(job.date).format('ll')}</td>
//                 <td className="px-6 py-4 text-sm text-gray-700">{job.location}</td>
//                 <td className="px-6 py-4 text-center text-sm text-gray-700">{job.applicants}</td>
//                 <td className="px-6 py-4 text-center">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className='mt-4 flex justify-end'>
//         <button  onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-4 px-4 rounded-xl cursor-pointer'>Add new job</button>
//       </div>
//     </div>
//   );
// };

// export default ManageJobs;

import React, { useContext, useEffect, useState } from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);


    const fetchCompanyJobs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
          headers: { token: companyToken },
        });

        if (data.success) {
          setJobs(data.jobsData.reverse()); 
          console.log(data.jobsData);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  //FUnction to change job visibility
  const changeJobVisibility= async(id) =>{
      try {
        const {data} =await axios.post(`${backendUrl}/api/company/change-visiblity`,
          {jobId: id },
          {
            headers : {token:companyToken}
          }
        )
        if(data.success){
          toast.success(data.message)
          fetchCompanyJobs()
        }
      } catch (error) {
          toast.error(data.message)
      }
  }
  
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();

    }
  }, [backendUrl, companyToken]); // added backendUrl to dependencies just to be safe

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Jobs</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Applicants</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-blue-50">
                <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{moment(job.date).format('ll')}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{job.location}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-700">{job.applicants}</td>
                <td className="px-6 py-4 text-center">
                  <input  onChange={()=>changeJobVisibility(job._id)}
                    type="checkbox" checked={job.visible}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-black text-white py-4 px-4 rounded-xl cursor-pointer"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
