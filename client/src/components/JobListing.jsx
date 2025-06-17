import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCards from './JobCards';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter,jobs} = useContext(AppContext);

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>

        {/* ✅ Show current search only if user searched */}
        {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
          <>
            <h3 className="font-semibold text-lg mb-4">Current Search</h3>
            <div className="flex gap-2 flex-wrap mb-6">
              {searchFilter.title && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                    className="cursor-pointer w-4 h-4"
                    src={assets.cross_icon}
                    alt="cross-icon"
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                    className="cursor-pointer w-4 h-4"
                    src={assets.cross_icon}
                    alt="cross-icon"
                  />
                </span>
              )}
            </div>
          </>
        )}

        {/* ✅ Always show category filters */}
        <div className='max-lg:hidden'>
          <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
          <ul className='space-y-4 text-gray-600'>
            {JobCategories.map((category, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input className="scale-125" type="checkbox" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Always show location filters */}
        <div className='max-lg:hidden'>
          <h4 className='font-medium text-lg py-4 pt-14'>Search by Locations</h4>
          <ul className='space-y-4 text-gray-600'>
            {JobLocations.map((location, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input className="scale-125" type="checkbox" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2'>Latest jobs</h3>
        <p className='mb-8'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {jobs.map((job, index) => (
            <JobCards key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobListing;
