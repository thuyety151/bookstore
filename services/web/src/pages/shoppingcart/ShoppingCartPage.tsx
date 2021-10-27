import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  Grid,
  Theme,
  Typography,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from "@material-ui/core";
import CartTable from "./components/CartTable";
import CartInfo from "./components/CartInfo";
import PrimaryButton from "../../components/button/PrimaryButton";
import { RootStore } from "../../redux/store";
import { useSelector } from "react-redux";
import AddressForm from "../../components/address/AddressForm";
import { AddressFormSchema } from "../../model/address";

// import { getPageCart } from "../../redux/actions/cart/getAction";

const ShoppingCartPage: React.FC = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const items = useSelector((state: RootStore) => state.cart.data);
  const [isChangeAddress, setIsChangeAddress] = React.useState(false);
  // useEffect(() => {
  //   dispatch(getPageCart())
  // }, [dispatch])
  const [formValue, setFormValue] = React.useState<AddressFormSchema>({
    province: {
      id: 0,
      name: "",
    },
    district: {
      id: 0,
      name: "",
    },
    ward: {
      id: 0,
      name: "",
    },
    street: "",
  });
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignContent="center">
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Your cart: {items.length} items
          </Typography>
          <AddressForm formValue={formValue} setFormValue={setFormValue} />
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          spacing={4}
          style={{ marginRight: 0 }}
        >
          <Grid item xs={7}>
            <CartTable />
          </Grid>
          <Grid item className={classes.checkout}>
            <CartInfo setIsChangeAddress={setIsChangeAddress} />
            <PrimaryButton text="Proceed to checkout" />
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={isChangeAddress}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Grid item container xs={12}>
            {/* <AddressForm /> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary">Cancel</Button>
          <Button color="primary">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    //   width: 300 + theme.spacing(3) * 2,
    //   backgroundColor: COLORS.background_pink,
    backgroundColor: "#fff6f6!important",
    minHeight: "100vh",
  },
  checkout: {
    "& button": {
      margin: 0,
    },
  },
  title: {
    padding: "48px",
  },
}));
export default ShoppingCartPage;
