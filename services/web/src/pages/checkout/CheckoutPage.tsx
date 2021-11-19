import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PrimaryButton from "../../components/button/PrimaryButton";
import BillDetailComponent from "../../components/checkout/BillDetail";
import BillInfoComponent from "../../components/checkout/BillInfo";
import { getPageCart } from "../../redux/actions/cart/getAction";
import { createOrder } from "../../redux/actions/order/postAction";
import { ROUTE_PLACE_ORDER } from "../../routers/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fff6f6",
    },
    text: {
      fontWeight: "bold",
    },
  })
);

function CheckoutPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    dispatch(
      createOrder({
        onSuccess: () => {
          dispatch(getPageCart());
          history.push(ROUTE_PLACE_ORDER);
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error.message, { variant: "error" });
        },
      })
    );
  };

  return (
    <div>
      <Typography variant="h4" align="center" className={classes.text}>
        Checkout
      </Typography>
      <Grid container>
        <Grid item xs={7}>
          <BillDetailComponent />
        </Grid>
        <Grid item xs={4}>
          <BillInfoComponent />
          <Link to="/place-order">
            <PrimaryButton text="Place order" onClick={handleClick} />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckoutPage;
