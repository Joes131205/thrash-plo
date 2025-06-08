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
    const [locationValue, setLocationValue] = useState({
        lat: 0,
        long: 0,
    });
    const [locationName, setLocationName] = useState("");
    const [trashType, setTrashType] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");
    const [photoNear, setPhotoNear] = useState<string | null>(null);
    const [photoFar, setPhotoFar] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);

    // Form validation states
    const [errors, setErrors] = useState<{
        location?: string;
        trashType?: string;
        weight?: string;
        photoNear?: string;
        photoFar?: string;
    }>({});

    const [loading, setLoading] = useState(false);

    // Function to get current location using the Geolocation API
    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            setGettingLocation(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocationValue({
                        lat: latitude,
                        long: longitude,
                    });

                    // Try to get readable address from coordinates using reverse geocoding
                    try {
                        // Using Nominatim API for reverse geocoding (OpenStreetMap)
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
                        );
                        const data = await response.json();

                        if (data && data.display_name) {
                            setLocationName(data.display_name);
                        } else {
                            setLocationName(
                                `${latitude.toFixed(6)}, ${longitude.toFixed(
                                    6
                                )}`
                            );
                        }
                    } catch (error) {
                        console.error("Error getting location name:", error);
                        setLocationName(
                            `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                        );
                    }

                    setGettingLocation(false);

                    // Clear any location error
                    setErrors((prev) => ({
                        ...prev,
                        location: undefined,
                    }));
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setGettingLocation(false);
                    setErrors((prev) => ({
                        ...prev,
                        location: "Gagal mendapatkan lokasi. Mohon isi manual.",
                    }));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            alert(
                "Geolocation tidak didukung di browser Anda. Mohon isi lokasi secara manual."
            );
            setGettingLocation(false);
        }
    };

    const validateForm = () => {
        const newErrors: {
            location?: string;
            trashType?: string;
            weight?: string;
            photoNear?: string;
            photoFar?: string;
        } = {};

        if (locationValue.lat === 0 && locationValue.long === 0) {
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
                location: locationValue,
                category:
                    trashType === "Tumpukan Sampah Liar"
                        ? "liar"
                        : trashType === "Sampah di Sungai"
                        ? "sungai"
                        : trashType === "Sampah di Pantai"
                        ? "pantai"
                        : ("liar" as "liar" | "pantai" | "sungai"),
                weightEstimation: weightNum || 0,
            };

            await apiService.reports.create(reportData);

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
                                label={`Lokasi ${
                                    errors.location
                                        ? "• " + errors.location
                                        : ""
                                }`}
                                placeholder="Masukkan lokasi"
                                value={locationName}
                                onChange={(e) => {
                                    setLocationName(e.target.value);
                                    // When manually entering location, reset coordinates
                                    if (e.target.value.trim() === "") {
                                        setLocationValue({ lat: 0, long: 0 });
                                    }
                                    setErrors((prev) => ({
                                        ...prev,
                                        location: undefined,
                                    }));
                                }}
                                isLocationField={true}
                                onUseCurrentLocation={getCurrentLocation}
                                isLoadingLocation={gettingLocation}
                            />
                            <Dropdown
                                label={`Jenis Sampah ${
                                    errors.trashType
                                        ? "• " + errors.trashType
                                        : ""
                                }`}
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
                                label={`Perkiraan Berat ${
                                    errors.weight ? "• " + errors.weight : ""
                                }`}
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
                                label={`Foto dari Dekat ${
                                    errors.photoNear
                                        ? "• " + errors.photoNear
                                        : ""
                                }`}
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
                                label={`Foto dari Jauh ${
                                    errors.photoFar
                                        ? "• " + errors.photoFar
                                        : ""
                                }`}
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
