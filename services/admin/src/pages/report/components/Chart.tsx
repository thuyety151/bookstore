import { Grid, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RootStore } from "redux/store";
import "../styles.scss";

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
    <div className="charts">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography variant="h5">Net Sales</Typography>
            <AreaChart
              data={data}
              width={1000}
              height={340}
              margin={{
                top: 30,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="netSale"
                stroke={ChartColor.NetSales}
                fill="#bedbed"
                name="Net Sales"
              />
            </AreaChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography variant="h5">Refunded order</Typography>
            <LineChart
              width={1000}
              height={340}
              data={data}
              margin={{
                top: 30,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="refunded"
                stroke={ChartColor.Refunded}
                name="Refunded order"
              />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography variant="h5">Charged for shipping</Typography>
            <LineChart
              width={1000}
              height={340}
              data={data}
              margin={{
                top: 30,
                bottom: 15,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="shippingFee"
                stroke={ChartColor.ChargedForShipping}
                name="Charged For Shipping"
              />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography variant="h5">Item Purchased & Order Placed</Typography>
            <BarChart
              width={1000}
              height={340}
              data={data}
              margin={{
                top: 30,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="itemsPurchased"
                fill="#8884d8"
                name="Items Purchased"
              />
              <Bar
                dataKey="orderPlaced"
                fill={ChartColor.OrderPlaced}
                name="Order Placed"
              />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chart;
