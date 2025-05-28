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
  loading?: boolean;
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
    position: "relative",
  },
  text: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  spinner: {
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #3498db",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    animation: "spin 1s linear infinite",
  },
};

export default function ButtonMain({ btnText, btnColor, colorBorder, textColor, weightFont, onClick, icon, customStyle, fullWidth, isSmall, disabled, loading }: ButtonMainProps) {
  const isDisabled = disabled || loading;

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        style={{
          ...styles.button,
          backgroundColor: isDisabled ? "#ccc" : btnColor ? "var(--secondary-color)" : "var(--primary-color)",
          border: colorBorder ? "1.5px solid var(--stroke-primary)" : "none",
          width: "100%",
          flex: fullWidth ? 1 : undefined,
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.6 : 1,
          ...customStyle,
        }}
        onClick={!isDisabled ? onClick : undefined}
      >
        {loading ? (
          <span style={styles.spinner} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
