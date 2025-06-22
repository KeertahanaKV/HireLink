import User from "../models/User.js";
import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js'
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
 
//Get USer Data
export const getUserData = async (req, res) => {
    const userId=req.auth.userId
  try {
    const user = await User.findById(userId); // Exclude password

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in getUserData:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//Apply for a job
export const applyForJob = async (req, res) => {
  const userId = req.auth?.userId; // Clerk adds this automatically
  const { jobId } = req.body;

  if (!userId || !jobId) {
    return res.status(400).json({ success: false, message: "Missing user or job ID" });
  }

  try {
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if user already applied
    const alreadyApplied = await JobApplication.find({ userId, jobId });
    if (alreadyApplied.length > 0) {
      return res.status(400).json({ success: false, message: "Already applied to this job" });
    }
     const jobData= await Job.findById(jobId)
     if(!jobData){
         return res.status(400).json({ success: false, message: "Job not found" });
     }
    // Create application
    const newApplication = new JobApplication({
      userId,
      jobId,
      companyId: job.companyId,
      status: "pending",
    });

    await newApplication.save();

    return res.json({ success: true, message: "Applied successfully", application: newApplication });
  } catch (error) {
    console.error("Error applying for job:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//Get user applied application

export const getUserJobApplication = async (req, res) => {
  const userId = req.auth?.userId; // Clerk sets this

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // Find all applications by this user and populate job and company details
    const applications = await JobApplication.find({ userId })
      .populate('jobId', 'title description location category level salary')
      .populate('companyId', 'name email image');

    if (!applications || applications.length === 0) {
      return res.status(404).json({ success: false, message: "No job applications found" });
    }

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Upload file to Cloudinary
    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: 'auto',
    });

    // Update user resume URL
    userData.resume = resumeUpload.secure_url;

    // Delete temp file
    fs.unlinkSync(resumeFile.path);

    await userData.save();

    return res.json({
      success: true,
      message: 'Resume updated successfully',
      resumeUrl: resumeUpload.secure_url,
    });

  } catch (error) {
    console.error('Error in updateUserResume:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

