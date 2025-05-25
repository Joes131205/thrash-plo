import React, { useRef } from "react";

type TextInputProps = {
  icon?: string;
  label?: string;
  placeholder?: string;
  isShowLabel: boolean;
  isDarkBorder?: boolean;
  value?: string | null;
  onChange?: (value: string) => void;
};

export default function PictInput({ icon, label, placeholder, isShowLabel, isDarkBorder = false, value, onChange }: TextInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange?.(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
    },
    label: {
      display: "block",
      fontSize: "18px",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-primary)",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: `${isDarkBorder ? "1px" : "1.5px"} solid ${isDarkBorder ? "#4A4A4A" : "var(--stroke-secondary)"}`,
      borderRadius: "8px",
      padding: "20px",
      gap: 11,
      justifyContent: "center",
      cursor: "pointer",
    },
    text: {
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: "var(--stroke-secondary)",
      fontSize: "14px",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    hiddenInput: {
      display: "none",
    },
  };

  return (
    <div style={styles.wrapper}>
      {isShowLabel && <label style={styles.label}>{label}</label>}
      <div style={styles.container} onClick={handleClick}>
        {value ? (
          <img src={value} alt="Preview" style={styles.image} />
        ) : (
          <>
            {icon && <img src={icon} alt="icon" style={{ width: 24, height: 24 }} />}
            <p style={styles.text}>{placeholder}</p>
          </>
        )}
        <input type="file" accept="image/*" ref={fileInputRef} style={styles.hiddenInput} onChange={handleImageChange} />
      </div>
    </div>
  );
}
