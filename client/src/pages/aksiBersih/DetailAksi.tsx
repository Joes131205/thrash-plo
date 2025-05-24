import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./AksiBersih.module.css";
import { ImgAksi } from "@/assets/images";
import { motion } from "framer-motion";
import { useState } from "react";
import ModalConfirm from "@/components/organisms/modalConfirm/modalConfirm";
import { IcQuestion, IcSuccess } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

export default function DetailAksiPage() {
  const navigate = useNavigate();

  const [isConfirm, setIsConfirm] = useState(true);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleConfirm = () => {
    setShowModalConfirm(false);
    setShowModalSuccess(true);
    setIsConfirm(false);
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
            <ButtonMain btnText={"Jadi Relawan"} btnColor={true} colorBorder={false} textColor={"default"} weightFont={true} onClick={() => setShowModalConfirm(true)} />
            <ModalConfirm icon={IcQuestion} questionText="Apakah anda yakin ingin menjadi relawan aksi bersih ini?" isConfirm={isConfirm} isOpen={showModalConfirm} onClose={() => setShowModalConfirm(false)} onConfirm={handleConfirm} />
            <ModalConfirm icon={IcSuccess} questionText="Terima kasih sudah mengajukan relawan, info lebih lanjut akan dikirimkan melalui email" isConfirm={false} isOpen={showModalSuccess} onConfirm={() => navigate("/aksi-bersih")} />
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
