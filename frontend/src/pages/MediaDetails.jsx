// src/pages/MediaDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MediaDetails = () => {
  const { id } = useParams();
  const [mediaItem, setMediaItem] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditable, setIsEditable] = useState(false); // State to track input enable/disable
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/media/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMediaItem(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching media details:", error);
      }
    };

    fetchMediaDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/media/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Media updated successfully");
      navigate("/media");
    } catch (error) {
      console.error("Error updating media:", error);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/media/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Media deleted successfully");
      navigate("/media");
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Delete failed");
    }
  };

  if (!mediaItem) return <div>Loading...</div>;
  
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-700 items-center justify-center p-4"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {mediaItem.title}
          </h1>
          <img
            src={`http://localhost:5000/${mediaItem.fileUrl}`}
            alt={mediaItem.title}
            className="max-w-full rounded-lg shadow-lg mb-4"
          />
          <p className="text-lg mb-4 text-center">{mediaItem.description}</p>
          <div className="space-y-4">
            {isEditable ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                <textarea
                  value={description}
                  placeholder="Description"
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </>
            )}
            <div className="space-x-4 text-center">
              <button
                onClick={() => setIsEditable(!isEditable)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
              >
                {isEditable ? "Disable Editing" : "Enable Editing"}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
              {isEditable && (
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaDetails;
