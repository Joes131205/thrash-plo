import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import ScrollToTop from "./components/atomics/scrollToTop/scrollToTop";
import RoleBasedRoute from "./components/molecules/RoleBasedRoute";

// Public Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/login/Login";
import RegisterWarga from "./pages/register/RegisterWarga";
import RegisterKomunitas from "./pages/register/RegisterKomunitas";
import TentangKamiPage from "./pages/tentangKami/TentangKami";
import ArtikelPage from "./pages/artikel/Artikel";
import DetailArtikelPage from "./pages/artikel/DetailArtikel";
import DetailAksiPage from "./pages/aksiBersih/DetailAksi";
import TermsCondition from "./pages/others/TermsCon";
import Error404 from "./pages/others/PageNotFound";
import RouteTestingPage from "./pages/others/RouteTestingPage";

// Protected Pages
import AksiBersihPage from "./pages/aksiBersih/AksiBersih";
import BuatLaporanPage from "./pages/report/CreateReport";
import DetailLaporanPage from "./pages/report/DetailReport";
import RiwayatLaporanPage from "./pages/report/RiwayatLaporan";
import DashboardPage from "./pages/dashboard/Dashboard";

const App = () => {
  function AnimatedRoutes() {
    const location = useLocation();

    return (
      <>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* starter */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register-warga" element={<RegisterWarga />} />
            <Route path="/register-komunitas" element={<RegisterKomunitas />} />
            <Route path="/terms" element={<TermsCondition />} />
            <Route path="/404" element={<Error404 />} />
            {/* menu navbar */}
            <Route path="/tentang-kami" element={<TentangKamiPage />} />
            <Route path="/artikel" element={<ArtikelPage />} />
            <Route path="/aksi-bersih" element={<AksiBersihPage />} />
            <Route path="/buat-laporan" element={<BuatLaporanPage />} />
            <Route path="/riwayat-laporan" element={<RiwayatLaporanPage />} />
            {/* details */}
            <Route path="/detail-aksi" element={<DetailAksiPage />} />
            <Route path="/detail-artikel" element={<DetailArtikelPage />} />
            <Route path="/detail-laporan" element={<DetailLaporanPage />} />
            <Route path="/detail-laporan/:id" element={<DetailLaporanPage />} />
            {/* dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </AnimatePresence>
      </>
    );
  }

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
