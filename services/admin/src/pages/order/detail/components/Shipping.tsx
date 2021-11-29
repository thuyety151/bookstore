import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootStore } from "../../../../redux/store";
import { formatFullName } from "../../../../helper/format";
import CreateAddressForm from "./CreateAddressForm";
import { Close } from "@material-ui/icons";

export type BillingProps = {
  open: boolean;
  setOpen: any;
};

const Shipping: React.FC<BillingProps> = (props) => {
  const classes = useStyles();
  const { open, setOpen } = props;
  const order = useSelector((state: RootStore) => state.orders.currentOrder);

  return (
    <div>
      <Typography className="text-gray">
        {order?.addressToShip ? formatFullName(order?.addressToShip) : "--"}
      </Typography>
      <Typography className="text-gray">
        {order.addressToShip?.districtName} {order.addressToShip?.provinceName}
      </Typography>
      <Typography className="text-gray">
        {order.addressToShip?.streetAddress} {order.addressToShip?.wardName}
      </Typography>
      <Typography className="htext-gray">
        {order.addressToShip?.apartmentNumber}
      </Typography>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Shipping</Typography>
            <Button
              style={{ justifyContent: "end", minWidth: "0px" }}
              onClick={() => setOpen(false)}
            >
              <Close />
            </Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <CreateAddressForm
            onClose={() => setOpen(false)}
            address={order?.addressToShip}
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
      margin: theme.spacing(1, 1),
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

export default Shipping;
