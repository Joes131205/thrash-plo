import { IcChevronBottom, IcChevronRight } from "@/assets/icons";
import React, { useState } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  placeholder?: string;
  value: string | null;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, placeholder = "Pilih...", value, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>

      <div style={styles.box} onClick={() => setIsOpen(!isOpen)}>
        <span
          style={{
            ...styles.placeholder,
            color: value ? "#888888" : "#666",
          }}
        >
          {value || placeholder}
        </span>
        <div style={styles.arrow}>{isOpen ? <img src={IcChevronBottom} alt="" /> : <img src={IcChevronRight} alt="" />}</div>
      </div>

      {isOpen && (
        <ul style={styles.dropdownList}>
          {options.map((option) => (
            <li key={option} style={styles.dropdownItem} onClick={() => handleSelect(option)} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "sans-serif",
    position: "relative",
    marginTop: -18,
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "18px",
    fontWeight: "var(--weight-medium)",
    color: "var(--text-primary)",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #444",
    borderRadius: "6px",
    cursor: "pointer",
    overflow: "hidden",
  },
  placeholder: {
    padding: "12px 16px",
    flex: 1,
  },
  arrow: {
    backgroundColor: "#2f2f2f",
    color: "#fff",
    padding: "10px 14px",
    fontSize: "16px",
    textAlign: "center",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    border: "1px solid #444",
    borderRadius: "6px",
    backgroundColor: "#fff",
    listStyle: "none",
    marginTop: "4px",
    padding: 0,
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "10px 16px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
  },
};

export default Dropdown;
