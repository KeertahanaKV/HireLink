import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { companyData, setCompanyData } = useContext(AppContext);
  const [name, setName] = useState(companyData?.name || "");
  const [imagePreview, setImagePreview] = useState(companyData?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "hirelink_profile_upload");
    formData.append("cloud_name", "dxhfc6y1u"); // 🔁 Replace this!

    try {
      setUploading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/dxhfc6y1u/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload failed");
      setUploading(false);
      return null;
    }
  };

  // Save changes
 const handleSave = async () => {
  if (!name) return toast.error("Name required");

  let finalImageURL = companyData.image;
  if (imageFile) {
    const uploadedURL = await uploadToCloudinary();
    if (!uploadedURL) return;
    finalImageURL = uploadedURL;
  }

  const updated = { companyId: companyData._id, name, image: finalImageURL };

  try {
    const res = await fetch("http://localhost:5000/api/company/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const data = await res.json();
    if (data.success) {
      setCompanyData(data.company); // update context
      toast.success("Profile updated");
    } else {
      toast.error("Update failed");
    }
  } catch (err) {
    toast.error("Something went wrong");
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-semibold mb-6">Edit Company Profile</h2>

      {/* Company Name Input */}
      <label className="block mb-2 font-medium">Company Name</label>
      <input
        className="border rounded w-full mb-4 px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Profile Picture Upload */}
      <label className="block mb-2 font-medium">Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-full mb-4"
        />
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;
