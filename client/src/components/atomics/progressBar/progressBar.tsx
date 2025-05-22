import React from "react";

interface ProgressBarProps {
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        borderRadius: "10px",
        height: "10px",
        width: "100%",
        overflow: "hidden",
        marginTop: "8px",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percentage}%`,
          backgroundColor: "#3DD598",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
};

export default ProgressBar;
