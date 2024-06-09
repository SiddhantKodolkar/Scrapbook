// src/components/UploadForm.jsx
import React, { useState } from "react";
import axios from "axios";

const Uploadform = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/media/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Media uploaded successfully");
      onUploadSuccess(); // Notify parent component to refresh the media list
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Upload failed");
    }
  };

  return (
       <form
      onSubmit={handleUpload}
      className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
      />
      <textarea
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out resize-none"
      />
      <div className="flex items-center">
        <label className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none transition-colors duration-200 ease-in-out">
          Choose File
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="hidden"
          />
        </label>
        {file && <span className="ml-2 text-gray-700">{file.name}</span>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-200 ease-in-out"
      >
        Upload
      </button>
    </form>
  );
};

export default Uploadform;
