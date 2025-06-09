import React from "react";

interface CardProps {
  title: string;
  value: number | string;
  icon: string;
}

const StatsCard: React.FC<CardProps> = ({ title, value, icon }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#A5FFD6",
    padding: "15px 20px",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    // border: "1px solid #888888",
    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
    width: "fit-content",
    gap: 20,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e2e2e",
    margin: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: "normal",
    color: "#2e2e2e",
    margin: 0,
  };

  const iconStyle: React.CSSProperties = {
    width: 70,
  };

  return (
    <div style={cardStyle}>
      <div style={{ zIndex: 1 }}>
        <p style={valueStyle}>{value}</p>
        <p style={titleStyle}>{title}</p>
      </div>
      <img src={icon} alt={title} style={iconStyle} />
    </div>
  );
};

export default StatsCard;
