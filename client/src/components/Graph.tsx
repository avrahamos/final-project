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

interface GraphProps {
  data: {
    attacktype: string;
    nkill: number;
    nwound: number;
    totalAmount: number;
  }[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="attacktype" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="nkill" fill="#8884d8" name="Number of Kills" />
        <Bar dataKey="nwound" fill="#82ca9d" name="Number of Wounds" />
        <Bar dataKey="totalAmount" fill="#ffc658" name="Total Amount" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
