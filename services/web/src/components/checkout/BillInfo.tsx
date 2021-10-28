import React, { useState } from "react";
import { Collapse, FormControl, FormControlLabel, Grid, InputBase, Link, Paper, Radio, RadioGroup, Theme, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";

const BillInfo: React.FC = () => {
  const classes = useStyles();
  const [openSection, setopenSection] = useState({
    total: true,
    shipping: true,
    coupon: true,
    order: true,
    payment: true
  });

  const [value, setValue] = React.useState('Cash on delivery');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div >
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
        className={classes.grid}
      >
        <Collapse in={openSection.order} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Your order</h3>
              <span
                className="cursor-pointer icon"
                onClick={() =>
                  setopenSection({ ...openSection, order: !openSection.order })
                }
              >
                {openSection.order ? <RemoveIcon /> : <AddIcon />}
              </span>
            </div>
            <Grid item container direction="column">
              <div className="row">
                <span>Touchscreen MP3 Player  × 1</span>
                <span>£79.99</span>
              </div>
              <Grid item className="row">
                <span>Happy Ninja  × 1</span>
                <span>£18.00</span>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
        <Collapse in={openSection.total} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Cart Totals</h3>
              <span
                className="cursor-pointer icon"
                onClick={() =>
                  setopenSection({ ...openSection, total: !openSection.total })
                }
              >
                {openSection.total ? <RemoveIcon /> : <AddIcon />}
              </span>
            </div>
            <Grid item container direction="column">
              <div className="row">
                <span>Subtotal</span>
                <span>79.99</span>
              </div>
              <Grid item className="row">
                <span>Shipping</span>
                <span>79.99</span>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
        {/* shippine */}
        <Collapse in={openSection.shipping} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Shipping</h3>
              <span
                className="cursor-pointer"
                onClick={() =>
                  setopenSection({
                    ...openSection,
                    shipping: !openSection.shipping,
                  })
                }
              >
                {openSection.shipping ? <RemoveIcon /> : <AddIcon />}
              </span>
            </div>
          </Paper>
        </Collapse>
        {/* coupon */}
        <Collapse in={openSection.coupon} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Coupon</h3>
              <span
                className="cursor-pointer"
                onClick={() =>
                  setopenSection({
                    ...openSection,
                    coupon: !openSection.coupon,
                  })
                }
              >
                {openSection.coupon ? <RemoveIcon /> : <AddIcon />}
              </span>
            </div>
            <Paper
              variant="outlined"
              className={classes.inputForm}
              style={{ justifyContent: "space-around" }}
            >
              <InputBase
                placeholder="Coupon here"
                inputProps={{ "aria-label": "naked" }}
              />
              <span
                className="cap"
                style={{ width: "100%", textAlign: "right" }}
              >
                Apply coupon
              </span>
            </Paper>
          </Paper>
        </Collapse>
        {/* total */}
        <Paper variant="outlined" className={classes.paper}>
          <div className="row total">
            <h3>Total</h3>
            <h3>97.99</h3>
          </div>
        </Paper>

        <Collapse in={openSection.payment} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Payment</h3>
              <span
                className="cursor-pointer icon"
                onClick={() =>
                  setopenSection({ ...openSection, payment: !openSection.payment })
                }
              >
                {openSection.payment ? <RemoveIcon /> : <AddIcon />}
              </span>
            </div>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="Direct bank transfer" control={<Radio />} label="Direct bank transfer" />
                <Typography className={classes.text}>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</Typography>
                <FormControlLabel value="Check payments" control={<Radio />} label="Check payments" />
                <Typography className={classes.text}>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</Typography>
                <FormControlLabel value="Cash on delivery" control={<Radio />} label="Cash on delivery" />
                <Typography className={classes.text}>Pay with cash upon delivery.</Typography>
              </RadioGroup>
            </FormControl>
          </Paper>
        </Collapse>
       
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  payment: {
    fontWeight: "bold",
  },
  grid: {
    margin: "50px 30px 0px 30px"
  },
  paper: {
    width: "350px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 0,
    padding: theme.spacing(4, 4),
    "& div": {
      justifyContent: "space-between",
      display: "flex",
    },
    "& button": {
      justifyContent: "right",
      padding: theme.spacing(0),
    },
    "& h3": {
      margin: 0,
    },
    "& .row": {
      justifyContent: "space-between",
      display: "flex",
      padding: theme.spacing(2, 0),
    },
    "& .total": {
      padding: 0,
    },
  },
  collapse: {
    padding: theme.spacing(0),
    "& .row": {
      justifyContent: "space-between",
      display: "flex",
      padding: theme.spacing(2, 0),
    },
    "& div": {
      width: "100%",
    },
  },
  inputForm: {
    justifyContent: "space-around !important",
    alignItems: "center",
    padding: "8px  8px !important",
    margin: theme.spacing(3, 0, 0),
    "& span": {
      fontWeight: "bold",
    },
    "& .icon": {
      padding: theme.spacing(1),
    },
  },
  rootItems: {
    padding: 0,
  },
  text: {
    color: "grey",
    marginLeft: "30px"
  }
}));
export default BillInfo;
