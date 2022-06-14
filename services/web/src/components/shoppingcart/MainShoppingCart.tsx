import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import { Button, Grid, LinearProgress } from "@material-ui/core";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import CartItem from "./CartItem";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPageCart } from "../../redux/actions/cart/getAction";
import { RootStore } from "../../redux/store";
import { sum } from "lodash";
import { ROUTE_CHECK_OUT } from "../../routers/types";
import "./styles.scss";
import { useSnackbar } from "notistack";
import { NAME_ACTIONS } from "../../redux/constants/cart/actionTypes";
import { NAME_ACTIONS as ORDER_NAME_ACTIONS } from "../../redux/constants/order/actionTypes";

type Anchor = "left" | "right";

const MainShoppingCart: React.FC<{
  openCart: boolean;
  setOpenCart: any;
}> = ({ openCart, setOpenCart }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { requesting, data, itemToCheckOut } = useSelector(
    (state: RootStore) => state.cart
  );
  const user = localStorage.getItem("user");
  const { enqueueSnackbar } = useSnackbar();

  const subTotal = () => {
    return sum(
      data.map((item) => {
        return item.quantity * item.price;
      })
    );
  };

  useEffect(() => {
    if (user) {
      dispatch(getPageCart());
    }
  }, [dispatch, user]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenCart(false);
    };
  const handleOpenCartPage = () => {
    setOpenCart(false);
    dispatch({ type: ORDER_NAME_ACTIONS.CHECKOUT.CLEAR_ORDER_STATE });
    history.push("/cart");
  };
  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleCheckout = () => {
    if (!data.length) {
      enqueueSnackbar("Your cart is empty", { variant: "error" });
      return;
    }
    setOpenCart(false);
    dispatch({ type: ORDER_NAME_ACTIONS.CHECKOUT.CLEAR_ORDER_STATE });
    if (!itemToCheckOut.length) {
      dispatch({
        type: NAME_ACTIONS.SET_ITEM_TO_CHECK_OUT.SET_ALL_ITEM_TO_CHECK_OUT,
      });
    }

    history.push(ROUTE_CHECK_OUT);
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {requesting && <LinearProgress />}
      <Grid container>
        <Grid
          container
          justifyContent="space-between"
          className={classes.title}
        >
          <Grid item style={{ alignItems: "center", display: "flex" }}>
            <LocalMallOutlinedIcon style={{ paddingRight: 20 }} />
            <span>Your shopping bag ({data.length})</span>
          </Grid>
          <Grid item>
            <CloseIcon
              onClick={toggleDrawer(anchor, false)}
              className={classes.iconNavigate}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {data.map((item, index) => {
            return (
              <div key={index}>
                <CartItem item={item} closeCart={handleCloseCart} />
                <Divider />
              </div>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          className={classes.title}
        >
          <span>Subtotal:</span>
          <span>${subTotal().toFixed(2)}</span>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignContent="center"
          xs={12}
        >
          <Button
            variant="outlined"
            fullWidth
            className={classes.btn}
            onClick={handleOpenCartPage}
          >
            View Cart
          </Button>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignContent="center"
          xs={12}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "#000", color: "#fff" }}
            fullWidth
            className={classes.btn}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
  return (
    <div>
      <React.Fragment key="right">
        <Drawer
          anchor="right"
          open={openCart}
          onClose={toggleDrawer("right" as Anchor, false)}
        >
          {list("right" as Anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default MainShoppingCart;

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    display: "contents",
  },
  fullList: {
    width: "auto",
  },
  title: {
    padding: theme.spacing(3, 4),
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2, 1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  btn: {
    padding: theme.spacing(3, 3),
    margin: theme.spacing(1, 4),
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
  // paper: {
  //   margin: theme.spacing(1),
  // },

  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    // stroke: theme.palette.divider,
    // strokeWidth: 1,
  },
  iconNavigate: {
    fontSize: 20,
    cursor: "pointer",
  },
  helpSession: {
    fontSize: 14,
  },
  itemHelp: {
    "&:hover": {
      color: "red",
    },
  },
  items: {
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}));
