import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();
  const { getToken } = useAuth();

  // 🔍 Job Filters and Search State
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearched, setIsSearched] = useState(false);

  // 💼 Jobs and Application Data
  const [jobs, setJobs] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userApplication, setUserApplication] = useState([]);

  // 🏢 Company/Recruiter States
  const [showRecuriterLogin, setshowRecuriterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // ✅ Fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch Clerk user + their applications
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setUserApplication(data.applications || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("User fetch failed: " + error.message);
    }
  };

  // ✅ Fetch user applications separately if needed
  const fetchUserApplication = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserApplication(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Applications fetch failed: " + error.message);
    }
  };

  // ✅ Fetch recruiter (company) data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Company fetch failed: " + error.message);
    }
  };

  // 🔁 On first app load: fetch jobs + restore recruiter session
  useEffect(() => {
    fetchJobs();

    const storedToken = localStorage.getItem("companyToken");
    if (storedToken) {
      setCompanyToken(storedToken);
    }
  }, []);

  // 🔁 Whenever companyToken is set, fetch company data
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // 🔁 Whenever Clerk user logs in, fetch their data
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  // 🧠 Save token to localStorage when recruiter logs in
  useEffect(() => {
    if (companyToken) {
      localStorage.setItem("companyToken", companyToken);
    }
  }, [companyToken]);

  // 🌐 Context Values for use throughout the app
  const value = {
    backendUrl,
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecuriterLogin,
    setshowRecuriterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    userData,
    setUserData,
    userApplication,
    setUserApplication,
    fetchJobs,
    fetchUserData,
    fetchUserApplication,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
