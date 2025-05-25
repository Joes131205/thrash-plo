import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImgFlow, ImgHeroOne, ImgHeroThree, ImgHeroTwo, ImgLanding, ImgMisiKita, ImgPantai, ImgSungai, ImgTumpukan } from "@/assets/images";
import { IcArrowLeft, IcArrowRight, IcGarbage, IcKomunitas, IcMitra, IcPemerintah, IcTruck, IcWarga } from "@/assets/icons";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import StakeholderBox from "@/components/molecules/stakeholderBox/stakeholderBox";
import HeroBox from "@/components/organisms/heroBox/heroBox";
import styles from "./LandingPage.module.css";
import Navbar from "@/components/molecules/navbar/navbar";
import Footer from "@/components/organisms/footer/footer";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const isSmall = true;

  const [isLogin, setIsLogin] = useState(true);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const containerStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const fadeSlideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3, duration: 0.7, ease: "easeOut" },
    }),
  };

  const fadeScale = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.3, duration: 0.5, ease: "easeOut" },
    }),
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  const slideRight = {
    hidden: { opacity: 0, x: 100 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  const popScale = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.3 + 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div id="home">
      {/* NAVBAR */}
      <Navbar isLogin={isLogin} />
      {/* END NAVBAR */}

      {/* BANNER HOME */}
      <div className={styles.home}>
        <motion.div className={styles.heading} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={0} variants={fadeInUp}>
          <h1 className={styles.title}>SATU SAMPAH, SATU AKSI</h1>
          <p className={styles.desc}>
            TrashPlo menghubungkan warga, pemerintah, dan komunitas peduli lingkungan dalam satu gerakan bersama untuk menciptakan kota yang lebih bersih. Laporkan sampah di sekitarmu, ikuti aksi bersih, dan jadilah bagian dari perubahan
            yang nyata.
          </p>
        </motion.div>

        <motion.img src={ImgLanding} alt="Image Landing" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={1} variants={fadeInUp} />
      </div>

      <div className={styles.separator}></div>
      {/* END BANNER */}

      {/* MISI KITA */}
      <motion.div className={styles.misiKita} id="misi-kita" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.div className={styles.textLeft} custom={0} variants={fadeInUp}>
          <h2 className={styles.titleMisi}>Misi Kita</h2>
          <p className={styles.descMisi}>
            TrashPlo hadir dengan misi untuk membangun ekosistem kolaboratif dalam pengelolaan sampah yang efektif, transparan, dan berkelanjutan. Kami berfokus pada pemberdayaan masyarakat untuk aktif melaporkan titik-titik sampah liar,
            mendukung komunitas lingkungan dalam aksi bersih, serta mempercepat koordinasi dengan instansi pemerintah untuk penanganan sampah yang lebih responsif
          </p>
        </motion.div>

        <motion.div className={styles.imgRight} custom={1} variants={fadeInUp}>
          <img src={ImgMisiKita} alt="Misi Kita" className={styles.imgRight} />
        </motion.div>
      </motion.div>
      {/* END MISI KITA */}

      {/* STAKEHOLDER */}
      <motion.div className={styles.stakeholder} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.div className={styles.upperText} custom={0} variants={fadeInUp}>
          <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px" }}>
            Siapa Saja Yang Terlibat?
          </h2>
          <p className={styles.descMisi}>TrashPlo hadir melalui kolaborasi untuk menciptakan lingkungan yang lebih bersih dan berkelanjutan</p>
        </motion.div>

        <motion.div className={styles.listStakeholder} custom={1} variants={fadeInUp}>
          <StakeholderBox icon={IcWarga} title="Warga" description="Melaporkan titik sampah liar dan berpartisipasi aktif dalam aksi bersih" />
          <StakeholderBox icon={IcKomunitas} title="Komunitas" description="Verifikasi laporan warga, mengatur aksi bersih, dan mengajukan pengangkutan ke DLH" />
          <StakeholderBox icon={IcPemerintah} title="Pemerintah (DLH)" description="Menyetujui permintaan penanganan sampah dan mengatur pengangkutan residu  " />
          <StakeholderBox icon={IcMitra} title="Mitra Daur Ulang" description="Membeli sampah terpilah dari komunitas untuk didaur ulang sekaligus mendorong ekonomi sirkular" />
        </motion.div>
      </motion.div>
      {/* END STAKEHOLDER */}

      {/* FLOW THRASHPLO */}
      <motion.div className={styles.flow} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.div className={styles.upperText} custom={0} variants={fadeInUp}>
          <h2 style={{ fontSize: isSmall ? "36px" : "50px", background: "transparent" }}>Bagaimana ThrashPlo Bekerja?</h2>
          <p className={styles.descMisi}>Lapor sekarang, selamatkan lingkungan hari ini</p>
        </motion.div>

        <motion.img src={ImgFlow} alt="Flow ThrashPlo" custom={1} variants={fadeInUp} />
      </motion.div>
      {/* END FLOW THRASHPLO */}

      {/* JENIS SAMPAH */}
      <motion.div className={styles.jenisSampah} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px" }} variants={fadeInUp} custom={0}>
          Satu Laporanmu, Satu Langkah Menuju <br />
          Indonesia yang Lebih Bersih
        </motion.h2>

        <motion.p className={styles.descMisi} variants={fadeInUp} custom={1}>
          Lapor sekarang, selamatkan lingkungan hari ini
        </motion.p>

        <motion.div className={styles.imgSampah} variants={container} custom={2}>
          <motion.img src={ImgTumpukan} alt="Tumpukan Sampah" style={{ height: "575px" }} variants={fadeSlideUp} custom={0} />
          <motion.div className={styles.rightImg}>
            <motion.img src={ImgSungai} alt="Sampah Sungai" variants={fadeScale} custom={1} />
            <motion.img src={ImgPantai} alt="Sampah Pantai" variants={fadeScale} custom={2} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* END JENIS SAMPAH */}

      {/* BANNER LAPOR SAMPAH */}
      <motion.div className={styles.laporSampah} id="lapor-sampah" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px" }} variants={fadeSlideUp} custom={0}>
          Bersama Atasi Sampah, Mulai Hari Ini
        </motion.h2>

        <motion.p className={styles.descMisi} style={{ width: isSmall ? 780 : 0, textAlign: "center" }} variants={fadeSlideUp} custom={1}>
          Laporkan titik sampah, koordinasikan aksi bersih-bersih, dan bantu wujudkan sistem pengelolaan sampah yang kolaboratif dan berkelanjutan.
        </motion.p>

        <motion.div className={styles.bottomContent} variants={containerStagger}>
          <motion.img src={IcGarbage} alt="Icon Sampah" variants={slideLeft} custom={0} />
          <motion.div variants={popScale} custom={1}>
            <ButtonMain btnText={"Lapor Sekarang"} btnColor={false} colorBorder={false} textColor={"green"} weightFont={true} onClick={() => navigate("/buat-laporan")} />
          </motion.div>
          <motion.img src={IcTruck} alt="Icon Truck" style={{ width: 250, height: 250 }} variants={slideRight} custom={2} />
        </motion.div>
      </motion.div>

      {/* END BANNER LAPOR SAMPAH */}

      {/* PAHLAWAN */}
      <div className={styles.pahlawan} id="pahlawan">
        <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px", textAlign: "center" }}>
          Pahlawan Lingkungan Teratas
        </h2>
        <p className={styles.descMisi} style={{ textAlign: "center" }}>
          Warga paling aktif dalam melaporkan titik sampah untuk lingkungan yang lebih bersih
        </p>

        <div className={styles.boxPahlawan}>
          <div className={styles.upperBox}>
            <h3 className={styles.textTop}>Top 3 Pahlawan</h3>
            <div className={styles.slider}>
              <div className={styles.wrapArrow}>
                <a href="">
                  <img src={IcArrowLeft} alt="Arrow Left" />
                </a>
              </div>
              <p className={styles.periodText}>Bulan Ini</p>
              <div className={styles.wrapArrow}>
                <a href="">
                  <img src={IcArrowRight} alt="Arrow Right" />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.listPahlawan}>
            <HeroBox
              image={ImgHeroOne}
              name="Ani Sulastri"
              location="Keramat Jati"
              points="100pts"
              rank="01."
              stats={[
                { value: 12, label: "Laporan" },
                { value: 8, label: "Relawan" },
                { value: 80, label: "Sampah" },
              ]}
            />
            <HeroBox
              image={ImgHeroTwo}
              name="Budi Santoso"
              location="Kota Bogor"
              points="80pts"
              rank="02."
              stats={[
                { value: 10, label: "Laporan" },
                { value: 8, label: "Relawan" },
                { value: 50, label: "Sampah" },
              ]}
            />
            <HeroBox
              image={ImgHeroThree}
              name="Ahmat Suseno"
              location="Kabupaten Malang"
              points="60pts"
              rank="03."
              stats={[
                { value: 8, label: "Laporan" },
                { value: 5, label: "Relawan" },
                { value: 10, label: "Sampah" },
              ]}
            />
          </div>
        </div>
      </div>
      {/* END PAHLAWAN */}

      {/* FOOTER */}
      <Footer />
      {/* END FOOTER */}
    </div>
  );
}
