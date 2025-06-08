import apiService from "@/utils/api";
import {
    createContext,
    useState,
    ReactNode,
    useEffect,
    useContext,
} from "react";

type User = {
    _id: string;
    name: string;
    email: string;
    phone_number: string;
};

type AuthContextType = {
    isLogin: boolean;
    user: User | null;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (
        name: string,
        email: string,
        password: string,
        phone_number: string,
        ktp: string
    ) => Promise<boolean>;
    logout: () => void;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const fetchUserData = async () => {
        try {
            const response = await apiService.auth.getCurrent();

            if (response?.data) {
                setUser(response.data);
            }
            console.log(response);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            localStorage.removeItem("token");
            setUser(null);
            setIsLogin(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
            fetchUserData();
        }
    }, []);

    const loginUser = async (
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            const response = await apiService.auth.login(email, password);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                setUser(response.data.user);
                setIsLogin(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const registerUser = async (
        name: string,
        email: string,
        password: string,
        phone_number: string,
        ktp: string
    ): Promise<boolean> => {
        try {
            const response = await apiService.auth.register({
                name,
                email,
                password,
                phone_number,
                ktp,
            });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                setUser(response.data.user);
                setIsLogin(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLogin(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setIsLogin,
                user,
                loginUser,
                registerUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
