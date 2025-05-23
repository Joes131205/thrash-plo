import React from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/login/Login";
import RegisterWarga from "./pages/register/RegisterWarga";
import RegisterKomunitas from "./pages/register/RegisterKomunitas";

const App = () => {
  function AnimatedRoutes() {
    const location = useLocation();

    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-warga" element={<RegisterWarga />} />
          <Route path="/register-komunitas" element={<RegisterKomunitas />} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
