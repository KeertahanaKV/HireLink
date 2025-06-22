import { createContext, useState } from "react";
import { useEffect } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
 const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const [searchFilter, setSearchFilter] = useState(
   {
      title: "",
      location: "",
    }
  );
  const [isSearched,setIsSearched]=useState(false)

  const [jobs,setJobs]=useState([])

  const [showRecuriterLogin,setshowRecuriterLogin]=useState(false)

  const [companyToken,setCompanyToken] =useState(null)
  const [companyData,setCompanyData] =useState(null)
  //Function to fetch job data
  const fetchjobs=async()=>{
        setJobs(jobsData)
  }

  //Function to fetch company data
  const fetchCompanyData =async()=>{
    try {
      const {data} = await axios.get(`${backendUrl}/api/company/company`,
       {headers:{token:companyToken}}
      )
      if(data.success){
        setCompanyData(data.company)
        console.log(data)
      }
      else{
        toast.error(error.message)
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
     fetchjobs()
     console.log(backendUrl);
     const storedCompanytoken =localStorage.getItem('companyToken')
     if(storedCompanytoken){
       setCompanyToken(storedCompanytoken)
     }
  },[])
  useEffect(()=>{
       if(companyToken){
          fetchCompanyData()
       }
  },[companyToken])
  const value = {
    setSearchFilter,searchFilter,
    isSearched,setIsSearched,
    jobs,setJobs,
    showRecuriterLogin,setshowRecuriterLogin,
    companyToken,setCompanyToken,
    companyData,setCompanyData,
    backendUrl
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
