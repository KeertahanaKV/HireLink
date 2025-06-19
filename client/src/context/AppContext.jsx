import { createContext, useState } from "react";
import { useEffect } from "react";
import { jobsData } from "../assets/assets";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState(
   {
      title: "",
      location: "",
    }
  );
  const [isSearched,setIsSearched]=useState(false)

  const [jobs,setJobs]=useState([])

  const [showRecuriterLogin,setshowRecuriterLogin]=useState(false)

  //Function to fetch job data
  const fetchjobs=async()=>{
        setJobs(jobsData)
  }
  useEffect(()=>{
     fetchjobs()
  },[])
  const value = {
    setSearchFilter,searchFilter,
    isSearched,setIsSearched,
    jobs,setJobs,
    showRecuriterLogin,setshowRecuriterLogin
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
