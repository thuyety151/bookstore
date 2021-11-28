import {
  Grid,
  Typography,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import OrderTable from "./OrderTable";

const OrderPage: React.FC = () => {
  const classes = useStyles();
  // const orderState = useSelector((state: RootStore) => state.orders.data);

  return (
    <div className={classes.root}>
      <Grid container className={classes.actionsContainer}>
        <Typography variant="h5" className={classes.title}>
          Orders
        </Typography>
        {/* <OrderStatus status={OrderStatusEnum.Delivered} />
        <OrderStatus status={OrderStatusEnum.ReadyToPick} /> */}
        <Grid item>
          {/* Table */}

          {/* End Table */}
        </Grid>
        <OrderTable />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default OrderPage;
