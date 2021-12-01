import React from "react";
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Divider,
} from "@material-ui/core";
import { RootStore } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const PlaceOrderPage: React.FC = () => {
  const classes = useStyles();
  const cartState = useSelector((state: RootStore) => state.cart);
  const addressState = useSelector((state: RootStore) => state.address);
  const { orderCode } = useParams() as any;
  const orderState = useSelector((state: RootStore) => state.order);
  const {
    appartmentNumber,
    streetAddress,
    wardName,
    districtName,
    provinceName,
  } = addressState.currentAddress;

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Order Received
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={6} className={classes.gridContainer}>
          <Paper variant="outlined">
            <Typography
              variant="inherit"
              className="text-bold"
              style={{
                textAlign: "center",
                fontSize: "18px",
                paddingTop: "32px",
              }}
            >
              Thank you, Your order has been received
            </Typography>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography>Order number:</Typography>
                <Typography variant="inherit" className="text-bold">
                  {orderCode}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Date:</Typography>
                <Typography variant="inherit" className="text-bold">
                  {new Date().toLocaleString()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Total:</Typography>
                <Typography variant="inherit" className="text-bold">
                  {cartState.subTotal + (orderState.fee || 0)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Payment method:</Typography>
                <Typography variant="inherit" className="text-bold">
                  Cash on delivery
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid item container className={classes.orderDetails}>
              <Typography
                variant="inherit"
                className="text-bold"
                style={{ paddingBottom: "32px" }}
              >
                Order Details
              </Typography>
              {cartState.itemToCheckOut.map((item, index) => (
                <Grid item container justifyContent="space-between" key={index}>
                  <Grid item>
                    <Typography>{item.productName}</Typography>
                    <Typography variant="caption">
                      {item.attributeName}
                    </Typography>
                  </Grid>
                  <Grid item>x {item.quantity}</Grid>
                  <Grid item>$ {item.price * item.quantity}</Grid>
                </Grid>
              ))}
            </Grid>
            <Divider />
            <Grid item className={classes.subTotal}>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Subtotal:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  ${cartState.subTotal}
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Shipping:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  ${orderState.fee}
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Payment Method:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  Cash on delivery
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              item
              container
              justifyContent="space-between"
              className={classes.total}
            >
              <Grid item>Total</Grid>
              <Grid item>${cartState.subTotal}</Grid>
            </Grid>
            <Divider />
            <Grid item container>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Billing Address</Typography>
                {[
                  appartmentNumber,
                  streetAddress,
                  wardName,
                  districtName,
                  provinceName,
                ].map((data, index: number) => {
                  return (
                    <Typography variant="body2" key={index}>
                      {data}
                    </Typography>
                  );
                })}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Shipping Address</Typography>
                {[
                  appartmentNumber,
                  streetAddress,
                  wardName,
                  districtName,
                  provinceName,
                ].map((data, index) => {
                  return (
                    <Typography variant="body2" key={index}>
                      {data}
                    </Typography>
                  );
                })}
              </Grid>
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
      backgroundColor: "#fff6f6",
      minHeight: "100vh",
      height: "100%",
      "& .MuiGrid-root .MuiGrid-container": {
        padding: theme.spacing(4),
      },
    },
    justifyRight: {
      display: "grid",
      justifyItems: "right",
    },
    total: {
      fontWeight: 500,
    },
    gridContainer: {
      padding: theme.spacing(4),
    },
    title: {
      textAlign: "center",
      padding: theme.spacing(4, 0),
    },
    subTotal: {
      padding: theme.spacing(4, 4, 0),
      "& .MuiTypography-root": {
        paddingTop: theme.spacing(1),
      },
      "& .MuiGrid-container": {
        padding: "0px !important",
      },
      "& .MuiGrid-item": {
        paddingBottom: "32px !important",
      },
    },
    orderDetails: {
      paddingBottom: "0px !important",
      "& .MuiGrid-container": {
        padding: "0px !important",
      },
      "& .MuiGrid-item": {
        paddingBottom: "16px !important",
      },
    },
  })
);
export default PlaceOrderPage;
