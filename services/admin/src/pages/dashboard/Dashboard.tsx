import { Button, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export enum ChartColor {
  WorthOfCouponsUsed = "#f2c512", //coup
  ChargedForShipping = "#5dc589", //shp
  Refunded = "#e64d3d", //refund
  ItemsPurchase = "#ecf0f1", //pur
  OrderPlaced = "#dbe1e3", //ord
  AverageNetDailySales = "#b2d4ea", //avg
  NetSales = "#b2d4ea", //net
}

const Dashboard: React.FC = () => {
  const autoGen = (days: number) => {
    const data = new Array(days).fill(null);
    const result = data.map((value, index) => ({
      name: (index + 1).toString(),
      coup: Math.floor(Math.random() * 1000),
      shp: Math.floor(Math.random() * 1000),
      refund: Math.floor(Math.random() * 1000),
      pur: Math.floor(Math.random() * 10),
      ord: Math.floor(Math.random() * 10),
      avg: Math.floor(Math.random() * 1000),
      net: Math.floor(Math.random() * 1000),
    }));
    return result;
  };

  const [days, setDays] = useState<number>(7);
  const [data, setData] = useState(autoGen(7));

  const load = () => {
    setData(autoGen(days));
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <TextField
          type="number"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
        />
        <Button onClick={load} color="primary" variant="contained">
          Execute
        </Button>
      </Grid>
      <ComposedChart width={1500} height={800} data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar
          yAxisId="left"
          dataKey="pur"
          barSize={20}
          fill={ChartColor.ItemsPurchase}
        />
        <Bar
          yAxisId="left"
          dataKey="ord"
          barSize={20}
          fill={ChartColor.OrderPlaced}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="coup"
          stroke={ChartColor.WorthOfCouponsUsed}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="refund"
          stroke={ChartColor.Refunded}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="shp"
          stroke={ChartColor.ChargedForShipping}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="avg"
          stroke={ChartColor.AverageNetDailySales}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="net"
          stroke={ChartColor.NetSales}
        />
      </ComposedChart>
    </div>
  );
};

export default Dashboard;
