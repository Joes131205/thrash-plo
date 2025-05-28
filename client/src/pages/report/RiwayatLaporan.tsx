import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./Report.module.css";
import { motion } from "framer-motion";
import TabBar from "@/components/molecules/tabBar/tabBar";
import TableSampah from "@/components/organisms/tableSampah/tableSampah";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RiwayatLaporanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const laporanBaru = location.state;

  const [activeTab, setActiveTab] = useState<TabType>("Menunggu");
  const [laporanList, setLaporanList] = useState<any[]>([]);

  useEffect(() => {
    if (laporanBaru) {
      setLaporanList((prev) => {
        if (prev.some((lap) => lap.id === laporanBaru.id)) {
          return prev;
        }
        return [...prev, laporanBaru];
      });

      navigate(location.pathname, { replace: true });
    }
  }, [laporanBaru, navigate, location.pathname]);

  const filteredData = laporanList.filter((item) => item.status === activeTab);

  const handleDetailClick = (id: number) => {
    const laporan = laporanList.find((lap) => lap.id === id);
    if (laporan) {
      navigate("/detail-laporan", { state: laporan });
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <div>
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
        {/* NAVBAR */}
        <Navbar />
        {/* END NAVBAR */}

        {/* CONTENT */}
        <div className={styles.container}>
          <h1 className={styles.titleMisi}>Riwayat Laporan</h1>

          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className={styles.activeTab}>
            {filteredData.length === 0 ? <p style={{ textAlign: "center", marginTop: 50, color: "#2e2e2e" }}>Belum ada laporan pada tab ini.</p> : <TableSampah data={filteredData} onDetailClick={handleDetailClick} />}
          </div>
        </div>
        {/* END CONTENT */}

        {/* FOOTER */}
        <Footer />
        {/* END FOOTER */}
      </motion.div>
    </div>
  );
}
