import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import VisaLogo from "../../../assets/images/visa-logo.png";
import PaypalLogo from "../../../assets/images/paypal-logo.png";
import MasterCardLogo from "../../../assets/images/MasterCard_Logo.png";
import React from "react";
import "./styles.scss";

const FooterBottomComponent: React.FC = () => {
  const classes = useStyles();

  return (
    <div className="footer__bottom">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <span>©2021 Book Worm. All rights reserved</span>
          </Paper>
        </Grid>
        <Grid item xs={8} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <div>
                <img style={{ height: 30 }} src={VisaLogo} alt="visa" />
                <img style={{ height: 30 }} src={PaypalLogo} alt="paypal" />
                <img style={{ height: 30 }} src={MasterCardLogo} alt="mc" />
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  })
);
export default FooterBottomComponent;
