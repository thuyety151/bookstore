import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

const BillingDetailForm: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper>
        <Grid container>
          <span>Billing details</span>
          <Grid item container direction="column">
            <Grid item direction="column">
              <span className={"text-bold"}>First name</span>
              <TextField variant="outlined" />
            </Grid>
            <Grid item  direction="column">
              <span className={"text-bold"}>Last name</span>
              <TextField variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fff6f6",
      height: "100vh",
    },
  })
);
export default BillingDetailForm;
