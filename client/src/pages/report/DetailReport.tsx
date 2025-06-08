import Navbar from "@/components/molecules/navbar/navbar";
import { motion } from "framer-motion";
import styles from "./Report.module.css";
import Footer from "@/components/organisms/footer/footer";
import { IcCopy, IcMenunggu } from "@/assets/icons";
import ProgressTimeline from "@/components/organisms/progressTimeline/progressTimeline";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import apiService from "@/utils/api";

interface Report {
    _id: string;
    id?: string;
    trashId: string;
    description: string;
    photo: {
        near: string;
        far: string;
    };
    photoNear?: string;
    photoFar?: string;
    fotoUrl?: string;
    fotoUrlNear?: string;
    location: {
        lat: number;
        long: number;
    };
    lokasi?: string;
    category: "liar" | "pantai" | "sungai";
    jenisSampah?: string;
    weightEstimation: number;
    weight?: number;
    status: "waiting" | "processing" | "done";
    createdAt: string;
    tanggal?: string;
    userId: string;
    notes?: string;
    originalData?: Record<string, unknown>;
}

export default function DetailLaporanPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [laporan, setLaporan] = useState<Report | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Get report ID from URL params or from location state
                let reportId;
                let reportData;

                if (location.pathname.includes("/detail-laporan/")) {
                    // Extract ID from URL path
                    reportId = location.pathname.split("/").pop();

                    if (reportId) {
                        // Fetch report from API
                        const response = await apiService.reports.getById(
                            reportId
                        );
                        if (response.data && response.data.data) {
                            reportData = response.data.data;
                        }
                    }
                } else if (location.state) {
                    // Use data from navigation state
                    reportData = location.state.originalData || location.state;
                }

                if (!reportData) {
                    setError("Report not found");
                    setIsLoading(false);
                    return;
                }

                // Format the date
                const date = new Date(reportData.createdAt);
                const formattedDate = `${date.getDate()}/${
                    date.getMonth() + 1
                }/${date.getFullYear()}`;

                // Convert category to display format in Indonesian
                let jenisSampah = "";
                switch (reportData.category) {
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
                        jenisSampah = reportData.jenisSampah || "Lainnya";
                }

                // Format location
                const lokasi = reportData.location
                    ? `${reportData.location.lat.toFixed(
                          4
                      )}, ${reportData.location.long.toFixed(4)}`
                    : reportData.lokasi || "Lokasi tidak tersedia";

                // Convert status to display format
                let statusDisplay;
                switch (reportData.status) {
                    case "waiting":
                        statusDisplay = "Menunggu";
                        break;
                    case "processing":
                        statusDisplay = "Diproses";
                        break;
                    case "done":
                        statusDisplay = "Selesai";
                        break;
                    default:
                        statusDisplay = reportData.status;
                } // Create a complete report object
                const completeReport = {
                    ...reportData,
                    id: reportData._id || reportData.id,
                    tanggal: formattedDate,
                    jenisSampah,
                    lokasi,
                    status: statusDisplay,
                    weight:
                        reportData.weightEstimation || reportData.weight || 0,
                    notes: reportData.description || reportData.notes || "-",
                    // Handle both old and new photo structures
                    fotoUrl: reportData.photo
                        ? typeof reportData.photo === "string"
                            ? reportData.photo
                            : reportData.photo.far || reportData.photo.near
                        : reportData.fotoUrl,
                    photoNear:
                        reportData.photo && reportData.photo.near
                            ? reportData.photo.near
                            : reportData.photoNear,
                    photoFar:
                        reportData.photo && reportData.photo.far
                            ? reportData.photo.far
                            : reportData.photoFar ||
                              (typeof reportData.photo === "string"
                                  ? reportData.photo
                                  : ""),
                };

                setLaporan(completeReport);
            } catch (error) {
                console.error("Error fetching report details:", error);
                setError("Failed to load report details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReportDetails();
    }, [location, params]);

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const handleCopy = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert("ID berhasil disalin ke clipboard!");
            })
            .catch((err) => {
                console.error("Gagal menyalin:", err);
            });
    };

    // Generate progress timeline data
    const dataProgress = laporan
        ? [
              {
                  title: "Laporan Dikirim",
                  subtitle: laporan.tanggal || "",
                  color: "#2BBBAD",
              },
              {
                  title: "Laporan Menunggu Diterima oleh Komunitas",
                  subtitle: "Komunitas : -",
                  color: "#2BBBAD",
              },
          ]
        : [];

    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div
                    className={styles.container}
                    style={{ textAlign: "center", padding: "50px" }}
                >
                    <h2>Memuat detail laporan...</h2>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !laporan) {
        return (
            <div>
                <Navbar />
                <div
                    className={styles.container}
                    style={{ textAlign: "center", padding: "50px" }}
                >
                    <h2>Error: {error || "Laporan tidak ditemukan"}</h2>
                    <ButtonMain
                        btnText={"Kembali ke Riwayat"}
                        btnColor={true}
                        colorBorder={false}
                        textColor={"white"}
                        weightFont={true}
                        onClick={() => navigate("/riwayat-laporan")}
                    />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            {/* NAVBAR */}
            <Navbar />
            {/* END NAVBAR */}

            {/* CONTENT */}
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
            >
                <div className={styles.container}>
                    <h1 className={styles.titleMisi}>Detail Laporan</h1>

                    <div className={styles.content}>
                        <div
                            className={styles.leftContent}
                            style={{ width: "35%" }}
                        >
                            <div className={styles.props}>
                                <h5 className={styles.propsTitle}>
                                    ID Laporan
                                </h5>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <p className={styles.propsDesc}>
                                        {laporan.id}
                                    </p>
                                    <button
                                        style={{
                                            cursor: "pointer",
                                            opacity: "0.8",
                                        }}
                                        onClick={() =>
                                            handleCopy(String(laporan.id))
                                        }
                                    >
                                        <img src={IcCopy} alt="icon copy" />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.props}>
                                <h5 className={styles.propsTitle}>
                                    Waktu Pengiriman
                                </h5>
                                <p className={styles.propsDesc}>
                                    {laporan.tanggal}
                                </p>
                            </div>

                            <div className={styles.props}>
                                <h5 className={styles.propsTitle}>
                                    Jenis Sampah
                                </h5>
                                <p className={styles.propsDesc}>
                                    {laporan.jenisSampah}
                                </p>
                            </div>

                            <div className={styles.props}>
                                <h5 className={styles.propsTitle}>
                                    Perkiraan Berat
                                </h5>
                                <p className={styles.propsDesc}>
                                    {laporan.weight ?? "-"} kg
                                </p>
                            </div>

                            <div className={styles.props}>
                                <h5 className={styles.propsTitle}>Lokasi</h5>
                                <p className={styles.propsDesc}>
                                    {laporan.lokasi}
                                </p>
                            </div>

                            <div className={styles.props}>
                                <h5 className={styles.propsTitle}>Catatan</h5>
                                <p className={styles.propsDesc}>
                                    {laporan.notes ?? "-"}
                                </p>
                            </div>

                            <div className={styles.props}>
                                <h5 className={styles.propsTitle}>Status</h5>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                                        padding: "4px 10px",
                                        borderRadius: 5,
                                        width: 108,
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: "#FF0000",
                                        }}
                                    >
                                        {laporan.status}
                                    </p>
                                    <img src={IcMenunggu} alt="" />
                                </div>
                            </div>

                            <div className={styles.props}>
                                <h5
                                    className={styles.propsTitle}
                                    style={{ marginBottom: 25 }}
                                >
                                    Foto Sampah
                                </h5>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 15,
                                    }}
                                >
                                    <div>
                                        <p className={styles.propsDesc}>
                                            Foto dari Dekat
                                        </p>{" "}
                                        <img
                                            src={
                                                laporan.photoNear ??
                                                laporan.fotoUrlNear ??
                                                (laporan.photo &&
                                                typeof laporan.photo !==
                                                    "string"
                                                    ? laporan.photo.near
                                                    : null) ??
                                                laporan.fotoUrl ??
                                                ""
                                            }
                                            alt="Foto dari dekat"
                                            style={{
                                                width: 350,
                                                marginTop: 10,
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className={styles.propsDesc}>
                                            Foto dari Jauh
                                        </p>
                                        <img
                                            src={
                                                laporan.photoFar ??
                                                (laporan.photo &&
                                                typeof laporan.photo !==
                                                    "string"
                                                    ? laporan.photo.far
                                                    : null) ??
                                                laporan.fotoUrl ??
                                                ""
                                            }
                                            alt="Foto dari jauh"
                                            style={{
                                                width: 350,
                                                marginTop: 10,
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightContent}>
                            <h5 className={styles.propsTitle}>Progress</h5>
                            <ProgressTimeline data={dataProgress} />
                            <ButtonMain
                                btnText={"Kembali ke Riwayat"}
                                btnColor={true}
                                colorBorder={false}
                                textColor={"white"}
                                weightFont={true}
                                onClick={() => navigate("/riwayat-laporan")}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* END CONTENT */}

            {/* FOOTER */}
            <Footer />
            {/* END FOOTER */}
        </div>
    );
}
