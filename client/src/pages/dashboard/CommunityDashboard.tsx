import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useAuth } from "@/context/authContext";
import apiService from "@/utils/api";
import LoadingSpinner from "@/components/atomics/loadingSpinner";

const CommunityDashboard = () => {
    const { user, isLogin, loading } = useAuth();
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState({
        actions: [],
        volunteers: 0,
        completedActions: 0,
        inProgressActions: 0,
    });
    const [activeTab, setActiveTab] = useState("upcoming");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Redirect if not a community user
        if (!loading && (!isLogin || (user && user.role !== "community"))) {
            navigate("/login");
        }

        // Fetch dashboard data if authenticated
        if (isLogin && user && user.role === "community") {
            const fetchDashboardData = async () => {
                try {
                    setIsLoading(true);

                    // Get all cleanup actions
                    const actionsResponse =
                        await apiService.cleanupActions.getAll();

                    // Filter for this community's actions
                    const communityActions = actionsResponse.data.filter(
                        (action) => action.communityId === user._id
                    );

                    // Calculate stats
                    const completed = communityActions.filter(
                        (action) => action.progressStage === "completed"
                    ).length;

                    const inProgress = communityActions.filter(
                        (action) => action.progressStage !== "completed"
                    ).length;

                    // Get total volunteers
                    let totalVolunteers = 0;
                    for (const action of communityActions) {
                        try {
                            const volunteerResponse =
                                await apiService.volunteers.getByAction(
                                    action._id
                                );
                            totalVolunteers += volunteerResponse.data.length;
                        } catch (error) {
                            console.error("Error fetching volunteers:", error);
                        }
                    }

                    setDashboardData({
                        actions: communityActions,
                        volunteers: totalVolunteers,
                        completedActions: completed,
                        inProgressActions: inProgress,
                    });
                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchDashboardData();
        }
    }, [isLogin, loading, navigate, user]);

    // Show loading spinner while checking auth status or fetching data
    if (loading || isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
                <LoadingSpinner size="large" />
            </div>
        );
    }

    // Filter actions based on active tab
    const filteredActions = dashboardData.actions.filter((action) => {
        if (activeTab === "upcoming") {
            return (
                new Date(action.startDate) > new Date() &&
                action.progressStage !== "completed"
            );
        } else if (activeTab === "ongoing") {
            return (
                new Date(action.startDate) <= new Date() &&
                new Date(action.endDate) >= new Date() &&
                action.progressStage !== "completed"
            );
        } else if (activeTab === "completed") {
            return action.progressStage === "completed";
        }
        return true;
    });

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardHeader}>
                <h1>Dashboard Komunitas</h1>
                <p>Selamat datang, {user?.name}</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>
                        {dashboardData.actions.length}
                    </div>
                    <div className={styles.statLabel}>Total Aksi Bersih</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>
                        {dashboardData.volunteers}
                    </div>
                    <div className={styles.statLabel}>Total Relawan</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>
                        {dashboardData.completedActions}
                    </div>
                    <div className={styles.statLabel}>Aksi Selesai</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>
                        {dashboardData.inProgressActions}
                    </div>
                    <div className={styles.statLabel}>Aksi Berlangsung</div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Aksi Bersih</h2>

                <div className={styles.tabs}>
                    <div
                        className={`${styles.tabItem} ${activeTab === "upcoming" ? styles.active : ""}`}
                        onClick={() => setActiveTab("upcoming")}
                    >
                        Akan Datang
                    </div>
                    <div
                        className={`${styles.tabItem} ${activeTab === "ongoing" ? styles.active : ""}`}
                        onClick={() => setActiveTab("ongoing")}
                    >
                        Sedang Berlangsung
                    </div>
                    <div
                        className={`${styles.tabItem} ${activeTab === "completed" ? styles.active : ""}`}
                        onClick={() => setActiveTab("completed")}
                    >
                        Selesai
                    </div>
                </div>

                {filteredActions.length > 0 ? (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Judul</th>
                                <th>Lokasi</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Selesai</th>
                                <th>Status</th>
                                <th>Relawan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActions.map((action) => (
                                <tr key={action._id}>
                                    <td>{action.title}</td>
                                    <td>{action.location}</td>
                                    <td>
                                        {new Date(
                                            action.startDate
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td>
                                        {new Date(
                                            action.endDate
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td>
                                        {getProgressStageLabel(
                                            action.progressStage
                                        )}
                                    </td>
                                    <td>
                                        {action.volunteers}/
                                        {action.max_volunteers}
                                    </td>
                                    <td>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() =>
                                                navigate(
                                                    `/detail-aksi?id=${action._id}`
                                                )
                                            }
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className={styles.noData}>
                        Tidak ada aksi{" "}
                        {activeTab === "upcoming"
                            ? "yang akan datang"
                            : activeTab === "ongoing"
                              ? "yang sedang berlangsung"
                              : "yang selesai"}
                        .
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function to get readable progress stage label
function getProgressStageLabel(stage) {
    const labels = {
        verification: "Verifikasi",
        scheduling: "Penjadwalan",
        traveling: "Perjalanan",
        collection: "Pengumpulan",
        sorting: "Pemilahan",
        shipping: "Pengiriman",
        completed: "Selesai",
    };

    return labels[stage] || stage;
}

export default CommunityDashboard;
