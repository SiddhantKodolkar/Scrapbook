import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Mediadisplay from "./pages/Mediadisplay";
import MediaDetails from "./pages/MediaDetails";

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/media" element={<Mediadisplay />} />
        <Route path="/media/:id" element={<MediaDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
