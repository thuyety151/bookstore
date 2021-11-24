import {
  Theme,
  createStyles,
  makeStyles,
  Paper,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetail } from "../../../redux/actions/order/getActions";
import { RootStore } from "../../../redux/store";
import Billing from "./components/Billing";
import General from "./components/General";
import Shipping from "./components/Shipping";
import EditIcon from "@material-ui/icons/Edit";

const OrderDetail: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const order = useSelector((state: RootStore) => state.orders.currentOrder);
  const { orderId } = useParams() as any;

  useEffect(() => {
    dispatch(getDetail(orderId));
  }, [dispatch, orderId]);

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square className={classes.container}>
        <Grid className={classes.header}>
          <Typography>Order #{order.orderCode} details</Typography>

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
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Grid>

              <Billing />
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
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Grid>
              <Shipping />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    actionsContainer: {},
    title: {
      alignItems: "center",
      width: "100%",
    },
    container: {
      padding: theme.spacing(3),
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
  })
);

export default OrderDetail;
