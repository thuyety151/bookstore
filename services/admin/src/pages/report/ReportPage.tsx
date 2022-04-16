import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { sum } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import Chart from "./components/Chart";
import "./styles.scss";
import HeaderPage from "components/headerPage/HeaderPage";
import ReportOptions from "./components/ReportOptions";

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
  const { data } = useSelector((state: RootStore) => state.reports);

  return (
    <div className="report">
      <HeaderPage title="Dashboard" />
      <ReportOptions />
      {/* TODO: Implement get report  */}
      {/* <Grid item xs={12}>
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
      </Grid> */}

      <Grid container spacing={2}>
        <Grid item xs={2} className="quick-view">
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              ${sum(data.flatMap((x) => x.netSale)).toFixed(2)}
            </Typography>
            <Typography variant="body2" style={{ color: "var(--text-grey)" }}>
              Net sales in this period
            </Typography>
          </Paper>
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              {sum(data.flatMap((x) => x.orderPlaced))}
            </Typography>
            <Typography variant="body2" style={{ color: "var(--text-grey)" }}>
              Orders placed
            </Typography>
          </Paper>
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              {sum(data.flatMap((x) => x.itemsPurchased))}
            </Typography>
            <Typography variant="body2" style={{ color: "var(--text-grey)" }}>
              Items purchased
            </Typography>
          </Paper>
          <Paper className={classes.paperItem} variant="outlined">
            <Typography variant="h5">
              ${sum(data.flatMap((x) => x.refunded)).toFixed(2)}
            </Typography>
            <Typography variant="body2" style={{ color: "var(--text-grey)" }}>
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
      background: "#fbfdff",
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
