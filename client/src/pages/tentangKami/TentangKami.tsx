import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./TentangKami.module.css";
import { motion } from "framer-motion";
import { ImgAboutOne, ImgAboutThree, ImgAboutTwo, ImgBorderLine, ImgJanssen, ImgJoe, ImgSheren } from "@/assets/images";

export default function TentangKamiPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* NAVBAR */}
      <Navbar />
      {/* END NAVBAR */}

      {/* CONTENT */}
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.leftContent}>
              <h2 className={styles.titleMisi}>Tentang Kami</h2>
              <p className={styles.descMisi}>Sejak berdiri, kami telah menangani ribuan laporan dan membantu membersihkan lingkungan bersama komunitas. Kini, giliran Anda menjadi bagian dari perubahan!</p>
            </div>
            <div className={styles.rightContent}>
              <img src={ImgAboutOne} alt="image" />
            </div>
          </div>
        </div>
        <img src={ImgBorderLine} alt="border" style={{ marginTop: -200 }} />

        <div className={styles.container} style={{ marginTop: 50 }}>
          <div className={styles.hero} style={{ gap: 20 }}>
            <div className={styles.leftContent}>
              <img src={ImgAboutTwo} alt="image" />
            </div>
            <div className={styles.rightContent}>
              <h2 className={styles.titleMisi} style={{ fontSize: 28 }}>
                Untuk Mewujudkan Indonesia yang Lebih Bersih dengan Satu Laporan
              </h2>
              <p className={styles.descMisi}>
                Kami percaya bahwa membangun kota yang bersih dan bebas sampah bukan soal perubahan instan, tapi hasil dari kebiasaan kecil yang dilakukan bersama. Dengan menggabungkan teknologi yang tepat dan peran aktif masyarakat, kami
                ingin menciptakan lingkungan yang lebih bersih dan dimulai dari hal-hal sederhana.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.container} style={{ marginTop: 50 }}>
          <div className={styles.hero}>
            <div className={styles.leftContent}>
              <h2 className={styles.titleMisi} style={{ fontSize: 28 }}>
                Dari Sebuah Kepedulian, Menjadi Gerakan
              </h2>
              <p className={styles.descMisi}>
                ThrashPlo lahir dari semangat untuk mengatasi permasalahan sampah yang ada di Indonesia dengan melibatkan pemerintah dan komunitas lokal. Kami hadir untuk mempermudah pelaporan dan respons terhadap tumpukan sampah di
                lingkungan Anda.
              </p>
            </div>
            <div className={styles.rightContent}>
              <img src={ImgAboutThree} alt="image" />
            </div>
          </div>
        </div>

        <div className={styles.container} style={{ marginBottom: 80 }}>
          <h2 className={styles.titleMisi} style={{ fontSize: 32, textAlign: "center", marginTop: 100, marginBottom: 70 }}>
            Tim di Balik ThrashPlo
          </h2>
          <div className={styles.listTeam}>
            <div className={styles.boxTeam}>
              <img src={ImgJanssen} alt="Img Jansen" style={{ width: 100 }} />
              <h6 className={styles.teamName}>Janssen Addison</h6>
              <p className={styles.teamRole}>UI/UX Designer</p>
            </div>
            <div className={styles.boxTeam}>
              <img src={ImgSheren} alt="Img Sheren" style={{ width: 100 }} />
              <h6 className={styles.teamName}>Sheren Aura Vi Paramitha</h6>
              <p className={styles.teamRole}></p>Frontend Developer
            </div>
            <div className={styles.boxTeam}>
              <img src={ImgJoe} alt="Img Joe" style={{ width: 100 }} />
              <h6 className={styles.teamName}>Joe Steven</h6>
              <p className={styles.teamRole}>Backend Developer</p>
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
