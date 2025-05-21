import React from "react";

type StakeholderBoxProps = {
  icon: string;
  title: string;
  description: string;
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#E8F6F2",
    width: "313px",
    padding: "50px 30px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    background: "transparent",
  },
  title: {
    background: "transparent",
    fontWeight: 600,
    color: "#84DCC6",
    fontSize: 20,
    margin: "18px 0px",
  },
  description: {
    background: "transparent",
    fontWeight: 400,
    color: "#BFBFBF",
    fontSize: 18,
  },
};

export default function StakeholderBox({ icon, title, description }: StakeholderBoxProps) {
  return (
    <div style={styles.container}>
      <img src={icon} alt={`Icon ${title}`} style={styles.image} />
      <h4 style={styles.title}>{title}</h4>
      <p style={styles.description}>{description}</p>
    </div>
  );
}
