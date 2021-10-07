import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Theme, Typography } from "@material-ui/core";
import CartTable from "./components/CartTable";
import CartInfo from "./components/CartInfo";
import PrimaryButton from "../../components/button/PrimaryButton";

const ShoppingCartPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignContent="center">
        <Grid item>
          <Typography variant="h4" className={classes.title}>
            Your cart: 3 items
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          spacing={4}
          style={{ marginRight: 0 }}
        >
          <Grid item xs={7}>
            <CartTable />
          </Grid>
          <Grid item className={classes.checkout}>
            <CartInfo />
            <PrimaryButton text="Proceed to checkout" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    //   width: 300 + theme.spacing(3) * 2,
    //   backgroundColor: COLORS.background_pink,
    backgroundColor: "#fff6f6!important",
    minHeight: "100vh",
  },
  checkout: {
    "& button": {
      margin: 0,
    },
  },
  title: {
    padding: "48px",
  },
}));
export default ShoppingCartPage;
