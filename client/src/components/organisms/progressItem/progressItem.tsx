import React from "react";

export interface ProgressItemProps {
  avatar: string;
  groupName: string;
  status: string;
  location: string;
  date: string;
  onClickDone?: () => void;
  isShowButton?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Sedang Diangkut":
      return "#126DA9";
    case "Menunggu Dijemput":
      return "#FF6600";
    default:
      return "#007bff";
  }
};

const ProgressItem: React.FC<ProgressItemProps> = ({ avatar, groupName, status, location, date, onClickDone, isShowButton }) => {
  return (
    <div style={styles.container}>
      {/* Left: Avatar + Info */}
      <div style={styles.leftSection}>
        <img src={avatar} alt="avatar" style={styles.avatar} />
        <div>
          <p style={styles.groupName}>{groupName}</p>
          <p style={{ ...styles.status, color: getStatusColor(status) }}>
            {status} - {location}
          </p>
        </div>
      </div>

      {/* Center: Date */}
      <p style={styles.date}>{date}</p>

      {/* Right: Button */}
      {isShowButton ? null : (
        <div>
          <button style={styles.button} onClick={onClickDone}>
            Selesai
          </button>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "grid",
    gridTemplateColumns: "2.5fr 1fr auto",
    alignItems: "center",
    gap: 16,
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    objectFit: "cover",
  },
  groupName: {
    fontWeight: "bold",
    margin: 0,
  },
  status: {
    margin: 0,
    fontSize: 14,
  },
  date: {
    color: "#888",
    fontSize: 14,
    margin: 0,
    whiteSpace: "nowrap",
    justifySelf: "center",
  },
  button: {
    backgroundColor: "#A5FFD6",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    fontWeight: "var(--weight-semibold)",
    cursor: "pointer",
    justifySelf: "end",
  },
};

export default ProgressItem;
