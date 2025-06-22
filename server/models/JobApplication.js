import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String, // If you're using Clerk, this is Clerk's user ID
    required: true,
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;
