import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import RecuriteLogin from "./components/RecuriteLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewsApllication from "./pages/ViewsApllication";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const { showRecuriterLogin, companyToken } = useContext(AppContext);
  
  return (
    <div>
      {showRecuriterLogin && <RecuriteLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewsApllication />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
