import apiService from "@/utils/api";
import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogin, setIsLogin] = useState(false);

    const loginUser = (email: string, password: string) => {
        try {
            apiService.auth.login(email, password);
        } catch (error) {
            console.log(error);
        }
    };

    const registerUser = (name: string, email: string, password: string) => {
      try {
        apiService.auth.register({name, email, password})
      }
    };

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
