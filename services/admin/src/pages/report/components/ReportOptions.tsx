import {
  Box,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React, { useEffect } from "react";
import { reportOptions } from "../ReportPage";
import "../styles.scss";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { DateRange, DateRangePicker } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getReports } from "redux/actions/report/getActions";
import ContainedButton from "components/button/ContainedButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import { CSVLink } from "react-csv";
import { RootStore } from "redux/store";

const ReportOptions: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);
  const { data, requesting } = useSelector((state: RootStore) => state.reports);

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
    filename: "Report" + reportOptions[selectedIndex].value + ".csv",
    headers: headers,
    data: data,
  };

  return (
    <div className="report-options-container">
      <div className="report-options">
        <List component="nav" aria-label="secondary mailbox folder">
          {reportOptions.map((item, index) => (
            <ListItem
              button
              key={`select-${index}`}
              selected={index === selectedIndex}
              onClick={(event) => handleListItemClick(event, index)}
              disabled={requesting}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
        <Grid style={{ display: "flex", marginTop: 6 }}>
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
                      value: date[0] ? format(date[0], "dd/MM/yyyy") : "",
                      placeholder: "dd/MM/yyyy",
                    }}
                  />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField
                    {...endProps}
                    inputProps={{
                      ...startProps.inputProps,
                      value: date[1] ? format(date[1], "dd/MM/yyyy") : "",
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
            style={{ width: "fit-content" }}
            onClick={handleReportCustom}
          />
        </Grid>
      </div>
      {requesting && <LinearProgress className="mx-md" />}
      <Button className="ml-none my-md">
        <GetAppIcon />
        <CSVLink {...csvReport}> Export CSV</CSVLink>
      </Button>
    </div>
  );
};

export default ReportOptions;
