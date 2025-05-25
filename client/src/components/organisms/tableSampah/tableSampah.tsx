import { IcEyesOpen } from "@/assets/icons";
import { ImgRiwayat } from "@/assets/images";
import React from "react";

type SampahData = {
  id: number;
  lokasi: string;
  jenisSampah: string;
  tanggal: string;
  fotoUrl: string;
};

interface TableSampahProps {
  data: SampahData[];
  onDetailClick: (id: number) => void;
}

const TableSampah: React.FC<TableSampahProps> = ({ data, onDetailClick }) => {
  const cellStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "center",
  };

  const headerStyle: React.CSSProperties = {
    ...cellStyle,
    fontWeight: "bold",
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "2px solid #ccc" }}>
          <th style={headerStyle}>No.</th>
          <th style={headerStyle}>Lokasi</th>
          <th style={headerStyle}>Jenis Sampah</th>
          <th style={headerStyle}>Tanggal</th>
          <th style={headerStyle}>Foto</th>
          <th style={headerStyle}>Detail</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} style={{ borderBottom: "1px solid #ccc" }}>
            <td style={cellStyle}>{index + 1}.</td>
            <td style={cellStyle}>{row.lokasi}</td>
            <td style={cellStyle}>{row.jenisSampah}</td>
            <td style={cellStyle}>{row.tanggal}</td>
            <td style={cellStyle}>
              <img src={ImgRiwayat} alt="foto" width={60} height={40} style={{ objectFit: "cover", borderRadius: 2 }} />
            </td>
            <td style={cellStyle}>
              <button onClick={() => onDetailClick(row.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <img src={IcEyesOpen} alt="eyes" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSampah;
