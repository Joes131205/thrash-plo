import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./AksiBersih.module.css";
import { ImgAksi } from "@/assets/images";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CardAksi from "@/components/organisms/aksiBox/aksiBox";

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
          <h2 className={styles.sectionTitle}>Aksi Bersih</h2>
          <CardAksi imageSrc={ImgAksi} title="Go Green" date="24/05/2025" location="Kali Angke" volunteerCount="15/50" status="Belum Dimulai" organizer="Pandawara Group" />
        </div>
      </motion.div>
      {/* END CONTENT */}

      {/* FOOTER */}
      <Footer />
      {/* END FOOTER */}
    </div>
  );
}
