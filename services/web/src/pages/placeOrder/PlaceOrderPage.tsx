import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Divider,
  Button,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { RootStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import api from "../../boot/axios";
import { getPlaceOrder } from "../../redux/actions/order/getActions";
import { formatAddressEnter } from "../../helper/format";
import { sum } from "lodash";
import { createOrderGHN } from "../../redux/actions/order/postAction";
import { getPageCart } from "../../redux/actions/cart/getAction";
import { useSnackbar } from "notistack";
import { PaymentMethod } from "../../shared/enum/paymentMethod";
import CheckIcon from "@material-ui/icons/Check";
import { green, red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import OrderError from "./components/OrderError";
import { generatePath, useHistory } from "react-router-dom";
import { Predicate, ROUTE_BOOKS_FOR_SALE } from "../../routers/types";
import { Order } from "../../model/order";

const PlaceOrderPage: React.FC = () => {
  const classes = useStyles();
  // const cartState = useSelector((state: RootStore) => state.cart);
  // const addressState = useSelector((state: RootStore) => state.address);
  // const { orderCode } = useParams() as any;
  const { placeOrder, requesting, success } = useSelector(
    (state: RootStore) => state.order
  );

  const dispatch = useDispatch();
  const { orderId } = useParams() as any;
  const { enqueueSnackbar } = useSnackbar();

  const query = new URLSearchParams(window.location.search);
  const transId = Number(query.get("transId")) ?? 0;
  const resultCode = Number(query.get("resultCode")) ?? -1;
  const orderIdMomo = query.get("orderId");
  const history = useHistory();

  useEffect(() => {
    dispatch(
      getPlaceOrder({
        id: orderId,
        onSuccess: (placeOrderRes : Order) => {
          createGHN(placeOrderRes);
        },
        onFailure: (message:  string) => {
          enqueueSnackbar("Error when create order GiaoHangNhanh", {
            variant: "error",
          });
        },
      })
    );
    async function createGHN(placeOrderRes : Order) {
      console.log(
        "1: " + placeOrderRes.paymentMethod + "2: " + PaymentMethod.Momo.toString()
      );
      //momo
      if (
        (placeOrderRes.paymentMethod === PaymentMethod.Momo.toString() &&
          transId !== 0 &&
          resultCode !== -1) ||
          placeOrderRes.paymentMethod === 'CashOnDelivery'
      ) {
        if (placeOrderRes.paymentMethod === PaymentMethod.Momo.toString()) {
          console.log("11");
          var response = await api.post("/momo/payment-notification", {
            transId: transId,
            resultCode: resultCode,
            orderId: orderIdMomo,
          });

          if (response.data.isSuccess) {
            console.log("111");
            dispatch(
              createOrderGHN({
                order: placeOrderRes,
                onSuccess: (code: string, orderId: string) => {
                  enqueueSnackbar("Order success", { variant: "success" });
                  dispatch(getPageCart());
                },
                onFailure: (error: any) => {
                  enqueueSnackbar(error, { variant: "error" });
                },
              })
            );
          }
        } else if (placeOrderRes.paymentMethod === 'CashOnDelivery') {
          console.log("22");
          dispatch(
            createOrderGHN({
              order: placeOrderRes,
              onSuccess: (code: string, orderId: string) => {
                console.log("222");
                enqueueSnackbar("Order success", { variant: "success" });
                dispatch(getPageCart());
              },
              onFailure: (error: any) => {
                enqueueSnackbar(error, { variant: "error" });
              },
            })
          );
        }
      }
    }

    // eslint-disable-next-line
  }, [dispatch, orderId]);
  const calCoupon = () => {
    return sum(placeOrder.items?.flatMap((x) => x.price)) - placeOrder.subTotal;
  };

  const handleContinueClick = () => {
    history.push(
      generatePath(ROUTE_BOOKS_FOR_SALE, {
        predicate: Predicate.Popular,
      })
    );
  };
  return (
    <div className={classes.root}>
      <>
        {requesting ? (
          <CircularProgress />
        ) : !success? (
          <OrderError />
        ) : (
          <>
            <Typography variant="h4" className={classes.title}>
              Order Received
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={6} className={classes.gridContainer}>
                <Avatar className={classes.red}>
                  <CheckIcon className={classes.large} />
                </Avatar>
                <Paper color="secondary" className={classes.paperOutside}>
                  <Paper variant="outlined" className={classes.paperInside}>
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
                          {placeOrder.total}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>Payment method:</Typography>
                        <Typography variant="inherit" className="text-bold">
                          {placeOrder.paymentMethod === PaymentMethod.Momo.toString()
                            ? "Momo"
                            : "Cash On Delivery"}
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
                        <Grid
                          item
                          container
                          justifyContent="space-between"
                          key={index}
                        >
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
                          ${placeOrder.subTotal.toFixed(2)}
                        </Typography>
                      </Grid>
                      {placeOrder.coupon && (
                        <Grid item container justifyContent="space-between">
                          <Typography variant="inherit" className="text-bold">
                            Coupon:
                          </Typography>
                          <Typography variant="inherit" className="text-bold">
                            - ${calCoupon()?.toFixed(2)}
                          </Typography>
                        </Grid>
                      )}

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
                          {placeOrder.paymentMethod === PaymentMethod.Momo.toString()
                            ? "Momo"
                            : "Cash On Delivery"}
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
                      <Grid item>${placeOrder.total.toFixed(2)}</Grid>
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
                  <Button
                    variant="contained"
                    className={classes.continueButton}
                    onClick={handleContinueClick}
                  >
                    Continue shopping
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </>
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
      position: "relative",
    },
    title: {
      textAlign: "center",
      padding: theme.spacing(1, 0),
      color: green[700],
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
    paperOutside: {
      backgroundColor: green[500],
      height: 830,
      paddingTop: 20,
    },
    paperInside: {
      borderRadius: 0,
      position: "relative",
      height: 820,
    },
    red: {
      color: "#fff",
      backgroundColor: green[500],
      width: theme.spacing(7),
      height: theme.spacing(7),
      position: "absolute",
      zIndex: 1,
      top: 10,
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      borderStyle: "outset",
      borderColor: green[700],
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    continueButton: {
      backgroundColor: green[700],
      color: "#fff",
      fontWeight: 700,
      borderRadius: 50,
      textTransform: "none",
      margin: 20,
      fontSize: 14,
      position: "absolute",
      right: 10,
    },
  })
);
export default PlaceOrderPage;
