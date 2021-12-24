import {
  Button,
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { sum } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "redux/actions/report/getActions";
import { RootStore } from "redux/store";
import Chart from "./components/Chart";
import GetAppIcon from "@material-ui/icons/GetApp";
import { CSVLink } from "react-csv";
import "./styles.scss";

export const reportOptions = [
  {
    name: "Last 7 days",
    value: "last-7-days",
  },
  {
    name: "Last month",
    value: "last-month",
  },
  {
    name: "This Month",
    value: "this-month",
  },
  {
    name: "This year",
    value: "year",
  },
];
const ReportPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { data } = useSelector((state: RootStore) => state.reports);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    dispatch(getReports(reportOptions[selectedIndex].value));
  }, [dispatch, selectedIndex]);

  const headers = [
    { label: "Date", key: "name" },
    { label: "Number of items sold", key: "itemsPurchased" },
    { label: "Number of orders", key: "orderPlaced" },
    { label: "Net sales amount", key: "netSale" },
    { label: "Shipping amount", key: "shippingFee" },
    { label: "Refund amount", key: "refunded" },
  ];

  const csvReport = {
    fileName: "Report" + reportOptions[selectedIndex].value + ".csv",
    headers: headers,
    data: data,
  };

  return (
    <div className="report">
      <Grid item xs={12}>
        <Paper className={classes.paperNav}>
          <List
            component="nav"
            aria-label="secondary mailbox folder"
            className={classes.flexContainer}
          >
            {reportOptions.map((item, index) => (
              <ListItem
                button
                key={`select-${index}`}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={item.name} className={classes.text} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Button
        variant="contained"
        // color="secondary"
        className={classes.btnExport}
      >
        <GetAppIcon />
        <CSVLink {...csvReport}> Export CSV</CSVLink>
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={2} className="quick-view">
          <Paper className={classes.paperItem}>
            <Typography variant="h5">
              ${Math.floor(sum(data.flatMap((x) => x.netSale)) / 100) * 100}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              net sales in this period
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">
              {Math.floor(sum(data.flatMap((x) => x.orderPlaced)) / 100) * 100}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              orders placed
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">
              {Math.floor(sum(data.flatMap((x) => x.itemsPurchased)) / 100) *
                100}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              items purchased
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">
              ${Math.floor(sum(data.flatMap((x) => x.refunded)) / 100) * 100}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              refunded order
            </Typography>
          </Paper>
          <Paper className={classes.paperItem}>
            <Typography variant="h5">
              ${Math.floor(sum(data.flatMap((x) => x.shippingFee)) / 100) * 100}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              charged for shipping
            </Typography>
          </Paper>
        </Grid>
        {/* <br /> */}
        <Grid item xs={10}>
          <Chart />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperNav: {
      background: "#fff",
      height: 50,
    },
    paperItem: {
      background: "#fff",
      height: 90,
      width: "100%",
      padding: "20px 10px 0",
    },
    flexContainer: {
      display: "flex",
      flexDirection: "row",
      padding: 0,
    },
    left: {
      padding: 10,
    },
    text: {
      color: "#1167b1",
    },
    btnExport: {
      margin: "8px 0",
      backgroundColor: "#487cec",
      color: "#fff",
    },
  })
);

export default ReportPage;
