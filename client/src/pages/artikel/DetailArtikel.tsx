import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./Artikel.module.css";
import { motion } from "framer-motion";
import { ImgAksiTwo, ImgBorderLine, ImgCreator } from "@/assets/images";
import { IcSeparator, IcSeparatorLog } from "@/assets/icons";

export default function DetailArtikelPage() {
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
        <div className={styles.containerDetail}>
          <div className={styles.hero}>
            <div className={styles.leftContent}>
              <div>
                <h3 className={styles.titleArticle}>
                  Mengapa sampah <br /> buruk bagi lingkungan
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={ImgCreator} alt="" />
                    <p className={styles.creator}>Janssen125</p>
                  </div>
                  <p className={styles.creator}>Dipublikasikan: 24/04/2025</p>
                </div>
              </div>
            </div>
            <div className={styles.rightContent}>
              <img src={ImgAksiTwo} alt="" style={{ width: 524 }} />
            </div>
          </div>
          <div style={{ marginTop: -150 }}>
            <img src={ImgBorderLine} alt="" />
          </div>
          <div className={styles.paragraph}>
            <p className={styles.contentText}>
              Dalam artikel ini kita akan membahas tentang mengapa sampah buruk bagi lingkungan. Alasan utama mengapa sampah buruk bagi lingkungan adalah karena sampah dapat mencemari tanah, air, dan udara, yang pada akhirnya membahayakan
              ekosistem dan kesehatan manusia.
            </p>
            <p className={styles.contentText}>
              Sampah plastik, misalnya, membutuhkan ratusan tahun untuk terurai dan sering kali berakhir di lautan, membahayakan kehidupan laut seperti ikan, penyu, dan burung. Hewan-hewan ini dapat salah mengira sampah plastik sebagai
              makanan, yang dapat menyebabkan kematian karena tersumbatnya sistem pencernaan mereka.
            </p>
            <p className={styles.contentText}>
              Selain itu, sampah organik yang tidak dikelola dengan baik juga dapat menghasilkan gas metana — gas rumah kaca yang jauh lebih kuat dibandingkan karbon dioksida. Hal ini tentu memperparah krisis iklim yang sudah kita hadapi
              saat ini.
            </p>
            <p className={styles.contentText}>
              Dampak lainnya adalah terganggunya estetika lingkungan. Tumpukan sampah yang menumpuk di area publik tidak hanya merusak pemandangan, tetapi juga menjadi tempat berkembang biaknya penyakit seperti demam berdarah, karena
              menjadi sarang nyamuk dan tikus.
            </p>
            <p className={styles.contentText}>
              Oleh karena itu, penting bagi kita semua untuk mulai memilah sampah dari rumah, mengurangi penggunaan plastik sekali pakai, serta mendukung program daur ulang dan kampanye kebersihan di komunitas masing-masing. Dengan langkah
              kecil yang konsisten, kita dapat berkontribusi dalam menciptakan lingkungan yang lebih bersih dan sehat untuk generasi mendatang.
            </p>
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
