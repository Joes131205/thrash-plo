import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./AksiBersih.module.css";
import { ImgAksi } from "@/assets/images";
import { motion } from "framer-motion";

export default function DetailAksiPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div>
      {/* NAVBAR */}
      <Navbar />
      {/* END NAVBAR */}

      {/* CONTENT */}
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
        <div className={styles.container}>
          <img src={ImgAksi} alt="Image Aksi" />

          <div className={styles.midContent}>
            <div style={{ width: "350%" }}>
              <h2 className={`${styles.titleAksi} ${styles.medium}`}>Go Green</h2>
            </div>
            <ButtonMain btnText={"Jadi Relawan"} btnColor={true} colorBorder={false} textColor={"default"} weightFont={true} />
          </div>

          <div className={styles.separator}></div>

          <div className={styles.bottomContent}>
            {[
              {
                label: "Komunitas Penyelenggara",
                value: "Pandawara Group ( pandawaragroup@community.co.id )",
              },
              { label: "Tanggal / Waktu", value: "24 Mei 2025 / 12:00 - 19.00" },
              {
                label: "Lokasi",
                value: "Jl. Bojong Raya No.27 13, RT.13/RW.4, Rw. Buaya, Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11740",
              },
              { label: "Jumlah Relawan", value: "15 / 50" },
              { label: "Status", value: "Belum Dimulai" },
            ].map((item, index) => (
              <div key={index} className={styles.listRow}>
                <h5 className={styles.label}>{item.label}</h5>
                <span>:</span>
                <p className={styles.value}>{item.value}</p>
              </div>
            ))}
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
