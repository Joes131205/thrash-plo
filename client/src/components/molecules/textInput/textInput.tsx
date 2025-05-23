import React, { useState } from "react";
import { IcEyesClose, IcEyesOpen } from "@/assets/icons";

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  icon?: string;
  password?: boolean;
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid var(--stroke-secondary)",
    borderRadius: "8px",
    padding: "8px 12px",
    maxWidth: "400px",
    width: "100%",
    gap: 11,
  },
  text: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "var(--stroke-secondary)",
    fontSize: "16px",
    flex: 1,
  },
  eyeIcon: {
    cursor: "pointer",
  },
};

export default function TextInput({ value, onChange, placeholder = "", type = "text", icon, password }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = password ? (showPassword ? "text" : "password") : type;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      {icon && <img src={icon} alt="icon" />}
      <input type={inputType} value={value} onChange={onChange} placeholder={placeholder} style={styles.text} />
      {password && <img src={showPassword ? IcEyesOpen : IcEyesClose} alt="toggle password visibility" onClick={handleTogglePassword} style={styles.eyeIcon} />}
    </div>
  );
}
