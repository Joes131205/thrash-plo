import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

interface RoleBasedRouteProps {
    children: ReactNode;
    allowedRoles: ("user" | "community" | "admin" | "DLH")[];
}

const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
    const { isLogin, user, loading } = useAuth();

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

    if (!isLogin || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        switch (user.role) {
            case "admin":
                return <Navigate to="/admin-dashboard" replace />;
            case "community":
                return <Navigate to="/community-dashboard" replace />;
            case "DLH":
                return <Navigate to="/dlh-dashboard" replace />;
            default:
                return <Navigate to="/user-dashboard" replace />;
        }
    }

    return <>{children}</>;
};

export default RoleBasedRoute;
