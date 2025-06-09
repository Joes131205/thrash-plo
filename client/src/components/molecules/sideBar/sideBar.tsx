import { IcAksiDash, IcArticleDash, IcDashboard, IcLogout, IcRelawanDash, IcReportDash, IcRequestDash } from "@/assets/icons";
import { ImgLogo } from "@/assets/images";
import { useState } from "react";

interface SidebarItem {
  label: string;
  icon: string;
  key: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVisible: boolean;
  role: "DLH" | "Komunitas" | "Admin";
}

const sidebarItemsByRole: Record<string, SidebarItem[]> = {
  DLH: [
    { key: "dashboard", label: "Dashboard", icon: IcDashboard },
    { key: "request", label: "Permintaan dan Progress", icon: IcRequestDash },
    { key: "laporan", label: "Laporan", icon: IcReportDash },
    { key: "artikel", label: "Artikel", icon: IcArticleDash },
    { key: "keluar", label: "Keluar", icon: IcLogout },
  ],
  Komunitas: [
    { key: "dashboard", label: "Dashboard", icon: IcDashboard },
    { key: "request", label: "Permintaan dan Progress", icon: IcRequestDash },
    { key: "relawan", label: "Relawan", icon: IcRelawanDash },
    { key: "aksi-bersih", label: "Aksi Bersih", icon: IcAksiDash },
    { key: "artikel", label: "Artikel", icon: IcArticleDash },
    { key: "keluar", label: "Keluar", icon: IcLogout },
  ],
  Admin: [
    { key: "dashboard", label: "Dashboard", icon: IcDashboard },
    { key: "request", label: "Permintaan dan Progress", icon: IcRequestDash },
    { key: "pengguna", label: "Daftar Pengguna", icon: IcRelawanDash },
    { key: "aksi-bersih", label: "Aksi Bersih", icon: IcAksiDash },
    { key: "artikel", label: "Artikel", icon: IcArticleDash },
    { key: "mitra", label: "Mitra", icon: IcRelawanDash },
    { key: "keluar", label: "Keluar", icon: IcLogout },
  ],
};

const styles = {
  container: (isVisible: boolean): React.CSSProperties => ({
    width: 240,
    flexShrink: 0,
    transform: isVisible ? "translateX(0)" : "translateX(-240px)",
    transition: "transform 0.3s ease",
    backgroundColor: "#2e2e2e",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    minHeight: "100vh",
    padding: "10px 16px",
  }),
  logo: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
  },
  item: (active: boolean): React.CSSProperties => ({
    color: "#fff",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    backgroundColor: active ? "#3D3D3D" : "transparent",
    padding: "8px 12px",
    borderRadius: 8,
    transition: "background 0.2s",
  }),
  icon: {
    width: 26,
    height: 26,
    objectFit: "contain" as const,
  },
  containerModal: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  topContentModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 400,
    textAlign: "center" as const,
  },
  bottomContentModal: {
    width: "100%",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 30,
    display: "flex",
    justifyContent: "space-around",
    gap: 50,
  },
  btnCancel: {
    padding: "8px 16px",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#3D3D3D",
    color: "#fff",
    flex: 1,
  },
  btnLogout: {
    padding: "8px 16px",
    borderRadius: 5,
    border: "none",
    backgroundColor: "#d33",
    color: "#fff",
    cursor: "pointer",
    flex: 1,
  },
};

export default function Sidebar({ activeTab, setActiveTab, isVisible, role }: SidebarProps) {
  const sidebarItems = sidebarItemsByRole[role] || [];
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleItemClick = (key: string) => {
    if (key === "keluar") {
      setShowLogoutModal(true);
    } else {
      setActiveTab(key);
    }
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // logic logout
    window.location.href = "/login";
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <aside style={styles.container(isVisible)}>
        <div style={styles.logo}>
          <img src={ImgLogo} alt="Logo" style={{ width: 190 }} />
        </div>
        <nav style={styles.nav}>
          {sidebarItems.map((item) => (
            <div key={item.key} onClick={() => handleItemClick(item.key)} style={styles.item(activeTab === item.key)}>
              <img src={item.icon} alt={item.label} style={styles.icon} />
              <p>{item.label}</p>
            </div>
          ))}
        </nav>
      </aside>

      {/* Modal Konfirmasi Logout */}
      {showLogoutModal && (
        <div style={styles.containerModal}>
          <div style={styles.topContentModal}>
            <h3 style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>Konfirmasi Logout</h3>
            <p>Apakah Anda yakin ingin keluar dari dashboard?</p>
            <div style={styles.bottomContentModal}>
              <button onClick={cancelLogout} style={styles.btnCancel}>
                Batal
              </button>
              <button onClick={confirmLogout} style={styles.btnLogout}>
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
