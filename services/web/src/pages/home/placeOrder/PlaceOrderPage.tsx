import React from "react";
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Divider,
} from "@material-ui/core";
import { join } from "lodash";

const orderDetails = [
  {
    name: "The Overdue Life of Amy Byler",
    quantity: 7,
    attributeName: ["Paperback", "English"],
    price: 951,
  },
  {
    name: "All You Can Ever Know:A Memoir",
    quantity: 3,
    attributeName: ["Paperback", "English"],
    price: 348,
  },
];
const PlaceOrderPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Order Received
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={6} className={classes.gridContainer}>
          <Paper variant="outlined">
            <Typography
              variant="inherit"
              className="text-bold"
              style={{
                textAlign: "center",
                fontSize: "18px",
                paddingTop: "32px",
              }}
            >
              Thank you, Your order has been received
            </Typography>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <Typography>Order number:</Typography>
                <Typography variant="inherit" className="text-bold">
                  1779
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Date:</Typography>
                <Typography variant="inherit" className="text-bold">
                  March 24, 2020
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Total:</Typography>
                <Typography variant="inherit" className="text-bold">
                  $2930
                </Typography>
              </Grid>
              <Grid item>
                <Typography>Payment method:</Typography>
                <Typography variant="inherit" className="text-bold">
                  Direct bank tranfer
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid item container className={classes.orderDetails}>
              <Typography
                variant="inherit"
                className="text-bold"
                style={{ paddingBottom: "32px" }}
              >
                Order Details
              </Typography>
              {orderDetails.map((item, index) => (
                <Grid item container justifyContent="space-between" key={index}>
                  <Grid item>
                    <Typography>{item.name}</Typography>
                    <Typography variant="caption">
                      ({join(item.attributeName)})
                    </Typography>
                  </Grid>
                  <Grid item>x {item.quantity}</Grid>
                  <Grid item>$ {item.price}</Grid>
                </Grid>
              ))}
            </Grid>
            <Divider />
            <Grid item className={classes.subTotal}>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Subtotal:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  $951
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Shipping:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  Free shipping
                </Typography>
              </Grid>
              <Grid item container justifyContent="space-between">
                <Typography variant="inherit" className="text-bold">
                  Payment Method:
                </Typography>
                <Typography variant="inherit" className="text-bold">
                  Direct bank transfer
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              item
              container
              justifyContent="space-between"
              className={classes.total}
            >
              <Grid item>Total</Grid>
              <Grid item>$2498</Grid>
            </Grid>
            <Divider />
            <Grid item container>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Billing Address</Typography>
                <Typography variant="body2">Ali Tufan</Typography>
                <Typography variant="body2">Bedford St,</Typography>
                <Typography variant="body2">Covent Garden,</Typography>
                <Typography variant="body2">London WC2E 9ED</Typography>
                <Typography variant="body2">United Kingdom</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Shipping Address</Typography>
                <Typography variant="body2">Ali Tufan</Typography>
                <Typography variant="body2">Bedford St,</Typography>
                <Typography variant="body2">Covent Garden,</Typography>
                <Typography variant="body2">London WC2E 9ED</Typography>
                <Typography variant="body2">United Kingdom</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#fff6f6",
      minHeight: "100vh",
      height: "100%",
      "& .MuiGrid-root .MuiGrid-container": {
        padding: theme.spacing(4),
      },
    },
    justifyRight: {
      display: "grid",
      justifyItems: "right",
    },
    total: {
      fontWeight: 500,
    },
    gridContainer: {
      padding: theme.spacing(4),
    },
    title: {
      textAlign: "center",
      padding: theme.spacing(4, 0),
    },
    subTotal: {
      padding: theme.spacing(4, 4, 0),
      "& .MuiTypography-root": {
        paddingTop: theme.spacing(1),
      },
      "& .MuiGrid-container": {
        padding: "0px !important",
      },
      "& .MuiGrid-item": {
        paddingBottom: "32px !important",
      },
    },
    orderDetails: {
      paddingBottom: "0px !important",
      "& .MuiGrid-container": {
        padding: "0px !important",
      },
      "& .MuiGrid-item": {
        paddingBottom: "16px !important",
      },
    },
  })
);
export default PlaceOrderPage;
