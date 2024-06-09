import React from "react";
import Registerform from "../components/Registerform";

const Registerpage = () => {
  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-hd-beautiful-sunset-photos.jpg')",
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
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
              <h1 className="mb-2 text-2xl">Scrapbook</h1>
              <span className="text-gray-300">Enter your Details</span>
              <Registerform />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registerpage;
