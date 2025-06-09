import React from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, style = {}, titleStyle = {}, valueStyle = {} }) => {
  const defaultStyle: React.CSSProperties = {
    marginBottom: "8px",
    ...style,
    display: "flex",
    alignItems: "center",
    gap: 5,
  };

  const defaultTitleStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#666",
    ...titleStyle,
  };

  const defaultValueStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    ...valueStyle,
  };

  return (
    <div style={defaultStyle}>
      <h3 style={defaultTitleStyle}>{title}</h3>
      <p style={defaultValueStyle}>{value}</p>
    </div>
  );
};
