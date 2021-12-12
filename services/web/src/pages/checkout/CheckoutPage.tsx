import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useHistory } from "react-router-dom";
import PrimaryButton from "../../components/button/PrimaryButton";
import BillDetailComponent from "../../components/checkout/BillDetail";
import BillInfoComponent from "../../components/checkout/BillInfo";
import { getPageCart } from "../../redux/actions/cart/getAction";
import { createOrder } from "../../redux/actions/order/postAction";
import { RootStore } from "../../redux/store";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fff6f6!important",
      minHeight: "100vh",
    },
    text: {
      fontWeight: "bold",
    },
  })
);

function CheckoutPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [note, setNote] = useState<string>("");
  

  

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" className={classes.text}>
        Checkout
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <BillDetailComponent {...{ note, setNote }} />
        </Grid>
        <Grid item xs={3}>
          <BillInfoComponent {...{note}} />
         
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckoutPage;
