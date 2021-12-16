import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
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
import { RootStore } from "redux/store";

export enum ChartColor {
  WorthOfCouponsUsed = "#f2c512", //coup
  ChargedForShipping = "#5dc589", //shp
  Refunded = "#e64d3d", //refund
  ItemsPurchase = "#ecf0f1", //pur
  OrderPlaced = "#dbe1e3", //ord
  AverageNetDailySales = "#b2d4ea", //avg
  NetSales = "#b2d4ea", //net
}

const Chart: React.FC = () => {
  const { data } = useSelector((state: RootStore) => state.reports);
  return (
    <div>
      {console.log("Asd", data)}
      <Paper variant="outlined">
        <ComposedChart width={1500} height={800} data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar
            yAxisId="left"
            dataKey="itemsPurchased"
            barSize={20}
            fill={ChartColor.ItemsPurchase}
          />
          <Bar
            yAxisId="left"
            dataKey="orderPlaced"
            barSize={20}
            fill={ChartColor.OrderPlaced}
          />
          {/* <Line
            yAxisId="right"
            type="linear"
            dataKey="coup"
            stroke={ChartColor.WorthOfCouponsUsed}
          /> */}
          <Line
            yAxisId="right"
            type="linear"
            dataKey="refunded"
            stroke={ChartColor.Refunded}
          />
          <Line
            yAxisId="right"
            type="linear"
            dataKey="shippingFee"
            stroke={ChartColor.ChargedForShipping}
          />
          {/* <Line
            yAxisId="right"
            type="linear"
            dataKey="avg"
            stroke={ChartColor.AverageNetDailySales}
          /> */}
          <Line
            yAxisId="right"
            type="linear"
            dataKey="netSale"
            stroke={ChartColor.NetSales}
          />
        </ComposedChart>
      </Paper>
    </div>
  );
};

export default Chart;
