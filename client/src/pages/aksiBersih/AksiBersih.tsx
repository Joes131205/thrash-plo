import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import styles from "./AksiBersih.module.css";
import { ImgOsoji } from "@/assets/images";
import { motion } from "framer-motion";
import CardAksi from "@/components/organisms/aksiBox/aksiBox";

export default function AksiBersihPage() {
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
          <CardAksi imageSrc={ImgOsoji} title="Hari Bersih Indonesia 2025 x Jakarta Osoji Club" date="24/06/2025" location="Cengkareng" volunteerCount="15/300" status="Belum Dimulai" organizer=" Jakarta Osoji Club." />
        </div>
      </motion.div>
      {/* END CONTENT */}

      {/* FOOTER */}
      <Footer />
      {/* END FOOTER */}
    </div>
  );
}
