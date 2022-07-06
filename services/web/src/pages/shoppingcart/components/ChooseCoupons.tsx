import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponCard from "../../../components/homepage/coupon/CouponCard";
import { Coupon } from "../../../model/coupon";
import { getUserCoupons } from "../../../redux/actions/coupon/getAction";
import { RootStore } from "../../../redux/store";
import emptyCart from "../../../assets/icons/cartempty.jpg";

export default function ChooseCoupons(props: {calTotalCart: () => void}) {
  const classes = useStyles();
  const couponsState = useSelector((state: RootStore) => state.coupons);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCoupons());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      { couponsState.userCoupons.length > 0 ? couponsState.userCoupons.map((coupon: Coupon, index: number) => {
        const isSelection =
          couponsState.selectedCoupon !== undefined &&
          couponsState.selectedCoupon.id === coupon.id
            ? true
            : false;
        return (
          <CouponCard
            coupon={coupon}
            isUserCoupon={true}
            isSelection={isSelection}
            calTotalCart = {props.calTotalCart}
          />
        );
      }): <>
      <img
        src={emptyCart}
        style={{ height: 200 }}
        alt="no-data"
      />
      <span>Empty Coupons</span>
    </>}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      justifyItems: 'center'
    },
    item: {
      padding: theme.spacing(2),
      cursor: "pointer",
      margin: "4px",
      textAlign: "center",
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
    actions: {
      padding: theme.spacing(0, 3, 2),
    },
  })
);
