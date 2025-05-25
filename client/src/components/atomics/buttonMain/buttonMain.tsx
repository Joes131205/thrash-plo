import React from "react";

type ButtonMainProps = {
  btnText: string;
  btnColor?: boolean;
  colorBorder?: boolean;
  textColor?: "white" | "green" | "default";
  weightFont?: boolean;
  onClick?: () => void;
  icon?: string;
  customStyle?: React.CSSProperties;
  fullWidth?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
};

const styles: Record<string, React.CSSProperties> = {
  button: {
    padding: "12px 40px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "14px",
    cursor: "pointer",
    display: "flex",
    transition: "0.3s ease",
  },
  text: {
    textAlign: "center",
  },
};

export default function ButtonMain({ btnText, btnColor, colorBorder, textColor, weightFont, onClick, icon, customStyle, fullWidth, isSmall, disabled }: ButtonMainProps) {
  return (
    <div
      style={{
        ...styles.button,
        backgroundColor: disabled ? "#ccc" : btnColor ? "var(--secondary-color)" : "var(--primary-color)",
        border: colorBorder ? "1.5px solid var(--stroke-primary)" : "none",
        width: "100%",
        flex: fullWidth ? 1 : undefined,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...customStyle,
      }}
      onClick={!disabled ? onClick : undefined}
    >
      {icon && <img src={icon} alt="icon" style={{ marginRight: 8, width: 20 }} />}
      <p
        style={{
          ...styles.text,
          fontSize: isSmall ? "12px" : "16px",
          color: textColor === "white" ? "#FFFFFF" : textColor === "green" ? "#84DCC6" : "#2E2E2E",
          backgroundColor: "transparent",
          fontWeight: weightFont ? "var(--weight-semibold)" : "var(--weight-regular)",
        }}
      >
        {btnText}
      </p>
    </div>
  );
}
