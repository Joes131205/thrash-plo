import React from "react";

interface Contributor {
  image: string;
  community: string;
  leader: string;
  reports: number;
  weight: number;
  region: string;
}

interface ContributorTableProps {
  data: Contributor[];
  style?: React.CSSProperties;
  tableStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
}

export const ContributorTable: React.FC<ContributorTableProps> = ({ data, style = {}, tableStyle = {}, headerStyle = {}, rowStyle = {}, cellStyle = {} }) => {
  const defaultStyle: React.CSSProperties = {
    margin: "16px 0",
    ...style,
  };

  const defaultTableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    ...tableStyle,
  };

  const defaultHeaderStyle: React.CSSProperties = {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #444",
    backgroundColor: "#eee",
    fontWeight: "600",
    ...headerStyle,
  };

  const defaultRowStyle: React.CSSProperties = {
    ":hover": {
      backgroundColor: "#f9f9f9",
    },
    ...rowStyle,
  };

  const defaultCellStyle: React.CSSProperties = {
    padding: "12px",
    textAlign: "left",
    border: "1px solid #444",
    ...cellStyle,
  };

  return (
    <div style={defaultStyle}>
      <table style={defaultTableStyle}>
        <thead>
          <tr>
            <th style={defaultHeaderStyle}>No</th>
            <th style={defaultHeaderStyle}>Gambar</th>
            <th style={defaultHeaderStyle}>Nama Komunitas</th>
            <th style={defaultHeaderStyle}>Nama Pemimpin</th>
            <th style={defaultHeaderStyle}>Jumlah Laporan</th>
            <th style={defaultHeaderStyle}>Total Berat Terkumpul (kg)</th>
            <th style={defaultHeaderStyle}>Daerah Dominan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={defaultRowStyle}>
              <td style={defaultCellStyle}>{index + 1}</td>
              <td style={defaultCellStyle}>
                <img src={item.image} alt={item.community} width="40" />
              </td>
              <td style={defaultCellStyle}>{item.community}</td>
              <td style={defaultCellStyle}>{item.leader}</td>
              <td style={defaultCellStyle}>{item.reports}</td>
              <td style={defaultCellStyle}>{item.weight}</td>
              <td style={defaultCellStyle}>{item.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
