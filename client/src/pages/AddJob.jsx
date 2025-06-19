import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { JobCategories, JobLocations } from "../assets/assets";
import indianCities from "../data/indian_cities.json";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState("");
  const editorRef = useRef(null);
  const quillref = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillref.current) {
      quillref.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <form action="" className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Job Title</label>
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Job Description</label>
          <div
            ref={editorRef}
            className="bg-white h-40 border border-gray-300 rounded-lg"
          ></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1">Job Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Job Location</label>
            <input
              list="city-options"
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Search City"
            />
            <datalist id="city-options">
              {indianCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block font-semibold mb-1">Job Level</label>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="Beginner">Beginner Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Senior">Senior Level</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Salary (₹)</label>
          <input
            type="number"
            placeholder="25000"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
