import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", total: 423 },
  { name: "Feb", total: 589 },
  { name: "Mar", total: 967 },
  { name: "Apr", total: 801 },
  { name: "Mei", total: 523 },
  { name: "Jun", total: 921 },
  { name: "Jul", total: 375 },
  { name: "Agu", total: 602 },
  { name: "Sep", total: 678 },
];

const MonthlyReportChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#84DCC6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyReportChart;
