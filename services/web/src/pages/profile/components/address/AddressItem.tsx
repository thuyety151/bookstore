import {
  Button,
  createStyles,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Theme,
  DialogContent,
  Typography,
  DialogActions,
} from "@material-ui/core";
import { formatAddress } from "../../../../helper/format";
import { Address } from "../../../../model/address";
import CreateAddressForm from "../../../shoppingcart/components/address/CreateAddressForm";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import {
  deleteAddress,
  setDefaultAddress,
} from "../../../../redux/actions/address/postAction";
import { getAllAddresses } from "../../../../redux/actions/address/getAction";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const TextInfo: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} style={{ textAlign: "end" }}>
        <span style={{ color: "gray" }}>{title}</span>
      </Grid>
      <Grid item xs={9}>
        <span>{content}</span>
      </Grid>
    </Grid>
  );
};

const AddressItem: React.FC<Address> = (address) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSetDefault = () => {
    dispatch(
      setDefaultAddress(address.id, () => {
        enqueueSnackbar("Set default address successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        dispatch(getAllAddresses());
      })
    );
  };

  const removeAddress = () => {
    dispatch(
      deleteAddress({
        id: address.id,
        onSuccess: () => {
          enqueueSnackbar("Remove address successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          dispatch(getAllAddresses());
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        },
      })
    );
  };

  return (
    <div key={address.id} className={classes.root}>
      <Divider />
      <Grid container className={classes.container}>
        <Grid item xs={10}>
          <TextInfo title="Fullname" content={address.firstName} />
          <TextInfo title="Phone number" content={address.phone} />
          <TextInfo title="Address" content={formatAddress(address)} />
        </Grid>
        <Grid item xs={2} className={classes.action}>
          <div>
            <span onClick={() => setOpenDialog(true)}>Edit</span>
            <span onClick={removeAddress}>Remove</span>
          </div>
          <Button
            className={classes.nevBtn}
            disabled={address.isMain}
            onClick={handleSetDefault}
          >
            Set Default
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Edit address</Typography>
            <Button
              style={{ justifyContent: "flex-end", minWidth: "0px" }}
              onClick={() => setOpenDialog(false)}
            >
              <CloseIcon />
            </Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <CreateAddressForm
            address={address}
            onClose={() => setOpenDialog(false)}
          />
        </DialogContent>
        <DialogActions className={classes.actions}></DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      flexGrow: 1,
    },
    container: {
      padding: theme.spacing(4, 0),
    },
    action: {
      display: "grid",
      "& span": {
        padding: theme.spacing(1),
        textDecoration: "underline",
        cursor: "pointer",
      },
      "& button": {
        padding: theme.spacing(0),
        width: "150px",
      },
      "& button > span": {
        textDecoration: "none",
      },
    },
    nevBtn: {
      padding: theme.spacing(1, 2),
      color: "#000",
      border: "1px solid #000",
      margin: theme.spacing(1, 1),
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

export default AddressItem;
