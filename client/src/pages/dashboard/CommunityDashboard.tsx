import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useAuth } from "@/context/authContext";
import apiService from "@/utils/api";
import LoadingSpinner from "@/components/atomics/loadingSpinner";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import CleanupActionForm from "@/components/organisms/cleanupActionForm/CleanupActionForm";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface CleanupAction {
    _id: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
    progressStage:
        | "verification"
        | "scheduling"
        | "traveling"
        | "collection"
        | "sorting"
        | "shipping"
        | "completed";
    volunteers: number;
    max_volunteers: number;
    communityId: string;
    reportId: string;
}

const CommunityDashboard = () => {
    const { user, isLogin } = useAuth();
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState<{
        actions: CleanupAction[];
        volunteers: number;
        completedActions: number;
        inProgressActions: number;
    }>({
        actions: [],
        volunteers: 0,
        completedActions: 0,
        inProgressActions: 0,
    });
    const [activeTab, setActiveTab] = useState("upcoming");
    const [isLoading, setIsLoading] = useState(true);
    const [showActionForm, setShowActionForm] = useState(false);
    const [selectedActionId, setSelectedActionId] = useState<
        string | undefined
    >(undefined);

    // Function to fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);

            // Get all cleanup actions
            const actionsResponse = await apiService.cleanupActions.getAll();

            // Filter for this community's actions
            const communityActions = actionsResponse.data.filter(
                (action: any) => action.communityId === user?._id
            );

            // Calculate stats
            const completed = communityActions.filter(
                (action: any) => action.progressStage === "completed"
            ).length;

            const inProgress = communityActions.filter(
                (action: any) => action.progressStage !== "completed"
            ).length;

            // Get total volunteers
            let totalVolunteers = 0;
            for (const action of communityActions) {
                try {
                    const volunteerResponse =
                        await apiService.volunteers.getByAction(action._id);
                    totalVolunteers += volunteerResponse.data.length;
                } catch (error) {
                    console.error("Error fetching volunteers:", error);
                }
            }

            setDashboardData({
                actions: communityActions as CleanupAction[],
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

    useEffect(() => {
        // Redirect if not a community user
        if (!isLoading && (!isLogin || (user && user.role !== "community"))) {
            navigate("/login");
        }

        // Fetch dashboard data if authenticated
        if (isLogin && user && user.role === "community") {
            fetchDashboardData();
        }
    }, [isLogin, navigate, user]);

    // Show loading spinner while checking auth status or fetching data
    if (isLoading) {
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

    // Handle creating or updating an action
    const handleActionSuccess = () => {
        // Refresh dashboard data
        fetchDashboardData();
    };

    const handleEditAction = (actionId: string) => {
        setSelectedActionId(actionId);
        setShowActionForm(true);
    };

    const handleCreateNewAction = () => {
        setSelectedActionId(undefined);
        setShowActionForm(true);
    };

    // Update action progress stage
    const handleUpdateProgressStage = async (
        actionId: string,
        newStage: string
    ) => {
        try {
            setIsLoading(true);
            await apiService.cleanupActions.updateProgressStage(
                actionId,
                newStage as
                    | "verification"
                    | "scheduling"
                    | "traveling"
                    | "collection"
                    | "sorting"
                    | "shipping"
                    | "completed"
            );
            await fetchDashboardData();
        } catch (error) {
            console.error("Error updating progress stage:", error);
            alert("Gagal memperbarui status. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

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
                <div>
                    <h1>Dashboard Komunitas</h1>
                    <p>Selamat datang, {user?.name}</p>
                </div>
                <ButtonMain
                    btnText="Buat Aksi Bersih"
                    btnColor={true}
                    colorBorder={false}
                    textColor="white"
                    onClick={() => handleCreateNewAction()}
                />
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
                                <th colSpan={2}>Aksi</th>
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
                                        <select
                                            value={action.progressStage}
                                            onChange={(e) =>
                                                handleUpdateProgressStage(
                                                    action._id,
                                                    e.target.value
                                                )
                                            }
                                            className={styles.statusSelect}
                                        >
                                            <option value="verification">
                                                Verifikasi
                                            </option>
                                            <option value="scheduling">
                                                Penjadwalan
                                            </option>
                                            <option value="traveling">
                                                Perjalanan
                                            </option>
                                            <option value="collection">
                                                Pengumpulan
                                            </option>
                                            <option value="sorting">
                                                Pemilahan
                                            </option>
                                            <option value="shipping">
                                                Pengiriman
                                            </option>
                                            <option value="completed">
                                                Selesai
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        {action.volunteers}/
                                        {action.max_volunteers}
                                    </td>
                                    <td>
                                        <div
                                            className={styles.actionButtonGroup}
                                        >
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
                                            <button
                                                className={`${styles.actionButton} ${styles.editButton}`}
                                                onClick={() =>
                                                    handleEditAction(action._id)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </div>
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

            {/* Modal form for creating/editing cleanup actions */}
            {showActionForm && (
                <CleanupActionForm
                    isOpen={showActionForm}
                    onClose={() => setShowActionForm(false)}
                    onSuccess={handleActionSuccess}
                    actionId={selectedActionId}
                />
            )}
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
