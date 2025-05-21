import React from "react";

type ButtonMainProps = {
  btnText: string;
  btnColor?: boolean;
  colorBorder?: boolean;
  textColor?: boolean;
};

const styles: Record<string, React.CSSProperties> = {
  button: {
    padding: "12px 25px",
    width: "129px",
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

export default function ButtonMain({ btnText, btnColor, colorBorder, textColor }: ButtonMainProps) {
  return (
    <div
      style={{
        ...styles.button,
        backgroundColor: btnColor ? "var(--secondary-color)" : "transparent",
        border: colorBorder ? "1.5px solid var(--stroke-primary)" : "none",
      }}
    >
      <p
        style={{
          ...styles.text,
          color: textColor ? "#FFFFFF" : "#2E2E2E",
          backgroundColor: btnColor ? "var(--secondary-color)" : "transparent",
        }}
      >
        {btnText}
      </p>
    </div>
  );
}
