import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponCard from "../../../components/homepage/coupon/CouponCard";
import { Coupon } from "../../../model/coupon";
import { getUserCoupons } from "../../../redux/actions/coupon/getAction";
import { RootStore } from "../../../redux/store";

export default function ChooseCoupons() {
  const classes = useStyles();
  const couponsState = useSelector((state: RootStore) => state.coupons);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCoupons());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      {couponsState.userCoupons.map((coupon: Coupon, index: number) => {
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
          />
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
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
