import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Address } from "../../../../model/address";
import { getAllAddresses } from "../../../../redux/actions/address/getAction";
import { RootStore } from "../../../../redux/store";
import PrimaryButton from "../../../../components/button/PrimaryButton";
import AddressItem from "./AddressItem";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CreateAddressForm from "../../../shoppingcart/components/address/CreateAddressForm";

const AddressDashboard: React.FC = () => {
  const classes = useStyles();
  const state = useSelector((state: RootStore) => state.address);
  const dispatch = useDispatch();
  const [openAddAddress, setOpenAddAddress] = useState(false);

  useEffect(() => {
    dispatch(getAllAddresses());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className={classes.header}>
          <Grid item xs={3}>
            <PrimaryButton
              text="Add Address"
              props={{
                style: { padding: "8px", width: "fit-content" },
                startIcon: <AddIcon />,
                onClick: () => setOpenAddAddress(true),
              }}
            />
          </Grid>
        </Grid>
        <Grid container>
          {state.addresses.map((address: Address, index: number) => (
            <div key={`address-item-${index}`} style={{ width: "100%" }}>
              <AddressItem {...address} />
            </div>
          ))}
        </Grid>
      </Grid>
      <Dialog
        open={openAddAddress}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justifyContent="space-between">
            <Typography variant="h6">New address</Typography>
            <Button
              style={{ justifyContent: "end", minWidth: "0px" }}
              onClick={() => setOpenAddAddress(false)}
            >
              <CloseIcon />
            </Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <CreateAddressForm onClose={() => setOpenAddAddress(false)} />
        </DialogContent>
        <DialogActions className={classes.actions}></DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
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
export default AddressDashboard;
