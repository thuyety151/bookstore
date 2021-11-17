import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatAddress } from "../../../../helper/format";
import { Address } from "../../../../model/address";
import { getAllAddresses } from "../../../../redux/actions/address/getAction";
import { NAME_ACTIONS } from "../../../../redux/constants/address/actionTypes";
import { RootStore } from "../../../../redux/store";
import AddIcon from "@material-ui/icons/Add";
import "./styles.scss";
import CreateAddressForm from "./CreateAddressForm";
import CloseIcon from "@material-ui/icons/Close";

const Item: React.FC<{
  data: Address;
  isActive: boolean;
  onClick: (data: Address) => void;
}> = ({ data, isActive, onClick }) => {
  return (
    <Grid
      key={data.id}
      item
      container
      direction="column"
      onClick={() => onClick(data)}
    >
      <Paper variant="outlined" className={`item ${isActive && "active"}`}>
        <Grid>
          <Typography className="text-bold" style={{ fontSize: 16 }}>
            {`${data.firstName + data.lastName} (${data.phone})`}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="caption" className="text-gray">
            {formatAddress(data)}
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};
const ChooseAddressCard: React.FC = () => {
  const classes = useStyles();
  const addressState = useSelector((state: RootStore) => state.address);
  const [openAddAddress, setopenAddAddress] = useState(false);
  const currentAddressId = useSelector(
    (state: RootStore) => state.address.currentAddress?.id
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAddresses());
  }, [dispatch]);

  const handleClick = (data: Address) => {
    dispatch({
      type: NAME_ACTIONS.SET_CURRENT_ADDRESS.SET_CURRENT_ADDRESS,
      data,
    });
  };
  const handleOpenAddAddress = () => {
    setopenAddAddress(true);
  };
  return (
    <div className={classes.root}>
      {addressState.addresses.map((address: Address, index: number) => {
        return (
          <Item
            data={address}
            key={index}
            isActive={address.id === currentAddressId}
            onClick={handleClick}
          />
        );
      })}
      <Grid item container direction="column" onClick={handleOpenAddAddress}>
        <Paper variant="outlined" className={classes.item}>
          <Grid>
            <Typography className="text-bold" style={{ fontSize: 16 }}>
              Add new
            </Typography>
          </Grid>
          <Grid>
            <AddIcon />
          </Grid>
        </Paper>
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
              onClick={() => setopenAddAddress(false)}
            >
              <CloseIcon />
            </Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <CreateAddressForm onClose={() => setopenAddAddress(false)} />
        </DialogContent>
        <DialogActions className={classes.actions}></DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
    },
    item: {
      padding: theme.spacing(2),
      cursor: "pointer",
      margin: "4px",
      textAlign: "center",
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

export default ChooseAddressCard;
