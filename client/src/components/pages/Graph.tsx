import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", uv: 400, pv: 2400, amt: 2400 },
  { name: "February", uv: 300, pv: 1398, amt: 2210 },
  { name: "March", uv: 200, pv: 9800, amt: 2290 },
  { name: "April", uv: 278, pv: 3908, amt: 2000 },
  { name: "May", uv: 189, pv: 4800, amt: 2181 },
];

const Graph = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#8884d8" />
        <Bar dataKey="pv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
