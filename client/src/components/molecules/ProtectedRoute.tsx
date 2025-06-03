import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLogin, loading } = useAuth();

    // While checking auth status, show nothing or a loading spinner
    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <div>Loading...</div>
            </div>
        );
    }

    // If not logged in, redirect to login
    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, show the protected route
    return <>{children}</>;
};

export default ProtectedRoute;
