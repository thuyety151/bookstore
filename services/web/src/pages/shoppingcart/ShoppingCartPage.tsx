import React from "react";
import {
  Dialog,
  Grid,
  Typography,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import CartTable from "./components/CartTable";
import CartInfo from "./components/CartInfo";
import PrimaryButton from "../../components/button/PrimaryButton";
import { RootStore } from "../../redux/store";
import { useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import CreateAddressForm from "./components/address/CreateAddressForm";
// import { getPageCart } from "../../redux/actions/cart/getAction";

const ShoppingCartPage: React.FC = () => {
  const classes = useStyles();
  const items = useSelector((state: RootStore) => state.cart);

  const [isChangeAddress, setIsChangeAddress] = React.useState(false);

  // useEffect(() => {
  //   console.log("need to close dialog", addressState.success);
  //   if (addressState.success) {
  //     setIsChangeAddress(false);
  //   }
  // }, [addressState.success]);
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignContent="center">
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Your cart: {items.data.length} items
          </Typography>
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
            <Link to="/check-out">
              <PrimaryButton text="Proceed to checkout" />
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={isChangeAddress}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justifyContent="space-between">
            <Typography variant="h6">New address</Typography>
            <Button
              style={{ justifyContent: "end", minWidth: "0px" }}
              onClick={() => setIsChangeAddress(false)}
            >
              <CloseIcon />
            </Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <CreateAddressForm />
          {/* <Grid item container xs={12}>
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              spacing={2}
            >
              <Grid item xs={6}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  First name
                </InputLabel>
                <OutlinedInput
                  value={formValue.firstName}
                  onChange={(e) =>
                    setFormValue({
                      ...formValue,
                      firstName: e.target.value as string,
                    })
                  }
                  inputProps={{ "aria-label": "naked" }}
                  // onBlur={() => setTouched({ ...touched, street: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Last name
                </InputLabel>
                <OutlinedInput
                  value={formValue.lastName}
                  onChange={(e) =>
                    setFormValue({
                      ...formValue,
                      lastName: e.target.value as string,
                    })
                  }
                  inputProps={{ "aria-label": "naked" }}
                  // onBlur={() => setTouched({ ...touched, street: true })}
                />
              </Grid>
            </Grid>

            <AddressForm formValue={formValue} setFormValue={setFormValue} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValue.isDefault}
                  onChange={(e) =>
                    setFormValue({
                      ...formValue,
                      isDefault: !formValue.isDefault,
                    })
                  }
                />
              }
              label="Default"
            />
          </Grid> */}
        </DialogContent>
        <DialogActions className={classes.actions}></DialogActions>
      </Dialog>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
    posBtn: {
      padding: theme.spacing(1, 2),
      backgroundColor: "#000",
      color: "#fff",
      border: "2px solid #000",
      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
    nevBtn: {
      padding: theme.spacing(1, 2),
      color: "#000",
      border: "2px solid #000",
      margin: theme.spacing(1, 1),
    },
  })
);
export default ShoppingCartPage;
