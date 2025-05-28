import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./Artikel.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ImgAksiThree, ImgAksiTwo, ImgArtikelDLH, ImgCardArtikel, ImgEarthDay, ImgHeroArtikel, ImgTrashArt, ImgTumpukanSampah } from "@/assets/images";
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
                image={ImgTumpukanSampah}
                title="Cara Menjaga Bumi dari Ancaman Sampah"
                date="23 Maret 2025"
                author="Wilyan Adiasari"
                description="Sampah menjadi salah satu masalah lingkungan yang paling mendesak di dunia saat ini. Peningkatan jumlah sampah akibat aktivitas manusia yang tidak terkontrol mengancam ekosistem, kesehatan masyarakat, dan kualitas hidup kita secara keseluruhan. "
                onClick={() => navigate("/detail-artikel")}
              />
            </div>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Artikel Dari Komunitas</h2>

            <div className={styles.listArtikel}>
              <CardArtikel
                image={ImgEarthDay}
                title="Komunitas Hijau Bersih Gelar Aksi Bersih Sungai di Hari Bumi"
                date="23 Maret 2025"
                author="Komunitas Hijau Bersih"
                description="Dalam rangka memperingati Hari Bumi, komunitas Hijau Bersih di Kecamatan Tirtomoyo mengadakan kegiatan bersih-bersih sungai yang diikuti oleh lebih dari 50 relawan."
                onClick={() => navigate("/detail-artikel")}
              />
              <CardArtikel
                image={ImgTrashArt}
                title="Pelatihan Daur Ulang Kreatif oleh Komunitas TrashArt"
                date="23 Maret 2025"
                author="Komunitas TrashArt"
                description="Komunitas TrashArt mengadakan pelatihan daur ulang kreatif yang diikuti oleh pemuda-pemudi lokal. Peserta belajar mengubah sampah plastik dan kertas bekas menjadi produk bernilai jual seperti tas, dompet, dan hiasan rumah."
                onClick={() => navigate("/detail-artikel")}
              />
            </div>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Artikel Dari DLH</h2>

            <div className={styles.listArtikel}>
              <CardArtikel
                image={ImgArtikelDLH}
                title="Tanggung Jawab untuk Mengelola Sampah"
                date="23 Maret 2025"
                author="DLH Kabupaten Malang"
                description="Sampah bukan hanya persoalan lingkungan, melainkan juga cermin dari kebiasaan dan kesadaran masyarakat. Setiap hari, manusia menghasilkan jutaan ton sampah, dan sebagian besar.. "
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
