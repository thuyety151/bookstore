import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { Order } from "../../../model/order";
import { cancelOrder } from "../../../redux/actions/order/postAction";
import "./styles.scss";

const OrderCard: React.FC<{
  order: Order;
  loadingCancel: boolean;
  setloadingCancel: any;
}> = (modelValue) => {
  const { order, loadingCancel, setloadingCancel } = modelValue;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleCancelOrder = () => {
    setloadingCancel(true);
    dispatch(
      cancelOrder({
        orderCode: order.orderCode,
        orderId: order.id,
        onSuccess: () => {
          setloadingCancel(false);
          enqueueSnackbar("Cancel order successfully", { variant: "success" });
        },
        onFailure: (error: any) => {
          setloadingCancel(false);
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  return (
    <div className="order-card" key={`order-card-${order.orderDate}`}>
      <Paper variant="outlined">
        <div className="order-card__header">
          <Grid container justifyContent="space-between" direction="row">
            <Typography className="text-bold">{order.orderCode}</Typography>
            <Typography>
              {format(new Date(order.orderDate), "HH:mm dd/MM/yyyy")}
            </Typography>
          </Grid>
          <Divider />
          {order.items.map((item, index) => (
            <div key={`item-${index}`}>
              <Grid container className="order-card__item ">
                <Grid item xs={2}>
                  <img src={item.pictureUrl} alt="pt" />
                </Grid>
                <Grid item xs={8} style={{ paddingLeft: "8px" }}>
                  <Typography>{item.productName}</Typography>
                  <Typography className="text-gray">
                    {item.attributeName}
                  </Typography>
                  <Typography>x{item.quantity}</Typography>
                </Grid>
                <Grid item xs={2} className="order-card__item__price">
                  <Typography align="right">${item.price}</Typography>
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))}

          <Grid
            container
            className="order-card__footer"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              {order.status === "Ready to pick" &&
                order.paymentMethod === "CashOnDelivery" && (
                  <Button
                    variant="outlined"
                    disableRipple
                    size="large"
                    onClick={handleCancelOrder}
                  >
                    {loadingCancel ? <CircularProgress size={22} /> : "Cancel"}
                  </Button>
                )}
            </Grid>
            <Grid item style={{ display: "flex" }}>
              <Typography>Total</Typography>
              <Typography className="order-card__footer__price">
                ${order.total}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export default OrderCard;
