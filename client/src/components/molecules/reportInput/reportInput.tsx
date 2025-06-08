import React, { useState } from "react";

type ReportInputProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    name?: string;
    isLocationField?: boolean;
    isTextarea?: boolean;
    onUseCurrentLocation?: () => void;
    isLoadingLocation?: boolean;
};

const ReportInput: React.FC<ReportInputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    name,
    isLocationField = false,
    isTextarea,
    onUseCurrentLocation,
    isLoadingLocation = false,
}) => {
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setUseCurrentLocation(isChecked);

        if (isChecked && onUseCurrentLocation) {
            onUseCurrentLocation();
        } else if (!isChecked) {
            // Clear the input when unchecked
            const syntheticEvent = {
                target: { name, value: "" },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>{label}</label>
            {isTextarea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={styles.textarea}
                    disabled={
                        isLocationField &&
                        useCurrentLocation &&
                        isLoadingLocation
                    }
                />
            ) : (
                <input
                    type="text"
                    name={name}
                    value={
                        isLoadingLocation ? "Mengambil lokasi kamu..." : value
                    }
                    onChange={onChange}
                    placeholder={placeholder}
                    style={styles.input}
                    disabled={
                        isLocationField &&
                        useCurrentLocation &&
                        isLoadingLocation
                    }
                />
            )}
            {isLocationField && (
                <label style={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={useCurrentLocation}
                        onChange={handleCheckboxChange}
                    />
                    Gunakan lokasi saat ini
                </label>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "18px",
        fontWeight: "var(--weight-medium)",
        color: "var(--text-primary)",
    },
    textarea: {
        width: "100%",
        padding: "12px 16px",
        fontSize: "16px",
        border: "1px solid #4A4A4A",
        borderRadius: "6px",
        color: "#888888",
        outline: "none",
        height: "120px",
        resize: "none",
        lineHeight: "1.5",
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        fontSize: "16px",
        border: "1px solid #4A4A4A",
        borderRadius: "6px",
        color: "#888888 ",
        outline: "none",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "8px",
        fontSize: "16px",
        color: "#2e2e2e",
    },
};

export default ReportInput;
