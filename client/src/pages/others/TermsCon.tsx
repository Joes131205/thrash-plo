import { IcLogoSmall, IcSearch } from "@/assets/icons";
import styles from "./Terms.module.css";
import { useState } from "react";

export default function TermsCondition() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("User search:", searchText);
  };

  const highlightText = (text: string) => {
    if (!searchText) return text;

    const regex = new RegExp(`(${searchText})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: "#FFEB3B" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <img src={IcLogoSmall} alt="" />
          <div className={styles.separator}></div>
        </div>
        <p className={styles.termsText}>Kebijakan ThrashPlo</p>
      </div>
      {/* END HEADER */}

      {/* BANNER */}
      <div className={styles.banner}>
        <h1 className={styles.bannerText}>Hai, ada yang bisa kami bantu?</h1>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Mencari.."
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchClick();
            }}
          />
          <div className={styles.iconBox}>
            <span style={{ cursor: "pointer" }} onClick={handleSearchClick}>
              <img src={IcSearch} alt="search" />
            </span>
          </div>
        </div>
      </div>
      {/* END BANNER */}

      {/* CONTENT */}
      <div className={styles.content}>
        <h1 className={styles.titleContent}>Syarat dan Ketentuan</h1>
        <div className={styles.listContent}>
          <div className={styles.leftContent}>
            <h5 className={styles.stakeholder}>WARGA</h5>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>1. Keaslian Data</h6>
              <p className={styles.pointDesc}>{highlightText("Data yang Anda berikan, seperti nama lengkap, email, nomor KTP, dan alamat, harus valid dan dapat dipertanggungjawabkan.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>2. Kewajiban Pelaporan</h6>
              <p className={styles.pointDesc}>{highlightText("Laporan yang dikirimkan harus berupa laporan asli, sesuai dengan kondisi di lapangan. Dilarang membuat laporan fiktif atau menyesatkan.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>3. Penggunaan yang Bertanggung Jawab</h6>
              <p className={styles.pointDesc}>{highlightText("Platform TrashPlo hanya digunakan untuk kepentingan pelaporan dan pemantauan titik sampah. Penggunaan di luar ketentuan dapat menyebabkan akun Anda dibekukan.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>4. Privasi Data</h6>
              <p className={styles.pointDesc}>{highlightText("Informasi pribadi Anda akan dijaga kerahasiaannya oleh TrashPlo, sesuai dengan kebijakan privasi yang berlaku.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>5. Penyalahgunaan Platform</h6>
              <p className={styles.pointDesc}>{highlightText("Setiap bentuk pelanggaran, seperti laporan palsu berulang, dapat menyebabkan akun Anda dinonaktifkan secara permanen.")}</p>
            </div>
          </div>

          <div className={styles.separator}></div>

          <div className={styles.rightContent}>
            <h5 className={styles.stakeholder}>KOMUNITAS</h5>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>1. Keaslian Data Komunitas</h6>
              <p className={styles.pointDesc}>{highlightText("Semua informasi komunitas, termasuk nama komunitas, kontak penanggung jawab, nomor KTP ketua, dan wilayah operasional, harus valid dan dapat dipertanggungjawabkan.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>2. Komitmen Verifikasi dan Aksi Bersih</h6>
              <p className={styles.pointDesc}>{highlightText("Komunitas wajib aktif dalam proses verifikasi laporan sampah, penyusunan aksi bersih, pelaksanaan, serta pelaporan hasil aksi di platform.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>3. Penggunaan Platform</h6>
              <p className={styles.pointDesc}>{highlightText("Komunitas wajib menggunakan platform TrashPlo hanya untuk tujuan pengelolaan lingkungan. Penyalahgunaan akan dikenakan sanksi.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>4. Kerahasiaan dan Transparansi</h6>
              <p className={styles.pointDesc}>{highlightText("Data komunitas akan dijaga kerahasiaannya, namun aktivitas publik seperti jumlah aksi bersih dapat ditampilkan di platform untuk transparansi.")}</p>
            </div>

            <div className={styles.termsPoint}>
              <h6 className={styles.pointTitle}>5. Kepatuhan terhadap Regulasi</h6>
              <p className={styles.pointDesc}>{highlightText("Komunitas harus mematuhi seluruh regulasi lokal terkait kegiatan pengelolaan lingkungan dan keamanan kegiatan lapangan.")}</p>
            </div>
          </div>
        </div>
      </div>
      {/* END CONTENT */}
    </div>
  );
}
