import React, { useState } from "react";
import { Collapse, Grid, InputBase, Paper, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";

const CartInfo: React.FC<{ setIsChangeAddress: any }> = ({
  setIsChangeAddress,
}) => {
  const classes = useStyles();
  const [openSection, setopenSection] = useState({
    total: true,
    shipping: true,
    coupon: true,
  });
  const handleChangeAddress = () => {
    setIsChangeAddress(true);
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
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
            <Grid item container direction="column">
              <div className="row">
                <span>Shipping to</span>
                <span>--</span>
              </div>
              <div className="row" onClick={handleChangeAddress}>
                <span className={classes.changeAddress}>Change Address</span>
              </div>
            </Grid>
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
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: "1px solid black",
    margin: theme.spacing(0, 0, 4),
  },
  paper: {
    width: "15vw",
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
  changeAddress: {
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "red",
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
}));
export default CartInfo;
