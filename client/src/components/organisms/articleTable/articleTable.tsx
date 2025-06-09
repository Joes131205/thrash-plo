import { IcDelete, IcEdit, IcFilterBtn } from "@/assets/icons";
import React from "react";

type ArticleData = {
  title: string;
  content: string;
  releaseDate: string;
  imageUrl: string;
  status: string;
};

interface ArticleTableProps {
  data: ArticleData[];
  onEditClick: (index: number) => void;
  onDeleteClick: (index: number) => void;
}

const styles = {
  container: {
    color: "#2e2e2e",
    minHeight: "100vh",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontFamily: "Arial, sans-serif",
  },
  thtd: {
    padding: "12px 16px",
    border: "1px solid #444",
    textAlign: "center" as const,
    verticalAlign: "middle" as const,
  },
  th: {
    color: "#2e2e2e",
  },
  status: {
    menunggu: {
      backgroundColor: "#ff9900",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "6px",
    },
    proses: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "6px",
    },
    selesai: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "6px",
    },
  },
};

const ArticleTable: React.FC<ArticleTableProps> = ({ data, onDeleteClick, onEditClick }) => {
  if (!data || data.length === 0) {
    return <p style={{ fontStyle: "italic", color: "#999" }}>Belum ada artikel.</p>;
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            {["No", "Judul", "Isi", "Tanggal Rilis", "Gambar", "Status", "Edit", "Hapus"].map((title) => (
              <th key={title} style={{ ...styles.thtd, ...styles.th }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                  <p>{title}</p>
                  <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={styles.thtd}>{index + 1}</td>
              <td style={styles.thtd}>{row.title}</td>
              <td style={styles.thtd}>{row.content}</td>
              <td style={styles.thtd}>{row.releaseDate}</td>
              <td style={styles.thtd}>
                <img src={row.imageUrl} alt="Gambar Artikel" style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 6 }} />
              </td>
              <td style={styles.thtd}>
                <span style={styles.status[row.status.toLowerCase() as keyof typeof styles.status]}>{row.status}</span>
              </td>
              <td style={styles.thtd}>
                <button style={{ background: "transparent", border: "none", cursor: "pointer" }} onClick={onEditClick(index)} title="Edit">
                  <img src={IcEdit} alt="" />
                </button>
              </td>
              <td style={styles.thtd}>
                <button style={{ background: "transparent", border: "none", cursor: "pointer" }} onClick={onDeleteClick(index)} title="Hapus">
                  <img src={IcDelete} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
