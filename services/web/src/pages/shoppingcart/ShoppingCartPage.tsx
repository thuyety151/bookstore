import React from "react";
import {
  Dialog,
  Grid,
  Typography,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  FormControlLabel,
  Checkbox,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import CartTable from "./components/CartTable";
import CartInfo from "./components/CartInfo";
import PrimaryButton from "../../components/button/PrimaryButton";
import { RootStore } from "../../redux/store";
import { useSelector } from "react-redux";
import AddressForm from "../../components/address/AddressForm";
import { AddressFormSchema } from "../../model/address";
import CloseIcon from "@material-ui/icons/Close";

const ShoppingCartPage: React.FC = () => {
  const classes = useStyles();
  const items = useSelector((state: RootStore) => state.cart.data);
  const [isChangeAddress, setIsChangeAddress] = React.useState(false);

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
    isDefault: false,
  });
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignContent="center">
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Your cart: {items.length} items
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
            <PrimaryButton text="Proceed to checkout" />
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
          <Grid item container xs={12}>
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
          </Grid>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button className={classes.nevBtn}>Cancel</Button>
          <Button className={classes.posBtn}>Create</Button>
        </DialogActions>
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
