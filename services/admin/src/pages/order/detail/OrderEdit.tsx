import {
  Theme,
  createStyles,
  makeStyles,
  Paper,
  Grid,
  Typography,
  IconButton,
  TextareaAutosize,
  Divider,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetail } from "../../../redux/actions/order/getActions";
import { RootStore } from "../../../redux/store";
import Billing from "./components/Billing";
import General from "./components/General";
import Shipping from "./components/Shipping";
import EditIcon from "@material-ui/icons/Edit";
import ProductTable from "./components/ProductTable";
import ContainedButton from "components/button/ContainedButton";
import { updateOrderNote } from "redux/actions/order/postActions";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const OrderEdit: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const order = useSelector((state: RootStore) => state.orders.currentOrder);
  const { requesting } = useSelector((state: RootStore) => state.orders);
  const [updateBilling, setUpdateBilling] = useState(false);
  const [updateShipping, setUpdateShipping] = useState(false);
  const { orderId } = useParams() as any;
  const [orderNoteState, setOrderNoteState] = useState(order.orderNote || "");
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(orderId));
    // eslint-disable-next-line
  }, [orderId]);
  useEffect(() => {
    setOrderNoteState(order.orderNote);
  }, [order]);

  const handleChangeOrderNote = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setOrderNoteState(event.target.value as string);
  };
  const handleOrderNote = () => {
    dispatch(
      updateOrderNote({
        orderId,
        orderNote: orderNoteState,
        onSuccess: () => {
          enqueueSnackbar("Update successfully", { variant: "success" });
          history.goBack();
        },
        onFailure: (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Paper variant="outlined" square className={classes.container}>
          <Grid className={classes.header}>
            <Typography className="bolder">
              Order #{order.orderCode} details
            </Typography>
            <Grid container direction="row" justifyContent="space-between">
              {/* 
              General
            */}
              <Grid item>
                <General />
              </Grid>
              {/* 
              Billing
            */}
              <Grid item xs={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  className={classes.title}
                >
                  <Typography className="bolder">Billing</Typography>
                  <IconButton
                    size="small"
                    onClick={() => setUpdateBilling(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Billing open={updateBilling} setOpen={setUpdateBilling} />
              </Grid>
              {/* 
              Shipping
            */}
              <Grid item xs={3}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  className={classes.title}
                >
                  <Typography className="bolder">Shipping</Typography>
                  <IconButton
                    size="small"
                    onClick={() => setUpdateShipping(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Shipping open={updateShipping} setOpen={setUpdateShipping} />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper variant="outlined" square className={classes.container}>
          <ProductTable />
        </Paper>
      </Grid>
      <Grid item xs={3} className={classes.containerOrder}>
        <Paper variant="outlined" square style={{ padding: 0 }}>
          <Grid container direction="column" className={classes.orderNote}>
            <Typography className="bolder">Order Note</Typography>
            <Divider />
            <hr />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Order note"
              style={{ marginBottom: "16px" }}
              value={orderNoteState}
              onChange={(e) => handleChangeOrderNote(e)}
            />
            <ContainedButton
              text={order.orderNote ? "Update" : "Add"}
              style={{ width: "fit-content" }}
              onClick={handleOrderNote}
              loading={requesting}
            />
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    actionsContainer: {},
    title: {
      alignItems: "center",
      width: "100%",
    },
    container: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(4),
    },
    header: {},
    smallInput: {
      "& .MuiInputBase-input": {
        width: "5rem",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    containerOrder: {
      padding: theme.spacing(0, 2),
      marginTop: theme.spacing(4),
    },
    orderNote: {
      padding: theme.spacing(2),
    },
  })
);

export default OrderEdit;
