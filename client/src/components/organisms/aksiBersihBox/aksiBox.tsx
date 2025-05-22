import React from "react";
import ProgressBar from "@/components/atomics/progressBar/progressBar";

interface AksiCardProps {
  image: string;
  date: string;
  title: string;
  volunteerCount: number;
  volunteerTarget: number;
  iconCalendar: string;
  onClick?: () => void;
}

const styles: Record<string, React.CSSProperties> = {
  aksiCard: {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    // width: 444,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 15,
  },
  content: {
    padding: "21px 18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dateBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  date: {
    color: "rgba(107, 114, 128, 0.8)",
  },
  nameAksi: {
    color: "var(--text-primary)",
    fontSize: 20,
    fontWeight: "var(--weight-semibold)",
    margin: "18px 0",
  },
  countVolunteer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    color: "#6B7280",
  },
  vCount: {
    color: "#55F5AC",
    fontSize: 20,
    fontWeight: "var(--weight-semibold)",
  },
};

const AksiCard: React.FC<AksiCardProps> = ({ image, date, title, volunteerCount, volunteerTarget, iconCalendar, onClick }) => {
  return (
    <div style={{ ...styles.aksiCard, cursor: "pointer" }} onClick={onClick}>
      <img src={image} alt="Aksi" />

      <div style={styles.content}>
        <div style={styles.dateBox}>
          <img src={iconCalendar} alt="Icon Calendar" />
          <p style={styles.date}>{date}</p>
        </div>

        <h4 style={styles.nameAksi}>{title}</h4>

        <div>
          <div style={styles.countVolunteer}>
            <p style={styles.label}>Volunteer Terkumpul</p>
            <p style={styles.vCount}>{volunteerCount} Orang</p>
          </div>
          <ProgressBar value={volunteerCount} max={volunteerTarget} />
        </div>
      </div>
    </div>
  );
};

export default AksiCard;
