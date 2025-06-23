import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  const [showDropdown, setShowDropdown] = useState(false);

  // Handle logout
  const handleLogout = () => {
    setCompanyData(null);
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="h-10 w-auto cursor-pointer"
        />

        {companyData && (
          <div className="flex items-center gap-4 relative">
            <p className="max-sm:hidden text-gray-700 font-medium text-sm sm:text-base">
              Welcome, {companyData.name}
            </p>

            {/* Avatar & Dropdown Toggle */}
            <div className="relative">
              <img
                src={companyData.image}
                alt="Company"
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow border rounded-lg z-50 min-w-[140px]">
                  <ul className="text-sm text-blue-600 font-semibold">
                    <li
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/dashboard/edit-profile");
                      }}
                    >
                      Edit Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Body: Sidebar + Page Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="inline-block min-h-screen border-r-2 border-gray-200">
          <ul className="flex flex-col pt-5 gap-6 text-gray-800">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img src={assets.add_icon} alt="" className="w-5 h-5" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="w-5 h-5" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500" : ""
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="" className="w-5 h-5" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Nested Route Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
