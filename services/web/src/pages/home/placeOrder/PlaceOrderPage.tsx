import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { total } from "../../../redux/reducers/orderReducer";
import api from "../../../boot/axios";
import { getPlaceOrder } from "../../../redux/actions/order/getActions";
import { formatAddressEnter } from "../../../helper/format";

const PlaceOrderPage: React.FC = () => {
  const classes = useStyles();
  // const cartState = useSelector((state: RootStore) => state.cart);
  // const addressState = useSelector((state: RootStore) => state.address);
  // const { orderCode } = useParams() as any;
  const { placeOrder } = useSelector((state: RootStore) => state.order);

  const dispatch = useDispatch();
  const { orderId } = useParams() as any;

  useEffect(() => {
    dispatch(getPlaceOrder(orderId));
  }, [dispatch, orderId]);

  const query = new URLSearchParams(window.location.search);
  const transId = Number(query.get('transId')) ??0;
  const resultCode = Number(query.get('resultCode')) ?? -1;
  const orderIdMomo = query.get('orderId');

  useEffect(() => {
    console.log("transid & resultcode:" + transId + ' ' + resultCode + ' ' + orderId);
    if(transId !== 0  && resultCode !== -1 )
    {
      console.log("alo")
      var response = api.post('/momo/payment-notification', {
        transId : transId,
        resultCode: resultCode,
        orderId: orderIdMomo
      });
      console.log('response:' + JSON.stringify(response));
    }
      
  }, [])

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
                  {placeOrder.orderCode}
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
                  {placeOrder.subTotal + placeOrder.orderFee}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Payment method:</Typography>
                <Typography variant="inherit" className="text-bold">
                  {placeOrder.paymentMethod}
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
              {placeOrder.items?.map((item, index) => (
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
                  ${placeOrder.subTotal}
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Shipping:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  ${placeOrder.orderFee}
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Payment Method:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  {placeOrder.paymentMethod}
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
              <Grid item>${placeOrder.total}</Grid>
            </Grid>
            <Divider />
            <Grid item container>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Billing Address</Typography>
                <Typography
                  variant="body2"
                  style={{ whiteSpace: "break-spaces" }}
                >
                  {placeOrder.addressToShip &&
                    formatAddressEnter(placeOrder.addressToShip)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Shipping Address</Typography>
                <Typography
                  variant="body2"
                  style={{ whiteSpace: "break-spaces" }}
                >
                  {placeOrder.addressToShip &&
                    formatAddressEnter(placeOrder.addressToShip)}
                </Typography>
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
