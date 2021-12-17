import React, { useEffect, useState } from "react";
import {
  Button,
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
import { formatAddress, formatCustomerInfo } from "../../../helper/format";
import ChooseAddressCard from "./address/ChooseAddressCard";
import CloseIcon from "@material-ui/icons/Close";
import { verifyCoupon } from "../../../redux/actions/coupon/getAction";
import { sum } from "lodash";
// import { getFee } from "../../../redux/actions/order/getActions";
import { getServices } from "../../../redux/actions/delivery/getAction";
import { getFee } from "../../../redux/actions/order/getActions";
import { useSnackbar } from "notistack";
import { ServiceType } from "../../../redux/reducers/deliveryReducer";

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
  const [couponCode, setCouponCode] = useState("");
  const defaultAddress = useSelector(
    (state: RootStore) => state.address?.currentAddress
  );
  const itemsToCheckout = useSelector(
    (state: RootStore) => state.cart.itemToCheckOut
  );
  const [serviceType, setServiceType] = useState<ServiceType>({} as any);
  // const [subTotal, setSubTotal] = useState<ServiceType>(0);
  const couponState = useSelector((state: RootStore) => state.coupon);
  const deliveryState = useSelector((state: RootStore) => state.delivery);
  const orderState = useSelector((state: RootStore) => state.order);

  const dispatch = useDispatch();
  const handleChangeAddress = () => {
    setChooseAddress(true);
  };

  const handleChangeServiceType = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setServiceType(
      deliveryState.services.find(
        (x) => x.service_id === parseInt(event.target.value as string)
      ) || deliveryState.services[0]
    );
    dispatch(
      getFee({
        serviceType: serviceType,
        onSuccess: (fee) => {},
        onFailure: (error: any) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
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

  const handleApplyCoupon = () => {
    dispatch(verifyCoupon(couponCode));
  };
  useEffect(() => {
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
  }, [dispatch]);
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

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Collapse
          in={openSection.total}
          collapsedSize={82}
          style={{ width: "100%" }}
        >
          <Paper variant="outlined" className={classes.paper}>
            <div className={classes.items}>
              <div>
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
              <Grid container>
                <div className="row">
                  <span>Subtotal</span>
                  <span>${subTotal()}</span>
                </div>
              </Grid>
            </div>
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
              <span>
                {defaultAddress ? formatAddress(defaultAddress) : "--"}
              </span>
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
        <Paper variant="outlined" style={{ width: "100%" }}>
          <Grid
            container
            justifyContent="space-between"
            className={classes.total}
          >
            <h3>Total</h3>
            <h3>${subTotal() + (orderState.fee || 0)}</h3>
          </Grid>
        </Paper>
      </Grid>
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
    width: "100%",
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
  items: {
    // padding: theme.spacing(2),
    display: "inherit",
  },
  total: {
    padding: theme.spacing(2, 4),
  },
}));
export default CartInfo;
