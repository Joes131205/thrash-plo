import React from "react";
import { IcLocation, IcSeparator } from "@/assets/icons";

const styles: Record<string, React.CSSProperties> = {
  heroCard: {
    backgroundColor: "#FAFAFA",
    height: 360,
    borderRadius: 15,
    width: "32%",
    position: "relative",
  },
  upperGradient: {
    background: "linear-gradient(to right, #f6fdfe 0%, #d2e8bb 25%, #f3f19c 51%, #fdfad6 94%)",
    height: 103,
    borderRadius: 15,
  },
  identityBox: {
    padding: "0px 24px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    position: "relative",
    top: -40,
    justifyContent: "space-between",
  },
  heroName: {
    fontSize: "var(--dp-18)",
    fontWeight: "var(--weight-semibold)",
    color: "var(--rank-point)",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  textLocation: {
    color: "#A6A6A6",
    fontSize: 11,
  },
  pointBox: {
    borderRadius: 10,
    backgroundColor: "var(--rank-point)",
  },
  pointText: {
    color: "var(--rank-pts)",
    padding: "5px 8px",
    fontSize: 10,
    fontWeight: "var(--weight-semibold)",
  },
  stats: {
    padding: "0px 24px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countStats: {
    fontWeight: "var(--weight-bold)",
    fontSize: "var(--dp-20)",
    color: "var(--stats)",
  },
  descStats: {
    fontSize: "var(--dp-14)",
    color: "#A6A6A6",
  },
  separator: {
    backgroundColor: "rgba(46, 46, 46, 0.2)",
    width: 1,
    height: 35,
    margin: "0 12px",
  },
  rank: {
    textAlign: "center",
    fontSize: 20,
    color: "var(--secondary-color)",
    fontWeight: "var(--weight-semibold)",
    position: "relative",
    bottom: 8,
  },
};

type StatItem = {
  value: number | string;
  label: string;
};

type HeroBoxProps = {
  image: string;
  name: string;
  location: string;
  points: string;
  stats: StatItem[];
  rank: string;
};

const getGradientByRank = (rank: string): string => {
  switch (rank) {
    case "01.":
      return "linear-gradient(to right, #f6fdfe 0%, #d2e8bb 25%, #f3f19c 51%, #fdfad6 94%)";
    case "02.":
      return "linear-gradient(to right, #f6fdfe 0%, #CBCEF4 25%, #A0F4EA 64%, #FAFEFE 100%)";
    case "03.":
      return "linear-gradient(to right, #f6fdfe 0%, #DAE1AA 25%, #FADAC0 51%, #FFFBF8 100%)";
    default:
      return String(styles.upperGradient.background);
  }
};

const HeroBox: React.FC<HeroBoxProps> = ({ image, name, location, points, stats, rank }) => {
  return (
    <div style={styles.heroCard}>
      <div
        style={{
          ...styles.upperGradient,
          background: getGradientByRank(rank),
        }}
      ></div>
      <div style={styles.bottomContent}>
        <div style={styles.identityBox}>
          <div>
            <img src={image} alt={`Hero ${name}`} />
            <h5 style={styles.heroName}>{name}</h5>
            <div style={styles.location}>
              <img src={IcLocation} alt="Icon Lokasi" />
              <p style={styles.textLocation}>{location}</p>
            </div>
          </div>
          <div style={styles.pointBox}>
            <p style={styles.pointText}>{points}</p>
          </div>
        </div>
        <div style={styles.stats}>
          {stats.map((item, index) => {
            let displayValue = item.value;

            if (item.label === "Sampah") {
              displayValue = `${item.value}kg`;
            } else if (item.label === "Relawan") {
              displayValue = `${item.value}x`;
            }

            return (
              <React.Fragment key={index}>
                {index > 0 && <div style={styles.separator}></div>}
                <div style={styles.statsItem}>
                  <h5 style={styles.countStats}>{displayValue}</h5>
                  <p style={styles.descStats}>{item.label}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <img src={IcSeparator} alt="Icon Separator" style={{ transform: "scale(1.1)", marginTop: 10 }} />
      <p style={styles.rank}>{rank}</p>
    </div>
  );
};

export default HeroBox;
