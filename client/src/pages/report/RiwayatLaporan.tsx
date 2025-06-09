import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./Report.module.css";
import { motion } from "framer-motion";
import TabBar from "@/components/molecules/tabBar/tabBar";
import TableSampah from "@/components/organisms/tableSampah/tableSampah";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "@/utils/api";
import { useAuth } from "@/context/authContext";

// Using the TabType from tabBar component
type TabType = "Menunggu" | "Diproses" | "Selesai";

// SampahData interface from tableSampah component
type SampahData = {
    id: number;
    lokasi: string;
    jenisSampah: string;
    tanggal: string;
    fotoUrl: string;
    status?: string; // Added for filtering purposes
    originalData?: ReportFromAPI; // To keep the original data for details page
};

// Backend report interface
interface ReportFromAPI {
    _id: string;
    trashId: string;
    description: string;
    photo: {
        near: string;
        far: string;
    };
    location: {
        lat: number;
        long: number;
    };
    category: "liar" | "pantai" | "sungai";
    weightEstimation: number;
    status: "waiting" | "processing" | "done";
    createdAt: string;
    userId: string;
}

export default function RiwayatLaporanPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>("Menunggu");
    const [laporanList, setLaporanList] = useState<SampahData[]>([]);

    // Map backend status to frontend tab status
    const mapBackendToTabStatus = (status: string): TabType => {
        switch (status) {
            case "waiting":
                return "Menunggu";
            case "processing":
                return "Diproses";
            case "done":
                return "Selesai";
            default:
                return "Menunggu";
        }
    };

    // Fetch user reports when the component mounts or when user changes
    useEffect(() => {
        const fetchUserReports = async () => {
            setIsLoading(true);
            try {
                if (!user || !user._id) {
                    console.log("No user found or user ID is missing");
                    setIsLoading(false);
                    return;
                }

                const response = await apiService.reports.getByUser(user._id);

                if (response.data) {
                    console.log("Reports fetched:", response.data.data);

                    // Map the API response to SampahData interface
                    const mappedReports: SampahData[] = response.data.data.map(
                        (report: ReportFromAPI) => {
                            // Format the date
                            const date = new Date(report.createdAt);
                            const formattedDate = `${date.getDate()}/${
                                date.getMonth() + 1
                            }/${date.getFullYear()}`;

                            // Convert category to display format in Indonesian
                            let jenisSampah = "";
                            switch (report.category) {
                                case "liar":
                                    jenisSampah = "Tumpukan Sampah Liar";
                                    break;
                                case "pantai":
                                    jenisSampah = "Sampah di Pantai";
                                    break;
                                case "sungai":
                                    jenisSampah = "Sampah di Sungai";
                                    break;
                                default:
                                    jenisSampah = "Lainnya";
                            }

                            // Extract location name or use coordinates
                            const lokasi = report.location
                                ? `${report.location.lat.toFixed(
                                      4
                                  )}, ${report.location.long.toFixed(4)}`
                                : "Lokasi tidak tersedia";
                            return {
                                id: report._id,
                                lokasi: lokasi,
                                jenisSampah: jenisSampah,
                                tanggal: formattedDate,
                                fotoUrl:
                                    (report.photo &&
                                        (report.photo.far ||
                                            report.photo.near)) ||
                                    "https://via.placeholder.com/60x40?text=No+Image",
                                status: mapBackendToTabStatus(report.status), // Convert backend status to TabType
                                originalData: report, // Keep the original data
                            };
                        }
                    );

                    setLaporanList(mappedReports);
                }
            } catch (error) {
                console.error("Error fetching user reports:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserReports();
    }, [user]);

    const filteredData = laporanList.filter(
        (item) => item.status === activeTab
    );
    const handleDetailClick = (id: number) => {
        const laporan = laporanList.find((lap) => lap.id === id);
        console.log("Selected report:", laporan);
        if (laporan) {
            // Navigate to detail page with ID in URL and full report data in state
            navigate(`/detail-laporan/${laporan.id}`, {
                state: laporan,
            });
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    // Handler for tab changes
    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
            >
                {/* NAVBAR */}
                <Navbar />
                {/* END NAVBAR */}

                {/* CONTENT */}
                <div className={styles.container}>
                    <h1 className={styles.titleMisi}>Riwayat Laporan</h1>

                    <TabBar
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />

                    <div className={styles.activeTab}>
                        {isLoading ? (
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: 50,
                                    color: "#2e2e2e",
                                }}
                            >
                                Memuat data...
                            </p>
                        ) : filteredData.length === 0 ? (
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: 50,
                                    color: "#2e2e2e",
                                }}
                            >
                                {!user
                                    ? "Silakan login untuk melihat riwayat laporan Anda."
                                    : "Belum ada laporan pada tab ini."}
                            </p>
                        ) : (
                            <TableSampah
                                data={filteredData}
                                onDetailClick={handleDetailClick}
                            />
                        )}
                    </div>
                </div>
                {/* END CONTENT */}

                {/* FOOTER */}
                <Footer />
                {/* END FOOTER */}
            </motion.div>
        </div>
    );
}
