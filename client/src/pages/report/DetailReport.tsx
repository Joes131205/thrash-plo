import Navbar from "@/components/molecules/navbar/navbar";
import { motion } from "framer-motion";
import styles from "./Report.module.css";
import Footer from "@/components/organisms/footer/footer";
import { IcCopy, IcMenunggu } from "@/assets/icons";
import { ImgRiwayat } from "@/assets/images";
import ProgressTimeline from "@/components/organisms/progressTimeline/progressTimeline";

export default function DetailLaporanPage() {
  const laporanId = "0A1B2C3D4F5G6HJ7I89";

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("ID berhasil disalin ke clipboard!");
      })
      .catch((err) => {
        console.error("Gagal menyalin:", err);
      });
  };

  const data = [
    { title: "Laporan Dikirim", subtitle: "Senin, 26 Mei 2025", color: "#A5FFD6" },
    { title: "Laporan Diterima oleh Komunitas", subtitle: "Komunitas : Go Green", color: "#A5FFD6" },
  ];
  return (
    <div>
      {/* NAVBAR */}
      <Navbar />
      {/* END NAVBAR */}

      {/* CONTENT */}
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
        <div className={styles.container}>
          <h1 className={styles.titleMisi}>Detail Laporan</h1>

          <div className={styles.content}>
            <div className={styles.leftContent} style={{ width: "35%" }}>
              <div className={styles.props}>
                <h5 className={styles.propsTitle}>ID Laporan</h5>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <p className={styles.propsDesc}>{laporanId}</p>
                  <button style={{ cursor: "pointer", opacity: "0.8" }} onClick={() => handleCopy(laporanId)}>
                    <img src={IcCopy} alt="icon copy" />
                  </button>
                </div>
              </div>
              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Waktu Pengiriman</h5>
                <p className={styles.propsDesc}>26 Mei 2025, 15.53 WIB</p>
              </div>
              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Jenis Sampah</h5>
                <p className={styles.propsDesc}>Tumpukan Liar</p>
              </div>
              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Perkiraan Berat</h5>
                <p className={styles.propsDesc}>20 kg</p>
              </div>
              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Lokasi</h5>
                <p className={styles.propsDesc}>Blimbing, Malang</p>
              </div>
              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Catatan</h5>
                <p className={styles.propsDesc}>Lokasi sampahnya ada di sebelah lapangan bola</p>
              </div>
              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Status</h5>
                <div style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: "rgba(255, 0, 0, 0.1)", padding: "4px 10px", borderRadius: 5, width: 108 }}>
                  <p style={{ fontSize: 14, color: "#FF0000" }}>Menunggu</p>
                  <img src={IcMenunggu} alt="" />
                </div>
              </div>
              <div className={styles.props}>
                <h5 className={styles.propsTitle} style={{ marginBottom: 25 }}>
                  Foto Sampah
                </h5>
                <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
                  <div>
                    <p className={styles.propsDesc}>Foto dari Dekat</p>
                    <img src={ImgRiwayat} alt="" style={{ width: 350, marginTop: 10 }} />
                  </div>
                  <div>
                    <p className={styles.propsDesc}>Foto dari Jauh</p>
                    <img src={ImgRiwayat} alt="" style={{ width: 350, marginTop: 10 }} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightContent}>
              <h5 className={styles.propsTitle}>Progress</h5>
              <ProgressTimeline data={data} />
            </div>
          </div>
        </div>
      </motion.div>
      {/* END CONTENT */}

      {/* FOOTER */}
      <Footer />
      {/* END FOOTER */}
    </div>
  );
}
