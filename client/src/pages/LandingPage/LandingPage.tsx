import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ImgAksiOne, ImgAksiTwo, ImgFlow, ImgHeroOne, ImgHeroThree, ImgHeroTwo, ImgLanding, ImgLogo, ImgMisiKita, ImgPantai, ImgSungai, ImgTumpukan, ImgWhiteLogo } from "@/assets/images";
import { IcArrowLeft, IcArrowRight, IcCalendar, IcFacebook, IcGarbage, IcInsta, IcKomunitas, IcMitra, IcPemerintah, IcTiktok, IcTruck, IcWarga } from "@/assets/icons";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import StakeholderBox from "@/components/molecules/stakeholderBox/stakeholderBox";
import HeroBox from "@/components/organisms/heroBox/heroBox";
import AksiBox from "@/components/organisms/aksiBersihBox/aksiBox";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const isSmall = true;

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
      <div className={styles.navbar}>
        <img src={ImgLogo} alt="Logo ThrashPlo" />
        <ul className={styles.listNavbar}>
          <li className={styles.listItem}>
            <a href="#home">Home</a>
          </li>
          <li className={styles.listItem}>
            <a href="#misi-kita">Misi Kita</a>
          </li>
          <li className={styles.listItem}>
            <a href="#lapor-sampah">Laporkan Sampah</a>
          </li>
          <li className={styles.listItem}>
            <a href="#aksi-bersih">Aksi Bersih</a>
          </li>
        </ul>
        <div className={styles.btnContainer}>
          <ButtonMain btnText={"Login"} btnColor={false} colorBorder={true} textColor={"default"} onClick={() => navigate("/login")} />
          <ButtonMain btnText={"Warga"} btnColor={true} colorBorder={false} textColor={"white"} onClick={() => navigate("/register")} />
        </div>
      </div>
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
            <ButtonMain btnText={"Lapor Sekarang"} btnColor={false} colorBorder={false} textColor={"green"} weightFont={true} />
          </motion.div>
          <motion.img src={IcTruck} alt="Icon Truck" style={{ width: 250, height: 250 }} variants={slideRight} custom={2} />
        </motion.div>
      </motion.div>

      {/* END BANNER LAPOR SAMPAH */}

      {/* AKSI BERSIH */}
      <motion.div
        className={styles.aksiBersih}
        id="aksi-bersih"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // animasi hanya sekali saat scroll 30% terlihat
      >
        <motion.h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px", textAlign: "center" }} custom={0} variants={fadeSlideUp}>
          Aksi Nyata untuk Gapai Indonesia Bersih!
        </motion.h2>

        <motion.p className={styles.descMisi} style={{ textAlign: "center" }} custom={1} variants={fadeSlideUp}>
          Jadilah pahlawan lingkungan, mulai dari lokasi terdekatmu
        </motion.p>

        <div className={styles.listAksi}>
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} custom={i} variants={popScale}>
              <AksiBox
                image={i === 0 ? ImgAksiOne : i === 1 ? ImgAksiTwo : ImgAksiOne}
                iconCalendar={IcCalendar}
                date={i === 0 ? "5 Juni 2025" : i === 1 ? "20 Agustus 2025" : "15 Desember 2025"}
                title={i === 0 ? "Bersih Bersama di Muara Angke: Dari Warga untuk Laut Kita" : i === 1 ? "Jakarta Pesisir Tanpa Sampah – Kolaborasi untuk Laut Bersih" : "Gerakan Bersih Kali Angke - Untuk Jakarta Mengalir Lebih Baik"}
                volunteerCount={i === 0 ? 200 : i === 1 ? 50 : 100}
                volunteerTarget={i === 0 ? 250 : i === 1 ? 100 : 150}
                onClick={() => console.log("Card diklik!")}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* END AKSI BERSIH */}

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
      <div className={styles.footer}>
        <div className={styles.upperFooter}>
          <div className={styles.leftFooter}>
            <div className={styles.textLogo}>
              <img src={ImgWhiteLogo} alt="Logo ThrashPlo" />
              <p className={styles.footerDesc}>Platform kolaboratif untuk menghubungkan masyarakat, komunitas, dan pemerintah dalam melaporkan, membersihkan, dan mengelola sampah secara berkelanjutan.</p>
            </div>
            <div className={styles.listSosmed}>
              <div className={styles.iconWrap}>
                <img src={IcFacebook} alt="Icon Facebook" />
              </div>
              <div className={styles.iconWrap}>
                <img src={IcInsta} alt="Icon Instagram" />
              </div>
              <div className={styles.iconWrap}>
                <img src={IcTiktok} alt="Icon Tiktok" />
              </div>
            </div>
          </div>
          <div className={styles.rightFooter}>
            <div>
              <h5 className={styles.topName}>PERUSAHAAN</h5>
              <p className={styles.bottomName}>Tentang Kami</p>
            </div>
            <div>
              <h5 className={styles.topName}>NAVIGASI</h5>
              <div className={styles.listBottom}>
                <p className={styles.bottomName}>
                  <a href="#home">Home</a>
                </p>
                <p className={styles.bottomName}>
                  <a href="#misi-kita">Misi Kita</a>
                </p>
                <p className={styles.bottomName}>
                  <a href="#lapor-sampah">Laporkan Sampah</a>
                </p>
                <p className={styles.bottomName}>
                  <a href="#aksi-bersih">Aksi Bersih</a>
                </p>
              </div>
            </div>
            <div>
              <h5 className={styles.topName}>PUSAT BANTUAN</h5>
              <div className={styles.listBottom}>
                <p className={styles.bottomName}>Jl. Raya Kb. Jeruk, Kota Jakarta Barat, 11540</p>
                <p className={styles.bottomName}>support.trashplo@gmail.com</p>
                <p className={styles.bottomName}>0811-2602-436</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.bottomFooter}>
          <p>© TrashPlo 2025 | All Right Reserved</p>
          <div className={styles.rightBottom}>
            <p>Syarat dan Ketentuan</p>
            <p>Kebijakan Privasi</p>
          </div>
        </div>
      </div>
      {/* END FOOTER */}
    </div>
  );
}
