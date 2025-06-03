import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import LoadingSpinner from "@/components/atomics/loadingSpinner";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout
        logout();

        // Redirect to home page after a short delay
        const timer = setTimeout(() => {
            navigate("/", { replace: true });
        }, 1000);

        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                gap: "16px",
            }}
        >
            <LoadingSpinner size="large" />
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
