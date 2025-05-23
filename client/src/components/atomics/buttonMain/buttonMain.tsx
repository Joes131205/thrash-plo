import React from "react";

type ButtonMainProps = {
  btnText: string;
  btnColor?: boolean;
  colorBorder?: boolean;
  textColor?: "white" | "green" | "default";
  weightFont?: boolean;
  onClick?: () => void;
  icon?: string;
};

const styles: Record<string, React.CSSProperties> = {
  button: {
    padding: "12px 40px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "14px",
    cursor: "pointer",
    display: "flex",
  },
  text: {
    textAlign: "center",
    fontSize: "16px",
  },
};

export default function ButtonMain({ btnText, btnColor, colorBorder, textColor, weightFont, onClick, icon }: ButtonMainProps) {
  return (
    <div
      style={{
        ...styles.button,
        backgroundColor: btnColor ? "var(--secondary-color)" : "var(--primary-color)",
        border: colorBorder ? "1.5px solid var(--stroke-primary)" : "none",
        width: "100%",
      }}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="icon" style={{ marginRight: 8, width: 20 }} />}
      <p
        style={{
          ...styles.text,
          color: textColor === "white" ? "#FFFFFF" : textColor === "green" ? "#84DCC6" : "#2E2E2E",
          backgroundColor: btnColor ? "var(--secondary-color)" : "transparent",
          fontWeight: weightFont ? "var(--weight-semibold)" : "var(--weight-regular)",
        }}
      >
        {btnText}
      </p>
    </div>
  );
}
