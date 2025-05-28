import React from "react";

type TimelineItem = {
  title: string;
  subtitle: string;
  color?: string;
};

type ProgressTimelineProps = {
  data: TimelineItem[];
};

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: "flex", gap: "1rem" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "80px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: item.color || "#2BBBAD	",
                zIndex: 1,
              }}
            />
            {index < data.length - 1 && (
              <div
                style={{
                  width: "2px",
                  height: "100%",
                  backgroundImage: "linear-gradient(to bottom, #d9d9d9 30%, transparent 0%)",
                  backgroundSize: "2px 8px",
                  backgroundRepeat: "repeat-y",
                  marginTop: "2px",
                  flexGrow: 1,
                }}
              />
            )}
          </div>
          <div>
            <h4 style={{ marginTop: -5, color: item.color || "#2BBBAD	", fontWeight: "var(--weight-semibold)", fontSize: 18 }}>{item.title}</h4>
            <p style={{ margin: 0, color: "#757575", fontSize: 14 }}>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTimeline;
