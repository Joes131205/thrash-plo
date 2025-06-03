import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { IcPerson } from "@/assets/icons";

import styles from "./Navbar.module.css";
import { ImgLogo } from "@/assets/images";

type NavbarProps = {
    activeMenu?: string;
};

const Navbar = ({ activeMenu }: NavbarProps) => {
    const navigate = useNavigate();
    const { isLogin, user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById("user-dropdown");
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        navigate("/logout");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarLogo}>
                    <Link to="/">
                        <img src={ImgLogo} alt="ThrashPLO Logo" />
                    </Link>
                </div>

                <div className={styles.navbarLinks}>
                    <Link
                        to="/tentang-kami"
                        className={`${styles.navbarLink} ${activeMenu === "tentang-kami" ? styles.active : ""}`}
                    >
                        Tentang Kami
                    </Link>
                    <Link
                        to="/artikel"
                        className={`${styles.navbarLink} ${activeMenu === "artikel" ? styles.active : ""}`}
                    >
                        Artikel
                    </Link>
                    <Link
                        to="/aksi-bersih"
                        className={`${styles.navbarLink} ${activeMenu === "aksi-bersih" ? styles.active : ""}`}
                    >
                        Aksi Bersih
                    </Link>

                    {isLogin && (
                        <Link
                            to="/buat-laporan"
                            className={`${styles.navbarLink} ${activeMenu === "buat-laporan" ? styles.active : ""}`}
                        >
                            Buat Laporan
                        </Link>
                    )}

                    {isLogin && (
                        <Link
                            to="/riwayat-laporan"
                            className={`${styles.navbarLink} ${activeMenu === "riwayat-laporan" ? styles.active : ""}`}
                        >
                            Riwayat Laporan
                        </Link>
                    )}
                </div>

                <div className={styles.navbarAuth}>
                    {!isLogin ? (
                        <>
                            <Link to="/login" className={styles.loginButton}>
                                Masuk
                            </Link>
                            <Link
                                to="/register-warga"
                                className={styles.registerButton}
                            >
                                Daftar
                            </Link>
                        </>
                    ) : (
                        <div className={styles.userDropdown} id="user-dropdown">
                            <button
                                className={styles.userButton}
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                            >
                                {user?.name ? user.name : "User"}
                                <img
                                    src={IcPerson}
                                    alt="User"
                                    className={styles.userIcon}
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className={styles.dropdownMenu}>
                                    <div className={styles.dropdownHeader}>
                                        <p className={styles.userName}>
                                            {user?.name}
                                        </p>
                                        <p className={styles.userEmail}>
                                            {user?.email}
                                        </p>
                                    </div>
                                    <div className={styles.dropdownDivider} />{" "}
                                    <Link
                                        to="/profile"
                                        className={styles.dropdownItem}
                                    >
                                        Profil Saya
                                    </Link>
                                    {user?.role === "community" && (
                                        <Link
                                            to="/dashboard"
                                            className={styles.dropdownItem}
                                        >
                                            Dashboard Komunitas
                                        </Link>
                                    )}
                                    {(user?.role === "admin" ||
                                        user?.role === "DLH") && (
                                        <Link
                                            to="/admin"
                                            className={styles.dropdownItem}
                                        >
                                            Panel Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className={styles.dropdownItem}
                                    >
                                        Keluar
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
