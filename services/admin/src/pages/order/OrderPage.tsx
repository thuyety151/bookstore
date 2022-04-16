import { Grid, Theme, createStyles, makeStyles } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import OrderTable from "./OrderTable";
import clsx from "clsx";

const OrderPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeaderPage title="Orders" />
      <FilterContainer />
      <Grid container className={clsx(classes.actionsContainer, "pt-md")}>
        <OrderTable />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 5rem",
    },
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default OrderPage;
