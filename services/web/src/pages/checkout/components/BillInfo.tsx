import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  Paper,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";
import Item from "../../../model/item";
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { formatAddress } from "../../../helper/format";
import { subTotal } from "../../../redux/reducers/cartReducer";
import { NAME_ACTIONS } from "../../../redux/constants/cart/actionTypes";
import PrimaryButton from "../../../components/button/PrimaryButton";
import { createOrder } from "../../../redux/actions/order/postAction";
import { generatePath, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  ROUTE_HOME,
  ROUTE_PLACE_ORDER,
  ROUTE_PROFILE_PREDICATE,
} from "../../../routers/types";
import { getPageCart } from "../../../redux/actions/cart/getAction";
import api from "../../../boot/axios";
import LocalAtmRoundedIcon from "@material-ui/icons/LocalAtmRounded";
import momo from "../../../assets/icons/momo_icon_circle_pinkbg.svg";
import StockStatus from "../../../shared/enum/stockStatus";
import { sum } from "lodash";
import { DiscountType } from "../../../model/coupon";

type Props = {
  note: string;
};
export default function BillInfo(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  //Selector
  const cart = useSelector((state: RootStore) => state.cart);
  const currentAddress = useSelector(
    (state: RootStore) => state.address.currentAddress
  );
  const loading = useSelector((state: RootStore) => state.order.requesting);

  //State
  const [couponAmount, setCouponAmount] = useState(0);
  const [itemToCheckout, setItemToCheckout] = useState(cart.itemToCheckOut);

  const { fee } = useSelector((state: RootStore) => state.order);
  const [openSection, setopenSection] = useState({
    total: true,
    shipping: true,
    coupon: true,
    order: true,
    payment: true,
  });

  const [value, setValue] = React.useState("Cash on delivery");

  const couponState = useSelector((state: RootStore) => state.coupons);

  //Function
  const addressInfor = () => {
    return currentAddress?.id
      ? `${currentAddress.firstName} ${currentAddress.lastName} (${currentAddress.phone})`
      : "--";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleClickPayment = () => {
    if (value === "Cash on delivery") {
      dispatch(
        createOrder({
          note: props.note,
          paymentMethod: 0,
          onSuccess: (orderId: string) => {
            history.push(
              generatePath(ROUTE_PLACE_ORDER, {
                orderId,
              })
            );
          },
          onFailure: (error: any) => {
            enqueueSnackbar(error, { variant: "error" });
          },
        })
      );
    } else if (value === "MoMo") {
      dispatch(
        createOrder({
          note: props.note,
          paymentMethod: 1,
          onSuccess: async (orderId: string) => {
            var response = await api.post("/momo", { orderId: orderId });

            if (response.data?.isSuccess) {
              window.open(response.data.value, "_self");
            } else {
              enqueueSnackbar("Error when payment", { variant: "error" });
            }
          },
          onFailure: (error: any) => {
            enqueueSnackbar(error, { variant: "error" });
          },
        })
      );
    }
  };

  useEffect(() => {
    if (!itemToCheckout.length) {
      setItemToCheckout(
        cart.data.filter((x) => x.stockStatus !== StockStatus.OutOfStock)
      );
      dispatch({
        type: NAME_ACTIONS.SET_ITEM_TO_CHECK_OUT.SET_LIST_ITEM_TO_CHECK_OUT,
        data: cart.data.filter((x) => x.stockStatus !== StockStatus.OutOfStock),
      });
    }
    /**
     * get fee based on default address
     */
    // dispatch(
    //   getServices({
    //     onSuccess: () => {
    //       if (!fee) {
    //         dispatch(
    //           getFee({
    //             onSuccess: () => {},
    //             onFailure: () => {},
    //           })
    //         );
    //       }
    //     },
    //   })
    // );
    calCouponAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToCheckout]);

  useEffect(() => {
    if (!itemToCheckout.length) {
      dispatch(getPageCart());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = () => {
    var total =
      sum(itemToCheckout.map((x) => x.quantity * x.price)) - couponAmount > 0
        ? sum(itemToCheckout.map((x) => x.quantity * x.price)) - couponAmount
        : 0;
    return total + (fee || 0);
  };

  const calCouponAmount = () => {
    var amountDiscount = 0;
    console.log("discount type:" + couponState.selectedCoupon?.discountType);
    if (couponState.selectedCoupon !== undefined) {
      if (couponState.selectedCoupon.discountType === DiscountType.Percentage) {
        amountDiscount =
          (sum(itemToCheckout.map((x) => x.quantity * x.price)) *
            couponState.selectedCoupon.couponAmount) /
          100;
      } else {
        amountDiscount = couponState.selectedCoupon.couponAmount;
      }
      setCouponAmount(amountDiscount);
    }
  };

  const handleClose = (key: string) => {
    if (key === "home-page") {
      history.push(ROUTE_HOME);
    } else {
      history.push(
        generatePath(ROUTE_PROFILE_PREDICATE, {
          tabName: "address",
        })
      );
    }
  };
  return (
    <div style={{ margin: "16px" }}>
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
            {itemToCheckout.map((item: Item, index: number) => {
              return (
                <div className="row" key={index}>
                  <span>
                    {item.productName} x{item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </div>
              );
            })}
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
              <span>${subTotal(itemToCheckout).toFixed(2)}</span>
            </div>
            <Grid item className="row">
              <span>Shipping</span>
              <span>${fee}</span>
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
          <Grid item className="row">
            <span>{addressInfor()}</span>
            <span>{formatAddress(currentAddress)}</span>
          </Grid>
        </Paper>
      </Collapse>
      {/* shippine */}
      {/* coupon */}
      <Collapse in={openSection.coupon} collapsedSize={86}>
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
          <Grid container style={{ display: "contents" }}>
            <Grid item className="row-coupon">
              {couponState.selectedCoupon?.description && <span>Coupon</span>}
              <span>{couponState.selectedCoupon?.description}</span>
            </Grid>
          </Grid>
          <Paper
            variant="outlined"
            className={classes.inputForm}
            style={{ justifyContent: "space-around" }}
          >
            <InputBase
              style={{ width: "100%" }}
              inputProps={{ "aria-label": "naked" }}
            />
            {couponState.selectedCoupon !== undefined ? (
              <Chip
                label={"-$" + couponAmount.toFixed(2)}
                color="secondary"
                className={classes.chipCoupon}
              />
            ) : null}
          </Paper>
        </Paper>
      </Collapse>
      {/* total */}
      <Paper variant="outlined" className={classes.paper}>
        <div className="row total">
          <h3>Total</h3>
          <h3>${total().toFixed(2)}</h3>
        </div>
      </Paper>
      <Collapse in={openSection.payment} collapsedSize={82}>
        <Paper variant="outlined" className={classes.paper}>
          <Collapse in={openSection.payment} collapsedSize={28}>
            <Grid container>
              <div className={classes.header}>
                <h3>Payment</h3>
                <span
                  className="cursor-pointer icon"
                  onClick={() =>
                    setopenSection({
                      ...openSection,
                      payment: !openSection.payment,
                    })
                  }
                >
                  {openSection.payment ? <RemoveIcon /> : <AddIcon />}
                </span>
              </div>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Cash on delivery"
                    control={<Radio />}
                    label="Cash on delivery"
                  />
                  <Typography className={classes.text}>
                    <LocalAtmRoundedIcon /> Pay with cash upon delivery.
                  </Typography>
                  <FormControlLabel
                    value="MoMo"
                    control={<Radio />}
                    label="MoMo"
                  />
                  <Typography className={classes.text}>
                    <Avatar alt="MoMo" src={momo} className={classes.small} />{" "}
                    {""}Scan QR MoMo.
                  </Typography>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Collapse>
        </Paper>
      </Collapse>
      <Grid item>
        <PrimaryButton
          text="Place order"
          props={{
            onClick: () => handleClickPayment(),
            style: { margin: "16px 0 0" },
          }}
          loading={loading}
        />
      </Grid>
      <Dialog
        open={!currentAddress?.id ? true : false}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You don't have any address?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let's add your first address to check out !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("home-page")} color="primary">
            Home page
          </Button>
          <Button
            onClick={() => handleClose("add-address")}
            color="primary"
            autoFocus
          >
            Add address
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  payment: {
    fontWeight: "bold",
  },
  grid: {
    margin: "50px 30px 0px 30px",
  },
  paper: {
    // width: "290px",
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
      paddingBottom: "16px",
    },
    "& .row": {
      justifyContent: "space-between",
      display: "flex",
      padding: theme.spacing(2, 0),
    },
    "& .address": {
      display: "grid",
      paddingTop: "12px",
    },
    "& .total": {
      "& h3": {
        padding: "0px !important",
      },
    },
    "& .MuiCollapse-wrapper": {
      width: "100%",
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
    position: "relative",
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
    marginLeft: "30px",
  },
  changeAddress: {
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
  paymentMethod: {
    padding: theme.spacing(4, 0, 0),
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  chipCoupon: {
    position: "absolute",
    left: 20,
  },
}));
