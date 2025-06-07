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
import apiService from "@/utils/api";

export default function BuatLaporanPage() {
    const navigate = useNavigate();
    const [locationValue, setLocationValue] = useState("");
    const [trashType, setTrashType] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");
    const [photoNear, setPhotoNear] = useState<string | null>(null);
    const [photoFar, setPhotoFar] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState(false);

    // Form validation states
    const [errors, setErrors] = useState<{
        location?: string;
        trashType?: string;
        weight?: string;
        photoNear?: string;
        photoFar?: string;
    }>({});

    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors: {
            location?: string;
            trashType?: string;
            weight?: string;
            photoNear?: string;
            photoFar?: string;
        } = {};

        if (!locationValue.trim()) {
            newErrors.location = "Lokasi harus diisi";
        }

        if (!trashType) {
            newErrors.trashType = "Jenis sampah harus dipilih";
        }

        if (weight.trim() !== "" && isNaN(Number(weight))) {
            newErrors.weight = "Berat harus berupa angka";
        }

        if (!photoNear) {
            newErrors.photoNear = "Foto dari dekat harus diunggah";
        }

        if (!photoFar) {
            newErrors.photoFar = "Foto dari jauh harus diunggah";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitReport = async () => {
        if (!validateForm()) {
            alert("Mohon lengkapi semua kolom yang diperlukan");
            return;
        }

        if (!isChecked) {
            alert("Anda harus menyetujui pernyataan");
            return;
        }

        setLoading(true);

        try {
            const weightNum = weight.trim() === "" ? null : Number(weight);

            const reportData = {
                trashId: `TR-${Date.now()}`,
                description: notes || "Tidak ada catatan",
                photo: photoFar || "",
                location: {
                    lat: 0,
                    long: 0,
                },
                category:
                    trashType === "Tumpukan Sampah Liar"
                        ? "liar"
                        : trashType === "Sampah di Sungai"
                          ? "sungai"
                          : trashType === "Sampah di Pantai"
                            ? "pantai"
                            : "liar",
                weightEstimation: weightNum || 0,
            };

            await apiService.reports.create(reportData);

            const laporanBaru = {
                id: Date.now(),
                tanggal: new Date().toISOString(),
                lokasi: locationValue,
                jenisSampah: trashType,
                weight: weightNum,
                notes: notes,
                fotoUrlNear: photoNear,
                fotoUrl: photoFar,
                status: "Menunggu",
            };

            // Navigate to report history with the new report
            navigate("/riwayat-laporan");
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Gagal mengirimkan laporan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
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
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
            >
                {/* NAVBAR */}
                <Navbar />
                {/* END NAVBAR */}

                {/* CONTENT */}
                <div className={styles.container}>
                    <h1 className={styles.titleMisi}>Buat Laporan Baru</h1>

                    <div className={styles.content}>
                        {" "}
                        <div className={styles.leftContent}>
                            <ReportInput
                                label={`Lokasi ${errors.location ? "• " + errors.location : ""}`}
                                placeholder="Masukkan lokasi"
                                value={locationValue}
                                onChange={(e) => {
                                    setLocationValue(e.target.value);
                                    if (e.target.value.trim()) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            location: undefined,
                                        }));
                                    }
                                }}
                                isLocationField={true}
                            />
                            <Dropdown
                                label={`Jenis Sampah ${errors.trashType ? "• " + errors.trashType : ""}`}
                                options={[
                                    "Tumpukan Sampah Liar",
                                    "Sampah di Sungai",
                                    "Sampah di Pantai",
                                ]}
                                placeholder="Pilih Jenis Sampah"
                                value={trashType}
                                onSelect={(value) => {
                                    setTrashType(value);
                                    setErrors((prev) => ({
                                        ...prev,
                                        trashType: undefined,
                                    }));
                                }}
                            />
                            <ReportInput
                                label={`Perkiraan Berat ${errors.weight ? "• " + errors.weight : ""}`}
                                placeholder="Masukkan perkiraan berat (kg)"
                                value={weight}
                                onChange={(e) => {
                                    setWeight(e.target.value);
                                    if (!isNaN(Number(e.target.value))) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            weight: undefined,
                                        }));
                                    }
                                }}
                            />
                            <ReportInput
                                label="Catatan"
                                placeholder="Masukkan catatan terkait sampah (opsional)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                isTextarea
                            />
                        </div>{" "}
                        <div className={styles.rightContent}>
                            <PictInput
                                icon={IcPlus}
                                placeholder="Unggah Foto Disini"
                                isShowLabel={true}
                                label={`Foto dari Dekat ${errors.photoNear ? "• " + errors.photoNear : ""}`}
                                isDarkBorder={true}
                                value={photoNear}
                                onChange={(val) => {
                                    setPhotoNear(val);
                                    setErrors((prev) => ({
                                        ...prev,
                                        photoNear: undefined,
                                    }));
                                }}
                            />
                            <PictInput
                                icon={IcPlus}
                                placeholder="Unggah Foto Disini"
                                isShowLabel={true}
                                label={`Foto dari Jauh ${errors.photoFar ? "• " + errors.photoFar : ""}`}
                                isDarkBorder={true}
                                value={photoFar}
                                onChange={(val) => {
                                    setPhotoFar(val);
                                    setErrors((prev) => ({
                                        ...prev,
                                        photoFar: undefined,
                                    }));
                                }}
                            />
                            <div>
                                <p className={styles.warnText}>Pernyataan</p>
                                <div className={styles.warnBox}>
                                    <p className={styles.warnPlaceholder}>
                                        Laporan yang saya buat benar adanya dan
                                        dapat dipertanggungjawabkan jika saya
                                        bersalah.
                                    </p>
                                    <div className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <p>Ya, saya setuju</p>
                                    </div>
                                </div>
                            </div>
                            <ButtonMain
                                btnText={"Buat Laporan"}
                                btnColor={true}
                                colorBorder={false}
                                textColor={"white"}
                                weightFont={true}
                                disabled={!isChecked}
                                onClick={handleSubmitReport}
                                loading={loading}
                            />
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
