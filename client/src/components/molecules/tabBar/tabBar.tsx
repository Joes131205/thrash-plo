import React from "react";

type TabType = "Menunggu" | "Diproses" | "Selesai";

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const tabs: TabType[] = ["Menunggu", "Diproses", "Selesai"];

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(245, 245, 245, 0.7)",
        borderRadius: "16px",
        padding: "6px",
        width: 400,
        justifyContent: "space-between",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: "10px 20px",
            borderRadius: "12px",
            backgroundColor: activeTab === tab ? "#A5FFD6" : "transparent",
            fontWeight: activeTab === tab ? "var(--weight-semibold)" : "normal",
            cursor: "pointer",
            color: "var(--text-primary)",
            transition: "all 0.3s ease",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
