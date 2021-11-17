import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/button/PrimaryButton";
import BillDetailComponent from "../../components/checkout/BillDetail";
import BillInfoComponent from "../../components/checkout/BillInfo";

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
            <PrimaryButton text="Place order" />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckoutPage;
