import React from "react";
import { ImgFlow, ImgLanding, ImgLogo, ImgMisiKita, ImgPantai, ImgSungai, ImgTumpukan, ImgWhiteLogo } from "@/assets/images";
import styles from "./LandingPage.module.css";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import StakeholderBox from "@/components/molecules/stakeholderBox/stakeholderBox";
import { IcFacebook, IcGarbage, IcInsta, IcKomunitas, IcMitra, IcPemerintah, IcTiktok, IcTruck, IcWarga } from "@/assets/icons";

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
          <ButtonMain btnText={"Login"} btnColor={false} colorBorder={true} textColor={"default"} />
          <ButtonMain btnText={"Warga"} btnColor={true} colorBorder={false} textColor={"white"} />
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
      <div className={styles.misiKita} id="misi-kita">
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

      {/* BANNER LAPOR SAMPAH */}
      <div className={styles.laporSampah} id="lapor-sampah">
        <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px" }}>
          Bersama Atasi Sampah, Mulai Hari Ini
        </h2>
        <p className={styles.descMisi} style={{ width: isSmall ? 780 : 0, textAlign: "center" }}>
          Laporkan titik sampah, koordinasikan aksi bersih-bersih, dan bantu wujudkan sistem pengelolaan sampah yang kolaboratif dan berkelanjutan.
        </p>

        <div className={styles.bottomContent}>
          <img src={IcGarbage} alt="Icon Sampah" />
          <ButtonMain btnText={"Lapor Sekarang"} btnColor={false} colorBorder={false} textColor={"green"} weightFont={true} />
          <img src={IcTruck} alt="Icon Truck" style={{ width: 250, height: 250 }} />
        </div>
      </div>
      {/* END BANNER LAPOR SAMPAH */}

      {/* AKSI BERSIH */}
      <div className={styles.aksiBersih} id="aksi-bersih">
        <h2 className={styles.titleMisi} style={{ fontSize: isSmall ? "36px" : "50px", textAlign: "center" }}>
          Aksi Nyata untuk Gapai Indonesia Bersih!
        </h2>
        <p className={styles.descMisi} style={{ textAlign: "center" }}>
          Jadilah pahlawan lingkungan, mulai dari lokasi terdekatmu
        </p>

        <div className={styles.listAksi}></div>
      </div>
      {/* END AKSI BERSIH */}

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
