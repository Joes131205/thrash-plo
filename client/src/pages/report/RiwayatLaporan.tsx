import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./Report.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import TabBar from "@/components/molecules/tabBar/tabBar";
import TableSampah from "@/components/organisms/tableSampah/tableSampah";
import { useNavigate } from "react-router-dom";

export default function RiwayatLaporanPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("Menunggu");

  const dummyData = [
    {
      id: 1,
      lokasi: "Sungai Bidadari",
      jenisSampah: "Sungai",
      tanggal: "13-05-2025",
      fotoUrl: "/img/sampah.png",
      status: "Menunggu",
    },
    {
      id: 2,
      lokasi: "Ancol",
      jenisSampah: "Pantai",
      tanggal: "30-02-2025",
      fotoUrl: "/img/sampah.png",
      status: "Diproses",
    },
  ];

  const filteredData = dummyData.filter((item) => item.status === activeTab);

  const handleDetailClick = (id: number) => {
    console.log("Clicked detail ID:", id);
    navigate("/detail-laporan");
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
        <Navbar isLogin={true} />
        {/* END NAVBAR */}

        {/* CONTENT */}
        <div className={styles.container}>
          <h1 className={styles.titleMisi}>Riwayat Laporan</h1>

          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className={styles.activeTab}>{filteredData.length === 0 ? <p style={{ textAlign: "center", marginTop: 20 }}>Belum ada laporan pada tab ini.</p> : <TableSampah data={filteredData} onDetailClick={handleDetailClick} />}</div>
        </div>
        {/* END CONTENT */}

        {/* FOOTER */}
        <Footer />
        {/* END FOOTER */}
      </motion.div>
    </div>
  );
}
