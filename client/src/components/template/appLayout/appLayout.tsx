import Sidebar from "@/components/molecules/sideBar/sideBar";
import Topbar from "@/components/molecules/topBar/topBar";
import { useState } from "react";
import { ImgCreator } from "@/assets/images";
import { IcHamburger } from "@/assets/icons";
import styles from "../../../pages/dashboard/Dashboard.module.css";

interface AppLayoutProps {
  role: "DLH" | "Komunitas" | "Admin";
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const AppLayout = ({ role, activeTab, setActiveTab, children }: AppLayoutProps) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className={styles.container}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isVisible={isSidebarVisible} role={role} />

      <div className={isSidebarVisible ? styles.mainContent : `${styles.mainContent} ${styles.mainContentShifted}`}>
        <div className={styles.contentWrapper}>
          <Topbar user={{ name: "Jannsen123", role, avatar: ImgCreator }} hamburgerIcon={IcHamburger} onToggleSidebar={() => setSidebarVisible((prev) => !prev)} />

          {children}

          <div className={styles.footer}>
            <p className={styles.footerText}>Copyright © 2025 ThrashPlo | All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
