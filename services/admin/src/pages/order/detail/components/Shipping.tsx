import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootStore } from "../../../../redux/store";
import { formatFullName } from "../../../../helper/format";
import { Order } from "model/order";
const Shipping: React.FC = () => {
  // const classes = useStyles();
  // const dispatch = useDispatch();
  const order :Order= useSelector((state: RootStore) => state.orders.currentOrder);
  console.log("hhh",order)
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
    </div>
  );
};

export default Shipping;
