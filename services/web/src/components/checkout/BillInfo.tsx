import React, { useEffect, useState } from "react";
import {
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import Item from "../../model/item";
import { RootStore } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { formatAddress } from "../../helper/format";
import { verifyCoupon } from "../../redux/actions/coupon/getAction";
import { subTotal } from "../../redux/reducers/cartReducer";
import { total } from "../../redux/reducers/orderReducer";
import { getFee } from "../../redux/actions/order/getActions";
import { getServices } from "../../redux/actions/delivery/getAction";
import { NAME_ACTIONS } from "../../redux/constants/cart/actionTypes";

const BillInfo: React.FC = () => {
  const classes = useStyles();
  const [openSection, setopenSection] = useState({
    total: true,
    shipping: true,
    coupon: true,
    order: true,
    payment: true,
  });

  const [value, setValue] = React.useState("Cash on delivery");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const cart = useSelector((state: RootStore) => state.cart);
  const currentAddress = useSelector(
    (state: RootStore) => state.address.currentAddress
  );
  const [itemToCheckout, setItemToCheckout] = useState(cart.itemToCheckOut);
  // const itemToCheckout = !cart.itemToCheckOut.length
  //   ? cart.data
  //   : cart.itemToCheckOut;

  const addressInfor = () => {
    return currentAddress?.id
      ? `${currentAddress.firstName} ${currentAddress.lastName} (${currentAddress.phone})`
      : "--";
  };
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const couponState = useSelector((state: RootStore) => state.coupon);
  const shippingFee = useSelector((state: RootStore) => state.order.fee);

  const handleApplyCoupon = () => {
    dispatch(verifyCoupon(couponCode));
  };
  useEffect(() => {
    if (!itemToCheckout.length) {
      setItemToCheckout(cart.data);
      dispatch({
        type: NAME_ACTIONS.SET_ITEM_TO_CHECK_OUT.SET_LIST_ITEM_TO_CHECK_OUT,
        data: cart.data,
      });
    }
    setCouponCode(couponState.data.code || "");
    /**
     * get fee based on default address
     */
    dispatch(
      getServices({
        onSuccess: () => {
          dispatch(
            getFee({
              onSuccess: () => {},
              onFailure: () => {},
            })
          );
        },
      })
    );
    // eslint-disable-next-line
  }, [couponState.data]);

  return (
    <div>
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
                <span>${subTotal(itemToCheckout)}</span>
              </div>
              <Grid item className="row">
                <span>Shipping</span>
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
              <span>${shippingFee}</span>
            </Grid>
            <div className="row">
              <span className={classes.changeAddress}>Change Address</span>
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
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
              />
              <span
                className="cap cursor-pointer"
                style={{ width: "100%", textAlign: "right" }}
                onClick={handleApplyCoupon}
              >
                Apply coupon
              </span>
            </Paper>
            {couponState.message && (
              <FormHelperText className="text-error">
                {couponState.message}
              </FormHelperText>
            )}
          </Paper>
        </Collapse>
        {/* total */}
        <Paper variant="outlined" className={classes.paper}>
          <div className="row total">
            <h3>Total</h3>
            <h3>${total(itemToCheckout)}</h3>
          </div>
        </Paper>

        <Collapse in={openSection.payment} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
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
                  Pay with cash upon delivery.
                </Typography>
                <FormControlLabel
                  value="Direct bank transfer"
                  control={<Radio />}
                  label="Direct bank transfer"
                  disabled
                />
                <Typography className={classes.text}>Comming soon</Typography>
                <FormControlLabel
                  value="Check payments"
                  control={<Radio />}
                  label="Check payments"
                  disabled
                />
                <Typography className={classes.text}>Comming soon</Typography>
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
    margin: "50px 30px 0px 30px",
  },
  paper: {
    width: "290px",
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
    marginLeft: "30px",
  },
  changeAddress: {
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },
}));
export default BillInfo;
