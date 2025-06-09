import { Link } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const RouteTestingPage = () => {
    const { user, isLogin } = useAuth();

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Protected Routes Testing Page</h1>

            <div
                style={{
                    margin: "20px 0",
                    padding: "15px",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "5px",
                }}
            >
                <h2>Current User Status</h2>
                <p>Login status: {isLogin ? "Logged In" : "Not Logged In"}</p>
                {user ? (
                    <div>
                        <p>User name: {user.name}</p>
                        <p>User role: {user.role}</p>
                        <p>User email: {user.email}</p>
                    </div>
                ) : (
                    <p>No user data available. Please log in.</p>
                )}
            </div>

            <div style={{ margin: "20px 0" }}>
                <h2>Available Routes</h2>
                <ul style={{ listStyle: "none", padding: "0" }}>
                    <li style={{ margin: "10px 0" }}>
                        <Link
                            to="/admin-dashboard"
                            style={{
                                textDecoration: "none",
                                color: "#4a90e2",
                                fontWeight: "bold",
                            }}
                        >
                            Admin Dashboard (admin only)
                        </Link>
                    </li>
                    <li style={{ margin: "10px 0" }}>
                        <Link
                            to="/community-dashboard"
                            style={{
                                textDecoration: "none",
                                color: "#4a90e2",
                                fontWeight: "bold",
                            }}
                        >
                            Community Dashboard (community only)
                        </Link>
                    </li>
                    <li style={{ margin: "10px 0" }}>
                        <Link
                            to="/dlh-dashboard"
                            style={{
                                textDecoration: "none",
                                color: "#4a90e2",
                                fontWeight: "bold",
                            }}
                        >
                            DLH Dashboard (DLH only)
                        </Link>
                    </li>
                    <li style={{ margin: "10px 0" }}>
                        <Link
                            to="/user-dashboard"
                            style={{
                                textDecoration: "none",
                                color: "#4a90e2",
                                fontWeight: "bold",
                            }}
                        >
                            User Dashboard (regular users only)
                        </Link>
                    </li>
                    <li style={{ margin: "10px 0" }}>
                        <Link
                            to="/shared-dashboard"
                            style={{
                                textDecoration: "none",
                                color: "#4a90e2",
                                fontWeight: "bold",
                            }}
                        >
                            Shared Dashboard (admin and community only)
                        </Link>
                    </li>
                </ul>
            </div>

            <div style={{ margin: "20px 0" }}>
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: "#4a90e2",
                        fontWeight: "bold",
                    }}
                >
                    Back to Home
                </Link>
                {" | "}
                <Link
                    to="/login"
                    style={{
                        textDecoration: "none",
                        color: "#4a90e2",
                        fontWeight: "bold",
                    }}
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default RouteTestingPage;
