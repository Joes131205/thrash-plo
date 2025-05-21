import React from "react";
import { ImgFlow, ImgLanding, ImgLogo, ImgMisiKita, ImgPantai, ImgSungai, ImgTumpukan } from "@/assets/images";
import styles from "./LandingPage.module.css";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import StakeholderBox from "@/components/molecules/stakeholderBox/stakeholderBox";
import { IcKomunitas, IcMitra, IcPemerintah, IcWarga } from "@/assets/icons";

export default function LandingPage() {
  const isSmall = true;

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
            mendukung komunitas lingkungan dalam aksi bersih, serta mempercepat koordinasi dengan instansi pemerintah untuk penanganan sampah yang lebih responsif
          </p>
        </div>
        <div className={styles.imgRight}>
          <img src={ImgMisiKita} alt="Misi Kita" className={styles.imgRight} />
        </div>
      </div>
      {/* END MISI KITA */}

      {/* STAKEHOLDER */}
      <div className={styles.stakeholder}>
        <div className={styles.upperText}>
          <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px" }}>
            Siapa Saja Yang Terlibat?
          </h2>
          <p className={styles.descMisi}>TrashPlo hadir melalui kolaborasi untuk menciptakan lingkungan yang lebih bersih dan berkelanjutan</p>
        </div>
        <div className={styles.listStakeholder}>
          <StakeholderBox icon={IcWarga} title="Warga" description="Melaporkan titik sampah liar dan berpartisipasi aktif dalam aksi bersih" />
          <StakeholderBox icon={IcKomunitas} title="Komunitas" description="Verifikasi laporan warga, mengatur aksi bersih, dan mengajukan pengangkutan ke DLH" />
          <StakeholderBox icon={IcPemerintah} title="Pemerintah (DLH)" description="Menyetujui permintaan penanganan sampah dan mengatur pengangkutan residu  " />
          <StakeholderBox icon={IcMitra} title="Mitra Daur Ulang" description="Membeli sampah terpilah dari komunitas untuk didaur ulang sekaligus mendorong ekonomi sirkular" />
        </div>
      </div>
      {/* END STAKEHOLDER */}

      {/* FLOW THRASHPLO */}
      <div className={styles.flow}>
        <div className={styles.upperText}>
          <h2 style={{ fontSize: isSmall ? "36px" : "50px", background: "transparent" }}>Bagaimana ThrashPlo Bekerja?</h2>
          <p className={styles.descMisi}>Lapor sekarang, selamatkan lingkungan hari ini</p>
        </div>

        <img src={ImgFlow} alt="Flow ThrashPlo" />
      </div>
      {/* END FLOW THRASHPLO */}

      {/* JENIS SAMPAH */}
      <div className={styles.jenisSampah}>
        <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px" }}>
          Satu Laporanmu, Satu Langkah Menuju <br />
          Indonesia yang Lebih Bersih
        </h2>
        <p className={styles.descMisi}>Lapor sekarang, selamatkan lingkungan hari ini</p>

        <div className={styles.imgSampah}>
          <img src={ImgTumpukan} alt="Tumpukan Sampah" style={{ height: "575px" }} />
          <div className={styles.rightImg}>
            <img src={ImgSungai} alt="Sampah Sungai" />
            <img src={ImgPantai} alt="Sampah Pantai" />
          </div>
        </div>
      </div>
      {/* END JENIS SAMPAH */}
    </div>
  );
}
