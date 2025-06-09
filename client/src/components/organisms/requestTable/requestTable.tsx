import { IcFilterBtn } from "@/assets/icons";
import React from "react";

type RequestData = {
  name: string;
  location: string;
  date: string;
  elapsed: string;
  status: string;
  verification: string;
};

interface RequestTableProps {
  data: RequestData[];
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
    // backgroundColor: "#2e2e2e",
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
  verification: {
    terima: {
      backgroundColor: "#A5FFD6",
      color: "#003c1b",
      padding: "6px 12px",
      borderRadius: "6px",
    },
    "tandai selesai": {
      backgroundColor: "#d0f0ff",
      color: "#004466",
      padding: "6px 12px",
      borderRadius: "6px",
    },
    "sudah selesai": {
      backgroundColor: "#2CD789",
      color: "#004466",
      padding: "6px 12px",
      borderRadius: "6px",
    },
    ditolak: {
      backgroundColor: "#f8c1c1",
      color: "#8b0000",
      padding: "6px 12px",
      borderRadius: "6px",
    },
  },
};

const RequestTable: React.FC<RequestTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p style={{ fontStyle: "italic", color: "#999" }}>Belum ada laporan baru masuk.</p>;
  }
  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.thtd, ...styles.th }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <p>No</p>
                <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
              </div>
            </th>
            <th style={{ ...styles.thtd, ...styles.th }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <p>Nama Komunitas</p>
                <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
              </div>
            </th>
            <th style={{ ...styles.thtd, ...styles.th }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <p>Lokasi</p>
                <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
              </div>
            </th>
            <th style={{ ...styles.thtd, ...styles.th }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <p>Tanggal Request</p>
                <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
              </div>
            </th>
            <th style={{ ...styles.thtd, ...styles.th }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <p>Waktu Sejak Laporan</p>
                <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
              </div>
            </th>
            <th style={{ ...styles.thtd, ...styles.th }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <p>Status</p>
                <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
              </div>
            </th>
            <th style={{ ...styles.thtd, ...styles.th }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                <p>Verifikasi</p>
                <img src={IcFilterBtn} alt="" style={{ width: 12 }} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No Data
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td style={styles.thtd}>{index + 1}</td>
                <td style={styles.thtd}>{row.name}</td>
                <td style={styles.thtd}>{row.location}</td>
                <td style={styles.thtd}>{row.date}</td>
                <td style={styles.thtd}>{row.elapsed}</td>
                <td style={styles.thtd}>
                  <span style={styles.status[row.status.toLowerCase() as keyof typeof styles.status]}>{row.status}</span>
                </td>
                <td style={styles.thtd}>
                  <span style={styles.verification[row.verification.toLowerCase() as keyof typeof styles.verification]}>{row.verification}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
