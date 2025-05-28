import Navbar from "@/components/molecules/navbar/navbar";
import { motion } from "framer-motion";
import styles from "./Report.module.css";
import Footer from "@/components/organisms/footer/footer";
import ReportInput from "@/components/molecules/reportInput/reportInput";
import { useState } from "react";
import Dropdown from "@/components/molecules/dropdownMain/DropdownMain";
import PictInput from "@/components/molecules/pictInput/pictInput";
import { IcPlus } from "@/assets/icons";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import { useNavigate } from "react-router-dom";

export default function BuatLaporanPage() {
  const navigate = useNavigate();

  const [locationValue, setLocationValue] = useState("");
  const [trashType, setTrashType] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [photoNear, setPhotoNear] = useState<string | null>(null);
  const [photoFar, setPhotoFar] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmitReport = () => {
    const weightNum = weight.trim() === "" ? null : Number(weight);

    if (weight.trim() !== "" && isNaN(weightNum)) {
      alert("Berat harus berupa angka!");
      return;
    }

    console.log({ locationValue, trashType, weight, notes, photoNear, photoFar });
    const laporanBaru = {
      id: Date.now(),
      tanggal: new Date().toLocaleDateString("id-ID"),
      lokasi: locationValue,
      jenisSampah: trashType,
      weight: weightNum,
      notes: notes,
      fotoUrlNear: photoNear,
      fotoUrl: photoFar,
      status: "Menunggu",
    };

    navigate("/riwayat-laporan", { state: laporanBaru });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return (
    <div>
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
        {/* NAVBAR */}
        <Navbar />
        {/* END NAVBAR */}

        {/* CONTENT */}
        <div className={styles.container}>
          <h1 className={styles.titleMisi}>Buat Laporan Baru</h1>

          <div className={styles.content}>
            <div className={styles.leftContent}>
              <ReportInput label="Lokasi" placeholder="Masukkan lokasi" value={locationValue} onChange={(e) => setLocationValue(e.target.value)} isLocationField={true} />
              <Dropdown label="Jenis Sampah" options={["Tumpukan Sampah Liar", "Sampah di Sungai", "Sampah di Pantai"]} placeholder="Pilih Jenis Sampah" value={trashType} onSelect={(value) => setTrashType(value)} />
              <ReportInput label="Perkiraan Berat" placeholder="Masukkan perkiraan berat (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
              <ReportInput label="Catatan" placeholder="Masukkan catatan terkait sampah (opsional)" value={notes} onChange={(e) => setNotes(e.target.value)} isTextarea />
            </div>

            <div className={styles.rightContent}>
              <PictInput icon={IcPlus} placeholder="Unggah Foto Disini" isShowLabel={true} label="Foto dari Dekat" isDarkBorder={true} value={photoNear} onChange={(val) => setPhotoNear(val)} />
              <PictInput icon={IcPlus} placeholder="Unggah Foto Disini" isShowLabel={true} label="Foto dari Jauh" isDarkBorder={true} value={photoFar} onChange={(val) => setPhotoFar(val)} />
              <div>
                <p className={styles.warnText}>Pernyataan</p>
                <div className={styles.warnBox}>
                  <p className={styles.warnPlaceholder}>Laporan yang saya buat benar adanya dan dapat dipertanggungjawabkan jika saya bersalah.</p>
                  <div className={styles.checkboxLabel}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <p>Ya, saya setuju</p>
                  </div>
                </div>
              </div>
              <ButtonMain btnText={"Buat Laporan"} btnColor={true} colorBorder={false} textColor={"white"} weightFont={true} disabled={!isChecked} onClick={handleSubmitReport} />
            </div>
          </div>
        </div>
        {/* END CONTENT */}

        {/* FOOTER */}
        <Footer />
        {/* END FOOTER */}
      </motion.div>
    </div>
  );
}
