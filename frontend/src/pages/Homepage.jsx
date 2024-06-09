import React from "react";
import { useNavigate } from "react-router-dom";
import bg1 from '../assets/bg1.jpg'
import bg3 from '../assets/bg3.jpg'
import bg4 from '../assets/bg4.jpg'
import bg5 from '../assets/bg5.jpeg'
import bg6 from '../assets/bg6.jpg'
export default function Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white lg:w-1/3 lg:mb-0 mb-4">
              Scrapbook
            </h1>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-white font-extralight">
              Want to preserve your memories? Sign up to upload images/videos,
              add titles, descriptions, and tags, and view them in a visually
              appealing and interactive interface!
            </p>
            <button
              className="bg-pink-500 p-2 border rounded-xl  text-white font-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="bg-red-500 p-2 mx-2 border rounded-xl text-white font-semibold"
              onClick={() => navigate("/register")}
            >
              Register Now
            </button>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://huntingtonmeditation.com/wp-content/uploads/2014/04/featured-image-800x300-6.jpg"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={bg1}
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src={bg3}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src={bg4}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={bg5}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src={bg6}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
