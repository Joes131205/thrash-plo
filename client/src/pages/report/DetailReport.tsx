import Navbar from "@/components/molecules/navbar/navbar";
import { motion } from "framer-motion";
import styles from "./Report.module.css";
import Footer from "@/components/organisms/footer/footer";
import { IcCopy, IcMenunggu } from "@/assets/icons";
import ProgressTimeline from "@/components/organisms/progressTimeline/progressTimeline";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";

export default function DetailLaporanPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const laporan = location.state;

  useEffect(() => {
    if (!laporan) {
      navigate("/riwayat-laporan");
    }
  }, [laporan, navigate]);

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

  const dataProgress = [
    { title: "Laporan Dikirim", subtitle: laporan?.tanggal || "", color: "#2BBBAD		" },
    { title: "Laporan Menunggu Diterima oleh Komunitas", subtitle: "Komunitas : -", color: "#2BBBAD		" },
  ];

  if (!laporan) {
    return null;
  }

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
                  <p className={styles.propsDesc}>{laporan.id}</p>
                  <button style={{ cursor: "pointer", opacity: "0.8" }} onClick={() => handleCopy(String(laporan.id))}>
                    <img src={IcCopy} alt="icon copy" />
                  </button>
                </div>
              </div>

              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Waktu Pengiriman</h5>
                <p className={styles.propsDesc}>{laporan.tanggal}</p>
              </div>

              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Jenis Sampah</h5>
                <p className={styles.propsDesc}>{laporan.jenisSampah}</p>
              </div>

              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Perkiraan Berat</h5>
                <p className={styles.propsDesc}>{laporan.weight ?? "-"}</p>
              </div>

              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Lokasi</h5>
                <p className={styles.propsDesc}>{laporan.lokasi}</p>
              </div>

              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Catatan</h5>
                <p className={styles.propsDesc}>{laporan.notes ?? "-"}</p>
              </div>

              <div className={styles.props}>
                <h5 className={styles.propsTitle}>Status</h5>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    padding: "4px 10px",
                    borderRadius: 5,
                    width: 108,
                  }}
                >
                  <p style={{ fontSize: 14, color: "#FF0000" }}>{laporan.status}</p>
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
                    <img src={laporan.photoNear ?? laporan.fotoUrlNear ?? ""} alt="Foto dari dekat" style={{ width: 350, marginTop: 10, objectFit: "cover" }} />
                  </div>
                  <div>
                    <p className={styles.propsDesc}>Foto dari Jauh</p>
                    <img src={laporan.photoFar ?? laporan.fotoUrl ?? ""} alt="Foto dari jauh" style={{ width: 350, marginTop: 10, objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightContent}>
              <h5 className={styles.propsTitle}>Progress</h5>
              <ProgressTimeline data={dataProgress} />
              <ButtonMain btnText={"Kembali ke Riwayat"} btnColor={true} colorBorder={false} textColor={"white"} weightFont={true} onClick={() => navigate("/riwayat-laporan", { state: laporan })} />
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
