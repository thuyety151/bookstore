import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
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
import Box from "@mui/material/Box";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ContainedButton from "components/button/ContainedButton";
import { format } from "date-fns";

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
  {
    name: "This year",
    value: "custom",
  },
];
const ReportPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { data, requesting } = useSelector((state: RootStore) => state.reports);

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
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);
  const handleReportCustom = () => {
    if (date.filter((x) => !!x).length !== 2) {
      return;
    }
    dispatch(
      getReports(
        "custom",
        date[0]?.toJSON() || new Date(),
        date[1]?.toJSON() || new Date()
      )
    );
  };
  return (
    <div className="report">
      <Grid item xs={12}>
        <Paper className={classes.paperNav} variant="outlined">
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
                {item.value === "custom" ? (
                  <Grid style={{ display: "flex" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateRangePicker
                        startText="Date From"
                        endText="Date To"
                        value={date}
                        onChange={(newValue: any) => {
                          setDate(newValue);
                        }}
                        maxDate={new Date()}
                        renderInput={(startProps: any, endProps: any) => (
                          <React.Fragment>
                            <TextField
                              {...startProps}
                              variant="outlined"
                              size="small"
                              inputProps={{
                                ...startProps.inputProps,
                                value: date[0]
                                  ? format(date[0], "dd/MM/yyyy")
                                  : "",
                                placeholder: "dd/MM/yyyy",
                              }}
                            />
                            <Box sx={{ mx: 1 }}> to </Box>
                            <TextField
                              {...endProps}
                              inputProps={{
                                ...startProps.inputProps,
                                value: date[1]
                                  ? format(date[1], "dd/MM/yyyy")
                                  : "",
                                placeholder: "dd/MM/yyyy",
                              }}
                              variant="outlined"
                              size="small"
                            />
                          </React.Fragment>
                        )}
                      />
                    </LocalizationProvider>
                    <ContainedButton
                      text="Go"
                      className={classes.customOpt}
                      style={{ width: "fit-content" }}
                      onClick={handleReportCustom}
                    />
                  </Grid>
                ) : (
                  <ListItemText primary={item.name} className={classes.text} />
                )}
              </ListItem>
            ))}
          </List>
          {requesting && <LinearProgress />}
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
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              ${sum(data.flatMap((x) => x.netSale)).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Net sales in this period
            </Typography>
          </Paper>
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              {sum(data.flatMap((x) => x.orderPlaced))}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Orders placed
            </Typography>
          </Paper>
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              {sum(data.flatMap((x) => x.itemsPurchased))}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Items purchased
            </Typography>
          </Paper>
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              ${sum(data.flatMap((x) => x.refunded)).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Refunded order
            </Typography>
          </Paper>
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              ${sum(data.flatMap((x) => x.shippingFee)).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Charged for shipping
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
      // height: 50,
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
    customOpt: {
      width: "fit-content",
      height: "fit-content",
      alignSelf: "flex-end",
    },
  })
);

export default ReportPage;
