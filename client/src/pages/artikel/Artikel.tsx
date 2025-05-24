import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./Artikel.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ImgAksiThree, ImgAksiTwo, ImgCardArtikel, ImgHeroArtikel } from "@/assets/images";
import CardArtikel from "@/components/organisms/artikelBox/cardArtikel";

export default function ArtikelPage() {
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

      {/* HERO */}
      <img src={ImgHeroArtikel} alt="Hero Image" />
      {/* END HERO */}

      {/* CONTENT */}
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
        <div className={styles.container}>
          <div>
            <h2 className={styles.sectionTitle}>Artikel Terbaru</h2>

            <div className={styles.listArtikel}>
              <CardArtikel
                image={ImgAksiTwo}
                title="Mengapa Sampah Buruk bagi Linkungan?"
                date="25 Maret 2025"
                author="Jansen Addison"
                description="Sampah plastik, misalnya, membutuhkan ratusan tahun untuk terurai dan sering kali berakhir di lautan, membahayakan kehidupan laut seperti ikan, penyu, dan burung. "
                onClick={() => navigate("/detail-artikel")}
              />
              <CardArtikel
                image={ImgCardArtikel}
                title="Krisis Sampah di Laut: Mengapa Kita Harus Peduli?"
                date="23 Maret 2025"
                author="Sheren Aura"
                description="Setiap tahun, jutaan ton sampah mencemari laut, membahayakan ekosistem dan kehidupan laut. Bagaimana sampah dari daratan bisa sampai ke laut? Dan apa yang bisa kita lakukan untuk mencegahnya?"
                onClick={() => navigate("/detail-artikel")}
              />
              <CardArtikel
                image={ImgAksiThree}
                title="Mulai dari Rumah: Cara Efektif Mengurangi Sampah"
                date="3 Maret 2025"
                author="Joe Steven"
                description="Mengelola sampah tidak harus sulit! Dengan langkah sederhana seperti memilah sampah organik dan anorganik, serta mengurangi penggunaan plastik, kita bisa berkontribusi menjaga lingkungan dari dalam rumah sendiri. Simak tips praktisnya di sini!"
                onClick={() => navigate("/detail-artikel")}
              />
              <CardArtikel
                image={ImgCardArtikel}
                title="Krisis Sampah di Laut: Mengapa Kita Harus Peduli?"
                date="23 Maret 2025"
                author="Wilyan Adiasari"
                description="Setiap tahun, jutaan ton sampah mencemari laut, membahayakan ekosistem dan kehidupan laut. Bagaimana sampah dari daratan bisa sampai ke laut? Dan apa yang bisa kita lakukan untuk mencegahnya?"
                onClick={() => navigate("/detail-artikel")}
              />
            </div>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Artikel Dari DLH</h2>

            <div className={styles.listArtikel}>
              <CardArtikel
                image={ImgCardArtikel}
                title="Krisis Sampah di Laut: Mengapa Kita Harus Peduli?"
                date="23 Maret 2025"
                author="Pandawara Group"
                description="Setiap tahun, jutaan ton sampah mencemari laut, membahayakan ekosistem dan kehidupan laut. Bagaimana sampah dari daratan bisa sampai ke laut? Dan apa yang bisa kita lakukan untuk mencegahnya?"
                onClick={() => navigate("/detail-artikel")}
              />
              <CardArtikel
                image={ImgCardArtikel}
                title="Krisis Sampah di Laut: Mengapa Kita Harus Peduli?"
                date="23 Maret 2025"
                author="Pandawara Group"
                description="Setiap tahun, jutaan ton sampah mencemari laut, membahayakan ekosistem dan kehidupan laut. Bagaimana sampah dari daratan bisa sampai ke laut? Dan apa yang bisa kita lakukan untuk mencegahnya?"
                onClick={() => navigate("/detail-artikel")}
              />
              <CardArtikel
                image={ImgCardArtikel}
                title="Krisis Sampah di Laut: Mengapa Kita Harus Peduli?"
                date="23 Maret 2025"
                author="Pandawara Group"
                description="Setiap tahun, jutaan ton sampah mencemari laut, membahayakan ekosistem dan kehidupan laut. Bagaimana sampah dari daratan bisa sampai ke laut? Dan apa yang bisa kita lakukan untuk mencegahnya?"
                onClick={() => navigate("/detail-artikel")}
              />
            </div>
          </div>
          <div>
            <h2 className={styles.sectionTitle}>Artikel Dari Komunitas</h2>

            <div className={styles.listArtikel}>
              <CardArtikel
                image={ImgCardArtikel}
                title="Krisis Sampah di Laut: Mengapa Kita Harus Peduli?"
                date="23 Maret 2025"
                author="Pandawara Group"
                description="Setiap tahun, jutaan ton sampah mencemari laut, membahayakan ekosistem dan kehidupan laut. Bagaimana sampah dari daratan bisa sampai ke laut? Dan apa yang bisa kita lakukan untuk mencegahnya?"
                onClick={() => navigate("/detail-artikel")}
              />
              <CardArtikel
                image={ImgCardArtikel}
                title="Krisis Sampah di Laut: Mengapa Kita Harus Peduli?"
                date="23 Maret 2025"
                author="Pandawara Group"
                description="Setiap tahun, jutaan ton sampah mencemari laut, membahayakan ekosistem dan kehidupan laut. Bagaimana sampah dari daratan bisa sampai ke laut? Dan apa yang bisa kita lakukan untuk mencegahnya?"
                onClick={() => navigate("/detail-artikel")}
              />
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
