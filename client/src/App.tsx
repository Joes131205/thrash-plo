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
import DashboardDLH from "./pages/dashboard/DLH/DLH";
import CommunityDashboard from "./pages/dashboard/CommunityDashboard";
import AksiBersihPage from "./pages/aksiBersih/AksiBersih";
import BuatLaporanPage from "./pages/report/CreateReport";
import DetailLaporanPage from "./pages/report/DetailReport";
import RiwayatLaporanPage from "./pages/report/RiwayatLaporan";

const App = () => {
    function AnimatedRoutes() {
        const location = useLocation();

        return (
            <>
                <ScrollToTop />
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/register-warga"
                            element={<RegisterWarga />}
                        />
                        <Route
                            path="/register-komunitas"
                            element={<RegisterKomunitas />}
                        />
                        <Route path="/terms" element={<TermsCondition />} />
                        <Route
                            path="/tentang-kami"
                            element={<TentangKamiPage />}
                        />
                        <Route path="/artikel" element={<ArtikelPage />} />
                        <Route
                            path="/detail-artikel"
                            element={<DetailArtikelPage />}
                        />
                        <Route
                            path="/detail-aksi"
                            element={<DetailAksiPage />}
                        />
                        <Route
                            path="/test-routes"
                            element={<RouteTestingPage />}
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin-dashboard"
                            element={
                                <RoleBasedRoute allowedRoles={["admin"]}>
                                    <DashboardDLH />
                                </RoleBasedRoute>
                            }
                        />

                        {/* Community Routes */}
                        <Route
                            path="/community-dashboard"
                            element={
                                <RoleBasedRoute allowedRoles={["community"]}>
                                    <CommunityDashboard />
                                </RoleBasedRoute>
                            }
                        />

                        {/* DLH Routes */}
                        <Route
                            path="/dlh-dashboard"
                            element={
                                <RoleBasedRoute allowedRoles={["DLH"]}>
                                    <DashboardDLH />
                                </RoleBasedRoute>
                            }
                        />

                        {/* User Routes */}
                        <Route
                            path="/aksi-bersih"
                            element={
                                <RoleBasedRoute allowedRoles={["user"]}>
                                    <AksiBersihPage />
                                </RoleBasedRoute>
                            }
                        />
                        <Route
                            path="/buat-laporan"
                            element={
                                <RoleBasedRoute allowedRoles={["user"]}>
                                    <BuatLaporanPage />
                                </RoleBasedRoute>
                            }
                        />
                        <Route
                            path="/detail-laporan/:id"
                            element={
                                <RoleBasedRoute allowedRoles={["user"]}>
                                    <DetailLaporanPage />
                                </RoleBasedRoute>
                            }
                        />
                        <Route
                            path="/riwayat-laporan"
                            element={
                                <RoleBasedRoute allowedRoles={["user"]}>
                                    <RiwayatLaporanPage />
                                </RoleBasedRoute>
                            }
                        />

                        {/* Error Page - Must be last */}
                        <Route path="*" element={<Error404 />} />
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
