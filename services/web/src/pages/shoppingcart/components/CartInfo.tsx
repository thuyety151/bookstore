import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { useDispatch, useSelector } from "react-redux";
import { getDefaultAddress } from "../../../redux/actions/address/getAction";
import { RootStore } from "../../../redux/store";
import {
  formatAddress,
  formatCustomerInfo,
} from "../../../helper/format";
import ChooseAddressCard from "./address/ChooseAddressCard";
import CloseIcon from "@material-ui/icons/Close";
import { sum } from "lodash";
// import { getFee } from "../../../redux/actions/order/getActions";
import { getServices } from "../../../redux/actions/delivery/getAction";
import { getFee } from "../../../redux/actions/order/getActions";
import { useSnackbar } from "notistack";
import { ServiceType } from "../../../redux/reducers/deliveryReducer";
import { DiscountType } from "../../../model/coupon";
import { NAME_ACTIONS } from "../../../redux/constants/coupon/actionTypes";
import ChooseCoupons from "./ChooseCoupons";

const CartInfo: React.FC<{ chooseAddress: boolean; setChooseAddress: any }> = ({
  chooseAddress,
  setChooseAddress,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [openSection, setopenSection] = useState({
    total: true,
    shipping: true,
    coupon: true,
  });
  const defaultAddress = useSelector(
    (state: RootStore) => state.address?.currentAddress
  );
  const itemsToCheckout = useSelector(
    (state: RootStore) => state.cart.itemToCheckOut
  );
  const [serviceType, setServiceType] = useState<ServiceType>({} as any);
  const [chooseCoupon, setChooseCoupon] = useState(false);
  // const [subTotal, setSubTotal] = useState<ServiceType>(0);
  const deliveryState = useSelector((state: RootStore) => state.delivery);
  const couponState = useSelector((state: RootStore) => state.coupons);
  const { fee } = useSelector((state: RootStore) => state.order);
  const [couponAmount, setCouponAmount] = useState(0);

  const dispatch = useDispatch();
  const handleChangeAddress = () => {
    setChooseAddress(true);
  };

  const handleChooseCoupon = () => {
    setChooseCoupon(true);
  };
  const handleChangeServiceType = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setServiceType(
      deliveryState.services.find(
        (x) => x.service_id === parseInt(event.target.value as string)
      ) || deliveryState.services[0]
    );
    // dispatch(
    //   getFee({
    //     serviceType: serviceType,
    //     onSuccess: (fee) => {},
    //     onFailure: (error: any) => {
    //       enqueueSnackbar(error, { variant: "error" });
    //     },
    //   })
    // );
  };

  // const handleGetFee = () => {
  //   dispatch(
  //     getFee({
  //       serviceType: serviceType,
  //       onSuccess: (fee) => {},
  //       onFailure: (error: any) => {
  //         enqueueSnackbar(error, { variant: "error" });
  //       },
  //     })
  //   );
  // };

  useEffect(() => {
    // rest state of coupon
    dispatch({ type: NAME_ACTIONS.REMOVE_COUPON.REMOVE_COUPON });
    dispatch(
      getDefaultAddress(() => {
        dispatch(
          getServices({
            onSuccess: (firstService) => {
              setServiceType(firstService);
            },
          })
        );
      })
    );
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(
      getServices({
        onSuccess: (firstService) => {
          setServiceType(firstService);
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultAddress]);

  useEffect(() => {
    if (serviceType?.service_id && defaultAddress?.districtId) {
      dispatch(
        getFee({
          serviceType: serviceType,
          onSuccess: (fee) => {},
          onFailure: (error: any) => {
            enqueueSnackbar(error, { variant: "error" });
          },
        })
      );
    }

    calCouponAmount();
    // eslint-disable-next-line
  }, [serviceType, defaultAddress, itemsToCheckout?.length]);
  // useEffect(() => {
  //   setSubTotal(
  //     itemsToCheckout.map((x) => {
  //       return x.price * x.quantity;
  //     }) +fe
  //   );
  // }, [serviceType]);

  const subTotal = () => {
    return sum(
      itemsToCheckout.map((x) => {
        return x.price * x.quantity;
      })
    );
  };

  const total = () => {
    var total =
      sum(itemsToCheckout.map((x) => x.quantity * x.price)) - couponAmount > 0
        ? sum(itemsToCheckout.map((x) => x.quantity * x.price)) - couponAmount
        : 0;
    return total + (fee || 0);
  };

  const calCouponAmount = () => {
    var amountDiscount = 0;
    console.log("discount type:" + couponState.selectedCoupon?.discountType);
    if (couponState.selectedCoupon !== undefined) {
      if (couponState.selectedCoupon.discountType === DiscountType.Percentage) {
        amountDiscount =
          (sum(itemsToCheckout.map((x) => x.quantity * x.price)) *
            couponState.selectedCoupon.couponAmount) /
          100;
      } else {
        amountDiscount = couponState.selectedCoupon.couponAmount;
      }
      setCouponAmount(amountDiscount);
    }
  };

  const handleDeleteCoupon = () => {
    dispatch({
      type:
        NAME_ACTIONS.USER_REMOVE_APPLY_COUPON.USER_REMOVE_APPLY_COUPON_SUCCESS,
    });
  };

  return (
    <div className={classes.root}>
      {/* <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      > */}
      <Collapse
        in={openSection.total}
        collapsedSize={86}
        style={{ width: "100%" }}
      >
        <Paper variant="outlined" className={classes.paper}>
          <div className={classes.header}>
            <h3>Cart Totals</h3>
            <span
              className="cursor-pointer icon"
              onClick={() =>
                setopenSection({
                  ...openSection,
                  total: !openSection.total,
                })
              }
            >
              {openSection.total ? <RemoveIcon /> : <AddIcon />}
            </span>
          </div>
          <Grid container direction="column">
            <div className="row" style={{ paddingBottom: "8px" }}>
              <span>Subtotal</span>
              <span>${subTotal().toFixed(2)}</span>
            </div>
            <div className="row" style={{ padding: "0px" }}>
              <span>Shipping fee</span>
              <span>${fee}</span>
            </div>
          </Grid>
        </Paper>
      </Collapse>
      {/* shippine */}
      <Collapse in={openSection.shipping} collapsedSize={86}>
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
            {deliveryState.services && (
              <RadioGroup
                value={serviceType.service_id || null}
                onChange={handleChangeServiceType}
              >
                <span>Service types</span>
                {deliveryState.services.map((service, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={service.service_id}
                      control={<Radio />}
                      label={service.short_name}
                    />
                  );
                })}
              </RadioGroup>
            )}
          </Grid>
          <Grid item container direction="column">
            <span>Shipping to</span>
            <br />
            <span>
              {defaultAddress ? formatCustomerInfo(defaultAddress) : "--"}
            </span>
            <span>{defaultAddress ? formatAddress(defaultAddress) : "--"}</span>
            <div className="row" onClick={handleChangeAddress}>
              <span className={classes.changeAddress}>Change Address</span>
            </div>
          </Grid>
        </Paper>
      </Collapse>
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
                onDelete={handleDeleteCoupon}
                color="secondary"
                className={classes.chipCoupon}
              />
            ) : null}

            <span
              className="cap cursor-pointer"
              style={{ textAlign: "right", minWidth: "8rem" }}
              onClick={handleChooseCoupon}
            >
              Choose coupon
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
      <Paper variant="outlined" style={{ width: "100%" }}>
        <Grid
          container
          justifyContent="space-between"
          className={classes.total}
        >
          <h3>Total</h3>
          <h3>{total().toFixed(2)}</h3>
        </Grid>
      </Paper>
      {/* </Grid> */}
      <Dialog
        open={chooseAddress}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Choose Address</Typography>
            <Button
              style={{ justifyContent: "end", minWidth: "0px" }}
              onClick={() => setChooseAddress(false)}
            >
              <CloseIcon />
            </Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <ChooseAddressCard />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Dialog
        open={chooseCoupon}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialogChooseCoupon}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Choose Your Coupon</Typography>
            <Button
              style={{ justifyContent: "end", minWidth: "0px" }}
              onClick={() => {
                calCouponAmount();
                setChooseCoupon(false);
              }}
            >
              <CloseIcon />
            </Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <ChooseCoupons />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    border: "1px solid black",
    margin: theme.spacing(0, 0, 4),
    display: "contents",
  },
  paper: {
    // width: "15vw",
    // width: "100%",
    padding: theme.spacing(4),
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 0,
    // padding: theme.spacing(4, 4),
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
      padding: theme.spacing(3, 0),
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
    "& .row-coupon": {
      justifyContent: "space-between",
      display: "flex",
      padding: theme.spacing(1, 0),
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

  dialog: {
    "& .MuiDialog-paper": {
      margin: 0,
      width: "40%",
      maxWidth: "100vw",
      padding: theme.spacing(4),
    },
    "& .MuiOutlinedInput-root": {
      width: "100%",
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
      fontSize: 16,
      color: "#000",
      margin: theme.spacing(1, 0),
    },
    "& button": {
      padding: theme.spacing(1, 4),
    },
  },
  dialogChooseCoupon: {
    "& .MuiDialog-paper": {
      margin: 0,
      width: "30%",
      maxWidth: "100vw",
      padding: theme.spacing(4),
    },
    "& .MuiOutlinedInput-root": {
      width: "100%",
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
      fontSize: 16,
      color: "#000",
      margin: theme.spacing(1, 0),
    },
    "& button": {
      padding: theme.spacing(1, 4),
    },
  },
  items: {
    // padding: theme.spacing(2),
    display: "inherit",
  },
  total: {
    padding: theme.spacing(2, 4),
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
  },
  chipCoupon: {
    position: "absolute",
    left: 20,
  },
}));
export default CartInfo;
