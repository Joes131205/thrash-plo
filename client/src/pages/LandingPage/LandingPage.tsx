import React from "react";
import { ImgLanding, ImgLogo, ImgMisiKita } from "@/assets/images";
import styles from "./LandingPage.module.css";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";

export default function LandingPage() {
  return (
    <div id="home">
      {/* NAVBAR */}
      <div className={styles.navbar}>
        <img src={ImgLogo} alt="Logo ThrashPlo" />
        <ul className={styles.listNavbar}>
          <li className={styles.listItem}>
            <a href="#home">Home</a>
          </li>
          <li className={styles.listItem}>
            <a href="#our-mission">Misi Kita</a>
          </li>
          <li className={styles.listItem}>
            <a href="#lapor-sampah">Laporkan Sampah</a>
          </li>
          <li className={styles.listItem}>
            <a href="#aksi-bersih">Aksi Bersih</a>
          </li>
        </ul>
        <div className={styles.btnContainer}>
          <ButtonMain btnText={"Login"} btnColor={false} colorBorder={true} textColor={false} />
          <ButtonMain btnText={"Warga"} btnColor={true} colorBorder={false} textColor={true} />
        </div>
      </div>
      {/* END NAVBAR */}

      {/* BANNER HOME */}
      <div className={styles.home}>
        <div className={styles.heading}>
          <h1 className={styles.title}>SATU SAMPAH, SATU AKSI</h1>
          <p className={styles.desc}>
            TrashPlo menghubungkan warga, pemerintah, dan komunitas peduli lingkungan dalam satu gerakan bersama untuk menciptakan kota yang lebih bersih. Laporkan sampah di sekitarmu, ikuti aksi bersih, dan jadilah bagian dari perubahan
            yang nyata.
          </p>
        </div>

        <img src={ImgLanding} alt="Image Landing" />
      </div>

      <div className={styles.separator}></div>
      {/* END BANNER */}

      {/* MISI KITA */}
      <div className={styles.misiKita}>
        <div className={styles.textLeft}>
          <h2 className={styles.titleMisi}>Misi Kita</h2>
          <p className={styles.descMisi}>
            TrashPlo hadir dengan misi untuk membangun ekosistem kolaboratif dalam pengelolaan sampah yang efektif, transparan, dan berkelanjutan. Kami berfokus pada pemberdayaan masyarakat untuk aktif melaporkan titik-titik sampah liar,
            mendukung komunitas lingkungan dalam aksi bersih, serta mempercepat koordinasi dengan instansi pemerintah untuk penanganan sampah yang lebih responsif.{" "}
          </p>
        </div>
        <div className={styles.imgRight}>
          <img src={ImgMisiKita} alt="Misi Kita" className={styles.imgRight} />
        </div>
      </div>
      {/* END MISI KITA */}
    </div>
  );
}
