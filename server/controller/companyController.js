import Company from "../models/Company.js"; // ✅ Use PascalCase for model
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
//  Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  // Validate input
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.json({ success: false, message: "Company already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    // Create new company
    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    await newCompany.save();

    return res.json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: newCompany._id,
        name: newCompany.name,
        email: newCompany.email,
        image: newCompany.image,
      },
      token: generateToken(newCompany._id),
    });
  } catch (error) {
    console.log("Error in registerCompany:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Company login

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingCompany = await Company.findOne({ email });
    if (!existingCompany) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, existingCompany.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      company: {
        _id: existingCompany._id,
        name: existingCompany.name,
        email: existingCompany.email,
        image: existingCompany.image,
      },
      token: generateToken(existingCompany._id),
    });
  } catch (error) {
    console.log("Error in loginCompany:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get company data
export const getCompanyData = async (req, res) => {
  try {
    // req.company was set in protectCompany middleware
    const company = req.company;

    if (!company) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
    });
  } catch (error) {
    console.log("Error in getCompanyData:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary,level,category  } = req.body;

  const companyId = req.company._id;
  console.log(companyId, { title, description, location, salary,level,category });
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });
    await newJob.save();
    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCompanyJobApplicants = async (req, res) => {};

//Get Company Posted Jobs

export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id; // from protectCompany middleware

    const jobs = await Job.find({ companyId });

    // Adding number of applicants to each job
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    
    res.json({ success: true, jobsData });

  } catch (error) {
    console.log("Error in getCompanyPostedJobs:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//Change Job Applications Status
export const ChangeJobApplicationsStatus = async (req, res) => {};


//Change job visibility
export const changeVisibility = async (req, res) => {
  const { jobId } = req.body;

  try {
    // Find the job and make sure it belongs to the logged-in company
    const job = await Job.findOne({ _id: jobId, companyId: req.company._id });

    if (!job) {
      return res.json({ success: false, message: "Job not found or unauthorized" });
    }

    // Toggle visibility
    job.visible = !job.visible;

    await job.save();

    res.json({ success: true, message: "Job visibility updated", visible: job.visible });
  } catch (error) {
    console.log("Error in changeVisibility:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

