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

  useEffect(() => {
    if (isLocationField && useCurrentLocation) {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();

            const locationName = data.display_name || `${latitude}, ${longitude}`;

            const syntheticEvent = {
              target: { name, value: locationName },
            } as React.ChangeEvent<HTMLInputElement>;

            onChange(syntheticEvent);
          } catch (error) {
            alert("Failed to get location name: " + error);
          }
        },
        (error) => {
          alert("Failed to get location: " + error.message);
        }
      );
    }
  }, [useCurrentLocation, isLocationField, name, onChange]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseCurrentLocation(isChecked);

    if (!isChecked) {
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
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} style={styles.textarea} disabled={isLocationField && useCurrentLocation} />
      ) : (
        <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} style={styles.input} disabled={isLocationField && useCurrentLocation} />
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
