// import React from "react";
// import { assets } from "../assets/assets";

// const Hero = () => {
//   return (
//     <div>
//       <div>
//         <h2>Over 10,000+ jobs to apply</h2>
//         <p>
//           cYour Next Big Career Move Starts Right Here - Explore the Best Job
//           Opportunities and Take the First Step Toward Your Future
//         </p>
//         <div>
//             <div>
//                 <img src={assets.search_icon} alt="search" />
//                 <input type="text" placeholder="Search for jobs"
//                 className="max-sm:text-xs p-2 rounded outline-none w-ful"/>
//             </div>
//              <div>
//                 <img src={assets.location_icon} alt="search" />
//                 <input type="text" placeholder="Location"
//                 className="max-sm:text-xs p-2 rounded outline-none w-ful"/>
//             </div>
//             <button>Search</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
  };

  return (
    <div className="conatainer 2xl:px-20 mx-15 my-10 rounded-2xl relative bg-gradient-to-br from-blue-500 via-indigo-400 to-blue-600 text-white py-24 px-4 overflow-hidden">
      {/* Decorative animated blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* CONTENT CONTAINER MATCHING NAVBAR */}
      <div className="container px-1 2xl:px-20 mx-auto relative z-10 text-center">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-sm max-sm:text-3xl">
          Discover 10,000+ Dream Jobs
        </h2>

        {/* Subtext */}
        <p className="text-lg max-w-2xl mx-auto mb-10 opacity-90 max-sm:text-sm">
          Your Next Big Career Move Starts Here. Search top jobs, filter by
          location, and take the first step toward your bright future.
        </p>

        {/* Search Section */}
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-center max-sm:text-sm">
          {/* Job Input */}
          <div className="flex items-center gap-2 bg-white/30 px-4 py-2 rounded-lg w-full sm:w-1/2 backdrop-blur-sm">
            <img src={assets.search_icon} alt="search" className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="bg-transparent w-full outline-none placeholder-white text-white"
              ref={titleRef}
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center gap-2 bg-white/30 px-4 py-2 rounded-lg w-full sm:w-1/3 backdrop-blur-sm">
            <img
              src={assets.location_icon}
              alt="location"
              className="w-5 h-5"
            />
            <input
              type="text"
              placeholder="Location"
              className="bg-transparent w-full outline-none placeholder-white text-white"
              ref={locationRef}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={onSearch}
            className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-all w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
