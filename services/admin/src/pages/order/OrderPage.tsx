import {
  Grid,
  Typography,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import OutlineButton from "../../components/route/button/OutlineButton";
import OrderStatus, {
  OrderStatusEnum,
} from "../../components/route/orderStatus/OrderStatus";
import OrderTable from "./OrderTable";

const OrderPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.actionsContainer}>
        <OrderStatus status={OrderStatusEnum.Delivered} />
        <OrderStatus status={OrderStatusEnum.ReadyToPick} />
        <Grid item>
          <OutlineButton text="hi" />
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
  })
);

export default OrderPage;
