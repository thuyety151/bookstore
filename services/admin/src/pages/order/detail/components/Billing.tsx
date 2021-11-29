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
import { Close } from "@material-ui/icons";
import CreateAddressForm from "./CreateAddressForm";

export type BillingProps = {
  open: boolean;
  setOpen: any;
};

const Billing: React.FC<BillingProps> = (props) => {
  const classes = useStyles();
  const { open, setOpen } = props;
  const order = useSelector((state: RootStore) => state.orders.currentOrder);

  return (
    <div>
      <Grid container direction="column">
        <Typography className="text-gray">
          {order?.addressToShip ? formatFullName(order?.addressToShip) : "--"}
        </Typography>
        <Typography className="text-gray">
          {order?.addressToShip?.apartmentNumber}{" "}
          {order?.addressToShip?.streetAddress}
        </Typography>
      </Grid>
      <Typography className="text-gray bolder">Email address:</Typography>
      <Typography className="text-gray bolder">Phone:</Typography>
      <Typography className="highlight-info">
        {order.addressToShip?.phone || "--"}
      </Typography>
      {/**
       * Address dialog
       */}
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container justifyContent="space-between">
            <Typography variant="h6">Billing</Typography>
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
    root: {},
    header: {
      display: "flex",
      justifyContent: "space-between",
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

export default Billing;
