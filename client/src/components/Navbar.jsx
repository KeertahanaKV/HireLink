import React from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom"; // ✅ Add this

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="shadow-md py-4 bg-white">
      <div className="container px-1 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src={assets.logo} alt="logo" className="h-10 w-auto" />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Applied Jobs</Link>

            <p className="max-sm:hidden">hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Recruiter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
