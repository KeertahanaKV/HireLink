import { createContext, useState } from "react";
import { useEffect } from "react";
import { assets, jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
 const backendUrl = import.meta.env.VITE_BACKEND_URL;
 

  const {user} =useUser()
  const {getToken} =useAuth()

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

  const [userData,setUserData] =useState(null)
  const [userApplication,setUserApplication] =useState([])

  //Function to fetch userdata
  const fectchUserData = async () =>{
    try {
        const token =await getToken()
        const {data} = await axios.get(`${backendUrl}/api/users/user`,
          {headers:{Authorization:`Bearer ${token}`}})
            if(data.success){
                setUserData(data.user)
                console.log(data.user)
            }else{
              toast.error(data.message)
            }
          
    } catch (error) {
      toast.error(error.message)
    }
  }
  //Function to fetch job data
  const fetchjobs=async()=>{
        try {
            const {data} =await axios.get(`${backendUrl}/api/jobs`)
            if(data.success){
                setJobs(data.jobs)
                console.log(data.jobs)
            }else{
              toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
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

  useEffect(()=>{
      if(user){
        fectchUserData()
      }
  },[user])
  const value = {
    backendUrl,
    setSearchFilter,searchFilter,
    isSearched,setIsSearched,
    jobs,setJobs,
    showRecuriterLogin,setshowRecuriterLogin,
    companyToken,setCompanyToken,
    companyData,setCompanyData,
     userData, setUserData,
  userApplication, setUserApplication,
  fetchjobs,fectchUserData
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
