import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ButtonMain from "@/components/atomics/buttonMain/buttonMain";
import TextInput from "@/components/molecules/textInput/textInput";
import { IcCalendar, IcLocation, IcPencil } from "@/assets/icons";
import apiService from "@/utils/api";
import { useAuth } from "@/context/authContext";
import styles from "./CleanupActionForm.module.css";

interface CleanupActionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    actionId?: string; // If provided, we're editing an existing action
}

interface ReportOption {
    _id: string;
    description: string;
    location: {
        lat: number;
        long: number;
    };
    category: string;
}

const CleanupActionForm: React.FC<CleanupActionFormProps> = ({
    isOpen,
    onClose,
    onSuccess,
    actionId,
}) => {
    const { user } = useAuth();
    const [reports, setReports] = useState<ReportOption[]>([]);
    const [selectedReport, setSelectedReport] = useState<string>("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [maxVolunteers, setMaxVolunteers] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingReports, setIsLoadingReports] = useState(false);
    const [error, setError] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch available reports when the component mounts
    useEffect(() => {
        if (isOpen) {
            fetchReports();

            if (actionId) {
                setIsEditMode(true);
                fetchActionDetails();
            } else {
                setIsEditMode(false);
                resetForm();
            }
        }
    }, [isOpen, actionId]);

    const fetchReports = async () => {
        setIsLoadingReports(true);
        try {
            // Fetch reports with status "waiting" (unassigned reports)
            const response = await apiService.reports.getAll({
                status: "waiting",
            });
            setReports(response.data.data || []);
        } catch (error) {
            console.error("Error fetching reports:", error);
            setError("Gagal mengambil data laporan. Silakan coba lagi.");
        } finally {
            setIsLoadingReports(false);
        }
    };

    const fetchActionDetails = async () => {
        if (!actionId) return;

        setIsLoading(true);
        try {
            const response = await apiService.cleanupActions.getById(actionId);
            const action = response.data.data;

            setTitle(action.title);
            setLocation(action.location);
            setSelectedReport(action.reportId._id);
            // Format dates for input
            setStartDate(formatDateForInput(new Date(action.startDate)));
            setEndDate(formatDateForInput(new Date(action.endDate)));
            setMaxVolunteers(action.max_volunteers.toString());
        } catch (error) {
            console.error("Error fetching action details:", error);
            setError("Gagal mengambil detail aksi. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const resetForm = () => {
        setTitle("");
        setLocation("");
        setSelectedReport("");
        setStartDate("");
        setEndDate("");
        setMaxVolunteers("");
        setError("");
    };

    const validateForm = () => {
        if (!title.trim()) {
            setError("Judul aksi harus diisi");
            return false;
        }

        if (!selectedReport) {
            setError("Laporan harus dipilih");
            return false;
        }

        if (!location.trim()) {
            setError("Lokasi harus diisi");
            return false;
        }

        if (!startDate) {
            setError("Tanggal mulai harus diisi");
            return false;
        }

        if (!endDate) {
            setError("Tanggal selesai harus diisi");
            return false;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            setError("Tanggal mulai harus sebelum tanggal selesai");
            return false;
        }

        if (!maxVolunteers || parseInt(maxVolunteers) <= 0) {
            setError(
                "Jumlah relawan maksimal harus diisi dengan angka positif"
            );
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const actionData = {
                reportId: selectedReport,
                communityId: user._id,
                title,
                location,
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString(),
                status: "planned",
                volunteers: 0,
                max_volunteers: parseInt(maxVolunteers),
            };

            if (isEditMode && actionId) {
                // Update existing action - Note: API doesn't have an update endpoint yet,
                // in a real implementation you would call an update endpoint
                // await apiService.cleanupActions.update(actionId, actionData);
                alert("Fungsi update belum tersedia di API");
            } else {
                // Create new action
                await apiService.cleanupActions.create(actionData);
            }

            resetForm();
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving cleanup action:", error);
            setError("Gagal menyimpan aksi bersih. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <motion.div
                className={styles.modal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className={styles.title}>
                    {isEditMode ? "Edit Aksi Bersih" : "Buat Aksi Bersih Baru"}
                </h2>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <div className={styles.formGroup}>
                    <label className={styles.label}>Judul Aksi</label>
                    <TextInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Judul aksi bersih"
                        type="text"
                        icon={IcPencil}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Laporan Terkait</label>
                    <select
                        className={styles.select}
                        value={selectedReport}
                        onChange={(e) => setSelectedReport(e.target.value)}
                        disabled={isLoadingReports || isEditMode}
                    >
                        <option value="">-- Pilih Laporan --</option>
                        {reports.map((report) => (
                            <option key={report._id} value={report._id}>
                                {report.category} -{" "}
                                {report.description.substring(0, 30)}...
                            </option>
                        ))}
                    </select>
                    {isLoadingReports && (
                        <p className={styles.loading}>Memuat laporan...</p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Lokasi Detail</label>
                    <TextInput
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Lokasi detail aksi bersih"
                        type="text"
                        icon={IcLocation}
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tanggal Mulai</label>
                        <input
                            type="datetime-local"
                            className={styles.dateInput}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tanggal Selesai</label>
                        <input
                            type="datetime-local"
                            className={styles.dateInput}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Jumlah Relawan Maksimal
                    </label>
                    <TextInput
                        value={maxVolunteers}
                        onChange={(e) => {
                            // Only allow numbers
                            const value = e.target.value.replace(/\D/g, "");
                            setMaxVolunteers(value);
                        }}
                        placeholder="Jumlah relawan yang dibutuhkan"
                        type="number"
                        icon={IcPencil}
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <ButtonMain
                        btnText="Batal"
                        btnColor={false}
                        colorBorder={true}
                        textColor="default"
                        onClick={onClose}
                        disabled={isLoading}
                    />
                    <ButtonMain
                        btnText={isEditMode ? "Perbarui" : "Simpan"}
                        btnColor={true}
                        colorBorder={false}
                        textColor="white"
                        onClick={handleSubmit}
                        loading={isLoading}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default CleanupActionForm;
