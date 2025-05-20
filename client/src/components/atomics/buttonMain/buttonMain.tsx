import React from "react";

type ButtonMainProps = {
  btnText: string;
  btnColor?: boolean;
  colorBorder?: boolean;
  textColor?: boolean;
};

export default function ButtonMain({ btnText, btnColor, colorBorder, textColor }: ButtonMainProps) {
  return (
    <div
      style={{
        backgroundColor: btnColor ? "var(--secondary-color)" : "none",
        padding: "12px 25px",
        width: "129px",
        justifyContent: "center",
        alignItems: "center",
        border: colorBorder ? "1.5px solid var(--stroke-primary)" : "none",
        borderRadius: "14px",
        cursor: "pointer",
        display: "flex",
      }}
    >
      <p style={{ textAlign: "center", color: textColor ? "#FFFFFF" : "#2E2E2E", fontSize: "16px", backgroundColor: btnColor ? "var(--secondary-color)" : "none" }}>{btnText}</p>
    </div>
  );
}
