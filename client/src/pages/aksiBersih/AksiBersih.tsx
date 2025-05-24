import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./AksiBersih.module.css";
import { ImgAksi } from "@/assets/images";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import { IcCalendarMini, IcCheckStatus, IcMapMini, IcVolunteer } from "@/assets/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AksiBersihPage() {
  const navigate = useNavigate();

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
          <div className={styles.boxAksi}>
            <div className={styles.boxImg}>
              <img src={ImgAksi} alt="Image Aksi" />
            </div>
            <div className={styles.textContent}>
              <h6 className={`${styles.titleAksi} ${styles.small}`}>Go Green</h6>

              <div className={styles.boxList}>
                <div className={styles.listProps}>
                  <div className={styles.boxProperties}>
                    <img src={IcCalendarMini} alt="Icon Calendar" />
                    <p className={styles.textProp}>24/05/2025</p>
                  </div>
                  <div className={styles.boxProperties}>
                    <img src={IcMapMini} alt="Icon Map" />
                    <p className={styles.textProp}>Kali Angke</p>
                  </div>
                </div>
                <div className={styles.listProps}>
                  <div className={styles.boxProperties}>
                    <img src={IcVolunteer} alt="Icon Volunteer" />
                    <p className={styles.textProp}>15/50</p>
                  </div>
                  <div className={styles.boxProperties}>
                    <img src={IcCheckStatus} alt="Icon Check" />
                    <p className={styles.textProp}>Belum Dimulai</p>
                  </div>
                </div>
              </div>

              <div className={styles.buttonContent}>
                <p className={styles.textProp}>
                  Diselanggarakan Oleh <span>Pandawara Group</span>
                </p>
                <ButtonMain btnText={"Lihat Selengkapnya"} btnColor={true} colorBorder={false} textColor={"default"} weightFont={true} onClick={() => navigate("/detail-aksi")} />
              </div>
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
