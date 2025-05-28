import React, { useState, useEffect } from "react";

type ReportInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  isLocationField?: boolean;
  isTextarea?: boolean;
};

const ReportInput: React.FC<ReportInputProps> = ({ label, placeholder, value, onChange, name, isLocationField = false, isTextarea }) => {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [hasFetchedLocation, setHasFetchedLocation] = useState(false);

  useEffect(() => {
    if (isLocationField && useCurrentLocation && !hasFetchedLocation) {
      setLoadingLocation(true);

      const timeout = setTimeout(() => {
        const staticLocation = "Kali Angke, Jakarta Barat";

        const syntheticEvent = {
          target: { name, value: staticLocation },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
        setLoadingLocation(false);
        setHasFetchedLocation(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [useCurrentLocation, isLocationField, name, onChange, hasFetchedLocation]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseCurrentLocation(isChecked);

    if (!isChecked) {
      const syntheticEvent = {
        target: { name, value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
      setLoadingLocation(false);
      setHasFetchedLocation(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={styles.label}>{label}</label>
      {isTextarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} style={styles.textarea} disabled={isLocationField && useCurrentLocation} />
      ) : (
        <input type="text" name={name} value={loadingLocation ? "Mengambil lokasi kamu..." : value} onChange={onChange} placeholder={placeholder} style={styles.input} disabled={isLocationField && useCurrentLocation} />
      )}
      {isLocationField && (
        <label style={styles.checkboxLabel}>
          <input type="checkbox" checked={useCurrentLocation} onChange={handleCheckboxChange} />
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
