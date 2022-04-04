import { Grid, Theme, createStyles, makeStyles } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { generatePath, useHistory } from "react-router-dom";
import { ROUTE_PRODUCT_ADD } from "routers/types";
import ProductTable from "./ProductTable";
import clsx from "clsx";

const ProductPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const onAdd = () => {
    history.push(generatePath(ROUTE_PRODUCT_ADD));
  };

  return (
    <div className={classes.root}>
      <HeaderPage title="Books" />
      <FilterContainer onAdd={onAdd} />
      <Grid container className={clsx(classes.actionsContainer, "pb-lg")}>
        <ProductTable />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // margin: "0 16px",
      padding: "0 5rem",
    },
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default ProductPage;
