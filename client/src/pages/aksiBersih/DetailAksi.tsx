import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./AksiBersih.module.css";
import { ImgAksi, ImgOsoji } from "@/assets/images";
import { motion } from "framer-motion";
import { useState } from "react";
import ModalConfirm from "@/components/organisms/modalConfirm/modalConfirm";
import { IcQuestion, IcSuccess } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

export default function DetailAksiPage() {
  const navigate = useNavigate();

  const [isLoadingRelawan, setIsLoadingRelawan] = useState(false);
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
          <img src={ImgOsoji} alt="Image Aksi" />

          <div className={styles.midContent}>
            <div style={{ width: "350%" }}>
              <h2 className={`${styles.titleAksi} ${styles.medium}`}>Hari Bersih Indonesia 2025 x Jakarta Osoji Club</h2>
            </div>
            <ButtonMain
              btnText={"Jadi Relawan"}
              btnColor={true}
              colorBorder={false}
              textColor={"white"}
              weightFont={true}
              loading={isLoadingRelawan}
              onClick={() => {
                setIsLoadingRelawan(true);
                setTimeout(() => {
                  setShowModalConfirm(true);
                  setIsLoadingRelawan(false);
                }, 800);
              }}
            />
            <ModalConfirm icon={IcQuestion} questionText="Apakah anda yakin ingin menjadi relawan aksi bersih ini?" isConfirm={isConfirm} isOpen={showModalConfirm} onClose={() => setShowModalConfirm(false)} onConfirm={handleConfirm} />
            <ModalConfirm icon={IcSuccess} questionText="Terima kasih sudah mengajukan relawan, info lebih lanjut akan dikirimkan melalui email" isConfirm={false} isOpen={showModalSuccess} onConfirm={() => navigate("/aksi-bersih")} />
          </div>

          <div className={styles.separator}></div>

          <div className={styles.bottomContent}>
            {[
              {
                label: "Komunitas Penyelenggara",
                value: "Jakarta Osoji Club",
              },
              { label: "Tanggal / Waktu", value: "24 Juni 2025 / 07.00 - 11.00" },
              {
                label: "Lokasi",
                value: "Jl. Bojong Raya No.27 13, RT.13/RW.4, Rw. Buaya, Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11740",
              },
              { label: "Jumlah Relawan", value: "15 / 300" },
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
