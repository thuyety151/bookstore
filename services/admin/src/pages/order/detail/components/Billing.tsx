import {
  Grid,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootStore } from "../../../../redux/store";
import { formatFullName } from "../../../../helper/format";
import { useState } from "react";
const Billing: React.FC = () => {
  // const classes = useStyles();
  // const dispatch = useDispatch();
  const order = useSelector((state: RootStore) => state.orders.currentOrder);
  console.log(order.orderDate)

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
    </div>
  );
};

export default Billing;
