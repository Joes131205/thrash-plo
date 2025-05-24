import React from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/login/Login";
import RegisterWarga from "./pages/register/RegisterWarga";
import RegisterKomunitas from "./pages/register/RegisterKomunitas";
import DetailAksiPage from "./pages/aksiBersih/DetailAksi";
import TentangKamiPage from "./pages/tentangKami/TentangKami";
import ArtikelPage from "./pages/artikel/Artikel";
import AksiBersihPage from "./pages/aksiBersih/AksiBersih";

const App = () => {
  function AnimatedRoutes() {
    const location = useLocation();

    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* starter */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-warga" element={<RegisterWarga />} />
          <Route path="/register-komunitas" element={<RegisterKomunitas />} />

          {/* menu navbar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/tentang-kami" element={<TentangKamiPage />} />
          <Route path="/artikel" element={<ArtikelPage />} />
          <Route path="/aksi-bersih" element={<AksiBersihPage />} />

          {/* details */}
          <Route path="/detail-aksi" element={<DetailAksiPage />} />
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
