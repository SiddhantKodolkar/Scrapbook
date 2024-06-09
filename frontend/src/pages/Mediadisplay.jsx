// src/components/MediaDisplay.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Uploadform from "../components/Uploadform";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { logout } from "../utils/logout";
import useBlockNavigation from "../hooks/useBlockNavigation";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Mediadisplay = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [username, setUsername] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  useBlockNavigation(true); // Enable navigation blocking
  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/media", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setMediaItems(data.mediaItems);
      setUsername(data.username || "");
      if (response.data.length > 0) {
        setUsername(response.data[0].username); // Assuming username is same for all items
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchMedia();
    }
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px", // Rounded corners
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <header className="text-gray-600 body-font bg-gray-800 w-full">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="lg:w-2/5 inline-flex lg:justify-start ml-5 lg:ml-0">
            <button
              onClick={logout}
              className="inline-flex items-center text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0"
            >
              Logout
              
            </button>
          </div>

          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white">Scrapbook</span>
          </a>
          <nav className="flex text-white font-medium lg:w-2/5 flex-wrap items-center justify-end text-base md:ml-auto">
            Hi {username}!
          </nav>
        </div>
      </header>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded m-8"
      >
        Upload Media
      </button>
      <div className="mt-8 ">
        <h1 className="text-center text-3xl mb-4">
          View your Uploaded Media here
        </h1>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload Media
            </Typography>
            <Uploadform
              onUploadSuccess={() => {
                fetchMedia();
                setModalOpen(false);
              }}
            />
          </Box>
        </Modal>
        {mediaItems.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {mediaItems.map((item) => (
              <Card
                className="border border-black"
                key={item.id}
                sx={{ maxWidth: 400 }}
              >
                <CardActionArea onClick={() => navigate(`/media/${item.id}`)}>
                  <CardMedia
                    className="border-2 border-green-600"
                    component="img"
                    height="40"
                    image={`http://localhost:5000/${item.fileUrl}`}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        ) : (
          <Typography
            className="text-center text-white text-xl mt-4"
            variant="body1"
          >
            No media present
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Mediadisplay;
