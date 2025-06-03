import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { useAuth } from "@/context/authContext";
import LoadingSpinner from "@/components/atomics/loadingSpinner";

const ProfilePage = () => {
    const { user, isLogin, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not authenticated and not loading
        if (!isLogin && !loading) {
            navigate("/login");
        }
    }, [isLogin, loading, navigate]);

    // Show loading spinner while checking auth status
    if (loading) {
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

    // User should be available here if isLogin is true
    if (!user) return null;

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const getRoleLabel = (role: string) => {
        switch (role) {
            case "user":
                return "Warga";
            case "community":
                return "Komunitas";
            case "admin":
                return "Administrator";
            case "DLH":
                return "Dinas Lingkungan Hidup";
            default:
                return "User";
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                    {getInitials(user.name)}
                </div>
                <div className={styles.profileInfo}>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                    <span className={styles.profileRole}>
                        {getRoleLabel(user.role)}
                    </span>
                </div>
            </div>

            <div className={styles.profileDetails}>
                <div className={styles.profileSection}>
                    <h2>Informasi Pribadi</h2>

                    <div className={styles.detailRow}>
                        <div className={styles.detailLabel}>Nama</div>
                        <div className={styles.detailValue}>{user.name}</div>
                    </div>

                    <div className={styles.detailRow}>
                        <div className={styles.detailLabel}>Email</div>
                        <div className={styles.detailValue}>{user.email}</div>
                    </div>

                    <div className={styles.detailRow}>
                        <div className={styles.detailLabel}>Nomor Telepon</div>
                        <div className={styles.detailValue}>
                            {user.phone_number || "-"}
                        </div>
                    </div>

                    {user.role === "user" && (
                        <div className={styles.detailRow}>
                            <div className={styles.detailLabel}>Nomor KTP</div>
                            <div className={styles.detailValue}>
                                {user.ktp
                                    ? `${user.ktp.substring(0, 8)}****${user.ktp.substring(12)}`
                                    : "-"}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
