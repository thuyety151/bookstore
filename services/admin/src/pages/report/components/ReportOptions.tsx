import {
  Box,
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
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { sum } from "lodash";
import React, { useEffect } from "react";
import { reportOptions } from "../ReportPage";
import "../styles.scss";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { format } from "date-fns";
import { DateRange, DateRangePicker } from "@mui/lab";

const ReportOptions: React.FC = () => {
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);

  return (
    <div className="report-options">
      <List
        component="nav"
        aria-label="secondary mailbox folder"
        // className={classes.flexContainer}
      >
        {reportOptions.map((item, index) => (
          <ListItem
            button
            key={`select-${index}`}
            selected={index === 1}
            // onClick={(event) => handleListItemClick(event, index)}
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
            //   onChange={(newValue: any) => {
            //     setDate(newValue);
            //   }}
            onChange={() => console.log("change")}
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
        <Button>Go</Button>
        {/* <ContainedButton
            text="Go"
            // className={classes.customOpt}
            style={{ width: "fit-content" }}
            // onClick={handleReportCustom}
          /> */}
      </Grid>
    </div>
  );
};

export default ReportOptions;
